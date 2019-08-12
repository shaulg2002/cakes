import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import CakeList from "./components/CakeList";
// import ItemModal from './components/ItemModal';
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MyCart from './components/pages/MyCart'

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
        <div className="App">
          <div className="container">
            <AppNavbar />
            <Route
              exact path="/"
              render={props => (
                <React.Fragment>
                  <CakeList />
                </React.Fragment>
              )}
            />
           {/* <Route path="/mycart" component={MyCart} /> */}
          </div>
        </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
