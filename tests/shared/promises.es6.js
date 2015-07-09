Tinytest.addAsync('meteor-computation - nextValue - returns a promise for the next value', (test, done) => {
  let i=0;
  let c = Meteor.Computation(() => {
    i++;
    return i;
  });
  test.equal(c.currentValue, 1);
  c.nextValue().then(Meteor.bindEnvironment((val) => {
    test.equal(val, 2);
    done();
  }));
  c.rerun();
})
