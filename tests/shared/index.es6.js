Tinytest.add("meteor-computation - create - without-new", (test) => {
  const c = Meteor.Computation(() => {
    return 1;
  });
  test.equal(typeof c, "object");
});

Tinytest.add("meteor-computation - create - with-new", (test) => {
  const c = new Meteor.Computation(() => {
    return 1;
  });
  test.equal(typeof c, "object");
});

Tinytest.add("meteor-computation - currentValue - initial value", (test) => {
  const c = new Meteor.Computation(() => {
    return 1;
  });
  test.equal(c.currentValue, 1);
});

Tinytest.add("meteor-computation - currentValue - keeps up", (test) => {
  let i = 0;
  const c = new Meteor.Computation(() => {
    i = i+1;
    return i;
  });
  test.equal(c.currentValue, 1);

  c.rerun();
  test.equal(c.currentValue, 2);
});

Tinytest.add("meteor-computation - rerun - sync by default", (test) => {
  let i = 0;
  const c = new Meteor.Computation(() => {
    i = i+1;
    return i;
  });
  test.equal(c.currentValue, 1);

  let newValue = c.rerun();
  test.equal(newValue, 2);
  test.equal(c.currentValue, 2);
});

Tinytest.add("meteor-computation - rerun - async with flag", (test) => {
  let i = 0;
  const c = new Meteor.Computation(() => {
    i = i+1;
    return i;
  });
  test.equal(c.currentValue, 1);

  c.rerun({async: true});
  test.equal(c.currentValue, 1);

  Tracker.flush();
  test.equal(c.currentValue, 2);
});

Tinytest.add("meteor-computation - create - wrap ReactiveVar", (test) => {
  const rvar = new ReactiveVar(3.14)
  const c = new Meteor.Computation(() => {
    return rvar.get();
  });
  test.equal(c.currentValue, 3.14);
  rvar.set(2.71828);
  // flush hasn't been done
  test.equal(c.currentValue, 3.14);
  // but we can force the issue now
  c.rerun(); //calls Tracker.flush
  test.equal(c.currentValue, 2.71828);
});
