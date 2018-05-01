import React, {Component} from "react";
import { Icon, Button, Input, Container, } from 'semantic-ui-react';
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
        .post('http://127.0.0.1:8000/api/v1/auth/register/')
        .send(
          {
            'email': email,
            'first_name': first_name,
            'last_name': last_name,
            'date_of_birth': date_of_birth,
            'national_id': national_id,
          })
        .end((err, result) => {
            console.log(result)
            if (result.status === 200) {
                this.setState({
                    token: result.body.token
                });
                localStorage.setItem('token', JSON.stringify(this.state.token));
                localStorage.setItem('email',
                    JSON.stringify(this.state.email));
                // window.location.reload()
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
      <Container fluid textAlign="center" className="ui middle aligned center aligned grid">
        <div className="column register-form">
          <Input iconPosition='left' name="email" placeholder='Email' onChange={this.handleFieldChange}>
            <Icon name="at" />
          <input />
          </Input>
          <Input iconPosition="left" name="national_id" placeholder="national Id" onChange={this.handleFieldChange}>
            <Icon name="at" />
          <input />
          </Input>
          <Input name="first_name" placeholder="First Name" onChange={this.handleFieldChange}>
          <input />
          </Input>
          <Input name="last_name" placeholder="Last Name" onChange={this.handleFieldChange}>
          <input />
          </Input>
          <Input name="date_of_birth" placeholder="Date of Birth" type="date" onChange={this.handleFieldChange}>
          <input />
          </Input>

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

        </div>

      </Container>
    );
  }
}


export default RegisterForm;
