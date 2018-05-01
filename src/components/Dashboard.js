import React from 'react'
import { Menu, Tab, Container } from 'semantic-ui-react';
import Accounts from './Account';


const panes = [
  {
    menuItem: { key: 'accounts', icon: 'home', content: 'Accounts' },
    render: () => <Tab.Pane><Accounts /></Tab.Pane>,
  },
  {
    menuItem: <Menu.Item key='transactions'>Transactions</Menu.Item>,
    render: () => <Tab.Pane>Transactions</Tab.Pane>,
  },
]

const Dashboard = () => (
  <Container fluid textAlign="center" className="ui middle aligned center aligned grid">
    <Tab panes={panes} className="column"/>
  </Container>
)

export default Dashboard;
