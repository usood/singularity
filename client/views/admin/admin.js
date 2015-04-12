Template.admin.onCreated(function () {
  this.error = new ReactiveVar('');
});

Template.admin.onRendered(function() {
  this.deletePostId = new ReactiveVar('');
});

Template.admin.helpers({
  posts: function() {
    if (Meteor.user().roles === 'admin') {
      return Posts.find( {}, {sort: {publishedOn: -1} } );
    } else {
      return Template.instance().data;
    }
  },
  error: function() {
    return Template.instance().error.get();
  }
});

Template.admin.events({
  "click #delete": function(event, template) {
    event.preventDefault();
    template.deletePostId.set(event.target.attributes.data.value);
    $('#modal1').openModal();
  },
  "click .confirm": function(event, template) {
    event.preventDefault();
    var answer = event.target.innerText;
    var postId = template.deletePostId.get();
    if (answer === 'YES') {
      Meteor.call('deletePost', postId, function(error) {
        if (error) {
          template.error.set(error.reason);
        }
      });
    }
  }
});