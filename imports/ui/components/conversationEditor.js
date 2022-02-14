import './conversationEditor.html';
import './conversationEditor.css';

import { DiscussionLines } from '../../api/discussionLines/discussionLines.js';
import { Discussions } from '../../api/discussions/discussions.js';
import { MockDiscussionLines } from '../../api/discussionLines/discussionLines.js';
import { MockDiscussions } from '../../api/discussions/discussions.js';

Template.conversationEditor.onCreated(function(){

	// REFACTORING : this is a bit hacky sorry, we're using the global "ogTalker"
	// to track who was the talker, because if the user 
	// changes that name, it breaks the way we're tracking reactive data.
	// -> we currently have two sources of reactive data :
	// reactive Vars (for the /new page) and the db (for the /edit page).
	// it's kinda messed up, might need refactoring at some point.
	// i would make more sense to use a local client db maybe

	ogTalker = Template.instance().data._talkerName
})

Template.conversationEditor.helpers({

	peepName : function(){

		// console.log(Template.instance().view.parentView.parentView.name == "Template.new")
		// console.log(this)

		// console.log(this.isItTheTalker)

		if (this.isItTheTalker == true) {
			_talkerOrListener = "talkerName"
		}else{
			_talkerOrListener = "listenerName"
		}

		if(Discussions.find({}).fetch()==![]){
			// query for new
			_query = MockDiscussions.find({titleOfDiscussion : this.belongsToDiscussionNamed}).fetch()[0][_talkerOrListener]
		}else{
			// query for edit
			_query = Discussions.find({titleOfDiscussion : this.belongsToDiscussionNamed}).fetch()[0][_talkerOrListener]
		}

		return _query
	},


	getRelevantPeepColor : function(){

		if (this.isItTheTalker == true) {
			_talkerOrListener = "talkerColor"
		}else{
			_talkerOrListener = "listenerColor"
		}
		
		if(Discussions.find({}).fetch()==![]){
			// query for new
			_query = MockDiscussions.find({titleOfDiscussion : this.belongsToDiscussionNamed}).fetch()[0][_talkerOrListener]
		}else{
			// query for edit
			_query = Discussions.find({titleOfDiscussion : this.belongsToDiscussionNamed}).fetch()[0][_talkerOrListener]
		}

		return _query	
	},

	_style : function(arg){
		if (this.isItTheTalker == true) {
			// this is a talker
			switch(arg.hash.arg){
				case "placeHolder1" :
				return "order : 1;"
				break				
				case "placeHolder2" :
				return "order : 2;"
				break					
				case "placeHolder3" :
				return "order : 3;"
				break				
				case "speechBalloon" :
				return "order : 4;"
				break				
				case "drawing" :
				return "order : 5;"
				break							
				case "drawingChild" :
				return "align-self : flex-start"
				break			
			break
			}
		}else{
			// this is a non-talker
			switch(arg.hash.arg){
				case "placeHolder1" :
				return "order : 5;"
				break				
				case "placeHolder2" :
				return "order : 4;"
				break						
				case "placeHolder3" :
				return "order : 3;"
				break				
				case "speechBalloon" :
				return "order : 2;"
				break				
				case "drawing" :
				return "order : 1;"					
				case "drawingChild" :
				return "align-self : flex-end"
				break		
			break
			}
		}
	}

})


Template.conversationEditor.events({

	"click .speechBalloonLabel" : function(e){
		Meteor.call('peepStatusChange', this.belongsToDiscussionNamed , this.isItTheTalker, this.lineIndex)
	}

})