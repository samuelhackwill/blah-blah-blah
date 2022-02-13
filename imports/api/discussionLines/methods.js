import { DiscussionLines } from './discussionLines.js'

Meteor.methods({
  'tempPeepChange': function (__id, newPeepName) {
    console.log(__id, newPeepName)
    DiscussionLines.update({__id}, {$set : {peepName : newPeepName}})
  }
})