// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Discussions } from '../../api/discussions/discussions.js';

Meteor.startup(() => {
  // if the Links collection is empty
  if (Discussions.find().count() === 0) {

    console.log("Discussions is empty!")

    Discussions.insert({      
      titleOfDiscussion : "les chiens",
      talkerName : "Bob",
      listenerName : "Alice",
      talkerColor : "#f7ba62",
      listenerColor : "#da735b",
      date : new Date(),
      place : "Bruxelles"
})

  }
});