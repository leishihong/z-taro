import dva from "./dva";
const files: any = require.context("./modules/", true, /\.ts$/);

const modules = {}
files.keys().forEach((key) => {
  modules[key] = files(key).default || files(key)
})

const dvaApp = dva.createApp({
  initialState: {},
  models:Object.values(modules),
  onAction:{}
});

const store = dvaApp.getStore();

export default store;
