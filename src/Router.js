import { BrowserRouter, Switch, Route } from "react-router-dom";

import LoginPage from "./pages/Login/";
import MainPage from "./pages/Main/";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/main" component={MainPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
