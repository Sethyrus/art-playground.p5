import { useEffect } from "react";
import Sketch from "react-p5";
import P5 from "react-p5/node_modules/@types/p5";
import { Line } from "../../models/line";
import { Position } from "../../models/position";
import { Utils } from "../../utils";
import "./P5Canvas.css";

interface CanvasProps {
  vertexCount: number;
  vertexClosestVertices: number;
  vertexOpposingVertices: number;
}

let changeTimeout: NodeJS.Timeout;
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

let hasChanged = true;

const P5Canvas = (props: CanvasProps) => {
  useEffect(() => {
    console.log("Change detected");

    changeTimeout = setTimeout(() => {
      hasChanged = true;
    }, 100);
  }, [
    props.vertexCount,
    props.vertexClosestVertices,
    props.vertexOpposingVertices,
  ]);

  const draw = (p5: P5) => {
    if (hasChanged) {
      console.log('Drawing');

      p5.background("#dddddd");

      p5.circle(p5.width / 2, p5.height / 2, p5.width / 2);

      const vertexPositions: Position[] = [];

      // Get the vertices at the edge of the circle and draw them
      for (let i = 1; i <= props.vertexCount; i++) {
        const angle = (i / props.vertexCount) * Math.PI * 2;

        vertexPositions.push({
          x: p5.width / 2 + (Math.cos(angle) * p5.width) / 4,
          y: p5.height / 2 + (Math.sin(angle) * p5.width) / 4,
        });

        p5.circle(vertexPositions[i - 1].x, vertexPositions[i - 1].y, 10);
      }

      // Draw a line from each vertex to the N closest and opposing vertices
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

        const lines: Line[] = [];

        for (let j = 0; j < closestVertices.length; j++) {
          lines.push({
            start: { x: vertexPositions[i]?.x, y: vertexPositions[i]?.y },
            end: {
              x: closestVertices[j]?.x,
              y: closestVertices[j]?.y,
            },
          });
        }

        for (let j = 0; j < opposingVertices.length; j++) {
          lines.push({
            start: { x: vertexPositions[i]?.x, y: vertexPositions[i]?.y },
            end: {
              x: opposingVertices[j]?.x,
              y: opposingVertices[j]?.y,
            },
          });
        }

        for (let line of Utils.sanitizeLines(lines)) {
          p5.line(line.start.x, line.start.y, line.end.x, line.end.y);
        }
      }

      hasChanged = false;
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
