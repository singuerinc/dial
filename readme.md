## About
Dial used to be a Chrome Extension, but now is a webpage that can be added as homepage in any browser. It's my launcher for frequent websites, that can replace the newtab page on Chrome.
If you want to check how it works, check out this demo:

[Demo](https://home.singuerinc.com/)

## Search

![search](https://dl.dropbox.com/s/3mlciiqo2myc9m7/search_anim.gif)

> Tip: Search and press enter: navigates to the first occurrence. Or search and use the arrows keys to navigate.

## Themes

### Dark

![dark](https://dl.dropboxusercontent.com/s/6pc8wnrl6iwkyk5/theme_dark.png)

### Light

![light](https://dl.dropboxusercontent.com/s/6qubb6481o5a2ry/theme_light.png)

## Installation

If you want to test Dial you have to install it manually in Chrome.

1.  Clone/Download the repo
2.  Go to [Chrome extensions settings](chrome://extensions/)
3.  Click on "Load unpacked extension..."
4.  Select the folder that contains Dial files.
5.  Open a new tab in Chrome.

## develop

```sh
# install
yarn
# compile js
yarn build:watch
# serve at :5000
yarn start
```

### TODO

- [x] Navigate through results with keys
- [ ] Options page
- [ ] Add/Edit/Remove links
- [ ] Profile image upload
- [x] Sync
- [ ] Backgrounds?
