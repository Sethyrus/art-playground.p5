import Sketch from "react-p5";
import P5 from "react-p5/node_modules/@types/p5";
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
