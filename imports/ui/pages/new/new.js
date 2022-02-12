import './new.html';
import './new.css';

import { ReactiveVar } from 'meteor/reactive-var'

import '../../components/conversationParams.js';
import '../../components/conversationEditor.js';
import '../../components/conversationSaver.js';


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
	discussionData(){
		console.log(Template.instance())
		return{
			_talkerName : Template.instance().talkerName.get(), 
			_listenerName : Template.instance().listenerName.get(),
			_talkerColor : Template.instance().talkerColor.get(), 
			_listenerColor : Template.instance().listenerColor.get()
		}
	},	

	discussionLinesData(){
		return{
			_talkerName : Template.instance().talkerName.get(), 
			_listenerName : Template.instance().listenerName.get(),
			_talkerColor : Template.instance().talkerColor.get(), 
			_listenerColor : Template.instance().listenerColor.get()
		}
	}
})


Template.new.events({
	"click .colorPicker":function(e){

		// the system here makes it possible that both peeps
		// will have the same color. We could change that
		// by splicing the array rather than reading it
		// and replacing the color the end of the array
		// everytime we change color.

		if (e.target.id == "colorPicker1") {
			_target = "talkerColor"
		}else{
			_target = "listenerColor"
		}

		randomNmbr = Math.floor(Math.random()*allCssNamedColors.length)
		Template.instance()[_target].set(allCssNamedColors[randomNmbr])

	},

	"keyup .nameForm":function(e){

		if (e.target.name == "name1") {
			_target = "talkerName"
		}else{
			_target = "listenerName"
		}

		Template.instance()[_target].set(e.target.value)

	}
})