/**
 * ClassExtension.js
 */

/**
 * singleton objects
 */
const _singletons = {};

/**
 * method to create singleton object.
 * If you need constructors with arguments, you have to implement another methods to initialize with arguments.
 * You can aceess singleton object by "instance" property.
 */
Function.prototype.toSingleton = function() {
    const self = this; // caller
    const INSTANCE_ACCESSOR_NAME = 'instance'; // property name to get instance
    const key = self.toString();

    if (_singletons[key]) return self;

    // create instance
    const instance = new self();
    _singletons[key] = self;

    // set property to get instance
    const propertyDescriptor =  {
        value        : instance,
        configurable : false,
        enumerable   : true,
        writable     : false,
    };

    Object.defineProperty(self, INSTANCE_ACCESSOR_NAME, propertyDescriptor);
    return self;
};

/**
 * mixin methods and property.
 * @param  {[Object]} targets mixin
 */
Function.prototype.mixin = function(...targets) {
    const self = this; // caller

    for (const target of targets) {
        const target_obj = (typeof(target) === 'function') ? target.prototype : target;

        for(const key of Reflect.ownKeys(target_obj)) {
            // ignore to mixin specific functions
            if(_isIgnoreFunctionName(key)) continue;

            // define property
            const propertyDescriptor = Object.getOwnPropertyDescriptor(target_obj, key);
            propertyDescriptor.configurable = true;
            propertyDescriptor.enumerable   = true;
            if(propertyDescriptor.hasOwnProperty('writable')) {
                propertyDescriptor.writable = true;
            }
            Object.defineProperty(self.prototype, key, propertyDescriptor);
        }
    }
    return self;
};

/**
 * implements interface methods.
 * It will throw error when instance created if child class does not implement methods.
 * @param  {[Object]} targets interfaces
 */
Function.prototype.implements = function(...targets) {
    const self = this; // caller

    for (const target of targets) {
        for(const key in target) {
            // ignore to mixin specific functions
            if(_isIgnoreFunctionName(key)) continue;

            if (typeof self.prototype[key] !== 'function') {
                throw new Error(`Not override Method:${key}`);
            }
        }
    }
    return self;
};

/**
 * @param  {string} functionName
 */
const _isIgnoreFunctionName = (functionName) => {
    return functionName === 'constructor'
        || functionName === 'toSingleton'
        || functionName === 'mixin'
        || functionName === 'implements'
    ;
};