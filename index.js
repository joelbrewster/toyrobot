/*jshint esversion: 6 */

const Pacman = require('./pacman.js');
let pacman = new Pacman();

let x;
let y;
let f;

const introText = `\x1b[2mExamples:

Input:\x1b[1m\x1b[0m
PLACE 0,0,NORTH
MOVE
REPORT\x1b[2m
Output: 0,1,NORTH

Input:\x1b[1m\x1b[0m
PLACE 0,0,NORTH
LEFT
REPORT\x1b[2m
Output: 0,0,WEST

Input:\x1b[1m\x1b[0m
PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT\x1b[2m
Output: 3,3,NORTH\x1b[0m
`;

const infoText = `\x1b[36m\
Valid commands are:
\x1b[32m
PLACE X,Y,F
MOVE
LEFT
RIGHT
REPORT\x1b[0m
`;

const invalidMessage = `\x1b[31m
···ᗣ·······ᗧ······•··········ᗣ···
· Please input a valid command. ·
······ᗣ····•·······ᗤ·············
\x1b[0m
`;

// Return value from interactive console
// https://stackoverflow.com/questions/8128578/reading-value-from-console-interactively
let stdin = process.openStdin();

// Remove existing text and render just pacman info
process.stdout.write('\033c');
console.log(infoText);
console.log(introText);

stdin.addListener('data', d => {
    'use strict';
    // note: d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that
    // with toString() and then trim()
    let input = d.toString().trim();
    handleInput(input);
});

let handleInput = (input) => {
    'use strict';
    // Get input values split (for PLACE)
    let splitInput = input.split(' ');

    // Get PLACE in own var
    input = splitInput[0];

    // GET input params
    let inputParams = splitInput[1];

    // Get input params into own var
    if (inputParams) {

        // Put params into array
        let paramsArray = [];
        paramsArray = inputParams.split(',');
        x = paramsArray[0];
        y = paramsArray[1];
        f = paramsArray[2];
    }

    switch (input) {
        case 'PLACE':
            pacman.place(x, y, f);
            break;

        case 'MOVE':
            pacman.move(x, y, f);
            break;

        case 'LEFT':
            pacman.left(f);
            break;

        case 'RIGHT':
            pacman.right(f);
            break;

        case 'REPORT':
            pacman.report(x, y, f);
            break;

        default:
            console.log(invalidMessage);
            console.log(infoText);
            break;
    }
};