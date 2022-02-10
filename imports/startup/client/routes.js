import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Discussions } from '../../api/discussions/discussions.js';

import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';

FlowRouter.route('/', {
  // default route gets a random document from the DB and redirects
  // to /read route with the correct query.
  name: 'home',
  waitOn() {
    return [
      Meteor.subscribe('discussions.one')
    ];
  },
  action(){
    _titleOfDiscussion = Discussions.find({}).fetch()[0].titleOfDiscussion
    FlowRouter.go("/read/"+_titleOfDiscussion)
  },
  onNoData() {
    this.render('notFound');
  }
});

FlowRouter.route('/read/:titleOfDiscussion', {
  name: 'read',
  action(params) {
    // when someone randomly stumbles upon this website we 
    // want to get a random discussion from the DB and show it
    // to that person.

    console.log(params)
    // this.render('App_body', 'App_home');
  },
});

FlowRouter.route('/edit/:titleOfDiscussion', {
  name: 'edit',
  action(params) {
    console.log(params)
    // this.render('App_body', 'App_home');
  },
});

FlowRouter.route('/new', {
  name: 'new',
  action() {
    this.render('App_body', 'App_home');
  },
});

FlowRouter.route('*', {
  action() {
    this.render('App_body', 'App_notFound');
  },
});
