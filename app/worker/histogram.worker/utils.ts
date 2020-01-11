import { getWasmLib } from "../share";

export interface HistogramData {
  rs: Uint32Array;
  gs: Uint32Array;
  bs: Uint32Array;
  max: number;
  width: number;
  height: number;
}

const [samplingWidth, samplingHeight] = [300, 300];
const samplingSize = 4 * samplingWidth * samplingHeight;

export function generateHistogramData(
  imageData: Uint8ClampedArray,
  width: number,
  height: number
): HistogramData {
  let targetWidth = width;
  let targetHeight = height;
  if (imageData.length > samplingSize) {
    const scale = samplingSize / imageData.length;
    targetWidth = Math.round(width * scale);
    targetHeight = Math.round(height * scale);
  }

  const lib = getWasmLib();
  const result = lib.generate_histogram_data(imageData as any, width, height, targetWidth, targetHeight);
  const indexes = [1, width + 1, width * 2 + 1, width * 3 + 1];
  const rs = result.subarray(indexes[0], indexes[1]);
  const gs = result.subarray(indexes[1], indexes[2]);
  const bs = result.subarray(indexes[2], indexes[3]);
  return {
    rs,
    gs,
    bs,
    max: result[0],
    width,
    height
  } as HistogramData;
}

export function drawRGBHistogram(
  ctx: OffscreenCanvasRenderingContext2D,
  expand: boolean,
  { rs, gs, bs, max, width, height }: HistogramData
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
      const drawHeight = Math.round((i / max) * height);
      const drawX = index + 1;
      ctx.lineTo(
        drawX,
        height * (expand ? histogramIndex + 1 : 1) - drawHeight + 1
      );
    });

    ctx.lineTo(width, expand ? height * (histogramIndex + 1) : height);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });
}
