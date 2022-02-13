import './conversationEditor.html';
import './conversationEditor.css';

import { DiscussionLines } from '../../api/discussionLines/discussionLines.js';

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

	// REFACTORING : we could probably have one function returning an object here,
	// and the helpers take the data they want from it.

	getRelevantPeepColor : function(){
		if (this.peepName==ogTalker) {
			return Template.instance().data._talkerColor
		}else{
			return Template.instance().data._listenerColor
		}
	},

	getRelevantPeep : function(){

		if (this.peepName==ogTalker) {
			return Template.instance().data._talkerName
		}else{
			return Template.instance().data._listenerName
		}
	},

	_style : function(arg){
		if (this.peepName==ogTalker) {
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

	// "click .speechBalloonLabel" : function(e){
	// 	console.log(this.belongsToDiscussionNamed, this.lineIndex, "is it a talker? ", this.peepName==ogTalker)

	// 	newPeepName = ""

	// 	if (this.peepName==ogTalker) {
	// 		newPeepName = Template.instance().data._talkerName
	// 	}else{
	// 		newPeepName = ogTalker
	// 	}

	// 	console.log(newPeepName)

	// 	// find by belongsToDiscussionNamed && lineIndex

	// 	// ok so what we should do is update the DB and give that peep a name equal to OG TALKER
	// 	// if it's the talker, and whatever if it's not the talker.
	// 	// this is to conform with the STRANGE behaviour of the helper ci-dessus.
	// 	__id = DiscussionLines.find({belongsToDiscussionNamed:this.belongsToDiscussionNamed, lineIndex : this.lineIndex}).fetch()[0]._id	


	// 	Meteor.call('tempPeepChange',__id, newPeepName)

	// 	this.peepName = newPeepName

	// 	console.log("new peep name ", this.peepName)

	// }
})