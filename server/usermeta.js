Meteor.publish('usermeta', function() {
  return Usermeta.find();
})