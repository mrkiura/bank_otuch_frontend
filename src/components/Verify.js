import React, {Component} from "react";
import { Icon, Button, Input, Container, Message} from 'semantic-ui-react';
import request from 'superagent';


class VerifyForm extends Component {
  constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.state = {
            email: '',
            new_password: '',
            old_password: '',
            token: '',
            error: false,
            messageHidden: true,
            success: false
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.verifyUser(this.state.email, this.state.old_password, this.state.new_password);
    }
    handleFieldChange(event, data) {
        event.preventDefault();
        let key = data.name;
        let value = data.value;
        this.setState({
            [key]: value
        });
    }
    verifyUser(email, old_password, new_password) {
    request
        .post('https://bank-otuch.herokuapp.com/api/v1/auth/verify/')
        .send({ email, old_password, new_password })
        .end((err, result) => {
            if (result.status === 200) {
                this.setState({
                    token: result.body.token,
                    messageHidden: false,
                    messageContent: 'Account verified successfully. Please login using your new password.',
                    success: true
                });
                setTimeout(() => {
                  this.setState({ messageHidden: true })
                }, 2000)
                window.location.href = '/login'
                // this.props.history.pushState({token: this.state.token}, '/home');
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
          <div className="content large">
          Verify your account
          </div>
          <div className="field">
            <Input iconPosition='left' name="email" placeholder='Email' onChange={this.handleFieldChange}>
              <Icon name='at' />
            <input />
            </Input>
          </div>
          <div className="field">
            <Input iconPosition='left' name="old_password" placeholder='One-time Password' type="password" onChange={this.handleFieldChange}>
              <Icon name='lock' />
            <input />
            </Input>
          </div>
          <div className="field">
            <Input iconPosition='left' name="new_password" placeholder='Password' type="password" onChange={this.handleFieldChange}>
              <Icon name='lock' />
            <input />
            </Input>
          </div>

          <div>
            <Button
              primary
              href="/verify"
              icon
              labelPosition="right"
              size="large"
              onClick={this.handleSubmit}
              >Verify
              <Icon name="sign in"/>
              </Button>
            </div>
            <Message hidden={this.state.messageHidden} positive={this.state.success} negative={!this.state.success}>
                {this.state.messageContent}
          </Message>

        </div>

      </Container>
    );
  }
}


export default VerifyForm;
