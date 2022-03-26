"use strict"

class Foo {
  constructor(x) {
    this.x = x;
  }

  // Function
  add(y) {
    if (!this) {
      return 'this was undefined!'
    } else {
      return this.x + y;
    }
  }

  // Arrow function
  subtract = (y) => {
    if (!this) {
      return 'this was undefined'
    } else {
      return this.x + y;
    }
  }
}

function callFunction(fn) {
  return fn(10);
}

const foo = new Foo(5);
console.log(callFunction(foo.add));
console.log(callFunction(foo.add.bind({ x: 15 })));
console.log(callFunction(foo.subtract));
console.log(callFunction(foo.subtract.bind({ x: 3 })));

function Bar(x) {
  this.x = x;

  return {
    add: function (y) {
      if (!this) {
        return 'this was undefined!'
      } else {
        return this.x + y;
      }      
    },

    subtract: (y) => {
      if (!this) {
        return 'this was undefined'
      } else {
        return this.x + y;
      }
    }
  }
}

const bar = new Bar(5);
console.log(callFunction(bar.add));
console.log(callFunction(bar.add.bind({ x: 15 })));
console.log(callFunction(bar.subtract));
console.log(callFunction(bar.subtract.bind({ x: 3 })));
