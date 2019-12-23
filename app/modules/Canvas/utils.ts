interface SizeAndPositionInfo {
  width: number;
  height: number;
  left: number;
  top: number;
}

export function getCanvasSizeAndPosition(
  maxW: number,
  maxH: number,
  w: number,
  h: number
): SizeAndPositionInfo {
  const info: SizeAndPositionInfo = {
    width: 0,
    height: 0,
    left: 0,
    top: 0
  };
  if (w / h > maxW / maxH) {
    info.width = maxW;
    info.height = h * (maxW / w);
    info.top = (maxH - info.height) * 0.5;
  } else {
    info.height = maxH;
    info.width = w * (maxH / h);
    info.left = (maxW - info.width) * 0.5;
  }
  return info;
}
