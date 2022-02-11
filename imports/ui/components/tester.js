import './tester.html';
import './tester.css';
import { DiscussionLines } from '../../api/discussionLines/discussionLines.js';

Template.tester.onCreated(function testerOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);

  setTimeout(() => {this.counter.set(this.counter.get() + 1)}, 2.0*1000)
});

Template.tester.onRendered(function(){

  $(document).ready(function() {
    console.log("everything has rendered")
    document.getElementById("homeBody").style.backgroundColor="white"
  })

})

Template.tester.helpers({
  getLine() {
    index = Template.instance().counter.get();
    return Template.instance().data.discussion.fetch()[index].lineContent
  },
});

Template.tester.events({
  "keyup" : function(e){
    index = Template.instance().counter.get()
    endOfText = Template.instance().data.discussion.fetch().length-1

    if (index<endOfText) {
      Template.instance().counter.set(index+1)
    }else{
      console.log("END OF TEXT")
      document.getElementById("homeBody").style.backgroundColor="black"

    }

  }
});