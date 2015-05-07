Meteor.publish('<%= collection %>', function() {
  return <%= collectionName %>.find();
});