import { getWasmLib } from "../share";
import { ThreeDirectionLookUpTable } from "../../../pkg";

export type Filter = ReturnType<typeof parseFilter>;

const filterMap: Map<string, Filter> = new Map<string, Filter>();

async function requestFilter(
  collectionName: string,
  name: string
): Promise<ThreeDirectionLookUpTable> {
  const response = await fetch(`/filter/${collectionName}/${name}.cube`);
  const str = await response.text();
  return parseFilter(str);
}

function parseFilter(str: string): ThreeDirectionLookUpTable {
  const lib = getWasmLib();
  return lib.ThreeDirectionLookUpTable.from_string(str);
}

export async function getFilter(
  collectionName: string,
  name: string
): Promise<Filter> {
  const filter = filterMap.get(name);
  if (filter) {
    return filter;
  }

  const parsedFilter = await requestFilter(collectionName, name);
  filterMap.set(name, parsedFilter);
  return parsedFilter;
}
