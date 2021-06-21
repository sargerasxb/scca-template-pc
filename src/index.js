import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./index.less";
import "./assets/style/reset.css";
import App from "./App";
/* use vconsole */
/*
  import Vconsole from 'vconsole';
*/
import { IS_MOBILE } from "./utils/util";

const HelloWorld = lazy(() => import("@/views/hello-world/HelloWorld"));

const render = () => {
  ReactDOM.render(
    <HashRouter>
      <Suspense fallback={<div></div>}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/sign" component={HelloWorld} />
        </Switch>
      </Suspense>
    </HashRouter>,
    document.getElementById("root")
  );
};

console.log("v1.0.3");

if (IS_MOBILE) {
  import("./utils/viewport").then((status) => {
    render();

    // new Vconsole();
  });
} else {
  render();
}
