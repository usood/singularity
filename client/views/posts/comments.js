Template.comments.onCreated(function () {
  this.error = new ReactiveVar('');
  this.postId = new ReactiveVar(Template.instance().data._id);
  Meteor.subscribe('post-comments', this.postId.curValue);
});

Template.comments.helpers({
  comments: function() {
    var postId = Template.instance().postId.get();
    return Comments.find( {postId: postId}, {sort: {publishedOn: -1} } );
  },
  error: function() {
    return Template.instance().error.get();
  }
});

Template.comments.events({
  "submit form": function(event) {
    event.preventDefault();
    var postId = Template.instance().postId.get();
    var comment = $('textarea[name=comment').val();
    var comment = comment.replace(/\n/g, '<br />');
    var authorName = $('input[name=name').val();
    Comments.insert({postId: postId, authorName: authorName, comment: comment});
    document.getElementById("comment").reset();
  }
});