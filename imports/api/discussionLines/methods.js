import { DiscussionLines } from './discussionLines.js'

Meteor.methods({
  'peepStatusChange': function (_discussion, _formerPeepStatus, _lineIndex) {
    _newStatus =! _formerPeepStatus
    DiscussionLines.update({belongsToDiscussionNamed: _discussion , lineIndex : _lineIndex}, {$set : {isItTheTalker : _newStatus}})
  },

  'insertNewLine': function(_discussion, _index){
    DiscussionLines.insert({
      belongsToDiscussionNamed : _discussion,
      isItTheTalker : true,
      lineContent : "bla bla blah.",
      imgId : 1,
      lineIndex : _index 
    })
  },

  'removeLine':function(__id){
    DiscussionLines.remove({_id:__id})
  }
})