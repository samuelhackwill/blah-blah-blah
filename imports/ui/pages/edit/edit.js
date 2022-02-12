import './edit.html';
import './edit.css';

import '../../components/conversationParams.js';
import '../../components/conversationEditor.js';
import '../../components/conversationSaver.js';

import { Discussions } from '../../../api/discussions/discussions.js';
import { DiscussionLines } from '../../../api/discussionLines/discussionLines.js';

Template.edit.onCreated(function(){
	// console.log(this)
})

Template.edit.helpers({
	discussionData(){
		return{
			discussionData:Discussions.find({}).fetch()
		}
	},	

	discussionLinesData(){
		return{
			discussionLinesData:DiscussionLines.find({}).fetch()
		}
	}
})