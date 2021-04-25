import React from 'react';
import './App.css';
import { Layout } from './components/layout';
import { Content } from './components/layout/content';
import { Header } from './components/layout/header';
import { Home } from './pages/home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Posts } from './pages/posts';

function App() {
  return (
    <Layout>
      <Header />
      <Content>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path={`/posts/:userId`}>
              <Posts />
            </Route>
          </Switch>
        </Router>
      </Content>
    </Layout>
  );
}

export default App;
