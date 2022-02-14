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
  },

  'lineContentChange' : function(__id, _content){
    DiscussionLines.update({_id:__id}, {$set : {lineContent : _content}})
  },

  "insertBunchOfNewLines":function(_discussion, dataObj){
    console.log("inserting bunch of new lines ! ", _discussion, dataObj)

    for (var i = 0; i < dataObj.length; i++) {
      DiscussionLines.insert({
        belongsToDiscussionNamed : _discussion,
        isItTheTalker : dataObj[i].isItTheTalker,
        lineContent : dataObj[i].lineContent,
        imgId : dataObj[i].imgId,
        lineIndex : dataObj[i].lineIndex 
      })
    }
  }
})
