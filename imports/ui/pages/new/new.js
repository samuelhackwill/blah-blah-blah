import './new.html';
import './new.css';

import { ReactiveVar } from 'meteor/reactive-var'

import '../../components/conversationParams.js';
import '../../components/conversationEditor.js';
import '../../components/conversationSaver.js';

import { MockDiscussions } from '../../../api/discussions/discussions.js';
import { MockDiscussionLines } from '../../../api/discussionLines/discussionLines.js';

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