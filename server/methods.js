Meteor.methods({
  newPost: function(postData) {
    var user = Meteor.user();
    postData.authorId = user._id;
    postData.authorName = user.profile.name;
    postData.publishedOn = new Date().getTime();
    postLinkExists = Posts.findOne({ slug: postData.slug });
    if (!postData.slug) {
      postData.slug = postData.title.replace(/\s+/g, '-');
    } else {
      if (postLinkExists) {
        postData.slug = postData.slug + '-2';
      }
    }
    postData.slug = postData.slug.trim().toLowerCase();
    postData.summary = postData.body.substring(0, 200).trim();
    if ( Meteor.user() ) {
      Posts.insert(postData);
    }
  },
  
  editPost: function(postId, postData) {
    var user = Meteor.user();
    var post = Posts.findOne({_id: postId});
    postData.slug = postData.slug.trim().toLowerCase();
    postData.summary = postData.body.substring(0, 200).trim();
    
    if ( user && (post.authorId === user._id || user.roles === 'admin') ) {
      Posts.update(postId, {$set: postData});
    } else {
      throw new Meteor.Error('not-allowed', 'You are not allowed this operation.');
    }
  },
  
  deletePost: function(PostId) {
    var user = Meteor.user();
    var post = Posts.findOne({_id: PostId});
    if ( user && (post.authorId === user._id || user.roles === 'admin') ) {
      Posts.remove({ _id: PostId});
    } else {
      throw new Meteor.Error('not-allowed', 'You are not allowed this operation.');
    }
    
  },
  
  addNewUser: function(newUser) {
    var currentUser = Meteor.user();
    if ( currentUser && currentUser.roles === 'admin' ) {
      Accounts.createUser(newUser);
    } else {
      throw new Meteor.Error('not-allowed', 'You are not allowed this operation.');
    }
  },
  
  deleteUser: function(userID) {
    var currentUser = Meteor.user();
    if ( currentUser && currentUser._id !== userID ) {
      Meteor.users.remove(userID);
    } else {
      throw new Meteor.Error('not-allowed', 'Cannot remove logged in user.');
    }
  },
  
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      html: text
    });
  }
});

Accounts.onCreateUser(function(options, newUser) {
  if (options.roles) {
    newUser.roles = options.roles;
  }
  if (options.profile)
    newUser.profile = options.profile;
  return newUser;
});