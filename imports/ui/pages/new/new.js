import './new.html';
import './new.css';

import { ReactiveVar } from 'meteor/reactive-var'

import '../../components/conversationParams.js';
import '../../components/conversationEditor.js';
import '../../components/conversationSaver.js';

import { MockDiscussions } from '../../../api/discussions/discussions.js';
import { MockDiscussionLines } from '../../../api/discussionLines/discussionLines.js';

Template.new.onCreated(function(){
	// console.log(this)

	// we need to get the names from the database and make them reactive local
	// vars because the names are then dynamicaly used in the conversationEditor
	// component to display speechbaloons labels.
	this.talkerName = new ReactiveVar("Une première personne");
	this.listenerName = new ReactiveVar("Une deuxième personne");

	randomNmbr = Math.floor(Math.random()*allCssNamedColors.length)

	this.talkerColor = new ReactiveVar(allCssNamedColors[randomNmbr])

	randomNmbr = Math.floor(Math.random()*allCssNamedColors.length)

	this.listenerColor = new ReactiveVar(allCssNamedColors[randomNmbr])
})

Template.new.helpers({
	newDiscussionData(){
		return {
			discussionData: MockDiscussions.find({}).fetch()
		}
	},	

	newDiscussionLinesData(){
		return{
			discussionLinesData:MockDiscussionLines.find({}).fetch(),
		}
	}
})