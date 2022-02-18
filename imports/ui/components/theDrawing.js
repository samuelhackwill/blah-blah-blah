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

    // this function's goal is to retrieve text and to split it in
    // one to six lines. One very long word breaks the wrapping.

		index = Template.instance().counter.get();
		getText = Template.instance().data.discussion.discussionLines[index].lineContent
    wrapCurrentWord = false
    wrapCounter = 0
    lineCounter = 1
    lines = {line1:[], line2:[], line3:[], line4:[], line5:[], line6:[]}
    longletters = ["w","m"]
    // max : 23 ... so 4,3 ratio
    smallLetters = ["i","j","l","f","r","t"]
    // max : 77 approx ... so 1,3 ratio

    // letters and numbers should default to medium
    // non-word (spaces, punctuation, etc) should default to small.

    words = getText.split(" ")

    for (var z = 0 ; z < words.length; z++) {
      for (var i = 0 ; i < words[z].length; i++){
        // FOR EVERY LETTER
        // increment counter, that's it
        if (words[z][i]== "w" || words[z][i]== "m"){
          wrapCounter = wrapCounter + 2.8   
        }

        if (words[z][i]== "i" || words[z][i]== "j" || words[z][i]== "l" || words[z][i]== "f" || words[z][i]== "r" || words[z][i] == "t"){
          wrapCounter = wrapCounter - 1.3   
        }

        wrapCounter = wrapCounter + 2.8

        console.log(wrapCounter, words[z])

        // we want to check, at EVERY letter, if we need to wrap current word,
        // and reset counter AS SOON as a letter is over 100.
        if (wrapCounter>=100) {
          console.log(wrapCounter, words[z])
          console.log("wrap at ", words[z])
          wrapCounter = 0
          wrapCurrentWord = true
        }

      }
      // also increment counter for spaces!
      wrapCounter = wrapCounter + 2.8

      // FOR EVERY WORD
      // check wrapCounter
      // insert "wrap" if wrapCounter > x
      // reset wrapCounter

      if (wrapCurrentWord) {
        lineCounter = lineCounter + 1
        wrapCurrentWord = false
      }

      selector = "line"+lineCounter
      // console.log(selector, lines[selector], words[z])
      lines[selector].push(words[z])

    }

    return {
      line1:lines.line1.join(' '),
      line2:lines.line2.join(' '),
      line3:lines.line3.join(' '),
      line4:lines.line4.join(' '),
      line5:lines.line5.join(' '),
      line6:lines.line6.join(' ')
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