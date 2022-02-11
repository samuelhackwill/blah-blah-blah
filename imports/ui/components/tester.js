import './tester.html';
import './tester.css';
import { DiscussionLines } from '../../api/discussionLines/discussionLines.js';

Template.tester.onCreated(function testerOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);

  setTimeout(() => {this.counter.set(this.counter.get() + 1)}, 2.0*1000)

  // document.onkeyup = function(event){
  //   if (event.keyCode==32) {
  //     console.log(Template.instance())
  //   }
  // }

});

Template.tester.helpers({
  getLine() {
    index = Template.instance().counter.get();
    return Template.instance().data.discussion.fetch()[index].lineContent
  },
});

Template.tester.events({

  "keyup" : function(e){
    index = Template.instance().counter.get() + 1
    Template.instance().counter.set(index)
  }
});