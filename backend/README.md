# World of USO API server

## Contributing

### Requiremets

- `yarn`
- `docker` and `docker-compose`

### Development

```sh
cd backend
mv .env.example .env # rename .env.example to .env and make the necessary changes
yarn install # get dependencies
docker-compose up -d # run database Docker container for development
yarn dev # start API server
```

### Creating an app

Take a look at the code structure of an existing app (i.e. `src/apps/qotd`), then follow the steps:

- Create a new directory for the app in `src/apps` (i.e. `src/apps/<appName>`).
- Define database models in `src/apps/<appName>/models`. Export models from `src/apps/<appName>/models/index.js`.
- Define API endpoints in `src/apps/<appName>/routes`. Export a single `express.Router` from `src/apps/<appName>/routes/index.js`. Endpoints will be mounted on `http://<hostname>/api/apps/<appName>/`.
- Export app (models and routes) from `src/apps/<appName>/index.js`.
- Append app to the object exported from `src/apps`.
