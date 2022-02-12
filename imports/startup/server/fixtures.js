// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Discussions } from '../../api/discussions/discussions.js';
import { DiscussionLines } from '../../api/discussionLines/discussionLines.js';

const lesChiens = [
{peep:"Alice", lineContent:" Alors là tu vois je suis assis dans les gradins et j'ai juste de la lumière dans les yeux."},
{peep:"Alice", lineContent:" Et là tout d'un coup il y a plein de chiens qui rentrent dans le théâtre en courant dans les allées!"},
{peep:"Bob", lineContent:"comment ça des chiens? quel genre?"},
{peep:"Alice", lineContent:"euh je sais pas, des bouviers belges?"},
{peep:"Bob", lineContent:"ok des bouviers belges d'accord."},
{peep:"Alice", lineContent:"après on aurait donné des biscuits au public, et donc il y a ces chiens sur scène, ils ont des biscuits dans la poche, mais c'est ça le twist, on leur dit pas ce qu'ils doivent faire tu vois"},
{peep:"Bob", lineContent:"tu veux dire que le public a pas spécialement d'instructions?"},
{peep:"Alice", lineContent:"voilà"},
{peep:"Bob", lineContent:"hmm ok"},
{peep:"Alice", lineContent:"donc tu vois c'est une pièce sur la participaiton, la responsabilité, etc etc. "},
{peep:"Alice", lineContent:"On veut que le public se pose la question de la place qu'il a dans les dispositif : "},
{peep:"Alice", lineContent:"est ce que c'est à cause de lui qu'il y a ces chiens sur scène? "},
{peep:"Alice", lineContent:"D'où viennent ces chiens? "},
{peep:"Alice", lineContent:"Qui en sont les maîtres? "},
{peep:"Alice", lineContent:"Qu'adviendra-t-il d'eux après la fin de la tournée de ce spectacle?"},
{peep:"Bob", lineContent:"ah ouais c'est cool"},
{peep:"Alice", lineContent:"et donc là quelqu'un ou quelqu'une se lève, et va donner un biscuit à un chien"},
{peep:"Bob", lineContent:"!!!"},
{peep:"Alice", lineContent:"et alors les autres personnes dans le public se lèvent pour donner à manger aux chiens. Si quelqu'un ou quelqu'une dans le public a faim, il peut aussi manger le biscuit du chien (c'est là où se joue la question du choix)."},
{peep:"Alice", lineContent:"voilà c'est ça mon projet dans l'idée."},
{peep:"Bob", lineContent:"hé ben ça a l'air super."}
]


Meteor.startup(() => {
  // if the Links collection is empty
  if (Discussions.find().count() === 0) {

    theDate = new Date()
    options = {weekday : 'long', year: 'numeric', month: 'long', day: 'numeric'}
    theDate = theDate.toLocaleDateString('fr-FR', options)

    console.log("Discussions is empty!")

    Discussions.insert({      
      titleOfDiscussion : "les chiens",
      talkerName : "Bob",
      listenerName : "Alice",
      talkerColor : "#f7ba62",
      listenerColor : "#da735b",
      date : theDate,
      place : "Bruxelles"
    })

  }


  if (DiscussionLines.find().count() === 0) {

    console.log("DiscussionLines is empty!")

    for (var i = 0; i < lesChiens.length; i++) {
      DiscussionLines.insert({      
        belongsToDiscussionNamed : "les chiens",
        peepName : lesChiens[i].peep,
        lineContent : lesChiens[i].lineContent,
        imgId : 1,
        lineIndex : i+1
      })
    }
  }
})