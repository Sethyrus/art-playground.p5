import { Position } from "./models/position";

export class Utils
{
  static getNClosestVertices(position: number, vertices: Position[], n: number): Position[]
  {
    const result: Position[] = [];

    for (let i = 1; i <= n; i++)
    {
      result.push(vertices[position + i] ?? vertices[0 + (vertices.length - i)]);
      result.push(vertices[position - i] ?? vertices[(vertices.length - i) + position]);
    }

    return result;
  }

  // This function returns an array of vertices that, when drawn, are opposing the vertex at position.
  // vertices is an array of positions
  static getNOpposingVertices(position: number, vertices: Position[], n: number): Position[]
  {
    const result: Position[] = [];

    // Even number of vertices
    if (vertices.length % 2 === 0)
    {
      for (let i = 0; i < n; i++)
      {
        if (i === 0)
        {
          if (position + 1 > vertices.length / 2)
          {
            result.push(vertices[position - vertices.length / 2]);
          }
        } else
        {
          if (position + 1 + i > vertices.length / 2)
          {
            console.log("Entra");
            // result.push(vertices[position - vertices.length / 2]);

            result.push(vertices[position - vertices.length / 2 + i] ?? vertices[0 + (vertices.length - i)]);
            result.push(vertices[position - vertices.length / 2 - i] ?? vertices[(vertices.length - i) + position]);

            console.log("Sale");
          }

          // result.push(vertices[position - i] ?? vertices[(vertices.length - i) + position]);
        }
      }
    }

    return result;
  }
}