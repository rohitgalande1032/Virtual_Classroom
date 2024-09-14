/** --------------------------------------------------------------------------
 *  Extension of Object
 *  ------------------------------------------------------------------------- */
Object.defineProperty(Object.prototype, 'getValueForPath', {
    get: function () {
        return function (ptyPath, data = this) {
            let spath = ptyPath.split('.');
            let property = null;
            let retValue = '';
            // let level = deeplevel + 1;
            let level = 0;

            // Check if property exist
            if (data[spath[0]]) {
                property = data[spath[0]];
            }

            spath.shift();

            if (property instanceof Array  && spath.length === 0) {
                //     retValue = property.join(',');
                retValue = property
            } else if (property instanceof Array) {
                //     let retValues = [];
                //     property.forEach(function (iproperty) {
                //         let retVal = getPropertyPath(spath.join('.'), iproperty, level);
                //         if (retVal) retValues.push(retVal);
                //     });
                //
                //     retValue = retValues.join(',');
                retValue = property;
            } else if (typeof property === 'object' && spath.length > 1) {
                // Case 'OBJECT & LEN > 1 (recurse)'
                retValue = this.getValueForPath(spath.join('.'), property);
            } else if (typeof property === 'object' && spath.length === 1) {
                // Case 'OBJECT & LEN = 1'
                try {
                    retValue = property[spath[0]];
                } catch (err){
                    console.error(`An error occurs on %s (level %s)`);
                    // log("An error occurs on %s (level %s)", 1, [spath[0], deeplevel]);
                    retValue = null;
                }
                // In case of the value is an array
                // if (retValue instanceof Array) {
                //     retValue = retValue.join(",");
                // }
            } else {
                // Case 'ELSE'
                retValue = property;
            }

            return retValue;
        }.bind(this)
    }
    // set: function () {
    //
    // }
});



/** --------------------------------------------------------------------------
 *  Extension of Math
 *  ------------------------------------------------------------------------- */
Math.froundx = function(val, round){
    return (Math.round(val * Math.pow(10, round)) / Math.pow(10, round));
};



/** --------------------------------------------------------------------------
 *  Extension of MozNamedAttrMap
 *  ------------------------------------------------------------------------- */
if(typeof(MozNamedAttrMap) === 'function'){
    MozNamedAttrMap.prototype.find = function(regExpFind){
        var output = undefined;

        for(var i = 0; i < this.length; i++){
            if(regExpFind.test(this[i].localName)){
                output = this[i].value;
                break;
            }
        }

        return output;
    };

    /** Return ARRAY **/
    MozNamedAttrMap.prototype.findAll = function(regExpFind){
        var output = [];

        for(var i = 0; i < this.length; i++){
            if(regExpFind.test(this[i].localName)){
                output.push(this[i].value);
            }
        }

        return output;
    };
}



/** --------------------------------------------------------------------------
 *  Extension of NamedNodeMap
 *  ------------------------------------------------------------------------- */
if(typeof(NamedNodeMap) === 'function'){
    NamedNodeMap.prototype.find = function(regExpFind){
        var output = undefined;

        for(var i = 0; i < this.length; i++){
            if(regExpFind.test(this[i].localName)){
                output = this[i].value;
                break;
            }
        }

        return output;
    };

    /** Return ARRAY **/
    NamedNodeMap.prototype.findAll = function(regExpFind){
        var output = [];

        for(var i = 0; i < this.length; i++){
            if(regExpFind.test(this[i].localName)){
                output.push(this[i].value);
            }
        }

        return output;
    };
}



/** --------------------------------------------------------------------------
 *  Extension of NamedNodeMap
 *  ------------------------------------------------------------------------- */
/**
 * Return number of days in the month.
 *
 * @return {number} Number of days in the month.
 */
Date.prototype.getDaysInMonth = function () {
    return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
};

/**
 * Indicate if the current day is the last one.
 *
 * @return {boolean} true if it's the last day.
 */
Date.prototype.isLastDay = function () {
    return this.getDaysInMonth() === this.getDate();
};

/**
 * Return index of the first day of the month.
 *
 * @return {number}
 */
Date.prototype.getFirstDay = function () {
    return new Date(this.getFullYear(), this.getMonth(), 1).getDay();
};

/**
 * Forward/backward n month depending of provided offset.
 *
 * @param {number} offset  Number of months to shift (interger [-∞,+∞])
 *
 * @return {Date}
 */
Date.prototype.offsetMonth = function (offset) {
    return new Date(
        this.getFullYear(),
        this.getMonth() + offset,
        this.getDate(),
        this.getHours(),
        this.getMinutes(),
        this.getSeconds()
    );
};
