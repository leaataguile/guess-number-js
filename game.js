'use strict';
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Game {

    constructor(
        randomNumber,
        answer,
        minimum,
        maximum,
        player,
        tries,
    ) {
        this.randomNumber = randomNumber;
        this.answer = answer;
        this.minimum = minimum;
        this.maximum = maximum;
        this.player = player;
        this.tries = tries;
    }

    play() {
        console.log("Let's play!");
        this.tries = 0;
        this.maximum = 100;
        this.minimum = 0;
        this.randomNumber = this.generateNumber();
        this.choosePlayer();
    }

    choosePlayer() {
        rl.question(`Type 'me' if you want to play, or 'machine' to let the machine guess your number: `, (answer) => {
            this.setPlayer(answer);
        });
    }

    setPlayer(player) {
        switch (player.toLowerCase()) {
            case 'me':
                this.player = 'human';
                this.humanGuess();
                break;
            case 'machine':
                this.player = 'machine';
                this.machineGuess();
                break;
            default:
                console.log(`Please, type 'me' or 'machine' c:`);
                this.choosePlayer();
                break;
        }
    }

    generateNumber() {
        return Math.floor(Math.random() * (this.maximum - this.minimum + 1)) + this.minimum;
    }

    humanGuess() {
        rl.question(`Input a number between ${this.minimum} and ${this.maximum}: `, (answer) => {
            if (answer > this.maximum || answer < this.minimum) {
                console.log(`Value out of range.`);
                this.humanGuess();
            } else if (isNaN(answer)) {
                console.log('Input a valid number.');
                this.humanGuess();
            } else {
                this.humanEval(answer);
            }
        });
    }

    humanEval(answer) {
        if (this.randomNumber == answer) {
            console.log('Eureka!');
            this.playAgain();
        } else if (this.randomNumber > answer) {
            console.log(`The number is greater than ${answer}`);
            this.tries += 1;
            this.minimum = answer
            this.humanGuess();
        } else if (this.randomNumber < answer) {
            console.log(`The number is smaller than ${answer}`);
            this.tries += 1;
            this.maximum = answer
            this.humanGuess();
        }
    }

    machineGuess(error) {
        !error ? this.answer = this.generateNumber(this.minimum, this.maximum) : this.answer = this.answer;
        console.log(`Is ${this.answer} your number?`);
        rl.question(`Type '+' if the number is higher, '-' if it's lower or '=' if the number is correct: `, (answer) => {
            switch (answer.toLowerCase()) {
                case '+':
                    this.tries += 1;
                    this.minimum = this.answer
                    this.machineGuess();
                    break;
                case '-':
                    this.tries += 1;
                    this.maximum = this.answer
                    this.machineGuess();
                    break;
                case '=':
                    if (this.tries < 5) {
                        console.log('That was easy!');
                        this.playAgain();
                    }
                    else {
                        console.log(`Hope you didn't cheat ... :p`);
                        this.playAgain();
                    }
                    break;
                default:
                    console.log(`Please, type '+', '-', or '=' c:`);
                    this.machineGuess(true);
                    break;
            }
        });
    }

    playAgain() {
        rl.question('Do you want to play again? Y/N: ', (answer) => {
            if (answer.toUpperCase() === 'Y') {
                this.play();
            } else if (answer.toUpperCase() === 'N') {
                process.exit();
            } else {
                console.log(`Type 'Y' to play again or 'N' to exit`);
                this.playAgain();
            }
        })
    }

}

module.exports = Game;
