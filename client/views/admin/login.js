Template.login.onCreated(function () {
  this.error = new ReactiveVar('');

});

Template.login.helpers({
  error: function() {
    return Template.instance().error.get();
  }
});

Template.login.events({
  'click #login': function(event, template) {
    event.preventDefault();
    template.error.set('');
    var email = $('input[name=email]').val();
    var password = $('input[name=password]').val();
    var user = { email: email };
    Meteor.loginWithPassword(user, password, 
      function(error) {
        if (error) {
          template.error.set(error.reason)
        } else {
          Router.go('admin');  
        }
      });
    document.getElementById('login-form').reset();
  }
})