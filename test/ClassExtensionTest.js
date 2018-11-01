const chai = require('chai');
const assert = chai.assert;

require('../ClassExtension');

/**
 * test class for singleton
 */
const SingletonTestClass = class SingletonTestClass {

    constructor(){
    }

    method(){
        return 'method';
    }

    get property(){
        return 'property';
    }

}
.toSingleton();

/**
 * mixin methods
 */
const MixinMethods = {

    method(){
        return 1;
    },

    get property(){
        return '2';
    }
};

/**
 * test class for mixin
 */
const MixinTestClass = class MixinTestClass {

    constructor(){
    }
}
.mixin(MixinMethods);

/*
 *	test interface
 */
const ITest = {
    testMethod1(){},
    testMethod2(){},
};

/**
 * test class for interface
 */
const InterfaceTestClass = class InterfaceTestClass {

    constructor(){
    }

    testMethod1(){
        return 1;
    }

    testMethod2(){
        return 2;
    }

    testMethod3(){
        return 3;
    }
}
.implements(ITest);

/**
 * describe test methods
 */
describe('Execute tests for ClassExtension.js', ()=> {
    it('test for singleton 1', ()=>{
         assert.notStrictEqual(SingletonTestClass.instance, null);
    });
    it('test for singleton 2', ()=>{
         assert.notStrictEqual(SingletonTestClass.instance, undefined);
    });
    it('test for singleton 3', ()=>{
        assert.strictEqual(SingletonTestClass.instance.method(), 'method');
    });
    it('test for singleton 4', ()=>{
        assert.strictEqual(SingletonTestClass.instance.property, 'property');
    });
    it('test for mixin 1', ()=>{
        const mixinTestClass = new MixinTestClass();
        assert.strictEqual(mixinTestClass.method(), 1);
    });
    it('test for mixin 2', ()=>{
        const mixinTestClass = new MixinTestClass();
        assert.strictEqual(mixinTestClass.property, '2');
    });
    it('test for interface 1', ()=>{
        const interfaceTestClass = new InterfaceTestClass();
        assert.strictEqual(interfaceTestClass.testMethod1(), 1);
    });
    it('test for interface 2', ()=>{
        const interfaceTestClass = new InterfaceTestClass();
        assert.strictEqual(interfaceTestClass.testMethod2(), 2);
    });
    it('test for interface 3', ()=>{
        const interfaceTestClass = new InterfaceTestClass();
        assert.strictEqual(interfaceTestClass.testMethod3(), 3);
    });
});