import React, { Component } from 'react';
import { Tab, Form, Table, Message } from 'semantic-ui-react';
import { fetchItems } from './Account';
import Transaction from './Transaction';
import request from 'superagent';


let accounts = []
fetchItems('http://127.0.0.1:8000/api/v1/accounts/').then((response) => {
  if (response && response.length > 0) {
    accounts = response.map((account) => (
      {key: account.id, text: `Account ${account.id} (${account.account_type})`, value: account.id}
    ));
  }
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
  constructor() {
    super();
    this.state = {
      transactions: [],
      activeAccount: 0
    }
    this.onAccountFormChange = this.onAccountFormChange.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onAccountFormChange(event, data) {
    let key = data.name;
    let value = data.value;
    this.setState({
        [key]: value
    });

  }

  handleSubmit() {
    this.getTransactions(this.state.activeAccount)
  }

  getTransactions(account_no) {
    if (localStorage.getItem('token')) {
      fetchItems(`http://127.0.0.1:8000/api/v1/transactions/?account=${account_no}`).then((response) => {
        const transactions = response;
        this.setState({ transactions });
      });
    } else {
      window.location.href = '/login';
    }
  }

  render() {
    return (
      <div>
      <Form>
            <Form.Group widths='equal'>
              <Form.Select fluid name="activeAccount" onChange={this.onAccountFormChange} label='Account' options={accounts} placeholder='Select Account' />
            </Form.Group>
            <Form.Button onClick={this.handleSubmit}>View Transactions</Form.Button>
      </Form>
      <Table celled compact definition>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Transaction Date</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Transaction Type</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {this.state.transactions.length > 0 ?
        this.state.transactions.map((transaction, index) => (
          <Transaction transaction={transaction} key={index}/>
        ))
        : null
      }
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
