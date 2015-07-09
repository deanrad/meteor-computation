# deanius:meteor-computation [![Build Status](https://secure.travis-ci.org/chicagogrooves/meteor-computation.png?branch=master)](https://travis-ci.org/chicagogrooves/meteor-computation)


Provide Meteor.Computation alias for Tracker.autorun

See a demo at [meteor-computation.meteor.com](meteor-computation.meteor.com).

## Installation

```
    meteor add deanius:meteor-computation
```

## Description

`Tracker.autorun` - a useful API that I think could be more useful if:

  * The functionality is under the `Meteor` namespace/object, like most other goodies
  * `Tracker.autorun` would have a meaningful return value, namely an object pointing to the computation, the point of which could be to `stop` it, `invalidate` it, etc..
  * There could be a meaning given to the return value of the function given to `Tracker.autorun`

## Examples

```
var d = new ReactiveVar(1),
    c = new ReactiveVar(2);
var b = new Meteor.Computation(function(){
  var sum = c.get() + d.get();

  // the side-effect to occur when c or d change
  console.log("c+d=", sum);

  // the value of the computation
  return sum;
});
>> c+d=3

b.currentValue
>>3

// the .currentValue property doesn't wait for a flush - it can lag behind
c.set(2.1); console.log("not yet 3.1: ", b.currentValue);
>> not yet 3.1: 3
>> c+d=3.1

b.currentValue
>> 3.1       // but now it has changed

// using the .nextValue method, you can get a promise for the eventual value

c.set(2.2); b.nextValue.then(function(newVal){ console.info(newVal); })
>> c+d=3.2
>> 3.2


```
