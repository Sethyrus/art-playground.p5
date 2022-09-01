import { Line } from "./models/line";
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

    return this.sanitizePositions(result);
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
            result.push(vertices[position - vertices.length / 2 + i] ?? vertices[0 + (vertices.length - i)]);
            result.push(vertices[position - vertices.length / 2 - i] ?? vertices[(vertices.length - i) + position]);
          }
        }
      }
    }

    return this.sanitizePositions(result);
  }

  // Returns an array of non duplicated positions
  static sanitizePositions(positions: Position[]): Position[]
  {
    const result: Position[] = [];

    for (const position of positions)
    {
      if (position && !result.some(p => p?.x === position?.x && p?.y === position?.y))
      {
        result.push(position);
      }
    }

    return result;
  }

  // Returns an array of non duplicated lines
  static sanitizeLines(lines: Line[]): Line[]
  {
    const result: Line[] = [];

    for (const line of lines)
    {
      if (line && !result.some(l => l?.start?.x === line?.start?.x && l?.start?.y === line?.start?.y && l?.end?.x === line?.end?.x && l?.end?.y === line?.end?.y))
      {
        result.push(line);
      }
    }

    return result;
  }

}