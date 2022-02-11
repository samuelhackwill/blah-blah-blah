import { Meteor } from 'meteor/meteor';
import { Discussions } from '../discussions.js';

Meteor.publish('discussions.all', function () {
  return Discussions.find();
});

Meteor.publish('discussions.one', function () {
  // here we want to subscribe to one specific document in the db
  allDiscussions = Discussions.find({}).fetch()
  randomId = allDiscussions[Math.floor(Math.random()*allDiscussions.length)]._id

  // and return it.
  return Discussions.find({_id : randomId});
});
