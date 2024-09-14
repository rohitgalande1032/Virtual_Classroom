#!/usr/bin/env node

const opt = require('../ifopt');
const log = opt.log;

// Declaration of option which will be manage by ifopt :
const myOptions = {
    shortopt: "Dv",
    longopt: [
        "debug",
        "v",
        "vv",
        "vvv"
    ]
};

let parsedOption = opt.getopt(
    myOptions.shortopt,
    myOptions.longopt
);

// Create 3 Verbose level info message :
opt.createLogLevel(5, 'INFO N-1', 'fg.Info', 0);
opt.createLogLevel(6, 'INFO N-2', 'fg.Info', 0);
opt.createLogLevel(7, 'INFO N-3', 'fg.Info', 0);

// Set login level rule
opt.setLogLevel('INFO_N-1', false, [5]);
opt.setLogLevel('INFO_N-2', false, [6]);
opt.setLogLevel('INFO_N-3', false, [7]);

// Read options
if (opt.isOption(['v', 'vv', 'vvv'])) {
    opt.setLogLevel('INFO_N-1', true);
}
if (opt.isOption(['vv', 'vvv'])) {
    opt.setLogLevel('INFO_N-2', true);
}
if (opt.isOption(['vvv'])) {
    opt.setLogLevel('INFO_N-3', true);
}


log("Message always displayed", 3);
log("Message only displayed with option %s, %s, %s or %s", 5, ['-v', '--v', '--vv', '--vvv']);
log("Message only displayed with option %s or %s", 6, ['--vv', '--vvv']);
log("Message only displayed with option %s", 7, ['--vvv']);