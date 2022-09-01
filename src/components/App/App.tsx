import { useState } from "react";
import P5Canvas from "../P5Canvas/P5Canvas";
import "./App.css";

const App = () => {
  const [vertexCount, setVertexCount] = useState("5");

  return (
    <div className="wrapper">
      <P5Canvas vertexCount={parseInt(vertexCount)} />
      <div className="controls">
        <div className="controls-col">
          <label htmlFor="vertex-count text-3xl font-bold underline">
            Vértices: {vertexCount}
          </label>
          <input
            id="vertex-count"
            type="range"
            min="3"
            max="128"
            value={vertexCount}
            onChange={(e) => setVertexCount(e.target.value)}
            className="range-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
