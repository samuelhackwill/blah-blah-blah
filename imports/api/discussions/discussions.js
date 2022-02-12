import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Discussions = new Mongo.Collection('discussions');

export const DiscussionsSchema = new SimpleSchema({
	titleOfDiscussion : {
		type : String,
	},	
	talkerName : {
		type : String,
	},	
	listenerName : {
		type : String,
	},
	talkerColor : {
		type : String,
	},
	listenerColor : {
		type : String,
	},
	date : {
		type : String,
	},
	place : {
		type : String,
	}
})

Discussions.attachSchema(DiscussionsSchema);