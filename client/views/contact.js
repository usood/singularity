Template.contact.created = function() {
  this.message = new ReactiveVar('');
  this.error = new ReactiveVar('');
};

Template.contact.helpers({
  message: function() {
    return Template.instance().message.get();
  },
  error: function() {
    return Template.instance().error.get();
  }
});

Template.contact.events({
	'submit form': function (event, template) {
		event.preventDefault();
		
		var spammer = $('input[name=blank').val();
		if ( spammer ) {
			template.emailError.set('Go away spammer.');
			return false;
		}
		
		template.emailSuccess.set('');
		template.emailError.set('');
		
		
		var name = $('input[name=name').val();
		var subject = $('input[name=subject').val();
		
		var from = $('input[name=email').val();
		var to = 'tonyarash@gmail.com';
		
		var message = $('textarea[name=comments').val();
		
		message = 'From: ' + name + '<br>Message:' + message;
		
		Meteor.call('sendEmail', to, from, subject, message, function(error) {
      if (error) {
        template.error.set(error.reason);
      } else {
        template.message.set('Message sent. Thank you!');
      }
    });
		
		document.getElementById('contact').reset();
	}
});