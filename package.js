Package.describe({
  name: "deanius:meteor-computation",
  summary: "Provide Meteor.Computation alias for Tracker.autorun",
  version: "0.2.0",
  git: "https://github.com/chicagogrooves/meteor-meteor-computation"
});

Package.onUse(function(api) {
  api.versionsFrom("1.0.1");
  api.use(["meteor", "jquery", "underscore"]);

  api.addFiles("shared/index.js", ["client", "server"]);

  api.export("MeteorComputation");
});


Package.onTest(function (api) {
  api.use("tinytest");
  api.use(["reactive-var"]);
  api.use("mquandalle:harmony");
  api.use("deanius:meteor-computation");

  api.addFiles("tests/shared/index.next.js", ["client", "server"]);

});
