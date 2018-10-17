import * as JsStore from "jsstore";
// eslint-disable-next-line
const Worker = require("worker-loader?name=scripts/jsstore.worker.js!../../node_modules/jsstore/dist/jsstore.worker");

// This will ensure that we are using only one instance.
// Otherwise due to multiple instance multiple worker will be created.

const idbCon = new JsStore.Instance(new Worker());
export default idbCon;
