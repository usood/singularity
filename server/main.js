// Uncomment the code below and fill in your information.
// Then start Meteor in your project to create an initial admin user


if (Meteor.users.find().count() === 0) {
  var userObj = {
      username: 'admin', 
      email: 'upahar.sood@gmail.com',
      password: 'admin',
      profile: {name: 'Admin'},
      roles: 'admin',
    };
  Accounts.createUser(userObj);
}
