import { getWasmLib } from "../share";

export function createBitmapImage(
  width: number,
  height: number,
  data: Uint8ClampedArray
) {
  const lib = getWasmLib();
  return lib.Image.from(width, height, data as any);
}

export function cropCenterImageDataWithResampling(
  imageData: ImageData,
  width: number,
  height: number
): Uint8ClampedArray {
  const { width: originalWidth, height: originalHeight } = imageData;
  const lib = getWasmLib();

  let result: Uint8ClampedArray;
  let targetWidth: number;
  let targetHeight: number;

  if (width / height > originalWidth / originalHeight) {
    targetWidth = originalWidth;
    targetHeight = Math.round((height * targetWidth) / width);

    const startRow = Math.round((originalHeight - targetHeight) / 2);
    result = getRows(imageData, startRow, startRow + targetHeight);
  } else {
    targetHeight = originalHeight;
    targetWidth = Math.round((width * targetHeight) / height);

    const startColumn = Math.round((originalWidth - targetWidth) / 2);
    result = getColumns(imageData, startColumn, startColumn + targetWidth);
  }

  return Uint8ClampedArray.from(
    lib.resampling_image_data(
      result as any,
      targetWidth,
      targetHeight,
      width,
      height
    )
  );
}

export function getRows(
  { width, height, data }: ImageData,
  start: number,
  end: number
): Uint8ClampedArray {
  const startIndex = start * width * 4;
  const endIndex = end * width * 4;
  return data.slice(startIndex, endIndex);
}

export function getColumns(
  { width, height, data }: ImageData,
  start: number,
  end: number
): Uint8ClampedArray {
  const length = width * 4 * height;
  let result: number[] = [length];
  let index = 0;

  for (let i = 0; i < width; i++) {
    const startIndex = i * width * 4 + start * 4;
    const endIndex = i * width * 4 + end * 4;
    const row = data.slice(startIndex, endIndex);
    row.forEach(i => (result[index++] = i));
  }

  return Uint8ClampedArray.from(result);
}
