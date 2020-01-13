import { getWasmLib } from "../share";
import { ThreeDirectionLookUpTable } from "../../../pkg";
import { Maybe } from "../../types";

export type Filter = ReturnType<typeof parseFilter>;

const filterMap: Map<string, Filter> = new Map<string, Filter>();

async function requestFilter(
  collectionName: string,
  name: string
): Promise<string> {
  const response = await fetch(`/filter/${collectionName}/${name}.cube`);
  return response.text();
}

function parseFilter(str: string): ThreeDirectionLookUpTable {
  const lib = getWasmLib();
  return lib.ThreeDirectionLookUpTable.from_string(str);
}

export async function getFilter(
  collectionName: string,
  name: string
): Promise<[Filter, Maybe<string>]> {
  const filter = filterMap.get(name);
  if (filter) {
    return [filter, null];
  }

  const str = await requestFilter(collectionName, name);
  const parsedFilter = parseFilter(str);
  filterMap.set(name, parsedFilter);
  return [parsedFilter, str];
}

export async function getFilterFromString(
  name: string,
  str: string
): Promise<Filter> {
  const parsedFilter = parseFilter(str);
  filterMap.set(name, parsedFilter);
  return parsedFilter;
}
