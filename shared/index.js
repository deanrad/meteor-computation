/* global MeteorComputation */
/**
  Store and return a reference to the computation created by
  Tracker.autorun. Capture the reference the function passed
  to Tracker.autorun is passed.
  Only set the reference the first time the autorun runs,
  which is immediately and synchronously.

  Provide for c.rerun() as an alias to c.invalidate()
*/
MeteorComputation = function (fn) {
  var computation, lastReturnVal;
  Tracker.autorun(function (c) {
    if (c.firstRun) computation = c;
    lastReturnVal = fn.call();
  });

  _.extend(computation, {
    rerun: function () {
      computation.invalidate();
      //XXX wont work cuz async - could be a Promise though
      return lastReturnVal;
    },
    lastReturnValue: function () {
      return lastReturnVal;
    }
  });
  return computation;
}.bind(Meteor);

// patch Meteor global - requires Meteor to load first
Meteor.Computation = MeteorComputation;
