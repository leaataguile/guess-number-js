var assert = require('assert');
var Game = require('../game');

describe('Set player as human', () => {
    describe('setPlayer()', () => {
        it('should set the player as human', () => {            
            let game = new Game();
            game.setPlayer('me');
            assert.equal(game.player, 'human');
        });
    });
});

describe('Set player as machine', () => {
    describe('setPlayer()', () => {
        it('should set the player as machine', () => {            
            let game = new Game();
            game.setPlayer('machine');
            assert.equal(game.player, 'machine');
        });
    });
});

describe('Set player as human', () => {
    describe('setPlayer()', () => {
        it('should set the player as human', () => {            
            let game = new Game();
            game.setPlayer('asdasda');
            assert.equal(game.player, undefined);
        });
    });
});

describe('Set the minimum value', () => {
    describe('humanEval()', () => {
        it('should set the minimum value if the number is greater', () => {            
            let game = new Game();
            game.randomNumber = 60;
            game.humanEval(50);
            assert.equal(game.minimum, 50);
        });
    });
});

describe('Set the maximum value', () => {
    describe('humanEval()', () => {
        it('should set the maximum value if the number is greater', () => {            
            let game = new Game();
            game.randomNumber = 30;
            game.humanEval(50);
            assert.equal(game.maximum, 50);
        });
    });
});