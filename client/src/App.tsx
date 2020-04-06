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
import SignUp from "./pages/SignUp";
import Protected from "./pages/Protected";
import ProviderRegisterForm from "./views/forms/ProviderRegisterForm";
import { ProtectedPage } from "./pages/ProtectedPage";
import ConsumerRegisterForm from "./views/forms/ConsumerRegisterForm";
import UserHome from "./pages/UserHome";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


function App() {
  const ProtectedProviderRegisterForm = ProtectedPage(ProviderRegisterForm);
  const ProtectedUserHome = ProtectedPage(UserHome);
  const ProtectedConsumerRegisterForm = ProtectedPage(ConsumerRegisterForm);

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
    <Router>
      <div className="App">
        <Header />
        <div className="App-body">
          <Snackbar open={true}>
              <Alert severity="warning">
                  The platform still misses some links with DB. We are currently working on getting a MVP product as soon as possible. Stay tuned!
              </Alert>
          </Snackbar>
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
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/register">
              <SignIn />
            </Route>
            <Route path="/home">
              <ProtectedUserHome />
            </Route>
            <Route path="/register-customer">
              <ProtectedConsumerRegisterForm />
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
