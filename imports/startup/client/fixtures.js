// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { MockDiscussions } from '../../api/discussions/discussions.js';
import { MockDiscussionLines } from '../../api/discussionLines/discussionLines.js';

const mock = [
{talker:true, lineContent:"Bla bla bla!"},
{talker:false, lineContent:"Bla bla?"},
]

  if (MockDiscussions.find().count() === 0) {

    theDate = new Date()
    options = {weekday : 'long', year: 'numeric', month: 'long', day: 'numeric'}
    theDate = theDate.toLocaleDateString('fr-FR', options)

    MockDiscussions.insert({      
      titleOfDiscussion : "mockDiscussion",
      talkerName : "Une personne",
      listenerName : "Une autre personne",
      talkerColor : "Cyan",
      listenerColor : "Gold",
      date : theDate,
      place : "Montréal"
    })

  }
  

  if (MockDiscussionLines.find().count() === 0) {

    for (var i = 0; i < mock.length; i++) {
      MockDiscussionLines.insert({      
        belongsToDiscussionNamed : "mockDiscussion",
        isItTheTalker : mock[i].talker,
        lineContent : mock[i].lineContent,
        imgId : 1,
        lineIndex : i+1
      })
    }
  }
