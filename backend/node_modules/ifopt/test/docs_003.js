#!/usr/bin/env node

// From 'node_modules'
const opt = require('../ifopt');

// Set Short Options
opt.setOpts(
    // Short Ones
    "hd:o::",
    // Long Ones
    [
        "help",     // short is h (NOT  HAVE a value)
        "dir:" ,    // short is d (MUST HAVE a value)
        "output::"  // short is o (CAN  HAVE a value)
    ]
);

let parsedOption = opt.getopt();

// Result of command : myCommand -d=test -o --unwantedoption
console.log(parsedOption);