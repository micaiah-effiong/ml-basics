console.log("Hello");

export class Perceptron {
  totalInputs: number;
  learningRate: number;
  inputWeights: Array<number> = [];
  bias: number = 1;
  trainingTime: number = 0;

  constructor(numberOfInputes: number, learningRate: number = 0.1) {
    this.totalInputs = numberOfInputes;
    this.learningRate = learningRate;

    for (let i: number = 0; i < numberOfInputes + 1; i++) {
      this.inputWeights.push(Math.random() * (1 - 0 + 1) + 1);
    }
    console.log(this.inputWeights);
  }

  predict(inputs: Array<number>) {
    const sum: number = inputs.reduce(
      (prevInput: number, currentInput: number, index: number) => {
        return prevInput + currentInput * this.inputWeights[index];
      },
      0
    );

    return sum > 0 ? 1 : 0;
  }

  train(inputs: Array<number>, traget: number) {
    const inputesWithBias = [...inputs, this.bias];
    const predictedResult = this.predict(inputesWithBias);
    const errorCorrection = traget - predictedResult;

    if (errorCorrection !== 0) {
      this.inputWeights = this.inputWeights.map(
        (weight: number, weightIndex: number) => {
          return (
            weight +
            errorCorrection * inputesWithBias[weightIndex] * this.learningRate
          );
        }
      );

      // for (let i: number = 0; i < this.inputWeights.length; i++) {
      //   this.inputWeights[i] +=
      //     errorCorrection * inputesWithBias[i] * this.learningRate;
      // }

      this.trainingTime++;
    }
  }

  guessY(x: number) {
    const [w0, w1, w2] = this.inputWeights;
    return -w1 - (w0 / w1) * x;
  }
}
