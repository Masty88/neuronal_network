import * as R from 'ramda'

class Point{
    constructor() {
        this.rand=(high,low)=> Math.random() * (high - low) + low;

        this.X_MAX=400;
        this.Y_MAX= 400;

        this.correctTeam= point => point.x > point.y ? 1 : -1;

        //BRAIN STATE
        this.randomWeights={
         x: this.rand(-1,1),
         y: this.rand(-1,1),
        }

        //AFTER TRAINING THIS THE RESULT
        this.correctWeights = {
            x: 1996.9430443894737,
            y: -1997.1575200194586
        }
    }

    generateRandomPoints(num){
        const randomPoints = R.range(0,num).map(_=> ({
            x: this.rand(0,this.X_MAX),
            y: this.rand(0,this.Y_MAX)
        }));
        return randomPoints;
    }

    // createPoints(){
    //
    //
    //    //  document.body.innerHTML =`<svg width="${this.X_MAX}" height="${this.Y_MAX}">
    //    //   ${this.generateRandomPoints(200).map(point=>
    //    //      `<circle
    //    //       cx="${point.x}"
    //    //       cy="${point.y}"
    //    //       r="3"
    //    //       fill="${this.guess(this.trainedWeights(), point) === -1 ? 'blue' : 'red'}"
    //    //       />`
    //    //  )}
    //    // <line x1="0" x2="${this.X_MAX}" y1="0" y2="${this.Y_MAX}" stroke="purple" />
    //    // </svg>`}

    guess(weights, input){
      this.sum = input.x * weights.x + input.y * weights.y;
      this.team = this.sum >=0 ? 1 : -1;
      return this.team
    }

    train(weights, input, team){
        this.guessResult = this.guess(weights, input);
        // console.log("team", team)
        const error = team + (-this.guessResult);
        // console.log("error", error);
        // console.log("predicted", this.guessResult)
        const learningRate = 0.2;
        return{
            x: weights.x + (input.x * error * learningRate),
            y: weights.y + (input.y * error * learningRate )
        }
    }

    testTrain(){
        const point = {x:200,y:400}
        //Team is our actual correct team
        return  this.train(this.randomWeights, point,this.correctTeam(point));
    }

    trainedWeights () {
        const exemples = this.generateRandomPoints(100000).map(point =>({
         point,
         team: this.correctTeam(point)
        }))
        // const exemple1= {x: 721, y: 432};
        // const exemple2= {x: 211, y: 122};
        // const exemple3= {x: 328, y: 833};
        // const exemple4= {x: 900, y: 400};
        // const exemple5= {x: 1, y: 700};
        let currentWeights = this.randomWeights;

        for(const exemple of exemples){
            currentWeights= this.train(currentWeights, exemple.point, exemple.team)
        }

        // trainedWeights = this.train(this.randomWeights, exemple1, this.correctTeam(exemple1));
        // trainedWeights = this.train(trainedWeights, exemple2, this.correctTeam(exemple2));
        // trainedWeights = this.train(trainedWeights, exemple3, this.correctTeam(exemple3));
        // trainedWeights = this.train(trainedWeights, exemple4, this.correctTeam(exemple4));
        // trainedWeights = this.train(trainedWeights, exemple5, this.correctTeam(exemple5));

        return currentWeights
    }


    testGuess(input){
     // this.guess(this.correctWeights, input);
        document.body.innerHTML =`<svg width="${this.X_MAX}" height="${this.Y_MAX}">
        <circle
        cx="${input.x}"
        cy="${input.y}"
        r="3"
        fill="${this.guess(this.correctWeights, input) === -1 ? 'blue' : 'red'}" />
        <line x1="0" x2="${this.X_MAX}" y1="0" y2="${this.Y_MAX}" stroke="purple" />
       </svg>`
    }
}

export default  Point;
