Template.post_single.events({
  'click #edit': function(event, template) {
    Router.go('/admin/edit/' + template.data.slug);
  }
});