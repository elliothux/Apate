import { getWasmLib } from "../share";

type Filter = ReturnType<typeof parseFilter>;

const filterMap: Map<string, Filter> = new Map<string, Filter>();

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
  const filter = filterMap.get(name);
  if (filter) {
    return filter;
  }

  const str = await requestFilter(collectionName, name);
  const parsedFilter = parseFilter(str);
  filterMap.set(name, parsedFilter);
  return parsedFilter;
}

const snapshotCanvas = new OffscreenCanvas(270, 112);

const snapshotCtx = snapshotCanvas.getContext("2d");

const filterSnapshotMap: Map<string, ImageData> = new Map<string, ImageData>();

