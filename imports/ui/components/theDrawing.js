import './theDrawing.html';
import './theDrawing.css';

Template.theDrawing.onCreated(function theDrawingOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  place = this.data.discussion.discussionParams[0].place
  // setTimeout(() => {this.counter.set(this.counter.get() + 1)}, 2.0*1000)
  hasItStarted = false

  sizeOfName = 0
  sizeOfSmallLabel = 30

  if(Template.instance().data.discussion.discussionParams[0].listenerName.length>7) isListenerNameBig = true
  if(Template.instance().data.discussion.discussionParams[0].talkerName.length>7) isTalkerNameBig = true

  Template.instance().data.discussion.discussionLines.unshift({lineContent:"(Pouvez-vous appuyer sur la barre espace s'il vous plaît?)"})

});

Template.theDrawing.onRendered(function(){
  $(document).ready(function() {
    
    setTimeout(function(){
      document.getElementById("date").style.opacity=1
    },2000)

    setTimeout(function(){
      document.getElementById("date").innerHTML=place
    },9000)

    setTimeout(function(){
      document.getElementById("date").style.opacity=0
    },13000)

    setTimeout(function(){
      document.getElementById("text").style.opacity=1
    },14000)

    allHiddenLayers = document.getElementsByClassName("st2")
    for (var i = allHiddenLayers.length - 1; i >= 0; i--) {
      allHiddenLayers[i].style.opacity = 1
    }
    document.getElementsByClassName("eventCatcher")[0].focus()
  })

})

Template.theDrawing.helpers({

	getColor:function(who){
		return this.discussion.discussionParams[0][who.hash.arg+"Color"]
	},

  labelStyler(isItTheBigOne){
    index = Template.instance().counter.get();

    approxPixelLength = 0.7
    _target = ""

    talkerTalking = Template.instance().data.discussion.discussionLines[index].isItTheTalker
    
    if(talkerTalking){
      _target = "talkerName"
    }else{
      _target = "listenerName"
    }

    _name = this.discussion.discussionParams[0][_target]

    for(i=0; i<_name.length-1; i++){
      if (_name[i]== "w" || _name[i]== "m"){
        approxPixelLength = approxPixelLength + .045   
      }
      if (_name[i]== "i" || _name[i]== "j" || _name[i]== "l" || _name[i]== "f" || _name[i]== "r" || _name[i] == "t"){
        approxPixelLength = approxPixelLength - .03   
      }
      approxPixelLength = approxPixelLength + .04
    }

    if (talkerTalking){
      return "fill : "+this.discussion.discussionParams[0].talkerColor + ";transform: scaleX("+approxPixelLength+"); transform-box: fill-box;"
    }else{
      return "fill : "+this.discussion.discussionParams[0].listenerColor + ";transform: scaleX("+approxPixelLength+"); transform-box: fill-box;"
    }
  },

  labelShower(){
    console.log(Template.instance().data.discussion.discussionParams.talkerName)
    // is the listener big and is he talking?
    // is the talker big and is he talking?
    // else return display none.
    // index = Template.instance().counter.get();

    // console.log(document.getElementById("name").getBoundingClientRect().width)
    // talkerTalking = Template.instance().data.discussion.discussionLines[index].isItTheTalker

    // if (talkerTalking) {
    //   if (sizeOfName > sizeOfSmallLabel - 20) {
    //     console.log("talker is talking, talkername is big!")
    //     return "display : contents;"
    //   }else{
    //     console.log("talker is talking, but he hasn't got a big name.")
    //     return "display : none"
    //   }
    // }else{
    //   if (sizeOfName > sizeOfSmallLabel - 20) {
    //     console.log("listener is talking, talkername is big!")
    //     return "display : contents;"
    //   }else{
    //     console.log("listener is talking, but he hasn't got a big name.")
    //     return "display : none"
    //   }

    // }

    //get number of letters of name and multiply into a scaleX, bam.
    // only for small label.
    return "transform: scaleX(.7); transform-box: fill-box;"

  },
	
	wrapLine() {
    // this function's goal is to retrieve text and to split it in
    // one to six lines. One very long word breaks the wrapping.

		index = Template.instance().counter.get();
		getText = Template.instance().data.discussion.discussionLines[index].lineContent
    wrapCurrentWord = false
    wrapCounter = 0
    lineCounter = 1
    lines = {line1:[], line2:[], line3:[], line4:[], line5:[], line6:[]}

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

        // console.log(wrapCounter, words[z])

        // we want to check, at EVERY letter, if we need to wrap current word,
        // and reset counter AS SOON as a letter is over 100.
        if (wrapCounter>=100) {
          // console.log(wrapCounter, words[z])
          // console.log("wrap at ", words[z])
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

      if (e.keyCode==32) {
      e.preventDefault();

      if (!hasItStarted) {
        hasItStarted = true
        document.getElementById("bulle").style.opacity=1
        document.getElementById("name").style.opacity=1
        document.getElementById("smalllabel").style.opacity=1
      }

      index = Template.instance().counter.get()
      endOfText = Template.instance().data.discussion.discussionLines.length-1

      // console.log(Template.instance().data.discussion.discussionLines)

      if (index<endOfText) {
        Template.instance().counter.set(index+1)
      }else{
        console.log("END OF TEXT")
        document.getElementById("homeBody").style.backgroundColor="black"

      }

    }
  }
});