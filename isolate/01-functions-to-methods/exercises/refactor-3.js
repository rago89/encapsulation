// refactor this function to a method
const remix = (str, mixer) => {
  const splitString = str.split("");
  const mixedString = splitString.join(mixer);
  return mixedString;
};

const obj = {
  mixer: "",
  remix: function (str) {
    const splitString = str.split("");
    const mixedString = splitString.join(this.mixer);
    return mixedString;
  },
};

const remix1 = obj.remix("hello");
const test1 = remix1 === "hello";
console.assert(test1, "Test 1");

obj.mixer = "-";

const remix2 = obj.remix("hello");
const test2 = remix2 === "h-e-l-l-o";
console.assert(test2, "Test 2");

const remix3 = obj.remix("bye");
const test3 = remix3 === "b-y-e";
console.assert(test3, "Test 3");

const test4 = obj.mixer === "-";
console.assert(test4, "Test 4");
