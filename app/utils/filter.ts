import { ThreeDirectionLookUpTable } from "./lut";

export async function requestFilter(
  collectionName: string,
  name: string
): Promise<ThreeDirectionLookUpTable> {
  const response = await fetch(`/filter/${collectionName}/${name}.cube`);
  const result = await response.text();
  return ThreeDirectionLookUpTable.fromString(result);
}
