import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const DiscussionLines = new Mongo.Collection('discussionLines');
export const MockDiscussionLines = new Mongo.Collection(null)

export const DiscussionLinesSchema = new SimpleSchema({
	belongsToDiscussionNamed : {
		type : String,
	},		
	isItTheTalker : {
		type : Boolean,
	},		
	lineContent : {
		type : String,
	},			
	imgId : {
		type : Number,
	},		
	lineIndex : {
		type : Number,
	},	
})

DiscussionLines.attachSchema(DiscussionLinesSchema);
MockDiscussionLines.attachSchema(DiscussionLinesSchema);