require('nativejs-proto-extensions');

let ifopt = {

    // @TODO: Make arg validation of functions

    /**
     * @var {Boolean} colorize   Indicating to not use color in log ouputs.
     */
    colorize: true,

    /**
     * @var {Object} colors   Default Color of ifopt.
     */
    colors: {
        Restore: "[xlb]",
        Reset: "\x1b[0m",
        Bright: "\x1b[1m",
        Dim: "\x1b[2m",
        Underscore: "\x1b[4m",
        Blink: "\x1b[5m",
        Reverse: "\x1b[7m",
        Hidden: "\x1b[8m",
        fg: {
            Black: "\x1b[30m",
            Red: "\x1b[31m",
            Green: "\x1b[32m",
            Yellow: "\x1b[33m",
            Blue: "\x1b[34m",
            Magenta: "\x1b[35m",
            Cyan: "\x1b[36m",
            White: "\x1b[37m",
            Crimson: "\x1b[38m",
            Success: "\x1b[32m",
            Error: "\x1b[31m",
            Info: "\x1b[36m",
            Warning: "\x1b[33m",
            Debug: "\x1b[38;5;208m"
        },
        bg: {
            Black: "\x1b[40m",
            Red: "\x1b[41m",
            Green: "\x1b[42m",
            Yellow: "\x1b[43m",
            Blue: "\x1b[44m",
            Magenta: "\x1b[45m",
            Cyan: "\x1b[46m",
            White: "\x1b[47m",
            Crimson: "\x1b[48m",
            Success: "\x1b[42m",
            Error: "\x1b[41m",
            Info: "\x1b[46m",
            Warning: "\x1b[43m",
            Debug: "\x1b[38;5;208m"
        }
    },

    /**
     * @var {String} separator   Default separator for arguments.
     */
    separator: ",",

    /**
     * @var {String} shortopt   Memorized short options.
     */
    shortopt: "",

    /**
     * @var {Array} longopt   Memorized list of long options.
     */
    longopt: [],

    /**
     * @var {Array} implicits   Memorized list of property name of implicit
     *                          arguments.
     */
    implicits: [],

    /**
     * @var {Object} implicitRefs   Memorized of object reference to bridge
     *                              value of implicit arguments.
     */
    implicitRefs: null,

    /**
     * @var {Object} levels   Logging levels
     */
    levels: {

    },

    /**
     * @var {Object} smartLogging   Log level rule to manage display.
     */
    smartLogging: {

    },

    /**
     * @var {boolean} selfDebug   To display debug message of ifopt.
     */
    selfDebug: false,

    /**
     * Set options to parse without parsing them.
     *
     * @param {String} sopt          Short Options
     * @param {Array}  lopt          Long Options
     * @param {Array}  implicitNames (Optional) Name of property as implicit
     *                               argument
     * @param {Object} implicitRefs  (Optional) Object reference to brigde with
     *                               caller
     *
     * @return {boolean}
     */
    setOpts: function (
        sopt,
        lopt,
        implicitNames = [],
        implicitRefs = {}
    ) {
        ifopt.setShortOpt(sopt);
        ifopt.setLongOpt(lopt);
        ifopt.setImplicitOpt(implicitNames, implicitRefs);

        return true;
    },

    /**
     * Set the short options for the instance.
     *
     * @param {String} sopt  Provided short options string.
     *
     * @return {boolean}
     */
    setShortOpt: function (sopt) {
        ifopt.shortopt = sopt;

        return true;
    },

    /**
     * Set the long options for the instance.
     *
     * @param {Array} lopt   Provided long options list.
     *
     * @return {boolean}
     */
    setLongOpt: function (lopt) {
        ifopt.longopt = lopt;

        return true;
    },

    /**
     * Set the implicit argument of the program (name and ref object).
     *
     * @param {Array} implicitNames   Name of properties of ref object.
     * @param {Object} implicitRefs   Object Reference.
     *
     * @return {boolean}
     */
    setImplicitOpt: function (implicitNames, implicitRefs) {
        ifopt.implicits = implicitNames;
        ifopt.implicitRefs = implicitRefs;

        return true;
    },

    /**
     * Set the separator to split an option.
     *
     * @param {String} sep  The separator char.
     *
     * @return {boolean}
     */
    setSeparator: function (sep) {
        ifopt.separator = sep;

        return true;
    },

    /**
     * Get the current color object configuration.
     *
     * @return {Object|{fg: {Red: string, Cyan: string, White: string, Yellow: string, Blue: string, Magenta: string, Black: string, Crimson: string, Green: string}, Reverse: string, bg: {Red: string, Cyan: string, White: string, Yellow: string, Blue: string, Magenta: string, Black: string, Crimson: string, Green: string}, Blink: string, Dim: string, Hidden: string, Underscore: string, Reset: string, Bright: string}}
     */
    getColors: function () {
        return ifopt.colors;
    },

    /**
     * Return the color string for specified path
     *
     * @param colorPty   Path of the color in property ifopt.colors.
     *
     * @return {*}
     */
    getColor: function (colorPty) {
        return ifopt.colors.getValueForPath(colorPty);
    },

    /**
     * Set the new object colors configuration.
     * Use getColors first, perform modification and update with this method.
     *
     * @param {Object|{fg: {Red: string, Cyan: string, White: string, Yellow: string, Blue: string, Magenta: string, Black: string, Crimson: string, Green: string}, Reverse: string, bg: {Red: string, Cyan: string, White: string, Yellow: string, Blue: string, Magenta: string, Black: string, Crimson: string, Green: string}, Blink: string, Dim: string, Hidden: string, Underscore: string, Reset: string, Bright: string}} colors
     */
    setColors: function (colors) {
        ifopt.colors = colors;
    },

    /**
     * Set/Update a color specifying its property path
     *
     * @param {String} colorPty  The object property path (fg.Yellow)
     * @param {String} color     Bash Color Instruction
     *
     * @return {boolean}
     */
    setColor: function (colorPty, color) {
        let newColor = ifopt.colors;
        let newColorRef = newColor;

        colorPty = colorPty.split(".");

        for (let i = 0; i < colorPty.length; i++) {
            let pty = colorPty[i];

            if (i === (colorPty.length - 1)) {
                newColorRef[pty] = color;
            } else{
                if (!newColorRef[pty]) {
                    newColorRef[pty] = {};
                }
                newColorRef = newColorRef[pty];
            }
        }

        Object.assign(ifopt.colors, newColor);

        return true;
    },

    /**
     * Neutralize colors controls to blank.
     * If called without parameter, the defined colors for ifopt
     * instance are neutralize. You can passe your colors object definition
     * (copy from ifopt one using getColors()).
     *
     * @param {Object} colors   Colors object definition (optional)
     *
     * @return {*}
     */
    removeColor: function (colors = ifopt.colors) {
        let removed = Object.assign({}, colors);

        for (let pty in removed) {
            if (removed.hasOwnProperty(pty)) {
                if (typeof removed[pty] === 'string') {
                    removed[pty] = '';
                }
                if (removed[pty] instanceof Object) {
                    removed[pty] = ifopt.removeColor(removed[pty]);
                }
            }
        }

        return removed;
    },

    /**
     * Set log message will not use colors.
     *
     * @return {boolean}
     */
    noColor: function () {
        ifopt.colorize = false;
        return true;
    },

    /**
     * Set if log message use colors.
     * If called without parameters, meaning true, use colors.
     *
     * @param  {boolean} usage   Use color (or not (false))
     *
     * @return {boolean}
     */
    useColor: function (usage = true) {
        ifopt.colorize = (usage);
        return true;
    },

    /**
     * Traiter les arguments passé au programme
     *
     * @param shortopt     Définition des options courtes.
     * @param longopt      Définition des options longues.
     * @param implicits    Définition des paramètre implicite.
     * @param implicitRefs Objet de référence pour passer les valeurs.
     *
     * @returns {{}}    Options parsées.
     */
    getopt: function (shortopt, longopt, implicits, implicitRefs) {
        shortopt = shortopt || ifopt.shortopt;
        longopt = longopt || ifopt.longopt;
        implicits = implicits || ifopt.implicits;
        implicitRefs = implicitRefs || ifopt.implicitRefs;

        ifopt.shortopt = shortopt;
        ifopt.longopt = longopt;
        ifopt.implicits = implicits;
        ifopt.implicitRefs = implicitRefs;

        ifopt.checkShortopt(shortopt);

        let processedArg = 0;
        let implicitArg = 1;
        let procOptions = {};  // .optarg, .opt, .optval
        let runWithoutError = true;

        process.argv.forEach(function(arg) {
            processedArg++;

            // Skip Interpreter (node.exe) and it self (mdmerge.js)
            if (processedArg < 3) return;


            // Check if it is a explicit argument (longopt).
            if (/^--/.test(arg)) {
                let splitOpt = arg.match(/^--([a-zA-Z0-9._-]+)=?(.*)/);
                if (!splitOpt) return;
                let opt = splitOpt[1];
                let optVal = splitOpt[2];

                for(let i = 0; i < longopt.length; i++) {
                    let lgOpt = longopt[i].match(/([a-zA-Z0-9._-]+)(:*)/);
                    let lgOptName = lgOpt[1];
                    let lgOptConfig = lgOpt[2];

                    if (opt === lgOptName) {
                        if (lgOptConfig === ':' && !optVal) {
                            ifopt.log(`Option %s require a value`, 1, [opt]);
                            runWithoutError = false;
                        }

                        if (procOptions[opt]) {
                            procOptions = ifopt.appendOption(procOptions, arg, opt, optVal);
                        } else {
                            procOptions[opt] = ifopt.createOption(arg, opt, optVal);
                        }
                    }
                }
            }

            // Check if it is a explicit argument (shortopt).
            else if (/^-/.test(arg)) {
                let opt = arg.substr(1, 1);
                let optIdx = shortopt.indexOf(opt);
                let optVal = arg.match(/^-(.+)=(.*)/);
                if (optVal) optVal = optVal[2];

                if (optIdx < 0 ) return;

                let nextOptChar1 = shortopt.substr(optIdx +1, 1);
                let nextOptChar2 = shortopt.substr(optIdx +2, 1);

                if (nextOptChar1 === ':' && nextOptChar2 !== ':' && !optVal) {
                    ifopt.log(`Option %s require a value`, 1, [opt]);
                    runWithoutError = false;
                }

                if (procOptions[opt]) {
                    procOptions = ifopt.appendOption(procOptions, arg, opt, optVal);
                } else {
                    procOptions[opt] = ifopt.createOption(arg, opt, optVal);
                }
            }

            // This is an implicit argument.
            else {
                // Check if there is an implicit argument
                if (implicits[implicitArg - 1]) {
                    let implicitPty = implicits[implicitArg - 1];

                    implicitRefs[implicitPty] = arg;
                }

                implicitArg++;
            }
        });

        if (runWithoutError) {
            return procOptions;
        } else {
            process.exit();
        }
    },

    // @TODO validation de la chaine shortopt pour limiter les doublons
    checkShortopt: function() {

    },

    /**
     *  Créer une option parsée pour utilisation ultérieure.
     *
     * @param optarg    Option d'origine passée en argument.
     * @param opt       Option isolée.
     * @param optval    Valeur de l'option.
     *
     * @returns {{optarg: *, opt: *, optval: *}}
     */
    createOption: function (optarg, opt, optval) {
        return {
            "arg": optarg,
            "opt": opt,
            "val": optval
        };
    },

    /**
     * Afficher un message dans le stream.
     *
     * @param message         Message à afficher.
     * @param level           Niveau de message. 0=OK,1=KO,2=WARN.
     * @param args            Arguments which will replace placeholder in message.
     * @param ignoreSmartLog  Ignore smartLog rules.
     *
     * @return {number}
     */
    log: function (message = '', level = 0, args = [], ignoreSmartLog = false){
        let lvlConf = ifopt.levels[level];
        let display = true;
        let colors = (ifopt.colorize) ? ifopt.colors : ifopt.removeColor();

        // Replace Placeholders.
        let argi = 0;
        args.map(function (arg) {
            argi++;
            arg = colors.fg.Yellow + arg + colors.Reset;
            arg = arg.split(colors.Restore).join(colors.fg.Yellow);

            if (/%[1-9]+\$s/.test(message)) {
                let regexp = new RegExp(`%${argi}\\$s`);
                message = message.replace(regexp, arg)
            } else {
                message = message.replace(/%s/, arg);
            }
        });

        // Check "smartLogin"
        for (let group in ifopt.smartLogging) {
            if (group === 'getValueForPath') continue;
            let enabled = ifopt.smartLogging[group].enabled;
            let levels  = ifopt.smartLogging[group].levels;

            if (levels.lastIndexOf(level) >= 0) {
                display = enabled;
                break;
            }
        }

        if (display || ignoreSmartLog) {
            console.log(
                "[ " +
                lvlConf.color +
                lvlConf.name +
                colors.Reset +
                " ] : " +
                message.split(colors.Restore).join(colors.Reset)
            );
        }

        return lvlConf.return;
    },

    /**
     * Create logging level for STDx. Will display specified name and color.
     *
     * @param {number} level     Level number (must be unique)
     * @param {string} name      Display logging name.
     * @param {string} color     Path to the color of ifopt.colors (check ifopt.getColors())
     * @param {number} lreturn   Return code for the logging level
     *
     * @return {boolean}
     */
    createLogLevel: function (level, name, color = 'Reset', lreturn = 0) {
        // Check if level does not exist.
        if (ifopt.levels.hasOwnProperty(level)) {
            let levelName = ifopt.getValueForPath(`levels.${level}.name`);
            ifopt.log("Log level %s already exist (name: %s). Logging level will be overwrited.", 2, [level, levelName]);
        }

        ifopt.levels[level] = {
            name: name,
            color: ifopt.colors.getValueForPath(color),
            return: lreturn
        };

        return true;
    },

    /**
     * Set display behavior for log() function using group, enabling boolean
     * for specified levels
     *
     * @param groupName     Levels groupname to handle them
     * @param groupEnabled  If false, levels will not display when calling log()
     * @param levels        Levels of the group
     *
     * @return {boolean}
     */
    setLogLevel: function (groupName, groupEnabled = false, levels = []) {
        if (!(typeof groupName === 'string')) {
            ifopt.log(
                "%s is not string",
                1,
                ["setLogLevel() groupName"]
            );
            return false;
        }

        if (ifopt.selfDebug) {
            ifopt.log("groupName : %s", 4, [groupName])
            ifopt.log("groupEnabled '%s'(%s) => %s", 4, [
                groupEnabled, typeof groupEnabled, !!(groupEnabled)
            ]);
        }

        groupEnabled = !!(groupEnabled);

        levels = (typeof levels !== 'object') ? [levels] : levels;

        if (ifopt.selfDebug) {
            ifopt.log("levels :", 4);
            console.log(levels);
        }

        if (ifopt.smartLogging[groupName]){
            ifopt.smartLogging[groupName].enabled = groupEnabled;
            if (levels.length > 0) {
                ifopt.smartLogging[groupName].levels = levels;
            }
        } else {
            ifopt.smartLogging[groupName] = {
                enabled: groupEnabled,
                levels: levels
            };
        }

        if (ifopt.selfDebug) {
            ifopt.log("smartLogging :", 4);
            console.dir(ifopt.smartLogging, {depth: null})
        }

        return true;
    },

    /**
     * Aggregate value under a option when user use multiple times the same options.
     *
     * @param {Object}  optstack
     * @param {String}  optagr     Entered option (short or long)
     * @param {String}  opt        Option Name
     * @param {String}  optval     Option Value
     *
     * @returns {Array}  Return aggregated value for the option.
     */
    appendOption: function (optstack, optagr, opt, optval) {
        if (!(optstack[opt].val instanceof Array)) {
            optstack[opt].val = [optstack[opt].val];
        }

        optstack[opt].val.push(optval);

        return optstack;
    },

    /**
     * Check the option/list of options are provided in the command line.
     *
     * @param {String|Array} opts  Option/List of options
     * @param {String}       op    or|and operator telling if all option are require
     *                             or at least one.
     * @returns {boolean}
     */
    isOption: function (opts, op = "or") {
        opts = !(opts instanceof Array) ? [].push(opts) : opts;

        let returnOp = (op.toLowerCase() !== 'or');
        let OPTS = ifopt.getopt();

        for (let i = 0; i < opts.length; i++) {
            let opt = opts[i];

            if (OPTS[opt]) {
                if (op.toLowerCase() === 'or') {
                    return true;
                }
            } else {
                if (op.toLowerCase() === 'and') {
                    return false;
                }
            }
        }

        return returnOp;
    },

    /**
     * Get all values under a unique list for provided options.
     *
     * @param {Array}  opts   List of options names.
     *
     * @returns {Array} List of values.
     */
    getOptsValues: function (opts) {
        let outputArray = [];

        for (let i in opts) {
            let opt = opts[i];

            if (ifopt.isOption([opt])) {
                outputArray = ifopt.optToArray(ifopt.getopt(), opt, outputArray);
            }
        }

        return outputArray;
    },

    /**
     * Return the value of the first options specified in the array.
     *
     * @param {String|Array} opts  Options to get value
     *
     * @return {[*]|boolean} The returned value or false if not found.
     */
    getOptValue: function (opts) {
        let options = ifopt.getopt();

        if (!(opts instanceof Array)) {
            opts = [opts]
        }

        for (let i = 0; i < opts.length; i++) {
            if (options[opts[i]]) {
                return options[opts[i]].val;
            }
        }

        return false;
    },

    /**
     * Aggregate values of specified options to list of value (merge shortopt and longopt)
     *
     * @param {Array}  optpool       Program options data.
     * @param {String} name          Name of this option (short or long).
     * @param {Array}  outputArray   Existing data list to aggregate in.
     *
     * @returns {Array}  List of values.
     */
    optToArray: function (optpool, name, outputArray) {
        if (optpool[name]) {
            if (optpool[name].val instanceof Array) {
                outputArray = outputArray.concat(optpool[name].val);
            } else {
                outputArray = outputArray.concat([optpool[name].val])
            }
        }

        return outputArray;
    }

};

/**
 * Initialization
 */
// Set own logging levels
ifopt.createLogLevel(0, 'SUCCESS', 'fg.Success', 0);
ifopt.createLogLevel(1, 'ERROR', 'fg.Error', 1);
ifopt.createLogLevel(2, 'WARNING', 'fg.Warning', 0);
ifopt.createLogLevel(3, 'INFO', 'fg.Info', 0);
ifopt.createLogLevel(4, 'DEBUG', 'fg.Debug', 0);

module.exports = ifopt;