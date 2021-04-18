import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import App from './App';
import Room from './Room';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
        <Switch>
            <Route exact path="/">
                <App />
            </Route>
            <Route exact path="/room/:roomID" >
                <Room />
            </Route>
        </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
