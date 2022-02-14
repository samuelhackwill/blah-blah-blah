import { DiscussionLines } from './discussionLines.js'

Meteor.methods({
  'peepStatusChange': function (_discussion, _formerPeepStatus, _lineIndex) {
    _newStatus =! _formerPeepStatus
    DiscussionLines.update({belongsToDiscussionNamed: _discussion , lineIndex : _lineIndex}, {$set : {isItTheTalker : _newStatus}})
  }
})