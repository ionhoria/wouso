# World of USO web interface

## Contributing

### Requiremets

- `yarn`

### Development

```sh
cd frontend
yarn install # get dependencies
yarn start # start live development server
```

### Creating an app

Take a look at the code structure of an existing app (i.e. `src/apps/qotd`), then follow the steps:

- Create the following directory structure in `src/apps/<appName>`:

```
actions/
components/
containers/
  - Navigation.js
  - Routes.js
reducers/
  - index.js
manifest.js
```

- Create navigation structure in `src/apps/<appName>/containers/Navigation.js` and export it.
- Create routes in `src/apps/<appName>/containers/Routes.js` and export them.
- Create a Redux reducer in `src/apps/<appName>/reducers/index.js` and export it.
- Fill out the app manifest in `src/apps/<appName>/manifest.js` and export it.

```
import Navigation from './containers/Navigation'
import Routes from './containers/Routes'
import rootReducer from './reducers'

export default {
  title: '<appTitle>',
  baseUrl: '<appName>',
  requiredBackendApps: ['<appName>'],
  routes: Routes,
  navigation: Navigation,
  reducer: rootReducer
}
```

- Add `getAppManifest('<appName>')` to the `manifests` array in `src/apps/manifests.js`.
- Develop the rest of the application.
- Test by running the web interface - the app should be accesible from the side menu.
