import React from 'react'
import { Menu, Tab, Container } from 'semantic-ui-react';
import Accounts from './Account';
import SingleAccount from './SingleAccount';


const panes = [
  {
    menuItem: { key: 'accounts', icon: 'home', content: 'Accounts' },
    render: () => <Tab.Pane><Accounts /></Tab.Pane>,
  },
  {
    menuItem: <Menu.Item key='transactions'>Manage</Menu.Item>,
    render: () => <Tab.Pane><SingleAccount /></Tab.Pane>,
  },
]

const Dashboard = () => (
  <Container textAlign="center" className="ui center aligned grid">
    <Tab panes={panes} className="column container-height"/>
  </Container>
)

export default Dashboard;
