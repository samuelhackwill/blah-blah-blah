import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Discussions } from './discussions.js';
import { DiscussionLines } from '../discussionLines/discussionLines.js';

export const allCssNamedColors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGrey","LightSteelBlue","Lime","LimeGreen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","Sienna","Silver","SkyBlue","SlateBlue","SlateGrey","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"]

Meteor.methods({
  'discussions.insert'(obj) {

    DiscussionsSchema.validate(obj);

    return Discussions.insert({obj});
  },

  'colorChange':function(_discussion, _isItTalker, _formerColor){

    indexInArray = allCssNamedColors.findIndex(color => color == _formerColor)

    indexInArray = indexInArray +1

    if (_isItTalker) {
      _talkerOrListener = "talkerColor"
    }else{
      _talkerOrListener = "listenerColor"
    }

    if (indexInArray == allCssNamedColors.length) {
        indexInArray = 0
    }

    // console.log(_formerColor, indexInArray, allCssNamedColors[indexInArray])
    // console.log(allCssNamedColors[130])

    Discussions.update({titleOfDiscussion:_discussion}, {$set:{[_talkerOrListener] : allCssNamedColors[indexInArray]}})
  },

  'peepNameChange':function(_discussion, _isItTalker, _newName){

    if (_isItTalker) {
      _talkerOrListener = "talkerName"
    }else{
      _talkerOrListener = "listenerName"
    }

    if (isItNewTemplate) {
      MockDiscussions.update({titleOfDiscussion:_discussion}, {$set:{[_talkerOrListener] : _newName}})    
    }else{
      Discussions.update({titleOfDiscussion:_discussion}, {$set:{[_talkerOrListener] : _newName}})
    }
  }
});

class DiscussionsCollection extends Mongo.Collection {
  remove(selector, callback) {
    // when we remove a discussion, we also want to get rid of all discussionlines
    // from that discussion for cleaning purposes.

    DiscussionLines.remove({belongsToDiscussionNamed: selector});

    return super.remove(selector, callback);
  }
}
