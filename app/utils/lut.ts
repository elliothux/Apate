import { Maybe } from "../types";

export enum LookUpTableType {
  "1D" = "1D",
  "3D" = "3D"
}

export interface LookUpTable {
  title: String;
  type: LookUpTableType;
  size: number;
  domain: number[][];
  data: number[][];
}

export function parseLut(str: String): LookUpTable {
  let title: Maybe<string> = null;
  let type: Maybe<LookUpTableType> = null;
  let size: number = 0;
  let domain: number[][] = [
    [0.0, 0.0, 0.0],
    [1.0, 1.0, 1.0]
  ];
  let data: number[][] = [];

  const lines = str.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line[0] === "#" || line === "") {
      // Skip comments and empty lines
      continue;
    }

    const parts = line.split(/\s+/);

    switch (parts[0]) {
      case "TITLE":
        title = line.slice(7, -1);
        break;
      case "DOMAIN_MIN":
        domain[0] = parts.slice(1).map(Number);
        break;
      case "DOMAIN_MAX":
        domain[1] = parts.slice(1).map(Number);
        break;
      case "LUT_1D_SIZE":
        type = LookUpTableType["1D"];
        size = Number(parts[1]);
        break;
      case "LUT_3D_SIZE":
        type = LookUpTableType["3D"];
        size = Number(parts[1]);
        break;
      default:
        data.push(parts.map(Number));
    }
  }

  return {
    title: title!,
    type: type!,
    size,
    domain,
    data
  } as LookUpTable;
}
