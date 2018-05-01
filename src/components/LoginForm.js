import React, {Component} from "react";
import { Icon, Button, Input, Container, } from 'semantic-ui-react';
import request from 'superagent';


class LoginForm extends Component {
  constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.state = {
            email: '',
            password: '',
            token: '',
            error: false,
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.loginUser(this.state.email, this.state.password);
    }
    handleFieldChange(event, data) {
        event.preventDefault();
        let key = data.name;
        let value = data.value;
        this.setState({
            [key]: value
        });
    }
    loginUser(username, password) {
    request
        .post('http://127.0.0.1:8000/api/v1/auth/login/')
        .send({'email': username, 'password': password })
        .end((err, result) => {
            console.log(result)
            if (result.status === 200) {
                this.setState({
                    token: result.body.token
                });
                localStorage.setItem('token', JSON.stringify(this.state.token));
                localStorage.setItem('email',
                    JSON.stringify(this.state.email));
                window.location.href = '/dashboard'
                // this.props.history.pushState({token: this.state.token}, '/home');
            } else {
                this.setState({
                    error: true
                })
                console.log(err)
            }
        })
    }

  render() {
    return (
      <Container fluid textAlign="center" className="ui middle aligned aligned center-item grid">
        <div className="column ui medium form">
          <div className="content large">
          Log-in to your account
          </div>
          <div className="field">
            <Input iconPosition='left' name="email" placeholder='Email' onChange={this.handleFieldChange}>
              <Icon name='at' />
            <input />
            </Input>
          </div>
          <div className="field">
            <Input iconPosition='left' name="password" placeholder='Password' type="password" onChange={this.handleFieldChange}>
              <Icon name='lock' />
            <input />
            </Input>
          </div>

          <div>
            <Button
              primary
              href="/login"
              icon
              labelPosition="right"
              size="large"
              onClick={this.handleSubmit}
              >Login
              <Icon name="sign in"/>
              </Button>
            </div>

        </div>

      </Container>
    );
  }
}


export default LoginForm;
