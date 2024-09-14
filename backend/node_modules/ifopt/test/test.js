#!/usr/bin/env node
const cdir = function (el) {
    console.dir(el, {depth: null})
};
const clog = console.log;

// From 'node_modules'
const opt = require('../ifopt');
opt.selfDebug = true;

// "Restore" Color Instruction :
let string = `I want to put the ${opt.colors.fg.Magenta}keyword${opt.colors.Restore} and ${opt.colors.fg.Magenta}keyword2${opt.colors.Restore} is another color`;

// Use as message
opt.log(string, 0, []);

// Use as keyword
opt.log('My sentense is %s containing keyword', 0, [string])


// Get Option - Method 1
let IMPLICITS = {
    INPUT: null,
    OUTPUT: null
};
let OPTS = opt.getopt(
    // Short Options
    "vdi::o::",
    // Long Options
    [
        "verbose",
        "debug",
        "input::",
        "output::"
    ],
    // Implicits
    [
        "INPUT",
        "OUTPUT"
    ],
    // Implicits Handler
    IMPLICITS
);
/*
 ./test.js
 ./test.js file_in
 ./test.js file_in file_out
 ./test.js file_in file_out -i
 ./test.js file_in file_out -i=file_in
 ./test.js file_in file_out -i=file_in -o
 ./test.js file_in file_out -i=file_in -o=file_out
 ./test.js file_in file_out -i=file_in -o=file_out -v
 ./test.js file_in file_out -i=file_in -o=file_out -v -d
 ./test.js file_in file_out -i=file_in -o=file_out --verbose -d
 ./test.js file_in file_out -i=file_in -o=file_out --verbose --debug
 */

console.log(OPTS, IMPLICITS);

// Get Option values using Short and Long
let input1 = opt.getOptValue('i');
let input2 = opt.getOptValue(["input", "i"]);

console.log(input1);
console.log(input2);

let log = opt.log;

log("The following error %s must be in color", 1, ['colorize=true']);
opt.noColor();
log("The following error %s must not be in color", 1, ['colorize=false']);
opt.useColor();
log("The following error %s must be in color", 1, ['colorize=true']);
opt.useColor(false);
log("The following error %s must not be in color", 1, ['colorize=false']);
opt.useColor(true);
log("The following error %s must be in color", 1, ['colorize=true']);


/**
 * test addition v1.5.0
 * - Introducing smart login for :
 *     DEBUG
 *     VERBOSE
 */
// Core Test
console.log("\nAddition v1.5.0 :");
console.log("-------------------");
console.log("-> Core Test");
opt.setLogLevel(1);      // groupName not string

opt.setLogLevel("TEST", true);   // always boolean
opt.setLogLevel("TEST", false);  // always boolean
opt.setLogLevel("TEST", 1);      // always boolean
opt.setLogLevel("TEST", 0);      // always boolean
opt.setLogLevel("TEST", 'test'); // always boolean
opt.setLogLevel("TEST", []);     // always boolean

opt.setLogLevel("TEST", true, 1);     // always boolean
opt.setLogLevel("TEST", true, [1,2]);     // always boolean

// Default Behavior
opt.selfDebug = false;
console.log("\n-> Defaut Behavior, expected S/E/W/I/D");
log("Message with level 0 (SUCCESS)", 0, []);
log("Message with level 1 (ERROR)", 1, []);
log("Message with level 2 (WARNING)", 2, []);
log("Message with level 3 (INFO)", 3, []);
log("Message with level 4 (DEBUG)", 4, []);

// Configured Behavior
console.log("\n-> Configured Behavior, expected S/E/W");
opt.setLogLevel('VERBOSE', false, [3]);
opt.setLogLevel('DEBUG', false, [4]);
log("Message with level 0 (SUCCESS)", 0, []);
log("Message with level 1 (ERROR)", 1, []);
log("Message with level 2 (WARNING)", 2, []);
log("Message with level 3 (INFO)", 3, []);
log("Message with level 4 (DEBUG)", 4, []);

// Enable / Disable Behavior
console.log("\n-> Defaut Behavior, expected S/E/W/I/D");
opt.setLogLevel('VERBOSE', true); // Do not overwrite levels if previously set
opt.setLogLevel('DEBUG', true);   // Do not overwrite levels if previously set
log("Message with level 0 (SUCCESS)", 0, []);
log("Message with level 1 (ERROR)", 1, []);
log("Message with level 2 (WARNING)", 2, []);
log("Message with level 3 (INFO)", 3, []);
log("Message with level 4 (DEBUG)", 4, []);


/**
 * test addtions v1.6.0
 * - Creation of own log levels
 */
opt.setColor('fg.Verbose', '\x1b[35m');
opt.createLogLevel(5, 'VERBOSE_2', 'fg.Verbose', 0);
log("Super Verbose message in %s", 5, ['magenta']);
// switching off Verbose_2
opt.setLogLevel('VERBOSE_2', false, [5]);
log("Super Verbose message in %s switch off", 5, ['magenta']);
// switching on Verbose_2
opt.setLogLevel('VERBOSE_2', true);
log("Super Verbose message in %s switch on", 5, ['magenta']);



