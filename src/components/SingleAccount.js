import React, { Component } from 'react';
import { Checkbox, Tab, Form, Table, Message } from 'semantic-ui-react';
import { fetchItems } from './Account';
import request from 'superagent';


const options = [
  { key: 'm', text: 'Account 1', value: '1' },
  { key: 'f', text: 'Account 2', value: '2' },
]

let accounts = []
fetchItems('http://127.0.0.1:8000/api/v1/accounts/').then((response) => {
  accounts = response.map((account) => (
    {key: account.id, text: `Account ${account.id} (${account.account_type})`, value: account.id}
  ));
});

const createTransaction = (transaction_type, account, description, amount) => {
  const token = JSON.parse(localStorage.getItem('token') || '{}')
  return new Promise((resolve, reject) => {
    request
        .post('http://127.0.0.1:8000/api/v1/transactions/')
        .set('Authorization', `JWT ${token}`)
        .send({ transaction_type, account, description, amount })
        .end((error, result) => {
          if (!error) {
            resolve(result.body);
          } else {
            reject(error);
          }
        });
  })
}

class DepositForm extends Component {
  constructor() {
    super();
    this.state = {
      messageHidden: true,
      messageContent: '',
      account: '',
      description: '',
      amount: 0,
      success: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onAccountFormChange = this.onAccountFormChange.bind(this);
  }
  handleSubmit(event, value) {
    if (localStorage.getItem('token')) {
      createTransaction(
        'deposit', this.state.account, this.state.description, this.state.amount
        ).then((response) => {
            this.setState({
                messageHidden: false,
                messageContent: 'Transaction successful! Your account has been updated successfuly.',
                success: true
            });
            setTimeout(() => {
              this.setState({ messageHidden: true })
            }, 2000)
          })
          .catch((error) => {
            this.setState({
              messageHidden: false,
              messageContent: `error: ${error}`,
              success: false
            })}
          );
    } else {
      window.location.href = '/login';
    }
  }

  onAccountFormChange(event, data) {
    let key = data.name;
    let value = data.value;
    this.setState({
        [key]: value
    });
  }

  render() {
    return (
      <div>
        <Form>
              <Form.Group widths='equal'>
                <Form.Input fluid name="amount" label='Transaction Amount' placeholder='Amount' onChange={this.onAccountFormChange}/>
                <Form.Select fluid name="account" label='Account' options={accounts} placeholder='Select Account' onChange={this.onAccountFormChange}/>
              </Form.Group>

              <Form.TextArea name="description" label='Description' placeholder='Describe the transaction' onChange={this.onAccountFormChange}/>
              <Form.Checkbox label='Credit my account with the amount indicated' />
              <Form.Button onClick={this.handleSubmit}>Submit</Form.Button>
          </Form>
          <Message hidden={this.state.messageHidden} positive={this.state.success} negative={!this.state.success}>
              {this.state.messageContent}
        </Message>
      </div>
    );
  }
}

class WithdrawForm extends Component {
  constructor() {
    super();
    this.state = {
      messageHidden: true,
      messageContent: '',
      account: '',
      description: '',
      amount: 0,
      success: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onAccountFormChange = this.onAccountFormChange.bind(this);
  }
  handleSubmit(event, value) {
    if (localStorage.getItem('token')) {
      createTransaction(
        'withdraw', this.state.account, this.state.description, this.state.amount
        ).then((response) => {
            this.setState({
                messageHidden: false,
                messageContent: 'Transaction successful! Your account has been updated successfuly.',
                success: true
            });
            setTimeout(() => {
              this.setState({ messageHidden: true })
            }, 2000)
          })
          .catch((error) => {
            this.setState({
              messageHidden: false,
              messageContent: 'An error occurred while processing your' +
                'request. Remember to provide a description and ensure you' +
                ' have sufficient funds in your account',
              success: false
            })}
          );
    } else {
      window.location.href = '/login';
    }
  }

  onAccountFormChange(event, data) {
    let key = data.name;
    let value = data.value;
    this.setState({
        [key]: value
    });
  }

  render() {
    return (
      <div>
        <Form>
              <Form.Group widths='equal'>
                <Form.Input fluid name="amount" label='Transaction Amount' placeholder='Amount' onChange={this.onAccountFormChange}/>
                <Form.Select fluid name="account" label='Account' options={accounts} placeholder='Select Account' onChange={this.onAccountFormChange}/>
              </Form.Group>

              <Form.TextArea name="description" label='Description' placeholder='Describe the transaction' onChange={this.onAccountFormChange}/>
              <Form.Checkbox label='Credit my account with the amount indicated' />
              <Form.Button onClick={this.handleSubmit}>Submit</Form.Button>
          </Form>
          <Message hidden={this.state.messageHidden} positive={this.state.success} negative={!this.state.success}>
              {this.state.messageContent}
        </Message>
      </div>
    );
  }
}


class Transactions extends Component {
  handleChange = (e, { value }) => this.setState({ value })
  state = {}

  render() {
    return (
      <div>
      <Form>
            <Form.Group widths='equal'>
              <Form.Select fluid label='Account' options={options} placeholder='Select Account' />
            </Form.Group>
      </Form>
      <Table celled compact definition>
  <Table.Header fullWidth>
    <Table.Row>
      <Table.HeaderCell />
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Registration Date</Table.HeaderCell>
      <Table.HeaderCell>E-mail address</Table.HeaderCell>
      <Table.HeaderCell>Premium Plan</Table.HeaderCell>
    </Table.Row>
  </Table.Header>

  <Table.Body>
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox slider />
      </Table.Cell>
      <Table.Cell>John Lilki</Table.Cell>
      <Table.Cell>September 14, 2013</Table.Cell>
      <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
      <Table.Cell>No</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox slider />
      </Table.Cell>
      <Table.Cell>Jamie Harington</Table.Cell>
      <Table.Cell>January 11, 2014</Table.Cell>
      <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
      <Table.Cell>Yes</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>

      </div>
    );
  }
}

const panes = [
  { menuItem: 'Deposit funds', render: () => <Tab.Pane><DepositForm /></Tab.Pane> },
  { menuItem: 'Withdraw funds', render: () => <Tab.Pane><WithdrawForm /></Tab.Pane> },
  { menuItem: 'Transactions', render: () => <Tab.Pane><Transactions /></Tab.Pane> },
]

const SingleAccount = () => (
  <div>
    <Tab menu={{ fluid: true, vertical: true, tabular: 'right' }} panes={panes} />
  </div>
)


export default SingleAccount;
