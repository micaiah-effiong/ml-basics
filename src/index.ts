import { Perceptron } from "./p";
import {
  getRandomIntInclusive,
  drawLine,
  drawPoint,
  lineFormular,
} from "./utils";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
if (!canvas) throw new Error("Could not get canvas");
const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

if (!ctx) throw new Error("Could not get ctx");

const width: number = 1000;
const height: number = 800;
const size = 5000 / 10;
canvas.width = width;
canvas.height = height;

ctx.translate(width / 2, height / 2);
// ctx.rotate(300);
interface Point {
  x: number;
  y: number;
}
drawPoint(ctx, 0, -100, "red");
drawPoint(ctx, -100, 0, "purple");

class Point implements Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
const points: Point[] = [];

const lineX1 = -width;
const lineX2 = width;
const lineY1 = lineFormular(lineX1);
const lineY2 = lineFormular(lineX2);

console.log(`x1,y1 ${lineX1},${lineY1} => x2,y2 ${lineX2},${lineY2}`);
console.log("test perceptron", new Perceptron(2).predict([0, 1]));

for (let i = 0; i < size; i++) {
  const pointX = getRandomIntInclusive(-width / 2, width / 2);
  const pointY = getRandomIntInclusive(-height / 2, height / 2);
  const point: Point = new Point(pointX, pointY);
  points.push(point);
  // console.log("lineFormular", lineFormular(pointX));

  renderPointsOnScreen(ctx, points);
}

function renderPointsOnScreen(
  ctx: CanvasRenderingContext2D,
  points: Array<Point>
) {
  points.map((point: Point, index: number) => {
    let color: "black" | "blue" | "red";
    if (lineFormular(point.x) >= point.y) {
      color = "black";
    } else {
      color = "blue";
    }

    if (index === 0) color = "red";

    drawPoint(ctx, point.x, point.y, color, 7 /* dir + i */);
  });
}

const brain = new Perceptron(2, 0.000001);

const correctValues: Array<number> = points.map((point: Point) => {
  const predicted = lineFormular(point.x);
  return predicted > point.y ? 1 : 0;
});
function run(ctx: CanvasRenderingContext2D) {
  points.map((point: Point, index: number) => {
    const predicted = brain.predict([point.x, point.y]);

    let color: "green" | "red";
    if (predicted === correctValues[index]) {
      color = "green";
    } else {
      color = "red";
    }
    console.log(
      "pre",
      predicted,
      "correct",
      correctValues[index],
      color,
      predicted === correctValues[index]
    );
    drawPoint(ctx, point.x, point.y, "transparent");
    ctx.fillStyle = color;
    ctx.fill();
  });
}

function train() {
  points.map((point: Point, index: number) => {
    brain.train([point.x, point.y], correctValues[index]);
  });
}

// console.log({ correctValues });

let xx = 0;
let yy = 30;
function main() {
  const _ctx = ctx as CanvasRenderingContext2D;
  train();
  // points.map((point: Point) => {
  //   drawPoint(_ctx, point.x, point.y, "transparent");
  //   _ctx.fillStyle = "blue";
  //   _ctx.fill();
  // });

  _ctx.clearRect(-width / 2, -height / 2, width, height);
  drawLine(_ctx, lineX1, lineFormular(lineX1), lineX2, lineFormular(lineX2)); //slope line
  _ctx.lineWidth = 3;
  drawLine(
    _ctx,
    lineX1,
    brain.guessY(lineX1),
    lineX2,
    brain.guessY(lineX2),
    "pink"
  ); //slope line
  _ctx.lineWidth = 1;

  console.log(
    "lineFormular(lineX1)",
    lineFormular(lineX1),
    brain.guessY(lineX1)
  );

  // plane
  drawLine(_ctx, 0, -height / 2, 0, height / 2);
  drawLine(_ctx, lineX1, 0, lineX2, 0);

  //
  renderPointsOnScreen(_ctx, points);

  drawPoint(_ctx, xx, yy, "red");
  xx += 0.1;
  yy += 0.1;
  // points[0].x += 0.1;
  // points[0].y += 0.1;

  run(_ctx as CanvasRenderingContext2D);
  // console.log("hit");

  requestAnimationFrame(main);
}

requestAnimationFrame(main);
