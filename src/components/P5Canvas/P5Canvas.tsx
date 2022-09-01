import Sketch from "react-p5";
import P5 from "react-p5/node_modules/@types/p5";
import { Position } from "../../models/position";
import { Utils } from "../../utils";
import "./P5Canvas.css";

interface CanvasProps {
  vertexCount: number;
  vertexClosestVertices: number;
  vertexOpposingVertices: number;
}

let resizeTimeout: NodeJS.Timeout;
let canvasSize =
  window.innerWidth > window.innerHeight
    ? window.innerHeight - 1
    : window.innerWidth;

const resize = (p5: P5, canvasParentRef: Element) => {
  canvasSize =
    window.innerWidth > window.innerHeight
      ? window.innerHeight
      : window.innerWidth;

  p5.createCanvas(canvasSize, canvasSize).parent(canvasParentRef);
};

const P5Canvas = (props: CanvasProps) => {
  const draw = (p5: P5) => {
    p5.background("#dddddd");

    p5.circle(p5.width / 2, p5.height / 2, p5.width / 2);

    const vertexPositions: Position[] = [];

    // Get the vertices at the edge of a circle in the middle of the canvas, half size of it, and draw them
    for (let i = 1; i <= props.vertexCount; i++) {
      const angle = (i / props.vertexCount) * Math.PI * 2;

      vertexPositions.push({
        x: p5.width / 2 + (Math.cos(angle) * p5.width) / 4,
        y: p5.height / 2 + (Math.sin(angle) * p5.width) / 4,
      });

      p5.circle(vertexPositions[i - 1].x, vertexPositions[i - 1].y, 10);
    }

    // Draw a line from each vertex to the N closest ones
    for (let i = 0; i < vertexPositions.length; i++) {
      const closestVertices = Utils.getNClosestVertices(
        i,
        vertexPositions,
        props.vertexClosestVertices > props.vertexCount
          ? props.vertexCount
          : props.vertexClosestVertices
      );

      const opposingVertices = Utils.getNOpposingVertices(
        i,
        vertexPositions,
        props.vertexOpposingVertices > props.vertexCount
          ? props.vertexCount
          : props.vertexOpposingVertices
      );

      for (let j = 0; j < closestVertices.length; j++) {
        p5.line(
          vertexPositions[i]?.x,
          vertexPositions[i]?.y,
          closestVertices[j]?.x,
          closestVertices[j]?.y
        );
      }

      for (let j = 0; j < opposingVertices.length; j++) {
        p5.line(
          vertexPositions[i]?.x,
          vertexPositions[i]?.y,
          opposingVertices[j]?.x,
          opposingVertices[j]?.y
        );
      }
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
