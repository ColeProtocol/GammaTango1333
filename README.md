# Rakkasans

React Native app for the 3rd Brigade (Rakkasans) of the 101st Airborne Division

<a href="https://heroku.com/deploy?template=https://github.com/mhwilkes/strapi-heroku-template">
  <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>

## Set up Development Environment:

Watch [this video](https://youtu.be/0-S5a0eXPoc?t=380) for more information and steps for setting up your development environment and simulators.

Install [expo-cli](https://docs.expo.io/workflow/expo-cli/). The application is built on the [Expo](https://expo.io/) framework. The expo-cli app is a command line tool that will allow you to use a variety of expo tools during development, testing, and publishing.

```
npm install -g expo-cli
```

You will also need to install the [Expo Client App](https://expo.io/tools#client) on your personal mobile device if you would like to run and test the app. The app is available for Android & IOS.

#### Install IOS & Android simulators

##### IOS:

Install [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12).

###### Android:

Install [Android Studio](https://developer.android.com/studio).

#### Now you're ready to clone the repo:

Clone the repo.

Install dependencies:

```
=> npm i
```

#### Clone the [Rakkasans API APP](https://github.com/MLH-Fellowship/rakkasansApi).

Follow README instructions to setup the Rakkasans API App.

**The Rakkasans API App must be running for the Rakkasans App to work!**

#### How to run

To get everything running, run:

```
=> npm start
```

## Strapi

Rakkasan App communicates with a REST API built with Strapi. Strapi is a headless CMS solution that will make future maintenance and customization easier.

To access the API you’ll need to run Rakkasan API locally but accessing the database is slightly different.The API database is written in mongoDB and currently hosted on mongoDBs cloud platform Atlas. This means that updated entries do not have to be pushed for other members of your team to view them. However, changes related to the design of the API like new collection types still need to be pushed. Keep this in mind while working on the Strapi GUI.

Each collection type created with Strapi has all the API endpoints you’d expect.<a href="https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#api-endpoints"> Click here </a> for more information on interacting with collections.

#### Additional Resources:

<a href = 'https://strapi.io/features'>General Overview of Strapi </a> <br/>
<a href ="https://strapi.io/blog/frontend-developers-headless-cms"> Strapi & Frontend development </a> <br/>
<a href ="https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html"> Quick Start Guide (for prototyping)</a>

## Testing

Testing is done using [Enzyme](https://enzymejs.github.io/enzyme/) & [Jest](https://jestjs.io/).

To run tests, run:

```
=> npm test
```

This command will also provide you with the total test coverage of the app.

Most tests are [Snapshot Tests](https://jestjs.io/docs/en/snapshot-testing#:~:text=Snapshot%20tests%20are%20a%20very,file%20stored%20alongside%20the%20test.).

```
A typical snapshot test case renders a UI component, takes a snapshot, then compares it to a reference snapshot file stored alongside the test. The test will fail if the two snapshots do not match: either the change is unexpected, or the reference snapshot needs to be updated to the new version of the UI component.
```

If you make a UI change, run `npm test -- -u` to create a new snapshot reference that will include your new changes.

## Forum Component

The Forum functionality is distributed across a number of files, the majority of which are found in `tabs/otherScreens/`. The component that is rendered by the navigation is `tabs/otherScreens/Topics.js`. This file makes a request to the API to render the currently available Forum topics.

When a topic is selected, the `tabs/otherScreens/Posts.js` component is rendered, which makes another API call to render the posts available under the selected topic.

The comments are rendered in `tabs/otherScreens/Comments.js`, and are threading; any comment can be replied to, resulting in chains of comments. On render, sub-comments (comments replying to other comments) are hidden. Those comments can be toggled in the UI.

Users can create new posts in topics and new comments on posts.

TODO: Allow users to delete their own posts/comments and admins to delete any posts/comments. (requires user authentication)

## Authentication

This project uses Firebase for authentication. For development, we hard coded credentials so that typing anythig into the inputs works. Check out:
https://github.com/MLH-Fellowship/rakkasans/blob/a36c0a6b4df16f24565739f12c2c1577898a0855/tabs/Login.js#L153

This cohort did not implement or improve this feature. To learn more, please ask Matt Dillabough (most likely your GMP).
