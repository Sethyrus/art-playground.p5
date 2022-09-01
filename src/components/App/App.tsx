import { useState } from "react";
import P5Canvas from "../P5Canvas/P5Canvas";
import "./App.css";

const App = () => {
  const [vertexCount, setVertexCount] = useState("5");

  return (
    <div className="wrapper">
      <P5Canvas vertexCount={parseInt(vertexCount)} />
      <div>
        <label htmlFor="vertexCount text-3xl font-bold underline">Vértices: {vertexCount}</label>
        <input
          id="vertexCount"
          type="range"
          min="3"
          max="24"
          value={vertexCount}
          onChange={(e) => setVertexCount(e.target.value)}
          className="slider"
        />
      </div>
    </div>
  );
};

export default App;
