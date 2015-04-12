## Meteor Material Blog

This is boilerplate Meteor Material blog designed for anyone to start their own blog. This is still in a work in progress and contributions are welcome. You can see an example at http://material-blog.meteor.com/

## Features

* Material Design
* Slug-based URLs (editable)
* Multiple roles (admin/author)
* Admin dashboard

## Setup

1. Clone the repository
2. Add the required Meteor packages
```
meteor add iron:router
meteor add accounts-password
meteor add materialize:materialize
meteor add reactive-var
```
3. In `server/main.js` uncomment the code. Enter your account info then start meteor. This will create an initial admin account. New users can then be added in the admin dashboard at `http://localhost:3000/admin`

## Usage

**Admin:** 

The admin dashboard area is at */admin* and can only be access via a logged in user. Any user can create a post but only the admin can create new users. The authentification is verified via a *roles: 'admin'* attribute on the user account. 

The admin can view, edit, and delete all posts. 

**Author:**

All users with *roles: 'author'* can create new posts and edit *their own* posts. Authors cannot create new users.

## WIP

1. Comment system
2. Social sharing
3. Post tags and searching
3. Widgets
4. Pagination
5. Distribute as Atmostphere package