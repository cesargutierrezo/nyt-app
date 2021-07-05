import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Loading from "./components/Loading";
import Home from "./pages/Home";

const Article = lazy(() => import("./pages/Article"));

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/article/:id" exact component={Article} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
