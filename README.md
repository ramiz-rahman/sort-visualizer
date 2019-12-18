# Sort Visualizer

This is a [progressive web app](https://developers.google.com/web/progressive-web-apps) built using React and is used to visualize classic sorting algorithms such as insertion sort, merge sort, quick sort, heap sort, etc.

This app is deployed with Netlify and can be accessed here: [sort-visualizer.ramizrahman.com](https://sort-visualizer.ramizrahman.com).
I hope you have fun playing around with it.

[![Netlify Status](https://api.netlify.com/api/v1/badges/9b56ce4a-00e8-407c-b862-181d3dc7ee53/deploy-status)](https://app.netlify.com/sites/sort-visualizer/deploys)

View a demo of the app on [youtube](https://www.youtube.com/watch?v=JFjvVmvC3pQ&feature=youtu.be):

[![Sort Visualizer Demo](http://img.youtube.com/vi/JFjvVmvC3pQ/0.jpg)](http://www.youtube.com/watch?v=JFjvVmvC3pQ 'Sort Visualizer Demo')

## Purpose

I wanted to improve my skills with React and also learn classic sorting algorithms. This project turned out to be a great way to achieve both of the aforementioned objectives at the same time.

## Installation

The app is already deployed so you can play around with the final product using this [link](https://sort-visualizer.ramizrahman.com).

If you wish to run this app locally, clone this repo and install the dependencies.

```
$ git clone https://github.com/ramiz-rahman/sort-visualizer.git
$ cd sort-visualizer
$ npm install
```

### Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## App Conventions

The `src` folder contains three subdirectories:

- `algorithms` - Each sorting algorithm is contained in its own file and imports helper functions from the `helpers.js` file, which is also present inside this folder. Each algorithm file has two named exports and a default export. The named exports are `<AlgorithmName>Key` which returns a mapping of the color group and its meaning in the context of the algorithm, and `<AlgorithmName>Desc` which returns an object containing the description and details of the algorithm. The default export, `AlgorithmName` is a function that takes in an array of numbers, sorts it and returns an object that contains every state change that the array has undergone. This object is used to create the animation.
- `_settings` - This folder contains the the CSS files that only contain CSS custom properties declarations (also known as CSS variables) for the entirety of the app. These files are used to determine the overall look and feel of the application as all components rely upon these variables.
- `components` - This folder is broken down into atoms, molecules and organisms subfolders as described in Brad Frost's [Atomic Design](http://atomicdesign.bradfrost.com/).

  - The `Atoms` folder contains the smallest elements that are repeatedly used throughout the app - buttons, switches, backdrops, etc.
  - The `Molecules` folder contains more complex components that are used independently or as part of an organisms.
  - The `Organisms` folder contains components which are self contained sections of the app - the top bar, the visualizer, the app drawer, etc.
  - A case can be made for a component to be in either a molecule or organism. In these sorts of situations, I did not use an exact set of rules but rather left it to intuition.
  - Each component is contained in its own folder and has 2 files. The `index.js` file contains the JavaScript code for the component and the `style.css` file contains rules for classes which are written using an alternate style naming scheme of [BEM](https://en.bem.info/methodology/quick-start/) that is described as follows:

    - Blocks are written in PascalCase and must match the name of the corresponding component.
    - Elements are also written in PascalCase and separated from the block using double underscores (`__`). eg. `ComponentName__ElementName`.
    - An element is always part of a block, not another element.
    - Modifiers are written in lowercase.
    - The modifier name is separated from the block or element name by a single underscore (`_`). eg. `ComponentName_modifiername_modifiervalue`

## App Design

The design of the app was largely inspired by Google's [Material Design Guidelines](https://material.io/design/).

The app is responsive, meaning it works across a variety of screen sizes and dimensions.

![Sort Visualizer - regular (light) mode](https://i.imgur.com/wYIircd.png)

The app has a switch for turning on dark mode.

![Sort Visualizer - dark mode](https://i.imgur.com/HwwiX7X.png)

## License

Sort Visualizer is released under the [MIT License](https://choosealicense.com/licenses/mit/)
