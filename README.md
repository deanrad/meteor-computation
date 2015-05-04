# deanius:meteor-computation

Provide Meteor.Computation alias for Tracker.autorun

See a demo at [meteor-computation.meteor.com](meteor-computation.meteor.com).

## Installation

```
    meteor add deanius:meteor-computation
```

## Purpose

Store and return a reference to the computation created by
`Tracker.autorun`. Capture the reference the function passed
to Tracker.autorun receives.
(Only set the reference the first time the autorun runs,
which is immediately and synchronously)

Provide for `c.rerun()` as an alias to `c.invalidate()`,
but providing any return value from the function.


## Description

`Tracker.autorun` - a Meteor expression we love to hate. Why? Well, what is `Tracker` anyhow?

I think the API is more descriptive if:

  * The functionality is under the `Meteor` namespace/object, like most other goodies
  * The action of running `Tracker.autorun` would return an object pointing to the computation, the point of which would be a handle to the computation to `stop` it, `invalidate` it, etc..

  Furthermore
  * The term `rerun` has been provided as an alias for `invalidate`. It sounds more descriptive to me, but YMMV.

## Examples

```
d = new ReactiveVar(1), c = new ReactiveVar(2)
b = new Meteor.Computation(function(){ console.log("c+d=", c.get()+d.get()) });
>> c+d=3

```
