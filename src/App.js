import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import ScatterChart from './components/chart/ScatterChart/ScatterChart';
import BarChart from './components/chart/BarChart/BarChart';
import ForceChart from './components/chart/ForceChart/ForceChart';
import ForceDirectedTree from './components/chart/ForceDirectedTree/ForceDirectedTree';
import RainbowPack from './components/chart/RainbowPack/RainbowPack';
import PachinkoSim from './components/chart/PachinkoSim/PachinkoSim';

const font = "'Noto Sans KR', sans-serif";
const theme = createTheme({
  typography: {
    fontFamily: font,
    h4: {
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation />
        <Route exact path="/reactD3" component={Home} />
        <Route path="/scatterchart" component={ScatterChart} />
        <Route path="/barchart" component={BarChart} />
        <Route path="/forcechart" component={ForceChart} />
        <Route path="/forcedirectedtree" component={ForceDirectedTree} />
        <Route path="/rainbowpack" component={RainbowPack} />
        <Route path="/pachinkosim" component={PachinkoSim} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
