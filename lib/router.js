Router.route('/', {
  template: ('home'),
  
  waitOn: function() {
    return Meteor.subscribe('all-posts')
  },
  
  data: function() {
    return Posts.find();
  },
  
  onAfterAction: function () {
    document.title = 'Meteor Material Blog | All Posts';
  }
});

Router.route('/posts/:slug', {
  template: 'post_single',
  
  waitOn: function() {
    return Meteor.subscribe('post', this.params.slug);
  },
  
  data: function() {
    return Posts.findOne();
  }
});

Router.route('/about', function() {
  this.render();
});

Router.route('/contact', function() {
  this.render();
});

Router.route('/admin/users', {
  template: 'users',
  
  waitOn: function() {
    return Meteor.subscribe('get-users');
  }
});

Router.route('/admin', {
  template: 'admin',

  onBeforeAction: function () {
    if ( !Meteor.userId() ) {
      Router.go('/admin/login');
    } else {
      this.render();
    }
  },
  
  waitOn: function() {
    return Meteor.subscribe('all-posts')
  },
  
  data: function() {
    return Posts.find({ authorId: Meteor.userId() });
  },

});

Router.route('/admin/new-post', {
  template: 'post_new',

  onBeforeAction: function () {
    if ( !Meteor.userId() ) {
      Router.go('/admin/login');
    } else {
      this.render();
    }
  },

  onAfterAction: function () {
    document.title = 'Meteor Material Blog | Add New Post';
  }

});

Router.route('/admin/edit/:slug', {
  template: 'post_edit',
  
  onBeforeAction: function () {
    if ( !Meteor.userId() ) {
      Router.go('/admin/login');
    } else {
      this.render();
    }
  },
  
  waitOn: function() {
    return Meteor.subscribe('post-edit', this.params.slug)
  },
  
  data: function() {
    return Posts.findOne();
  },
  
  onAfterAction: function () {
    var postFound = this.data();
    if ( !postFound || postFound === undefined) {
      Router.go('/');
    }
  }
  
});

Router.route('/admin/login', {
  template: 'login',
  
  onBeforeAction: function () {
    if ( Meteor.userId() ) {
      Router.go('/admin');
    } else {
      this.render();
    }
  },
  
  onAfterAction: function () {
    document.title = 'Meteor Material Blog | Login';
  }
  
});

Router.route('/admin/add-new-user', {
  template: 'new_user',
  
  onBeforeAction: function () {
    if ( Meteor.user() && Meteor.user().roles === 'admin' ) {
      this.render();
    } else {
      Router.go('/admin');
    }
  },
  
});