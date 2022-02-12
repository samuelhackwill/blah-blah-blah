import './conversationEditor.html';
import './conversationEditor.css';


Template.conversationEditor.onCreated(function(){

	// this is a bit hacky sorry, we're using the global "ogTalker"
	// to track who was the talker, because if the user 
	// changes that name, it breaks the way we're tracking reactive data.
	// -> we currently have two sources of reactive data :
	// reactive Vars (for the /new page) and the db (for the /edit page).
	// it's kinda messed up, might need refactoring at some point.
	// i would make more sense to use a local client db maybe

	ogTalker = Template.instance().data._talkerName
})

Template.conversationEditor.helpers({
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
	}


})