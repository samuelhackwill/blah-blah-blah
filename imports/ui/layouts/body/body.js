import './body.html';
import './body.css';

import { Discussions } from '../../../api/discussions/discussions.js';

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