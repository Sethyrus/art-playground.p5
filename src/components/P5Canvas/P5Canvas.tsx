import Sketch from "react-p5";
import P5 from "react-p5/node_modules/@types/p5";
import { Position } from "../../models/position";
import "./P5Canvas.css";

interface CanvasProps {
  vertexCount: number;
}

let resizeTimeout: NodeJS.Timeout;
let canvasSize =
  window.innerWidth > window.innerHeight
    ? window.innerHeight - 1
    : window.innerWidth;

const P5Canvas = (props: CanvasProps) => {
  const resize = (p5: P5, canvasParentRef: Element) => {
    canvasSize =
      window.innerWidth > window.innerHeight
        ? window.innerHeight
        : window.innerWidth;

    p5.createCanvas(canvasSize, canvasSize).parent(canvasParentRef);
  };

  const draw = (p5: P5) => {
    p5.background("#dddddd");

    p5.circle(p5.width / 2, p5.height / 2, p5.width / 2);

    const vertexPositions: Position[] = [];

    // Draw the vertices at the edge of a circle in the middle of the canvas, half size of it
    for (let i = 0; i < props.vertexCount; i++) {
      const angle = (i / props.vertexCount) * Math.PI * 2;
      vertexPositions.push(
        new Position(
          p5.width / 2 + (Math.cos(angle) * p5.width) / 4,
          p5.height / 2 + (Math.sin(angle) * p5.width) / 4
        )
      );

      p5.ellipse(vertexPositions[i].x, vertexPositions[i].y, 10, 10);
    }
  };

  const setup = (p5: P5, canvasParentRef: Element) => {
    p5.createCanvas(canvasSize, canvasSize).parent(canvasParentRef);

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => resize(p5, canvasParentRef), 50);
    });
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default P5Canvas;
