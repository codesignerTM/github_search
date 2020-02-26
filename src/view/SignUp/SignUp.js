import React, { Component } from "react";
import Form from "../../components/Form/Form";
import * as actions from "../../actions/actions";
import Spinner from "../../components/Spinner/Spinner";
import { Redirect } from "react-router-dom";

import "./SignUp.css";

class SignUp extends Component {
  state = {
    form: {
      email: "",
      password: "",
      name: ""
    },
    emailWarning: false,
    passwordWarning: false,
    nameWarning: false,
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
    } else if (form.name.length === 0) {
      this.setState({
        emailWarning: false,
        passwordWarning: false,
        nameWarning: true
      });
    } else {
      this.setState({
        emailWarning: false,
        passwordWarning: false,
        nameWarning: false,
        loading: true,
        redirectToMain: true
      });
      let signUp = true;
      actions.signUp(form.email, form.password, form.name, signUp);
    }
  };

  render() {
    let {
      emailWarning,
      passwordWarning,
      nameWarning,
      loading,
      redirectToMain
    } = this.state;
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
            nameWarning={nameWarning}
            isSignUp
          />
        </div>
      </div>
    );
  }
}

export default SignUp;
