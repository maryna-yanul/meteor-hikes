// Meteor.publish("hikes", function () {
//   return Hikes.find(); // everything
// });

Meteor.publish('hikes', function () {
    return Hikes.find();
});
Meteor.publish("userData", function () {
    return Meteor.users.find({}, {fields: {'profile': 1}});
});