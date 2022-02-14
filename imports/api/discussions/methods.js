import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Discussions } from './discussions.js';
import { DiscussionLines } from '../discussionLines/discussionLines.js';

const allCssNamedColors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","Lime","LimeGreen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"]

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

    Discussions.update({titleOfDiscussion:_discussion}, {$set:{[_talkerOrListener] : allCssNamedColors[indexInArray]}})

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
