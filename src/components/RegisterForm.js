import React, {Component} from "react";
import { Icon, Button, Message, Input, Container, } from 'semantic-ui-react';
import request from 'superagent';


class RegisterForm extends Component {
  constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.state = {
            email: '',
            national_id: '',
            first_name: '',
            last_name: '',
            date_of_birth: '',
            token: '',
            error: false,
            messageHidden: true,
            success: false
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        this.registerUser(
          this.state.email,
          this.state.first_name,
          this.state.last_name,
          this.state.date_of_birth,
          this.state.national_id
        );
    }
    handleFieldChange(event, data) {
        event.preventDefault();
        let key = data.name;
        let value = data.value;
        this.setState({
            [key]: value
        });
    }
    registerUser(email, first_name, last_name, date_of_birth, national_id) {
    request
        .post('https://bank-otuch.herokuapp.com/api/v1/auth/register/')
        .send(
          {
            'email': email,
            'first_name': first_name,
            'last_name': last_name,
            'date_of_birth': date_of_birth,
            'national_id': national_id,
          })
        .end((err, result) => {
            if (result.status === 200) {
                this.setState({
                    token: result.body.token,
                    messageHidden: false,
                    messageContent: 'Account created. Check your email for a link to verify the account.',
                    success: true
                });
                localStorage.setItem('token', JSON.stringify(this.state.token));
                localStorage.setItem('email',
                    JSON.stringify(this.state.email));
                window.location.href = '/verify'
            } else {
                this.setState({
                    error: true,
                    messageHidden: false,
                    messageContent: 'There were errors. Make sure the credentials are correct.',
                    success: false
                })
            }
        })
    }

  render() {
    return (
      <Container fluid textAlign="center" className="ui middle aligned aligned center-item grid">
        <div className="column ui medium form">
          <div className="field">
          Register
            <Input iconPosition='left' name="email" placeholder='Email' onChange={this.handleFieldChange}>
              <Icon name="at" />
            <input />
            </Input>
          </div>
          <div className="field">
            <Input iconPosition="left" name="national_id" placeholder="national Id" onChange={this.handleFieldChange}>
              <Icon name="at" />
            <input />
            </Input>
          </div>
          <div className="field">
            <Input name="first_name" placeholder="First Name" onChange={this.handleFieldChange}>
            <input />
            </Input>
          </div>
          <div className="field">
            <Input name="last_name" placeholder="Last Name" onChange={this.handleFieldChange}>
            <input />
            </Input>
          </div>
          <div className="field">
            <Input name="date_of_birth" placeholder="Date of Birth" type="date" onChange={this.handleFieldChange}>
            <input />
            </Input>
          </div>

          <Button
            primary
            href="/register"
            icon
            labelPosition="right"
            size="small"
            onClick={this.handleSubmit}
            >Submit
            <Icon name="signup"/>
            </Button>
            <Message hidden={this.state.messageHidden} positive={this.state.success} negative={!this.state.success}>
                {this.state.messageContent}
          </Message>

        </div>

      </Container>
    );
  }
}


export default RegisterForm;
