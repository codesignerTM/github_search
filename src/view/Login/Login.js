import React, { Component } from "react";
import Form from "../../components/Form/Form";
import * as actions from "../../actions/auth.actions";
import Spinner from "../../components/Spinner/Spinner";
import { Redirect } from "react-router-dom";

import "./Login.css";

class Login extends Component {
  state = {
    form: {
      email: "",
      password: ""
    },
    emailWarning: false,
    passwordWarning: false,
    redirectToMain: false
  };

  componentDidMount() {}

  handleChange = input => e => {
    let targetValue = e.target.value;
    this.setState({
      form: {
        ...this.state.form,
        [input]: targetValue
      }
    });
    console.log("state", this.state);
  };

  logIn = () => {
    let form = this.state.form;
    if (form.email.length === 0) {
      this.setState({
        emailWarning: true
      });
    } else if (form.password.length === 0) {
      this.setState({
        emailWarning: false,
        passwordWarning: true
      });
    } else {
      this.setState({
        emailWarning: false,
        passwordWarning: false,
        loading: true,
        redirectToMain: true
      });
      let signUp = false;
      actions
        .signUp(form.email, form.password, signUp)
        .then(response => {
          console.log("response", response);
          const expirationDate = new Date(
            new Date().getTime() + response.data.expiresIn * 1000
          );
          localStorage.setItem("token", response.data.idToken);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem("userId", response.data.localId);
          localStorage.setItem("email", form.email);
          this.setState({
            redirectToMain: true
          });
        })
        .catch(error => {
          console.log("Error while authenticate!", error);
          alert("Email and/or password is wrong!");
        });
    }
  };

  render() {
    let { emailWarning, passwordWarning, redirectToMain, loading } = this.state;
    let spinner;
    if (loading) {
      spinner = <Spinner />;
    }
    return (
      <div className="container">
        <div className="card-container">
          {spinner}
          {redirectToMain === true ? <Redirect to="/main" /> : null}
          <Form
            handleChange={this.handleChange}
            logIn={this.logIn}
            emailWarning={emailWarning}
            passwordWarning={passwordWarning}
          />
        </div>
      </div>
    );
  }
}

export default Login;
