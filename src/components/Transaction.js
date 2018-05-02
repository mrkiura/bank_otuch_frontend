import React from 'react'
import { Table } from 'semantic-ui-react';
import moment from 'moment';


const Transaction = ({transaction}, key) => {
  let amount = transaction.amount;
  if (transaction.transaction_type === 'withdraw') {
    amount = -1 * amount
  }
  return (<Table.Row>
    <Table.Cell collapsing>
    </Table.Cell>
    <Table.Cell>{moment(transaction.timestamp).fromNow()}</Table.Cell>
    <Table.Cell>{transaction.description}</Table.Cell>
    <Table.Cell>{transaction.transaction_type}</Table.Cell>
    <Table.Cell>{amount}</Table.Cell>
  </Table.Row>)
}

export default Transaction;
