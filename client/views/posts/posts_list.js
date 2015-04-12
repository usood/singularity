Template.posts_list.helpers({
  posts: function() {
    return Posts.find( {}, {sort: {publishedOn: -1} } );
  }
});