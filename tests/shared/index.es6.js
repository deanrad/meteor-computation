Tinytest.add("meteor-computation - create - without-new", (test) => {
  var c = Meteor.Computation(() => {
    return 1;
  });
  test.equal(typeof c, "object");
});

Tinytest.add("meteor-computation - create - with-new", (test) => {
  var c = new Meteor.Computation(() => {
    return 1;
  });
  test.equal(typeof c, "object");
});

Tinytest.add("meteor-computation - currentValue - initial value", (test) => {
  var c = new Meteor.Computation(() => {
    return 1;
  });
  test.equal(c.currentValue, 1);
});

Tinytest.add("meteor-computation - currentValue - keeps up", (test) => {
  var i = 0;
  var c = new Meteor.Computation(() => {
    i = i+1;
    return i;
  });
  test.equal(c.currentValue, 1);

  c.rerun();
  test.equal(c.currentValue, 2);
});

Tinytest.add("meteor-computation - rerun - sync by default", (test) => {
  var i = 0;
  var c = new Meteor.Computation(() => {
    i = i+1;
    return i;
  });
  test.equal(c.currentValue, 1);

  c.rerun();
  test.equal(c.currentValue, 2);
});

Tinytest.add("meteor-computation - rerun - async with flag", (test) => {
  var i = 0;
  var c = new Meteor.Computation(() => {
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
  var rvar = new ReactiveVar(3.14)
  var c = new Meteor.Computation(() => {
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
