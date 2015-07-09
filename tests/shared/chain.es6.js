Tinytest.addAsync('meteor-computation - chain - can trigger vanilla autorun', (test, done) => {
  let i=0, runValues=[], timesRerun=0;
  const comp = Meteor.Computation(() => i++);

  // This autorun accumulates values that 'c' has had over time into runValues
  Tracker.autorun((comp2) => {
    runValues.push(comp.value());
    if (!comp2.firstRun) {
      timesRerun++;
    }
  });

  comp.rerun();
  test.equal(timesRerun, 1);
  test.equal(runValues, [0,1]);

  comp.rerun({async: true}).then((val) => {
    test.equal(timesRerun, 2);
    test.equal(runValues, [0,1,2]);
    done();
  });
});

Tinytest.addAsync('meteor-computation - chain - can trigger another Meteor.Computation', (test, done) => {
  let i=0, runValues=[], timesRerun=0;
  const comp = Meteor.Computation(() => i++);

  // This Computation accumulates values that 'c' has had over time into runValues
  new Meteor.Computation((comp2) => {
    runValues.push(comp.value());
    if (!comp2.firstRun) {
      timesRerun++;
    }
  });

  comp.rerun();
  test.equal(timesRerun, 1);
  test.equal(runValues, [0,1]);

  comp.rerun({async: true}).then((val) => {
    test.equal(timesRerun, 2);
    test.equal(runValues, [0,1,2]);
    done();
  });
});

Tinytest.add("meteor-computation - chain - can chain 3 using .value()", (test) => {
  const rv1 = new ReactiveVar(1);
  const c1 = new Meteor.Computation(() => rv1.get());
  const c2 = new Meteor.Computation(() => c1.value() + 1);
  const c3 = new Meteor.Computation(() => c2.value() + 1);
  test.equal(c3.currentValue, 3);

  //we chained using .value() - reactivity is preserved
  rv1.set(rv1.get()+1);
  Tracker.flush();
  test.equal(c3.currentValue, 4);
});

Tinytest.add("meteor-computation - chain - will not chain using only .currentValue", (test) => {
  const rv1 = new ReactiveVar(1);
  const c1 = new Meteor.Computation(() => rv1.get());
  const c2 = new Meteor.Computation(() => c1.currentValue + 1);
  const c3 = new Meteor.Computation(() => c2.currentValue + 1);
  test.equal(c3.currentValue, 3);
  test.equal(c3.value(), 3);

  //we didn't use .value() - we broke reactivity
  rv1.set(rv1.get()+1);
  Tracker.flush();
  test.equal(c3.currentValue, 3);
  test.equal(c3.value(), 3);
});

Tinytest.add("meteor-computation - chain - can nest Meteor.Computation", (test) => {
  const rv1 = new ReactiveVar(1);
  const c1 = new Meteor.Computation(() =>
    new Meteor.Computation(() => rv1.get()).value() + 1
  );
  test.equal(c1.value(), 2);

  rv1.set(rv1.get()+1);
  Tracker.flush();
  test.equal(c1.value(), 3);
});
