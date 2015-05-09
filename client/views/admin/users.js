Template.users.onCreated(function () {
  this.error = new ReactiveVar('');
});

Template.users.helpers({
  allUsers: function() {
    return Meteor.users.find({});
  },
  error: function() {
    return Template.instance().error.get();
  }
});

Template.users.events({
  "click #delete": function(event, template) {
    event.preventDefault();
    var userId = event.target.attributes.data.value;
    Meteor.call('deleteUser', userId, function(error) {
      if (error) {
        template.error.set(error.reason);
      }
    });
  }
});