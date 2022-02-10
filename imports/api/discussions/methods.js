import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Discussions } from './discussions.js';
import { DiscussionLines } from '../discussionLines/discussionLines.js';

Meteor.methods({
  'discussions.insert'(obj) {

    DiscussionsSchema.validate(obj);

    return Discussions.insert({obj});
  },
});

class DiscussionsCollection extends Mongo.Collection {
  remove(selector, callback) {
    // when we remove a discussion, we also want to get rid of all discussionlines
    // from that discussion for cleaning purposes.

    DiscussionLines.remove({belongsToDiscussionNamed: selector});

    return super.remove(selector, callback);
  }
}
