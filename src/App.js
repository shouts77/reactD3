import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import BarChart from './components/Chart/BarChart';

const font = "'Noto Sans KR', sans-serif";
const theme = createTheme({
  typography: {
    fontFamily: font,
    h4: {
      "fontWeight": 500,
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
        <Navigation />
        <Route exact path="/reactD3" component={Home}/>
        <Route exact path="/barchart" component={BarChart}/>
    </Router>
    </ThemeProvider>
  );
}

export default App;



