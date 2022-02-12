import './edit.html';
import './edit.css';

import '../../components/conversationParams.js';
import '../../components/conversationEditor.js';
import '../../components/conversationSaver.js';

import { ReactiveVar } from 'meteor/reactive-var'

import { Discussions } from '../../../api/discussions/discussions.js';
import { DiscussionLines } from '../../../api/discussionLines/discussionLines.js';

Template.edit.onCreated(function(){
	// console.log(this)

	// we need to get the names from the database and make them reactive local
	// vars because the names are then dynamicaly used in the conversationEditor
	// component to display speechbaloons labels.

	this.talkerName = new ReactiveVar(Discussions.find({}).fetch()[0].talkerName);
	this.listenerName = new ReactiveVar(Discussions.find({}).fetch()[0].listenerName);

	this.talkerColor = new ReactiveVar(Discussions.find({}).fetch()[0].talkerColor)
	this.listenerColor = new ReactiveVar(Discussions.find({}).fetch()[0].talkerColor)
})

Template.edit.helpers({
	discussionData(){
		return{
			discussionData:Discussions.find({}).fetch(), 
			_talkerName : Template.instance().talkerName.curValue, 
			_listenerName : Template.instance().listenerName.curValue,
			_talkerColor : Template.instance().talkerColor.curValue, 
			_listenerColor : Template.instance().listenerColor.curValue
		}
	},	

	discussionLinesData(){
		return{
			discussionLinesData:DiscussionLines.find({}).fetch()
		}
	}
})