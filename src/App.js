import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.scss';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

function App() {
  return (
    <DndProvider backend={Backend}>
      <ReactNotification />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </DndProvider>
  );
}

export default App;
