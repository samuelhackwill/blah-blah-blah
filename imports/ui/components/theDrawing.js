import './theDrawing.html';
import './theDrawing.css';

allBonhommes = ["listener", "brascroises"] // a in onRendered is responsible for adding the rest
allTalkers = []
allListeners = []

// this is to class the drawings by usage : some of these drawings 
// cannot be used when the listener or the talker talks because their mouth
// is closed. simple
silenttalker = ["arrier", "inquiet", "brascroises", "tetedanslesmains"]
openMouthtalker = ["cote", "shruggy", "arrier", "poing", "exhilarated", "touche", "acoude", "brasouverts", "enlair", "inquiet", "tourne"]
silentlistener = ["listenerthinksmore", "listener", "listenertourne", "listenerleg"]
openMouthlistener = ["listenertourparle", "listenerparle"]

// this variable is used to record who has talked last : we need this
// because we don't want to change the illustration every time the spacebar
// is pressed, but only when it's a new talker talking.
lastTalkingPeepWas = undefined

Template.theDrawing.onCreated(function theDrawingOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  place = this.data.discussion.discussionParams[0].place
  // setTimeout(() => {this.counter.set(this.counter.get() + 1)}, 2.0*1000)

  sizeOfName = 0
  sizeOfSmallLabel = 30

  autoEventsHandle = {}
  autoEventsCounter = 1

  if(Template.instance().data.discussion.discussionParams[0].listenerName.length>7) isListenerNameBig = true
  if(Template.instance().data.discussion.discussionParams[0].talkerName.length>7) isTalkerNameBig = true

  Template.instance().data.discussion.discussionLines.unshift({lineContent:"", isItTheTalker:Template.instance().data.discussion.discussionLines[this.counter.get()].isItTheTalker})

});

Template.theDrawing.onRendered(function(){
  $(document).ready(function() {
    
//     autoEventsHandle.e1 = setTimeout(function(){
// -      introEvents(1)    
//     },1000)

//     autoEventsHandle.e2 = setTimeout(function(){
// -      introEvents(2)    
//     },4000)

    autoEventsHandle.e3 = setTimeout(function(){
-      introEvents(3)    
    },0)

    autoEventsHandle.e4 = setTimeout(function(){
-      introEvents(4)    
    },5000)


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

  getNames:function(){
    return {talkerName : Template.instance().data.discussion.discussionParams[0].talkerName}
  },

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

      // if (autoEventsCounter<5) {
      //   // this is to bypass autoevents
      //   // if someone starts pressing the spacebar too early
      //   _target = "e"+autoEventsCounter
      //   clearTimeout(autoEventsHandle[_target])
      //   console.log("clearing ", _target, "counter now", autoEventsCounter)
      //   introEvents([autoEventsCounter])
      //   return
      // }


        index = Template.instance().counter.get()
        endOfText = Template.instance().data.discussion.discussionLines.length-1


        if (index<endOfText) {
          // we want to increment the counter every time the spacebar
          // is pressed to get new dialog lines
          Template.instance().counter.set(index+1)
        }else{
          // if we're at the end of the text, reset both peeps
          // to crossed arms & fade to black.
          console.log("END OF TEXT")
          document.getElementById("shutter").style.display="block"
          document.getElementsByClassName("eventCatcher")[0].style.display="none"
          
          document.getElementById("smalllabel").style.opacity=0
          document.getElementById("name").style.opacity=0
          document.getElementById("bulle").style.opacity=0
          document.getElementById("text").style.opacity=0

          document.getElementById("credits").style.opacity=1

          talkingPeepChange("bothSilence", null)

          setTimeout(function(){
            document.getElementById("shutter").style.opacity=1
          },2000)
          return
        }

        Template.instance().data.discussion.discussionLines[Template.instance().counter.get()].isItTheTalker ? currentTalker = "talker" : currentTalker = "listener"

        if (lastTalkingPeepWas == undefined) {
          // during the first keypress we want to do specific stuff
          document.getElementById("smalllabel").style.opacity=1
          document.getElementById("name").style.opacity=1
          document.getElementById("bulle").style.opacity=1
          document.getElementById("text").style.opacity=1

          talkingPeepChange(currentTalker, "openMouth")
        }else{
          if (lastTalkingPeepWas == currentTalker) {
            console.log("same guy, don't do anything.")
          }else{
            console.log("different guy, do something!!!")
            if (currentTalker == "listener") {
              talkingPeepChange("listener", "openMouth")
              talkingPeepChange("talker", "silent")
            }else{
              talkingPeepChange("talker", "openMouth")
              talkingPeepChange("listener", "silent")
            }
          }
        }
          console.log(lastTalkingPeepWas, currentTalker)

        // record who was the last talker
        lastTalkingPeepWas = currentTalker

    }
  }
});

introEvents = function(number){
  if (number==1) {
    document.getElementById("date").style.opacity=1
    autoEventsCounter = autoEventsCounter + 1

  }  
  if (number==2) {
    document.getElementById("date").innerHTML=place
    autoEventsCounter = autoEventsCounter + 1
  }  

  if (number==3) {
    document.getElementById("shutter").style.opacity=0
    autoEventsCounter = autoEventsCounter + 1
  }

  if (number==4) {
    document.getElementById("shutter").style.display="none"
    document.getElementById("date").style.display="none"
    autoEventsCounter = autoEventsCounter + 1
  }

}

talkingPeepChange = function(who, silentOrOpenMouth){

// expected who : "listener" OR "talker"
// expected silentOrOpenMouth : "silent" OR "openMouth"

  if (who=="bothSilence") {
    for (var i = document.getElementsByClassName("listener").length - 1; i >= 0; i--) {
      document.getElementsByClassName("listener")[i].style.opacity=0
    }

    for (var i = document.getElementsByClassName("talker").length - 1; i >= 0; i--) {
      document.getElementsByClassName("talker")[i].style.opacity=0
    }

    document.getElementById("brascroises").style.opacity=1
    document.getElementById("listener").style.opacity=1
    return
  }

_arrayName = silentOrOpenMouth+who

  for (var i = document.getElementsByClassName(who).length - 1; i >= 0; i--) {
  document.getElementsByClassName(who)[i].style.opacity=0
  }

  var changeTo = window[_arrayName][Math.floor(Math.random()*window[_arrayName].length)];
  console.log(who+" switch to "+ silentOrOpenMouth, changeTo)
  document.getElementById(changeTo).style.opacity=1    


}

// texte intro


// texte outro

// nousparlions.com a été écrit en février 2022 par Samuel Hackwill,
// et testé pour la première fois par les artistes de l'Amicale (Lille) 
// & de la Serre (Montréal) pendant le cabaret de curiosités 2022, 
// au Phénix, scène nationale de Valenciennes.