// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Discussions } from '../../api/discussions/discussions.js';
import { DiscussionLines } from '../../api/discussionLines/discussionLines.js';

const lesChiens = [
{talker:true, lineContent:" Alors là tu vois je suis assis dans les gradins et j'ai juste de la lumière dans les yeux."},
{talker:true, lineContent:" Et là tout d'un coup il y a plein de chiens qui rentrent dans le théâtre en courant dans les allées!"},
{talker:false, lineContent:"comment ça des chiens? quel genre?"},
{talker:true, lineContent:"euh je sais pas, des bouviers belges?"},
{talker:false, lineContent:"ok des bouviers belges d'accord."},
{talker:true, lineContent:"après on aurait donné des biscuits au public, et donc il y a ces chiens sur scène, ils ont des biscuits dans la poche, mais c'est ça le twist, on leur dit pas ce qu'ils doivent faire tu vois"},
{talker:false, lineContent:"tu veux dire que le public a pas spécialement d'instructions?"},
{talker:true, lineContent:"voilà"},
{talker:false, lineContent:"hmm ok"},
{talker:true, lineContent:"donc tu vois c'est une pièce sur la participaiton, la responsabilité, etc etc. "},
{talker:true, lineContent:"On veut que le public se pose la question de la place qu'il a dans les dispositif : "},
{talker:true, lineContent:"est ce que c'est à cause de lui qu'il y a ces chiens sur scène? "},
{talker:true, lineContent:"D'où viennent ces chiens? "},
{talker:true, lineContent:"Qui en sont les maîtres? "},
{talker:true, lineContent:"Qu'adviendra-t-il d'eux après la fin de la tournée de ce spectacle?"},
{talker:false, lineContent:"ah ouais c'est cool"},
{talker:true, lineContent:"et donc là quelqu'un ou quelqu'une se lève, et va donner un biscuit à un chien"},
{talker:false, lineContent:"!!!"},
{talker:true, lineContent:"et alors les autres personnes dans le public se lèvent pour donner à manger aux chiens. Si quelqu'un ou quelqu'une dans le public a faim, il peut aussi manger le biscuit du chien (c'est là où se joue la question du choix)."},
{talker:true, lineContent:"voilà c'est ça mon projet dans l'idée."},
{talker:false, lineContent:"hé ben ça a l'air super."}
]

Meteor.startup(() => {
  // if the Links collection is empty
  if (Discussions.find().count() === 0) {

    theDate = new Date()
    options = {weekday : 'long', year: 'numeric', month: 'long', day: 'numeric'}
    theDate = theDate.toLocaleDateString('fr-FR', options)

    console.log("Discussions is empty!")

    Discussions.insert({      
      titleOfDiscussion : "Exemple (c'est pas une vraie discussion)",
      talkerName : "Alice",
      listenerName : "Bob",
      talkerColor : "AliceBlue",
      listenerColor : "FireBrick",
      date : theDate,
      place : "Bruxelles"
    })

  }
  

  if (DiscussionLines.find().count() === 0) {

    console.log("DiscussionLines is empty!")

    for (var i = 0; i < lesChiens.length; i++) {
      DiscussionLines.insert({      
        belongsToDiscussionNamed : "Exemple (c'est pas une vraie discussion)",
        isItTheTalker : lesChiens[i].talker,
        lineContent : lesChiens[i].lineContent,
        imgId : 1,
        lineIndex : i+1
      })
    }
  }
})