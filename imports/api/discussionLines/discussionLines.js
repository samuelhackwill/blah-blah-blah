import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const DiscussionLines = new Mongo.Collection('discussionLines');

export const DiscussionLinesSchema = new SimpleSchema({
	belongsToDiscussionNamed : {
		type : String,
	},		
	peepName : {
		type : String,
	},		
	lineContent : {
		type : String,
	},			
	imgId : {
		type : Number,
	},	
})

DiscussionLines.attachSchema(DiscussionLinesSchema);