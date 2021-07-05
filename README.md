`nyt-app` is a single-page application for searching articles through the New York Times API. You can find a hosted version at [nyt.cesar.codes](https://nyt.cesar.codes)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

The application also has the following dependencies:

- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) to set up data fetching and caching.
- [React Router](https://reactrouter.com/) for route configuration
- [fecha](https://github.com/taylorhakes/fecha) for date formatting
- [Grommet](https://v2.grommet.io/) for out-of-the-box theming and styling
- [lodash](https://lodash.com/) utilities

## Routes

The app is comprised of two page routes:

- Home (`/`), displays a list of articles and accepts a `q` parameter for text search and a `page` parameter (e.g. `q=berlin&page=10`)

- Article (`/article/:id`), displays a detailed view of an article. When passing an invalid article identifier, it will redirect to the Home route

## Available Scripts

In the project directory, you can run:

### `yarn start` | `yarn dev`

Runs the app in the development mode.<br  />

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br  />

You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

The project uses [Mock Service Worker](https://mswjs.io/) to mock API requests and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) to render components for test.

For components that depend on external providers, there is a `renderWithProviders` utility function in `test-utils.js` that can be used to wrap components with Grommet, Redux Provider and Router.

### `yarn build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn analyze`

Analyzes the current production build. Make sure to run `yarn build` before running this script. After running, you will find a bundle analysis in your browser from [source-map-explorer](https://github.com/danvk/source-map-explorer)
