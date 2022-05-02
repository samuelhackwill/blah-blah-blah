import './conversationParams.html';
import './conversationParams.css';

import { DiscussionLines } from '../../api/discussionLines/discussionLines.js';
import { Discussions } from '../../api/discussions/discussions.js';
import { MockDiscussionLines } from '../../api/discussionLines/discussionLines.js';
import { MockDiscussions } from '../../api/discussions/discussions.js';

import { allCssNamedColors } from '../../api/discussions/methods.js';
import { invalidKeys } from '../layouts/body/body.js'
import { updateImminent } from '../layouts/body/body.js'

newValue = {}

Template.conversationParams.onCreated(function(){

	console.log(this)

})

Template.conversationParams.events({

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

		indexInArray = allCssNamedColors.findIndex(color => color == this[_target])

		indexInArray = indexInArray +1

		if (indexInArray == allCssNamedColors.length) {
			indexInArray = 0
		}

		if(areWeInTheEditingView()){
			// query for edit
			Meteor.call('colorChange', this.titleOfDiscussion , _target == "talkerColor", this[_target])
		}else{
			// query for new
		    MockDiscussions.update({titleOfDiscussion:this.titleOfDiscussion}, {$set:{[_target] : allCssNamedColors[indexInArray]}})
		}


	},

	"keyup .discussionParamsForm":function(e){

		if (invalidKeys.find(key => key == e.originalEvent.keyCode)) {
			console.log("return ")
			return
		}

		newValue[e.target.name] = e.target.value

		clearTimeout(updateImminent[e.target.name])

		updateImminent[e.target.name] = setTimeout(() => {
			if (areWeInTheEditingView()) {
				Meteor.call('discussionParamChange', this.titleOfDiscussion, e.target.name, newValue[e.target.name])
			}else{
				MockDiscussions.update({titleOfDiscussion:this.titleOfDiscussion}, {$set:{[e.target.name] : newValue[e.target.name]}})    
			}
		}, 3000)
	}
})