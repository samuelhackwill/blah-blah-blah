import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Discussions = new Mongo.Collection('discussions');
export const MockDiscussions = new Mongo.Collection(null)

export const DiscussionsSchema = new SimpleSchema({
	titleOfDiscussion : {
		type : String,
		max : 42
	},	
	talkerName : {
		type : String,
		max : 42
	},	
	listenerName : {
		type : String,
		max : 42
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
		max : 42
	}
})

Discussions.attachSchema(DiscussionsSchema);
MockDiscussions.attachSchema(DiscussionsSchema);