import gameModule from './game.js';
import sw from './sw.js';

let {game} = gameModule;

exports.system = Object.freeze({
    game,
    sw
});
