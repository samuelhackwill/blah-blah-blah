import './conversationEditor.html';
import './conversationEditor.css';

import { DiscussionLines } from '../../api/discussionLines/discussionLines.js';
import { Discussions } from '../../api/discussions/discussions.js';
import { MockDiscussionLines } from '../../api/discussionLines/discussionLines.js';
import { MockDiscussions } from '../../api/discussions/discussions.js';

import { invalidKeys } from '../layouts/body/body.js'
import { updateImminent } from '../layouts/body/body.js'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.conversationEditor.onCreated(function(){

	console.log(this)

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
		
		if(areWeInTheEditingView()){
			// query for edit
			_query = Discussions.find({titleOfDiscussion : this.belongsToDiscussionNamed}).fetch()[0][_talkerOrListener]
		}else{
			// query for new
			_query = MockDiscussions.find({titleOfDiscussion : this.belongsToDiscussionNamed}).fetch()[0][_talkerOrListener]
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
	},

	isItEditingView:function(){
		return areWeInTheEditingView()
	}

})


Template.conversationEditor.events({

	"click .speechBalloonLabel" : function(e){

		if(areWeInTheEditingView()){
			Meteor.call('peepStatusChange', this.belongsToDiscussionNamed , this.isItTheTalker, this.lineIndex)
		}else{
		    _newStatus =! this.isItTheTalker
		    MockDiscussionLines.update({belongsToDiscussionNamed: this.belongsToDiscussionNamed , lineIndex : this.lineIndex}, {$set : {isItTheTalker : _newStatus}})
		}
	},

	"click .addTextButton" : function(e){

		currentIndex = this.discussionLinesData.length
		_index = currentIndex + 1

		if(areWeInTheEditingView()){
			// this is executed by the component when it's in the /edit view
			Meteor.call("insertNewLine", this.discussionLinesData[0].belongsToDiscussionNamed, _index)
		}else{
			// this is executed by the component when it's in the /new view

			MockDiscussionLines.insert({
	        belongsToDiscussionNamed : "mockDiscussion",
	        isItTheTalker : true,
	        lineContent : "bla bla blah.",
	        imgId : 1,
	        lineIndex : _index})			
		}
	},

	"click .delete" : function(e){
		if(areWeInTheEditingView()){
			Meteor.call("removeLine", this._id)
		}else{
			MockDiscussionLines.remove({_id : this._id})
		}

	},

	"keyup .speechBalloon":function(e){

		if (invalidKeys.find(key => key == e.originalEvent.keyCode)) {
			console.log("return ")
			return
		}

		newContent = e.target.value

		clearTimeout(updateImminent[this._id])

		updateImminent[this._id] = setTimeout(() => {
			if (areWeInTheEditingView()) {
				Meteor.call('lineContentChange', this._id, newContent)
			}else{
				MockDiscussionLines.update({_id:this._id}, {$set:{lineContent : newContent}})    
			}
		}, 750)
	},

	"click .save":function(e){
		document.getElementsByClassName("save")[0].style.pointerEvents = "none"
		document.getElementsByClassName("save")[0].innerHTML = "chargement..."

		setTimeout(() => {			
			Meteor.call("makeNewDiscussion", e.target.previousElementSibling.value, MockDiscussions.find({}).fetch()[0])
			Meteor.call("insertBunchOfNewLines", e.target.previousElementSibling.value, this.discussionLinesData)
		
			FlowRouter.go('edit', {titleOfDiscussion: e.target.previousElementSibling.value});		
		},1000)

	}


})