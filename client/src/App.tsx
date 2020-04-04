import Home from "./pages/Home";
import './App.css';
import Header from "./components/Header";
import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import { firebaseConfig } from "./config";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import Protected from "./pages/Protected";
import ProviderRegisterForm from "./views/forms/ProviderRegisterForm";
import { ProtectedPage } from "./pages/ProtectedPage";


function App() {
  const ProtectedProviderRegisterForm = ProtectedPage(ProviderRegisterForm);
  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
    <Router>
      <div className="App">
        <Header />
        <div className="App-body">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/protected">
              <Protected />
            </Route>
            <Route path="/sign-in">
              <SignIn />
            </Route>
            <Route path="/register">
              <SignIn />
            </Route>
            <Route path="/register-customer">
              <div>register customer</div>
            </Route>
            <Route path="/register-provider">
              <ProtectedProviderRegisterForm />
          </Route>
          </Switch>
        </div>
      </div>
    </Router>
    </FirebaseAuthProvider>
  );
}

export default App;
