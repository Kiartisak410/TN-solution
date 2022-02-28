import './App.css';
import Login from './page/login';
import Admin from './page/Admin';
import User from './page/User';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { useState } from 'react';

function App() {
    return (
      <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route path="/:id" component={Admin} />
                    <Route path="/user">
                        <User />
                    </Route>
                </Switch>
            </BrowserRouter>
      </>
    );
}

export default App;