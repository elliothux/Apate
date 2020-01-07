import { getWasmLib } from "./loader";

type Filter = ReturnType<typeof parseFilter>;

const filterMap: { [name: string]: Filter } = {};

async function requestFilter(
  collectionName: string,
  name: string
): Promise<string> {
  const response = await fetch(`/filter/${collectionName}/${name}.cube`);
  return response.text();
}

function parseFilter(str: string) {
  const lib = getWasmLib();
  return lib.ThreeDirectionLookUpTable.from_string(str);
}

export async function getFilter(
  collectionName: string,
  name: string
): Promise<Filter> {
  if (!filterMap[name]) {
    const str = await requestFilter(collectionName, name);
    filterMap[name] = parseFilter(str);
  }

  return filterMap[name];
}
