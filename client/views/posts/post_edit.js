Template.post_edit.onCreated(function () {
  this.error = new ReactiveVar('');
});

Template.post_edit.onRendered(function() {
  var post = Template.instance().data;
  $('#summernote').summernote();
  $('input[name=title]').val(post.title);
  $('input[name=slug]').val(post.slug);
  $('.note-editable').html(post.body);
});

Template.post_edit.helpers({
  error: function() {
    return Template.instance().error.get();
  }
});

Template.post_edit.events({
  "keyup #post-title": function(event) {
    var slug = $('input[name=title]').val();
    slug = slug.replace(/\s+/g, '-').trim().toLowerCase();
    $('input[name=slug]').val(slug);
  },
  "submit form": function(event, template) {
    event.preventDefault();
    var id = template.data._id;
    var post = {
      title: $('input[name=title]').val(),
      slug: $('input[name=slug]').val(),
      lang: $('select[name=lang]').val().trim() ,
      book: $('select[name=book]').val().trim(),
      chapter: $('select[name=chapter]').val().trim(),
      body: $('#summernote').summernote('code')
    }
    Meteor.call('editPost', id, post, function(error) {
      if (error) {
        template.error.set(error.reason);
      } else {
        Router.go('/admin');
      }
    });
  }
});
