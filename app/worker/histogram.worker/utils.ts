import { getWasmLib } from "../share";

export interface HistogramData {
  rs: Uint32Array;
  gs: Uint32Array;
  bs: Uint32Array;
  width: number;
  height: number;
}

const [samplingWidth, samplingHeight] = [300, 300];
const samplingSize = 4 * samplingWidth * samplingHeight;

export function generateHistogramData(
  imageData: Uint8ClampedArray,
  imageWidth: number,
  imageHeight: number,
  histogramWidth: number,
  histogramHeight: number
): HistogramData {
  let targetWidth = histogramWidth;
  let targetHeight = histogramHeight;
  if (imageData.length > samplingSize) {
    const scale = samplingSize / imageData.length;
    targetWidth = Math.round(histogramWidth * scale);
    targetHeight = Math.round(histogramHeight * scale);
  }

  const lib = getWasmLib();
  const result = lib.generate_histogram_data(
    imageData as any,
    histogramWidth,
    histogramHeight,
    imageWidth,
    imageHeight,
    targetWidth,
    targetHeight
  );
  const indexes = [0, histogramWidth, histogramWidth * 2, histogramWidth * 3];
  const rs = result.subarray(indexes[0], indexes[1]);
  const gs = result.subarray(indexes[1], indexes[2]);
  const bs = result.subarray(indexes[2], indexes[3]);
  return {
    rs,
    gs,
    bs,
    width: histogramWidth,
    height: histogramHeight
  } as HistogramData;
}

export function drawRGBHistogram(
  ctx: OffscreenCanvasRenderingContext2D,
  expand: boolean,
  { rs, gs, bs, width, height }: HistogramData
) {
  const colors = [
    "rgba(255,0,0,0.45)",
    "rgba(0,255,0,0.45)",
    "rgba(0,0,255,0.45)"
  ];
  const borderColors = ["#ff0000", "#00ff00", "#0000ff"];

  [rs, gs, bs].forEach((histogramData, histogramIndex) => {
    ctx.fillStyle = colors[histogramIndex];
    ctx.strokeStyle = borderColors[histogramIndex];
    ctx.beginPath();
    ctx.moveTo(0, expand ? height * (histogramIndex + 1) : height);

    histogramData.forEach((i, index) => {
      const drawX = index + 1;
      const drawY = expand ? height * (histogramIndex + 1) - i : height - i;
      ctx.lineTo(drawX, drawY);
      console.log("x, y: ", drawX, drawY);
    });

    const endX = width;
    const endY = expand ? height * (histogramIndex + 1) : height;
    console.log(endX, endY);
    ctx.lineTo(endX, endY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });
}
