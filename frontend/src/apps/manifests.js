const getAppManifest = (appName) => require(`./${appName}/manifest`).default

const manifests = [getAppManifest('qotd')]

export default manifests
