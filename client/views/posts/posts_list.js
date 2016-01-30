Template.posts_list.onCreated(function(){

});
Template.posts_list.events({
  'change #post-lang' : function( event, template ) {
    Session.set('selectedLanguage', $("[name=lang]").val());
  },
  'change #post-book' : function( event, template ) {
    Session.set('selectedBook', $("[name=book]").val());
  },
  'change #post-chapter' : function( event, template ) {
    Session.set('selectedChapter', $("[name=chapter]").val());
  }
})
Template.posts_list.helpers({
  posts: function() {
    var language = Session.get('selectedLanguage');
    var book = Session.get('selectedBook');
    var chapter = Session.get('selectedChapter');
    console.log(language + " " + book + " " + chapter);

    if(typeof language !== 'undefined' && language !== ''){
      return Posts.find( {lang: language}, {sort: {publishedOn: -1} } );
    }else if (typeof book != 'undefined' && book !== ''){
      return Posts.find({book: book}, {sort: {publishedOn: -1} } );
    }else if (typeof chapter != 'undefined' && chapter !== ''){
      return Posts.find({chapter: chapter}, {sort: {publishedOn: -1} });
    }
    return Posts.find({},{sort: {publishedOn: -1} } );
  }
});