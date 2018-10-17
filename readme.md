# Dial

Dial it's my launcher for frequent websites.
It could replace the newtab page on Chrome or any browser.

If you want to see how it works, check out this demo:

[Demo](https://home.singuerinc.com/)

If you want to have your own links, fork this repo, and change the info in `data.json`.
Fastest way to do this is to

```sh
# cd into repo and type
json-server --watch data.json --port 3004
```
 Once local server is running, open updateData.html, and edit the content automatically in the web browser.
 For more information about json-server, go [here](https://github.com/typicode/json-server).

### Search

![search](./dial.gif)

> Tip: Search and press enter: navigates to the first occurrence. Or search and use the arrows keys to navigate.

### Weather config window

![weather](./screen_weather.png)

### Clock config window

![clock](./screen_clock.png)

## Themes

### Dark

![dark](./theme_dark.png)

### Light

![light](./theme_light.png)

## Installation

## develop

```sh
# install
yarn
# compile js
yarn build:watch
# serve at :5000
yarn start
```

## build

```sh
yarn build
```

### TODO

- [x] Navigate through results with keys
- [ ] Options page
- [ ] Add/Edit/Remove links
- [ ] Profile image upload
- [ ] Sync
- [ ] Backgrounds?
