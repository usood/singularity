Template.posts_list.onCreated(function(){
  this.selectedLanguage = new ReactiveVar();
  this.selectedBook = new ReactiveVar();
  this.selectedChapter = new ReactiveVar();
});
Template.posts_list.events({
  'change select' : function( event, template ) {

    var instance = Template.instance();

    instance.posts_list.set( 'valueToFilter' , event.target.value );
  }
})
Template.posts_list.helpers({

  posts: function() {

    return Posts.find( {}, {sort: {publishedOn: -1} } );
  }
});