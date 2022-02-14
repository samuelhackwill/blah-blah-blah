import './conversationParams.html';
import './conversationParams.css';

Template.conversationParams.onCreated(function(){
	// console.log(this)
})

Template.conversationParams.helpers({
})

updateImminent = {}

invalidKeys = [9, 27, 37, 38, 39, 40, 16, 17, 18, 224]
// tab, escape, arrows, maj, ctrl, alt, option.


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

		console.log(this.titleOfDiscussion , _target == "talkerColor", this[_target])
		Meteor.call('colorChange', this.titleOfDiscussion , _target == "talkerColor", this[_target])

	},

	"keyup .nameForm":function(e){

		if (invalidKeys.find(key => key == e.originalEvent.keyCode)) {
			console.log("return ")
			return
		}

		if (e.target.name == "name1") {
			_target = "talkerName"
		}else{
			_target = "listenerName"
		}

		newName = e.target.value

		clearTimeout(updateImminent[_target])

		updateImminent[_target] = setTimeout(() => {
			Meteor.call('peepNameChange', this.titleOfDiscussion, _target == "talkerName", newName)
		}, 750)
	}
})