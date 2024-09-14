#!/usr/bin/env node

// From 'node_modules'
const opt = require('../ifopt');

// Declaration of option which will be manage by ifopt :
const myOptions = {
    shortopt: "hd:o::i:",
    longopt: [
        "help",     // short is h (NOT  HAVE a value)
        "dir:" ,    // short is d (MUST HAVE a value)
        "input:",   // short is o (CAN  HAVE a value)
        "output::"  // short is o (CAN  HAVE a value)
    ]
}

// Parse command line arguments
let parsedOption = opt.getopt(
    myOptions.shortopt,
    myOptions.longopt
);

// Result of command : myCommand -d=test -o --unwantedoption
let files = opt.getOptsValues(['input', 'i']);

console.log(files);