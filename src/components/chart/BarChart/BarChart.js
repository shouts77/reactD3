import React from 'react'
import * as d3 from "d3";
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import BarChartD3 from './BarChartD3';

function BarChart() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    d3.dsv(',', '/reactD3/data/alphabet.csv',
        ({letter, frequency}) => (
          {name: letter, value: +frequency})).then((d) => {
      setData(d.sort((a, b) => d3.descending(a.value, b.value)));
      setLoading(false);
    });
    return () => undefined;
  }, []);
  return (
    <div>
      <Container maxWidth="lg">
      <div>
      <Typography variant="h4">
        Bar Chart
      </Typography>
      <br />
      </div>
      <Divider variant="fullWidth" />
      <div style={{ paddingTop: 20, paddingBottom: 20 }}>
      <Typography paragraph>
         D3.js Bar Chart 연습
       </Typography>
       </div>
       <div>
        {loading && <div>loading</div>}
        {!loading && <BarChartD3 data={data}/>}
       </div>
       </Container>
    </div>
  );
}

export default BarChart;