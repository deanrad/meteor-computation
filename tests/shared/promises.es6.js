Tinytest.addAsync('meteor-computation - nextValue - returns a promise for the next value', (test, done) => {
  let i=0;
  const c = Meteor.Computation(() => i=i+1);
  //it is run the first time
  test.equal(c.currentValue, 1);

  //the next time it is run, it should increment to 2
  c.nextValue().then(Meteor.bindEnvironment((val) => {
    test.equal(val, 2);
    done();
  }));
  
  c.rerun();
})
