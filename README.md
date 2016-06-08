# React Native app for it-ebooks

> This app is a native client for the [IT eBooks](https://github.com/rackt/redux). It's has been developed with React Native

![search-results](https://cloud.githubusercontent.com/assets/4639761/15912742/77652468-2dd6-11e6-8d21-8ddbf783079d.png)


The app is using a free API provided by the site [IT eBooks](http://it-ebooks.info/). The app only aims to demonstrate the capabilities of the react-native technology. Currently only the android version has been developed, if you want to contribute with the iOS version, please contact me.

Feel free to do what you want with the source code. If you have something to share it will be welcome.

![book-details](https://cloud.githubusercontent.com/assets/4639761/15912724/50735ec4-2dd6-11e6-83cb-b53a39073d11.png)

### Developement

1. `npm install`
2. Check [Android Setup](https://facebook.github.io/react-native/docs/android-setup.html#content)
3. `react-native run-android`

### Deploy to a real device

1. create an assets folder under `android/app/src/main`
2. `bundle.android.bat`
3. `react-native run-android`

### TODO

- [ ] Add notes to books
- [ ] Swipe to dismiss a saved search
- [ ] Download books
- [ ] Add i18n capabilities
- [ ] Use Redux
- [ ] iOS version

### Known issues:
- Currently the used API doesn't return the URL of the book and for that reason you can't navigate to the book page. Also in the share funcionality the URL used is the URL of the download.
