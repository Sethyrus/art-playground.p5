import { useState } from "react";
import P5Canvas from "../P5Canvas/P5Canvas";
import "./App.css";

const App = () => {
  const [vertexCount, setVertexCount] = useState("12");
  const [vertexClosestVertices, setVertexClosestVertices] = useState("4");
  const [vertexOpposingVertices, setVertexOpposingVertices] = useState("2");

  return (
    <div className="wrapper">
      <P5Canvas vertexCount={parseInt(vertexCount)}  vertexClosestVertices={parseInt(vertexClosestVertices)}  vertexOpposingVertices={parseInt(vertexOpposingVertices)} />
      <div className="controls">
        <div className="controls-col">
          <label htmlFor="vertex-count">
            Vértices: {vertexCount}
          </label>
          <input
            id="vertex-count"
            type="range"
            step="2"
            min="0"
            max="128"
            value={vertexCount}
            onChange={(e) => setVertexCount(e.target.value)}
            className="range-slider"
          />
        </div>
        <div className="controls-col">
          <label htmlFor="vertex-closest-vertices">
            Uniones cercanas: {vertexClosestVertices}
          </label>
          <input
            id="vertex-closest-vertices"
            type="range"
            min="0"
            max="32"
            value={vertexClosestVertices}
            onChange={(e) => setVertexClosestVertices(e.target.value)}
            className="range-slider"
          />
        </div>
        <div className="controls-col">
          <label htmlFor="vertex-opposing-vertices">
            Uniones opuestas: {vertexOpposingVertices}
          </label>
          <input
            id="vertex-opposing-vertices"
            type="range"
            min="0"
            max="32"
            value={vertexOpposingVertices}
            onChange={(e) => setVertexOpposingVertices(e.target.value)}
            className="range-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
