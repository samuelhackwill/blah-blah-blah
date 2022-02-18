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
		getText = Template.instance().data.discussion.discussionLines[index].lineContent
    counter = 0
    lines = {line1:[], line2:[], line3:[], line4:[], line5:[], line6:[]}
    longletters = ["w","m"]
    // max : 23 ... so 4,3 ratio
    smallLetters = ["i","j","l","f","r","t"]
    // max : 77 approx ... so 1,3 ratio

    // letters and numbers should default to medium
    // non-word (spaces, punctuation, etc) should default to small.

    for (var i = 0 ; i < getText.length; i++) {
      if(counter<100) lines.line1.push(getText[i])
      if(counter>=100 && counter<200) lines.line2.push(getText[i])
      if(counter>=200 && counter<300) lines.line3.push(getText[i])
      if(counter>=300 && counter<400) lines.line4.push(getText[i])
      if(counter>=400 && counter<500) lines.line5.push(getText[i])
      if(counter>=500 && counter<600) lines.line6.push(getText[i])

      if (getText[i] == "w" || getText[i] == "m"){
        counter = counter + 2.8   
      }

      if (getText[i] == "i" || getText[i] == "j" || getText[i] == "l" || getText[i] == "f" || getText[i] == "r" || getText[i] == "t"){
        counter = counter - 1.3   
      }

      counter = counter + 2.8

    }

    console.log(lines.line1.join(''))

    return {
      line1:lines.line1.join(''),
      line2:lines.line2.join(''),
      line3:lines.line3.join(''),
      line4:lines.line4.join(''),
      line5:lines.line5.join(''),
      line6:lines.line6.join('')
    }
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