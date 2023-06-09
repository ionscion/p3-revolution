# Legacy Architects | Account Sign-In + Lawyer Dashboard Supreme | Project 3

## Project Description 

Legacy Architects is an all-in-one estate planning platform that streamlines the entire estate planning process to help attorneys focus on what matters most -- their clients. Of course, developing a useful tool requires many considerations which is why this project focused on perfecting a few basic functionalities including:

* Creating a login (as a lawyer)
* Authenticating that login
* Creating a table of that lawyer's clients
* Adding to that table of clients
* Clicking on a specific client to edit their information
* Saving changed information
* Viewing/adding beneficiary information
* Viewing/adding financial information

To achieve these feats, we employed the following:

* HTML
* Material UI
* JavaScript
* Express
* Sequelize
* MongoDB
* GraphQL
* React
* Auth0
* Apollo

## User Story

```md
AS A lawyer who wants to help my clients
I WANT a powerful estate planning tool
SO THAT I can stay organized and focus on my clients' needs
```
## Acceptance Criteria

```md
GIVEN an estate planning platform
WHEN I visit the site
THEN I am presented with a page with a login option
WHEN I click on the login
THEN I am taken to the secured login where I am prompted to sign in or sign up
WHEN I sign in or sign up for an account
THEN I am taken to a page with a dashboard
WHEN I click on the dashboard
THEN I am presented with options to view all contacts, create a contact, or go home
WHEN I click on the all contacts option
THEN all of my client contacts are displayed
WHEN I click on new contact
THEN I am prompted to enter client information
WHEN I click on all clients 
THEN I am taken to a page with all clients, including newly added contact(s)
WHEN I click on a clients name
THEN I am presented with the client's table in editable form
WHEN I click on the beneficiaries tab
THEN I can view or add beneficiaries
WHEN I click on financial tab
THEN I can view or add financials
WHEN I click logout
THEN I am logged out of my account
```
## Requirements
You must have installed a package manager as npm or yarn, and the package concurrently.

You can do it with the next commands:

For a global installation:

```npm install -g concurrently```
or
```yarn global add concurrently```

For a local installation:

```npm install --save-dev concurrently```
or
```yarn add --dev concurrently```

## Install
- run npm i to install dependencies
- replace env example files with your mysql credentials and db name
- npm run seed
- npm start

## Notes
- auth0 token request should be set to none