Template.new_user.onCreated(function () {
  // set up local reactive variables
  this.error = new ReactiveVar('');

});

Template.login.helpers({
  error: function() {
    return Template.instance().error.get();
  }
});

Template.new_user.events({
  'click #register': function(event, template) {
    event.preventDefault();
    template.error.set('');
    var name = $('input[name=first-name]').val() + ' ' + $('input[name=last-name]').val();
    var username = $('input[name=username]').val();
    var email = $('input[name=email]').val();
    var password = $('input[name=password]').val();
    var profile = { name: name };
    var roles = $('input[name=role]:checked').val();
    var userObj = {
      username: username, 
      email: email, 
      password: password,
      profile: profile,
      roles: roles,
    };
    document.getElementById('new-user-form').reset();
    Meteor.call('addNewUser', userObj, function(error) {
      if (error) {
        template.error.set(error.reason);
      } else {
        Router.go('/admin');
      }
    });
  }
})