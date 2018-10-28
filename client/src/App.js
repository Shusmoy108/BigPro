import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import NotFound from "./Components/NotFound";
import ProductBody from "./Components/Product/ProductBody";
import TaskBody from "./Components/Task/TaskBody";
import SubtaskBody from "./Components/Subtask/SubtaskBody";
import CreatePage from "./Components/Project/CreatePage";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Layout} />
      <Route path="/product" component={ProductBody} />
      <Route path="/step" component={TaskBody} />
      <Route path="/specification" component={SubtaskBody} />
      <Route path="/createproject" component={CreatePage} />
      <Route path="*" component={NotFound} />
    </Switch>
  </main>
);

export default Main;
