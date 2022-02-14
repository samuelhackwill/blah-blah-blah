import './conversationParams.html';
import './conversationParams.css';

Template.conversationParams.onCreated(function(){
	// console.log(this)
})

Template.conversationParams.helpers({
})


Template.conversationParams.events({

	"click .colorPicker":function(e){

		console.log(this)

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

		Meteor.call('colorChange', this.titleOfDiscussion , _target == "talkerColor", this[_target])

	},
})