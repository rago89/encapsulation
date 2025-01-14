"use strict";

const evenAndOdd = {
  state: {
    even: [],
    odd: [],
    any: [],
  },
  pushTo: function (kind, value) {
    this.state[kind].push(value);
  },
};

evenAndOdd.pushTo("even", "2");
evenAndOdd.pushTo("odd", "1");
evenAndOdd.pushTo("any", "e");

const test1 = deepCompare(evenAndOdd.state, {
  even: ["2"],
  odd: ["1"],
  any: ["e"],
});
console.assert(test1, "Test 1");

const boundWithEven = evenAndOdd.pushTo.bind(evenAndOdd, "even");
const boundWithOdd = evenAndOdd.pushTo.bind(evenAndOdd, "odd");
const boundWithAny = evenAndOdd.pushTo.bind(evenAndOdd, "any");

boundWithEven("4");
boundWithEven("6");
boundWithOdd("3");
boundWithOdd("5");
boundWithAny("f");
boundWithAny("g");

const test2 = deepCompare(evenAndOdd.state, {
  even: ["2", "4", "6"],
  odd: ["1", "3", "5"],
  any: ["e", "f", "g"],
});
console.assert(test2, "Test 2");

// hoisted testing dependency
function deepCompare(actual, expect) {
  return (
    /* compare primitives & references */ actual === expect ||
    Object.is(actual, expect) ||
    (Object(actual) === actual &&
      Object(expect) === expect &&
      /* compare arrays */ ((Array.isArray(actual) &&
        Array.isArray(expect) &&
        actual.length === expect.length &&
        expect.every((expect, index) => deepCompare(actual[index], expect))) ||
        /* compare objects */ (Object.keys(actual).length ===
          Object.keys(expect).length &&
          Object.keys(expect).every((key) =>
            deepCompare(actual[key], expect[key])
          ))))
  );
}
