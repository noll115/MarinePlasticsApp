  # MarinePlasticsApp
  ### Sponsored by [Clean Oceans International](https://cleanoceansinternational.org/)
  ### Live companion website: https://marineplastics.herokuapp.com/
  ### Website repository: https://github.com/noll115/MarinePlastics

  A companion mobile application for the Marine Plastics Monitor website that allows citizen scientists to conduct beach-cleanup surveys from anywhere.
  
   ## Getting Started

  ### Prerequesites
  Need access to our accounts on (need to contact one of the developers)
  * Auth0
  * Expo

  If want to update the data sheet, need to contact a developer or COI for a Word doc version.

  ### Installing
  1. Clone the repo: `git clone https://github.com/noll115/MarinePlasticsApp.git`
  2. Install the dependencies: `npm install`
  3. Run the development environment in marineplasticsapp folder: `expo start`.
    * For additional information on using Expo, see https://docs.expo.io/versions/latest/get-started/installation/
  
  ### Deploying
  1. Be sure to be logged in to Expo with the credentials given by the 2019 Marine Plastics team.
  2. Follow steps on https://docs.expo.io/versions/latest/distribution/building-standalone-apps/ for a thorough guide on building the binaries.
  
  ## Built With
  * [React Native](https://facebook.github.io/react-native/)
  * [Native Base](https://nativebase.io/)
  * [React Native Local MongoDB](https://github.com/antoniopresto/react-native-local-mongodb)
  
  NOTE: React Native Local MongoDB was deprecated shortly after our work on the app was finished. Perhaps consider [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage) if you want to switch.
  
  ## General Repository Structure
  * /components and /constants
    * Contains files with custom-made components that are used in a variety of areas in the app.
    * Also has files for style templates that are usued throughout the app.
  * /navigation
    * Deprecated folder previously used for app navigation files. Deletion of this folder is left to the descretion of the next team.
  * /screens
    * /Home
      * Contains component files used for styling the home screen built in HomePage.js
    * /Publish
      * PublishContainer.js is the main app screen for manually publishing a new survey. Contains most of the logic for validation of a survey submission.
      * Contains other files used for styling the publish container and supplemental components, such as Scanner.js.
      * MergeSurveys.js exports a function that merges together all of the collected surveys from QR scanning.
    * /survey
      * Contains all of the major survey components and logic used in the survey portion of the app.
      * SurveyContainer.js contains the entire survey within a single screen, and handles navigation between different sections of the survey as well as state persistence between survey sections.
      * See header comments in each file for a more detailed explanation for each portion of the survey, broken down into TeamInfo.js, Area.js, SurfaceRibScan.js, AccumulationSweep.js, and MicroDebris.js
    * BoardingPage.js contains options for navigation to the log-in screen or the home screen. Seen on first start up of the app.
    * HomePage.js is the main wrapper for the Home components, and contains the main logic for the home screen functionality. Also includes QR encoding logic.
    * LogInPage.js contains the main functionality for sign in/out/up. User functionalities are provided by Auth0.
    * PublishPage.js is deprecated, left up to descretion of the new team to delete it.
    * SurveyPage.js is the screen seen when first conducting a new survey, contains description of the survey process.
  * /storage
    * mongoStorage.js uses the react-native-local-mongodb library to implement local storage using CRUD functions for survey queries.
  * /testJSON
    * Each file in here was originally used for testing the merging functionality of scanning in survey QR codes. Not needed in a production build, could be useful for testing if needed.
  * App.js contains the bulk of the navigation components used throughout the app. It contains more detailed notes about the navigation inside of the file.


    
