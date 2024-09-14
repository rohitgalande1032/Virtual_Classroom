#!/usr/bin/env node

// From 'node_modules'
const opt = require('../ifopt');

// Declaration of option which will be manage by ifopt :
const myOptions = {
    shortopt: "hd:o::i:",
    longopt: [
        "help",     // short is h (NOT  HAVE a value)
        "dir:" ,    // short is d (MUST HAVE a value)
        "input:" ,  // short is d (MUST HAVE a value)
        "output::"  // short is o (CAN  HAVE a value)
    ]
}

let implicitsHandler = {
    implicitOneForInput : null,
    implicitTwoForOutput: null
}

// Parse command line arguments
let parsedOption = opt.getopt(
    myOptions.shortopt,                                         // Short Options
    myOptions.longopt,                                             // Long  Options
    ['implicitOneForInput', 'implicitTwoForOutput'],    // Implicits Order for Handler
    implicitsHandler                                            // Implicits Handler to get Data by Ref
);

// Result of command : myCommand myInputFile myOutputFile --dir=test
console.log(parsedOption);
console.log(implicitsHandler);