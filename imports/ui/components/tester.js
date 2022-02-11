import './tester.html';
import { DiscussionLines } from '../../api/discussionLines/discussionLines.js';

Template.tester.onCreated(function testerOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);

  setTimeout(() => {this.counter.set(this.counter.get() + 1)}, 2.0*1000)

});

Template.tester.helpers({
  getLine() {
    index = Template.instance().counter.get();
    return Template.instance().data.discussion.fetch()[index].lineContent
  },
});

Template.tester.events({
});
