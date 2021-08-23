import React from 'react';
import * as d3 from 'd3';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ScatterChartD3 from './ScatterChartD3';

function ScatterChart() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    d3.dsv(
      ',',
      '/reactD3/data/iris.csv',
      ({ species: category, sepalLength: x, sepalWidth: y }) => ({ category, x: +x, y: +y }),
    ).then((d) => {
      setData(Object.assign(d, { x: 'Sepal length (cm) →', y: '↑ Sepal width (cm)' }));
      setLoading(false);
    });
    return () => undefined;
  }, []);

  return (
    <div>
      <Container maxWidth="lg">
        <div>
          <Typography variant="h4">Scatter Chart</Typography>
          <br />
        </div>
        <Divider variant="fullWidth" />
        <div style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Typography paragraph>D3.js Scatter Chart 연습</Typography>
        </div>
        <div>
          {loading && <div>loading</div>}
          {!loading && <ScatterChartD3 data={data} />}
        </div>
      </Container>
    </div>
  );
}

export default ScatterChart;
