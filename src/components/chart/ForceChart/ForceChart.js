import React from 'react';
import * as d3 from 'd3';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ForceChartD3 from './ForceChartD3';

function ForceChart() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    d3.json('/reactD3/data/miserables.json').then((data) => {
      setData(data);
      setLoading(false);
    });
    return () => undefined;
  }, []);

  return (
    <div>
      <Container maxWidth="lg">
        <div>
          <Typography variant="h4">Force Chart</Typography>
          <br />
        </div>
        <Divider variant="fullWidth" />
        <div style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Typography paragraph>
            D3.js Force Chart 연습 &nbsp;
            <em>
              {' '}
              [Credit:{' '}
              <a
                href="https://observablehq.com/@d3/force-directed-graph"
                target="_blank"
                rel="noopener noreferrer"
              >
                Force-Directed Graph by Mike Bostock]
              </a>
            </em>
          </Typography>
        </div>
        <div>
          {loading && <div>loading</div>}
          {!loading && <ForceChartD3 data={data} />}
        </div>
      </Container>
    </div>
  );
}

export default ForceChart;
