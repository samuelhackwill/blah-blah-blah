import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Discussions } from '../../api/discussions/discussions.js';
import { DiscussionLines } from '../../api/discussionLines/discussionLines.js';

import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/new/new.js';
import '../../ui/pages/edit/edit.js';
import '../../ui/pages/read/read.js';
import '../../ui/pages/not-found/not-found.js';


FlowRouter.route('/', {
  name: 'home',
  action(params, qs, discussion) {
    this.render('App_body', 'App_home', { discussion });
  },

  data() {
    return { 
    discussionParams : Discussions.find({}).fetch()
    };
  },

  waitOn(params) {
    return [
      Meteor.subscribe('discussions.all')
    ];
  }
});

FlowRouter.route('/random', {
  // default route gets a random document from the DB and redirects
  // to /read route with the correct query.
  name: 'random',
  waitOn() {
    return [
      Meteor.subscribe('discussions.random')
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

  action(params, qs, discussion) {
    this.render('App_body', 'App_read', { discussion });
  },

  data() {
    return { 
    discussionLines : DiscussionLines.find({}).fetch(), 
    discussionParams : Discussions.find({}).fetch()
    };
  },

  waitOn(params) {
    return [
      Meteor.subscribe('discussionLines.one', params.titleOfDiscussion), 
      Meteor.subscribe('discussions.one', params.titleOfDiscussion)
    ];
  }

  });

FlowRouter.route('/edit/:titleOfDiscussion', {
  name: 'edit',
  action(params, qs, discussion) {
    this.render('App_body', 'edit', { discussion });
  },

  data() {
    return { 
    discussionLines : DiscussionLines.find({}).fetch(), discussionParams : Discussions.find({}).fetch()
    };
  },

  waitOn(params) {
    return [
      Meteor.subscribe('discussionLines.one', params.titleOfDiscussion),
      Meteor.subscribe('discussions.one', params.titleOfDiscussion)
    ];
  }
});

FlowRouter.route('/new', {
  name: 'new',
  action() {
    this.render('App_body', 'new');
  },
});

FlowRouter.route('/admin', {
  name: 'admin',
  action(){
    this.render('App_body', 'App_home');
  }
})

FlowRouter.route('*', {
  action() {
    this.render('App_body', 'App_notFound');
  },
});
