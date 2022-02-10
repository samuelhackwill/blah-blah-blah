import { Meteor } from 'meteor/meteor';
import { Discussions } from '../discussions.js';

Meteor.publish('discussions.all', function () {
  return Discussions.find();
});
