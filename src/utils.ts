export function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

export function drawLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string = "black"
) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.strokeStyle = "black";
}

export function drawPoint(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string = "black",
  radius: number = 2,
  text: string = ""
): void {
  ctx.beginPath();
  ctx.stroke();
  ctx.strokeStyle = "black";
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.strokeText(text, x, y);
}

export function lineFormular(x: number) {
  return -0.2 * x + 0; //
}
