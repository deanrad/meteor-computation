/* global MeteorComputation */
/**
  Store and return a reference to the computation created by
  Tracker.autorun. Capture the reference the function passed
  to Tracker.autorun is passed.
  Only set the reference the first time the autorun runs,
  which is immediately and synchronously.

  Provide for c.rerun() as an alias to c.invalidate()
*/
MeteorComputation = function (fn, context) {
  var lastReturnVal;
  var computation = Tracker.autorun(function () {
    lastReturnVal = fn.call(context);
  });

  _.extend(computation, {
    nextValue: function () {
      return new Promise (function (resolve) {
        Tracker.afterFlush(function () {
          resolve(lastReturnVal);
        });
      });
    },
    rerun: function (async) {
      computation.invalidate();
      if (!async) {
        Tracker.flush();
        return lastReturnVal;
      } else {
        return computation.nextValue();
      }
    }
  });

  Object.defineProperty(computation, "currentValue", {
    get: function () {
      return lastReturnVal;
    }
  });

  return computation;
}.bind(Meteor);

// patch Meteor global
Meteor.Computation = MeteorComputation;
