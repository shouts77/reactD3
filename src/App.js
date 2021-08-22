import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import ScatterChart from './components/chart/ScatterChart/ScatterChart';
import BarChart from './components/chart/BarChart/BarChart';

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
        <Route path="/scatterchart" component={ScatterChart}/>
        <Route path="/barchart" component={BarChart}/>
    </Router>
    </ThemeProvider>
  );
}

export default App;



