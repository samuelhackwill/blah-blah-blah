import './body.html';
import './body.css';

import { Discussions } from '../../../api/discussions/discussions.js';
export const invalidKeys = [9, 27, 37, 38, 39, 40, 17, 18]
// tab, escape, arrows, maj, ctrl, alt, option.

export let updateImminent = {}


areWeInTheEditingView = function(){
	editing = ""

	if(Discussions.find({}).fetch()==![]){
		// this is from /new template
		editing = false
	}else{
		// this is from /edit template
		editing = true
	}

	return editing
}