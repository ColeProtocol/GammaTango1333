# Rakkasans - Team 1333
![image](https://user-images.githubusercontent.com/54413900/163770702-c6aaa9f9-5f69-4ae5-aa5f-f3e476fad1a8.png)

React Native app for the 3rd Brigade (Rakkasans) of the 101st Airborne Division. Original codebase created by Florida Atlantic University (Updated and released by Georgia Tech)

This repository serves as the basis for Georgia Tech's Junior Design team, Gamma Tango's (Team 1333) development and contribution fo the project. 

Based on Commit: 15a096227480544ce16affbb3537a5233f22cc38 In [this repository](https://github.com/AKRAUSE2017/rakkasansFAU/commits/main).

# Project Background
This app was first created in 2019, and is a one stop shop for all / any resources that a solider might required. Project has been in development for the past 2 years and been through 5 iterations with 4 different teams. The project is built with Strapi, using React Native - Hosted on Google Firebase using MQL in MongoDB. The current app contains 13 subtabs (Battalions, RAK History, Bluebook, Training & Schools, In/Out Processing, Forums, Videos, Army Resources, RAKFit, Calendar, Reading List, Creator Page, Books) with 4 bottom category (Runner, Chat, Command, News). 

# Installation Guide
Below is a start up guide on how a brand new user should be able to install and run the project on their own device.

## Setting up the Developer Environment:
* Disclamir a very rough idea and short few steps on how the project would be talked about. Essentially once you download the git repo to your local device the next step is to cd into the folder and run the few steps of code provided. (Only once you have downloaded everything). 

The [video](https://www.youtube.com/watch?v=0-S5a0eXPoc&t=380s) provided would give a rough idea on how to set up your development enviroment and simulators. (This however is not really required to watch if the installation process was not a roadblock)

1. Install [expo-cli](https://docs.expo.dev/workflow/expo-cli/)
2. Then go online and install [Android Studio](https://developer.android.com/studio)
3. "npm install -g expo-cli" by typing this exact line (without the quotation marks) inside your device would install it
4. Clone the repo, and navigate to the project directory inside the terminal (Base level, no need to go any deeper)
5. type in "npm install" (You should see something like this below, ignoring the warning or any of the problems)
![image](https://user-images.githubusercontent.com/54413900/163767614-3def9282-6595-428c-a027-89a546547904.png)

7. type in "npm start" This should load up a expo developer page on your browser of choice, along with a QR code located in your terminal
![image](https://user-images.githubusercontent.com/54413900/163767778-cbff7071-d90d-463e-a8e1-44c94432041a.png)

8. Before you make a choice, start up your android studio and launch a VM (the device and configurations could remain however you like)
![image](https://user-images.githubusercontent.com/54413900/163768108-61071a23-613a-4baa-bf4a-0b9dbda5b49b.png)

9. This would launch a andorid VM on your pc and now you can go back to the terminal and type in "a" for android. (This only works on android studio / android device, device configuration differs for IOS)
10. Once the "a" is typed inside the terminal it should automatically launch Expo on the VM device and you should be lead to a page like this
![image](https://user-images.githubusercontent.com/54413900/163768502-646e5b97-dc62-4adc-ab7f-79fd81a8e447.png)
11. Ask for login permission from the client and you should be done with your set up for the enviroment. Happy Coding!

* Finally if after following all that step the enviroment is still not set up you should visit the old [repository](https://github.com/AKRAUSE2017/rakkasansFAU) from FAU and look at their installation guide for a breath of fresh air. However if the repository is not visable even with a link then below is a screenshot I provided just in case. 
* 
![image](https://user-images.githubusercontent.com/54413900/163769080-e7ed4580-8a60-4702-9c5d-96af80512f5b.png)


## Strapi

The Rakkasans App communicates with a REST API built with Strapi. Strapi is a headless CMS solution that will make future maintenance and customization easier.

User authentication is handled through Strapi. Any new users that will be joining the app will be added into the Users collection by administrators. All information pertaining to the brigade will also be hosted on Strapi. The Strapi API does not need to be accessed locally for the app as there is already a project hosted on AWS (Amazon Web Services). [Click here](https://docs.google.com/document/d/1uI77zqHlJQ_U3XVfXf2Iv1hwnRqpBEAJT2tXmyuXYDE/edit?usp=sharing) to access our Strapi and AWS documentation and [click here](https://drive.google.com/drive/folders/1yMxyfzcV_BgWvLS-VdVKGrgnmEHqugHp?usp=sharing) for the key for our AWS EC2 Instance.

Each collection type created with Strapi has all the API endpoints you’d expect. [Click here](https://docs.google.com/document/d/1-YQe6rDZY_9i_e0APstRgld49PBHCs7rq2cr4gelynw/edit?usp=sharing) for more information on interacting with collections.

#### Additional Resources:

[General Overview of Strapi](https://strapi.io/features) <br/>
[Strapi & Frontend development](https://strapi.io/blog/frontend-developers-headless-cms) <br/>
[Quick Start Guide (for prototyping)](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html)

## Firebase

The Rakkasans App communicates with Firebase for the Forum and Messaging features. All information regarding these two functionalities are stored in Firebase along with user information which is used specifically for Forum and Messaging. [Click here](https://docs.google.com/document/d/1-YQe6rDZY_9i_e0APstRgld49PBHCs7rq2cr4gelynw/edit?usp=sharing) to access our Firebase documentation.

#### Additional Resources:

[Firebase Console](https://console.firebase.google.com/) (Only accessible to those added to the Firebase RAKapp project) <br/>
[Official Firebase Documentation](https://firebase.google.com/docs/reference)

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

## Messaging Component

The Messaging functionality allows for users to communicate with others via private messaging. First, the user will click to create a new conversation from the screen in `tabs\chatScreens\HomeScreen.jsx`. From the user list screen in `tabs\chatScreens\UserList.jsx`, the user will select a list of other users they would like to have a conversation with. 

After the conversation has been created, the user will be brought back to the chat home screen and can view all the conversations they are in. They can click a conversation and freely message others in that conversation.









# Developer Helper

Run this command any time you want to bring your branch up to a current point with main:

git checkout main & git fetch - p origin & git merge origin/main & git checkout <!\*YOUR NAME/BRANCH\*!> & git merge main & git push origin <!\*YOUR NAME/BRANCH\*!>

## Release Notes - JIA 1333
### Version 0.1.0

#### New Features
* Basic calendar functionality
* Custom icons for new tabs
* Updated reading tab with framework for later changes

#### Bug Fixes
* Fixed spacing issue on hub page

#### Known Issues
* Calendar is currently "frozen"
* Search bar is non-functional

## v0.2.0
### Features
* Created a Content Creator page that allows video uploads and access from Google Firebase

* Added name assignments and ability to comment on video


* Created a page that posts embedded YouTube videos 

### Bug Fixes 
* Added data/videos temporarily to the Google Firebase in order for the videos of the Content Creator page to work as data is only taken from the Google Firebase.

#### Known Issues
* Search feature is still not fully functional


## v0.3.0
### Features
* Updated backend to feature between-device syncing

* Calendar can now use appointments

### Bug Fixes 
* Calendar is no longer bricked and unusable

#### Known Issues
* Search feature is still not fully functional


## v0.4.0
### Features
* Books are now viewable to all users

* Users can find books of a perticular topic

### Bug Fixes 
* Book tabs no longer lead to blank pages

#### Known Issues
* Search feature is still not fully functional

## v0.5.0
### Features
* Bug fix has been updated

* Book now sorts depending on author and or title

#### Known Issues
* Search feature is still not fully functional

# RAK App Summary - JIF 1321
The RAK app is a catch-all application for members of the 187th Airborne Infantry Regiment of the U.S. Army, also known as the Rakka-sans, derived from the Japanese word for “parachute”. The app is intended to provide members of the Rakkasans with a single hub for key activities and information around base; its key functionality is to provide easy access to military documents (e.g. onboarding documents), but the full scope of the app includes a wide variety of features, including maps of base, events calendars, messaging, fitness instructions, and more. 

# Release Notes - JIF 1321
## v0.1.0
### Features
* Changed the view of the RAK fit page to view many different workout categories to browse several workouts in a single glance compared to slowly scrolling through one at a time. 

* Fixed the spacing on the RAK Fit page to have appropriate spacing between each section, so that the page is less crowded and easy to read. 

* Place holders for different pages are now visible to give an idea of future UI.

* Separated exercise goals widgets.

### Bug Fixes 
* Connected the RAKFit page widgets to all appropriate pages.

* Fixed page routing issues to the RAKFit page.

#### Known Issues
* Calendar is currently "frozen"

* Search bar is non-functional
## v0.2.0
### Features
* Added video tab to RakFit.

* Video playback now operational.

* Included widget icons on the RakFit page.

* Wrote widget documentation.
### Bug Fixes 
* Search bar now works in some cases.

* Widgets now function on the RakFit page.

#### Known Issues
* Search bar still doesn't fully work.

* Videos can take an unreasonable amount of time to load.
## v0.3.0
### Features
* Fast Fitness now integrated
### Bug Fixes 
* Removed excess comments, code more readable

* Calendar fully functional

* Search bar functional

* Video tab now properly renders and scales videos
#### Known Issues
* Need to integrate Map and Link to RakFit

## v0.4.0
### Features
* Rak Challenge page is connected to firebase

* Challenges added to firebase

* first half of Rak Challenge page integrated

* Top 5 view added to RakFit screen

* Rankings and description added to challenge page

* Rak challenge changes every 2 weeks
### Bug Fixes 
* Integrated Map and Link to RakFit
*
## v0.5.0
### Features

* Second half of Rak Challenge page integrated

* Rak Challenges now display in the hub
### Bug Fixes 
* Occasionally empty Rak Challenges now always display

* UI altered to make easier to navigate
