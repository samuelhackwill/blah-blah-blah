import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Discussions = new Mongo.Collection('discussions');
export const MockDiscussions = new Mongo.Collection(null)

export const DiscussionsSchema = new SimpleSchema({
	titleOfDiscussion : {
		type : String,
		max : 70
	},	
	talkerName : {
		type : String,
		max : 19
	},	
	listenerName : {
		type : String,
		max : 19
	},
	talkerColor : {
		type : String,
	},
	listenerColor : {
		type : String,
	},
	date : {
		type : String,
		max : 30
	},
	place : {
		type : String,
		max : 30
	}
})

Discussions.attachSchema(DiscussionsSchema);
MockDiscussions.attachSchema(DiscussionsSchema);