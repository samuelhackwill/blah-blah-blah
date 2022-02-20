import './theDrawing.html';
import './theDrawing.css';

allBonhommes = ["listener", "brascroises"] // a in onRendered is responsible for adding the rest
allTalkers = []
allListeners = []

// this is to class the drawings by usage : some of these drawings 
// cannot be used when the listener or the talker talks because their mouth
// is closed. simple
silentTalker = ["arrier", "acoude", "inquiet", "brascroises", "tetedanslesmains"]
openMouthTalker = ["cote", "shruggy", "arrier", "poing", "exhilarated", "touche", "acoude", "brasouverts", "tetedanslesmains", "enlair", "inquiet", "tourne"]
silentListener = ["listenerthinksmore", "listener", "listenertourne", "listenerleg"]
openMouthListener = ["listenertourparle", "listenerparle", "listenerthinksmore"]

// this variable is used to record who has talked last : we need this
// because we don't want to change the illustration every time the spacebar
// is pressed, but only when it's a new talker talking.
lastTalkingPeepWasTalker = undefined

Template.theDrawing.onCreated(function theDrawingOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  place = this.data.discussion.discussionParams[0].place
  // setTimeout(() => {this.counter.set(this.counter.get() + 1)}, 2.0*1000)

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
    },7000)

    setTimeout(function(){
      document.getElementById("date").style.opacity=0
    },11000)

    setTimeout(function(){
      document.getElementById("text").style.opacity=1
    },13000)

    // allHiddenLayers = document.getElementsByClassName("st2")
    // for (var i = allHiddenLayers.length - 1; i >= 0; i--) {
    //   allHiddenLayers[i].style.opacity = 1
    // }

    for (var i = document.getElementsByClassName("st13").length - 1; i >= 0; i--) {
      allBonhommes.push(document.getElementsByClassName("st13")[i].id)
    }

    for (var i = document.getElementsByClassName("listener").length - 1; i >= 0; i--) {
      allListeners.push(document.getElementsByClassName("listener")[i])
    }

    for (var i = document.getElementsByClassName("talker").length - 1; i >= 0; i--) {
      allTalkers.push(document.getElementsByClassName("talker")[i])
    }

    document.getElementsByClassName("eventCatcher")[0].focus()
  })

})

Template.theDrawing.helpers({

	getColor:function(who){
		return this.discussion.discussionParams[0][who.hash.arg+"Color"]
	},

  labelStyler(){
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


        // for (var i = allBonhommes.length - 1; i >= 0; i--) {
        //   // first hide EVERYONNNNE
        //   document.getElementById(allBonhommes[i]).style.opacity=0
        // }



        index = Template.instance().counter.get()
        endOfText = Template.instance().data.discussion.discussionLines.length-1
        isItTheTalker = Template.instance().data.discussion.discussionLines[index+1].isItTheTalker
        console.log("is it the talker?", isItTheTalker)


        isItTheTalker ? lastTalkingPeepId = "brascroises" : lastTalkingPeepId = "listener"

        if (index<endOfText) {
          // we want to increment the counter every time the spacebar
          // is pressed to get new dialog lines
          Template.instance().counter.set(index+1)
        }else{
          // if we're at the end of the text, reset both peeps
          // to crossed arms & fade to black.
          console.log("END OF TEXT")
          document.getElementById("homeBody").style.backgroundColor="black"
          return
        }

        if (lastTalkingPeepWasTalker == undefined) {
          // during the first keypress we want to do specific stuff
          document.getElementById("smalllabel").style.opacity=1
          document.getElementById("name").style.opacity=1
          document.getElementById("bulle").style.opacity=1
        }

        if (lastTalkingPeepId != undefined) {
          console.log("hiding ", lastTalkingPeepId)
          document.getElementById(lastTalkingPeepId).style.opacity=0
        }

        if (isItTheTalker == true) {
          // if the talker's currently talking, we either want 
          // to IMMEDIATELY change its image if it was the other guy
          // talking, or change its image at random? idk.
          // also what might be funny is that the talker lags
          // some time after having been interupted when he's been
          // talking for a very long time. easy with a settimeout
          if (lastTalkingPeepWasTalker == true) {
            console.log("TALKER was talking and is still talking!")
            // so as we said, if last person talking was talker, 
            // we're not necessicarily going to change the image. 

          }else{
            // if last person talking was the listener though,
            // we want to immediately change the image to make it
            // clear that the talker is now talking. 
            var changeTalkerTo = openMouthTalker[Math.floor(Math.random()*openMouthTalker.length)];
            console.log("TALKER CHANGE", changeTalkerTo)
            document.getElementById(changeTalkerTo).style.opacity=1

            var changeListenerTo = silentListener[Math.floor(Math.random()*silentListener.length)];
            console.log("TALKER CHANGE", changeListenerTo)
            document.getElementById(changeListenerTo).style.opacity=1

            lastTalkingPeepWasTalker = true
            lastTalkingPeepId = changeTalkerTo

          }
          return
        }else{
          // if it's the listener who's talking, we're
          // applying the same logic : immediately change image
          // if the last talker was NOT the listener,
          // and maybe change if he was already talking.
          if (lastTalkingPeepWasTalker == true) {
            // immediately change imge
            var changeTalkerTo = silentTalker[Math.floor(Math.random()*silentTalker.length)];
            console.log("LISTENER CHANGE ", changeTalkerTo)
            document.getElementById(changeTalkerTo).style.opacity=1

            var changeListenerTo = openMouthListener[Math.floor(Math.random()*openMouthListener.length)];
            console.log("LISTENER CHANGE ", changeListenerTo)
            document.getElementById(changeListenerTo).style.opacity=1
            lastTalkingPeepWasTalker = false
            lastTalkingPeepId = changeListenerTo

          }else{
            console.log("LISTENER was talking and is still talking!")
            // maybe change image.

          }
          return
        }

    }
  }
});