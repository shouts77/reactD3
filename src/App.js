import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import BarChart from './components/Chart/BarChart';

function App() {
  return (
    <Router>
        <Navigation />
        <Route exact path="/" component={Home}/>
        <Route exact path="/barchart" component={BarChart}/>
    </Router>
  );
}

export default App;



