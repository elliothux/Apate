export interface HistogramData {
  data: [number[], number[], number[]];
  max: number;
}

// export function samplingImageData(
//   { width, height, data }: ImageData,
//   scale: number
// ): Uint8ClampedArray {
//
// }

export function generateHistogramData(
  imageData: Uint8ClampedArray,
  n: number
): HistogramData {
  let max = 1;
  const rs = new Array<number>(n).fill(0);
  const gs = new Array<number>(n).fill(0);
  const bs = new Array<number>(n).fill(0);

  for (let i = 0; i < imageData.length; i += 4) {
    const [r, g, b] = [
      imageData[i],
      imageData[i + 1],
      imageData[i + 2]
    ].map(i => normalizeU8(i, n));

    if (rs[r]) {
      rs[r] += 1;
      if (rs[r] > max) {
        max = rs[r];
      }
    } else {
      rs[r] = 1;
    }

    if (gs[g]) {
      gs[g] += 1;
      if (gs[g] > max) {
        max = gs[g];
      }
    } else {
      gs[g] = 1;
    }

    if (bs[b]) {
      bs[b] += 1;
      if (bs[b] > max) {
        max = bs[b];
      }
    } else {
      bs[b] = 1;
    }
  }

  return { data: [rs, gs, bs], max } as HistogramData;
}

function normalizeU8(value: number, n: number): number {
  if (n === 255) {
    return value;
  }

  return Math.round((value * n) / 255);
}

export function drawRGBHistogram(
  { data, max }: HistogramData,
  ctx: OffscreenCanvasRenderingContext2D,
  graphWidth: number,
  graphHeight: number,
  expand: boolean
) {
  const colors = [
    "rgba(255,0,0,0.45)",
    "rgba(0,255,0,0.45)",
    "rgba(0,0,255,0.45)"
  ];
  const borderColors = ["#ff0000", "#00ff00", "#0000ff"];

  data.forEach((histogramData, histogramIndex) => {
    ctx.fillStyle = colors[histogramIndex];
    ctx.strokeStyle = borderColors[histogramIndex];
    ctx.beginPath();
    ctx.moveTo(0, expand ? graphHeight * (histogramIndex + 1) : graphHeight);

    histogramData.forEach((i, index) => {
      const drawHeight = Math.round((i / max) * graphHeight);
      const drawX = index + 1;
      ctx.lineTo(
        drawX,
        graphHeight * (expand ? histogramIndex + 1 : 1) - drawHeight + 1
      );
    });

    ctx.lineTo(
      graphWidth,
      expand ? graphHeight * (histogramIndex + 1) : graphHeight
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });
}
