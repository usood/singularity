Template.posts_list.helpers({

  posts: function(language, aBook, aChapter) {

    return Posts.find( {}, {sort: {publishedOn: -1} } );
  }
});