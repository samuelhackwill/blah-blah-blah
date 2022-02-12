import './new.html';
import './new.css';

import { ReactiveVar } from 'meteor/reactive-var'

import '../../components/conversationParams.js';
import '../../components/conversationEditor.js';
import '../../components/conversationSaver.js';

const allCssNamedColors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","Lime","LimeGreen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"]


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

	}
})