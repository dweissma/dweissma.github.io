import React from "react";
import { useState } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { Home } from "./Home";
import { About } from "./About";
import { Resume } from "./Resume";
import { ChessGame } from "./chess/ChessGame";
import {
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";

export enum Views {
  Home,
  Resume,
  About,
  Chess
}

export interface AppProps {
}

function App(props: AppProps) {
  let location = useLocation();
  return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="/">
                Drew Weissmann
              </Link>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li className={location.pathname === "/" ? "active" : ""}>
                  <Link to="/">Home</Link>
                </li>
                <li className={location.pathname === "/about" ? "active" : ""}>
                  <Link to="/about">About</Link>
                </li>
                <li className={location.pathname === "/resume" ? "active" : ""}>
                  <Link to="/resume">Resume</Link>
                </li>
                <li className={location.pathname.startsWith("/chess") ? "active": ""}>
                  <Link to="/chess">Chess</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/resume">
            <Resume />
          </Route>
          <Route path="/chess">
            <ChessGame />
          </Route>
          <Route path="*">
            <p>In Progress</p>
          </Route>
        </Switch>
      </div>
  );
}
export default App;
