import { Meteor } from 'meteor/meteor';
import { Discussions } from '../discussions.js';

Meteor.publish('discussions.all', function () {
  return Discussions.find();
});

Meteor.publish('discussions.one', function (whichOne) {
  return Discussions.find({titleOfDiscussion:whichOne});
});

Meteor.publish('discussions.random', function () {

  allDiscussions = Discussions.find({}).fetch()
  randomId = allDiscussions[Math.floor(Math.random()*allDiscussions.length)]._id

  return Discussions.find({_id : randomId});

});