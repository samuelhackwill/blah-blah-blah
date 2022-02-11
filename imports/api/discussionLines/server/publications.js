import { Meteor } from 'meteor/meteor';
import { DiscussionLines } from '../discussionLines.js';

Meteor.publish('discussionLines.all', function () {
  return DiscussionLines.find();
});

Meteor.publish('discussionLines.one', function (whichOne) {
  // here we want to subscribe to all the lines of text
  // belonging to one particular discussion.
    return DiscussionLines.find({belongsToDiscussionNamed : whichOne});
});
