import './theDrawing.html';
import './theDrawing.css';

Template.theDrawing.onCreated(function theDrawingOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);

  // setTimeout(() => {this.counter.set(this.counter.get() + 1)}, 2.0*1000)

});

Template.theDrawing.onRendered(function(){
  $(document).ready(function() {
    console.log("everything has rendered")
    // document.getElementById("homeBody").style.backgroundColor="white"
    allHiddenLayers = document.getElementsByClassName("st2")
    for (var i = allHiddenLayers.length - 1; i >= 0; i--) {
      allHiddenLayers[i].style.opacity = 1
    }
  })

})

Template.theDrawing.helpers({

	getColor:function(who){
		return this.discussion.discussionParams[0][who.hash.arg+"Color"]
	},
	
	getLine() {
		index = Template.instance().counter.get();
		return Template.instance().data.discussion.discussionLines[index].lineContent
	},

  speechballoonLabelName(){
    index = Template.instance().counter.get();

    if (Template.instance().data.discussion.discussionLines[index].isItTheTalker) {
      _currentSpeaker = this.discussion.discussionParams[0].talkerName
    }else{
      _currentSpeaker = this.discussion.discussionParams[0].listenerName
    }
    return _currentSpeaker
  },

  getDate(){
    return this.discussion.discussionParams[0].date
  }
})


Template.theDrawing.events({
  "keyup" : function(e){
    index = Template.instance().counter.get()
    endOfText = Template.instance().data.discussion.discussionLines.length-1

    console.log(Template.instance().data.discussion.discussionLines)

    if (index<endOfText) {
      Template.instance().counter.set(index+1)
    }else{
      console.log("END OF TEXT")
      document.getElementById("homeBody").style.backgroundColor="black"

    }

  }
});