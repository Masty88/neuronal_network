import Point from "./js/points";

//CREATE VISUAL POINTS
const point = new Point()
// point.createPoints();
//Neuronal networks
point.testGuess({x: Math.random() * (0 - 400) + 400, y:Math.random() * (0 - 400) + 400});
// point.testTrain();
// point.trainedWeights();
// console.log(point.trainedWeights())
