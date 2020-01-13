import localforage from "localforage";

function getFilterKey(name: string) {
  return `imp_filter_${name}`;
}

export function saveFilter(name: string, str: string) {
  return localforage.setItem(getFilterKey(name), str);
}

export function getFilterString(name: string): Promise<string> {
  return localforage.getItem(getFilterKey(name));
}
