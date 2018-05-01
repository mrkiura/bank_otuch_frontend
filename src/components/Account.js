import React, {Component} from 'react'
import { Checkbox, Table, Button, Modal, Select } from 'semantic-ui-react';
import moment from 'moment';
import request from 'superagent';


const Account = ({account}, key) => (
  <Table.Row>
    <Table.Cell collapsing>
    </Table.Cell>
    <Table.Cell>{account.account_type}</Table.Cell>
    <Table.Cell>{moment(account.last_modified).fromNow()}</Table.Cell>
    <Table.Cell><Checkbox slider checked={account.active}/></Table.Cell>
    <Table.Cell>{account.balance}</Table.Cell>
  </Table.Row>
)

const accountOptions = [
  { key: 0, value: 'current', text: 'Current' },
  { key: 1, value: 'savings', text: 'Savings' },
];


const fetchItems = (url) => {
  // returns a Promise object.
  const token = JSON.parse(localStorage.getItem('token') || '{}')
  return new Promise((resolve, reject) => {
    request
    .get(url)
    .set('Authorization', `JWT ${token}`)
    .end((error, result) => {
      if (!error) {
        resolve(result.body);
      } else {
        reject(error);
      }
    });
  });
};
//
// const createAccount = () => {
//
// }

const inlineStyle = {
  modal : {
    marginTop: 'auto !important',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

class Accounts extends Component {
  constructor() {
    super();
    this.state = {
      'accounts': [],
      'modalOpen': false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    // Submit data and close modal.
    this.setState({ modalOpen: true })
  }
  closeModal() {
    // Submit data and close modal.
    this.setState({ modalOpen: false })
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      fetchItems('http://127.0.0.1:8000/api/v1/accounts/').then((response) => {
        const accounts = response;
        this.setState({ accounts });
      });
    } else {
      window.location.href = '/login';
    }
  }


  render() {
    return (
      <div>
        Your accounts
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Account type</Table.HeaderCell>
              <Table.HeaderCell>Last Transaction date</Table.HeaderCell>
              <Table.HeaderCell>Active</Table.HeaderCell>
              <Table.HeaderCell>Balance</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.accounts.map((account, index) => (
              <Account account={account} key={index}/>
            ))}
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='4'>
                <Button secondary size='small' onClick={this.openModal}>New Account</Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>

            <Modal
              size="small"
              open={this.state.modalOpen}
              onClose={this.closeModal}
              style={inlineStyle.modal}
              >
            <Modal.Header>
              Create a bank account
            </Modal.Header>
            <Modal.Content>
              <div className="column register-form center-item" style={inlineStyle.modal}>
                <div className="field">
                <Select
                  placeholder="Select the account type"
                  options={accountOptions}
                />
                </div>
              </div>

            </Modal.Content>
            <Modal.Actions>
              <Button negative>
                No
              </Button>
              <Button positive icon='checkmark' labelPosition='right' content='Submit' onClick={this.closeModal} />
            </Modal.Actions>
          </Modal>
      </Table>
      </div>
    )
  }
}

export default Accounts;
