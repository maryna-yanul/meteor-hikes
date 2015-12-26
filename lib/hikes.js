Hikes = new Meteor.Collection('hikes');
HikesIndex = new EasySearch.Index({
    collection: Hikes,
    fields: ['nameHike'],
    engine: new EasySearch.MongoDB()
  });