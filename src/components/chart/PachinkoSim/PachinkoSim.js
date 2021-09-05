import React from 'react';
// import * as d3 from 'd3';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import PachinkoSimD3 from './PachinkoSimD3';

function PachinkoSim() {
  //   const [data, setData] = React.useState([]);
  //   const [loading, setLoading] = React.useState(true);

  //   React.useEffect(() => {
  //     d3.json('/reactD3/data/miserables.json').then((data) => {
  //       setData(data);
  //       setLoading(false);
  //     });
  //     return () => undefined;
  //   }, []);

  return (
    <div>
      <Container maxWidth="lg">
        <div>
          <Typography variant="h4">Pachinko Simulator</Typography>
          <br />
        </div>
        <Divider variant="fullWidth" />
        <div style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Typography paragraph>
            D3.js Pachinko Simulator 연습 &nbsp;
            <em>
              {' '}
              [Credit:{' '}
              <a
                href="https://observablehq.com/@mbostock/pachinko-simulator"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pachinko Simulator by Mike Bostock]
              </a>
            </em>
          </Typography>
        </div>
        <div>
          {/* {loading && <div>loading</div>}
          {!loading && <ForceDirectedTreeD3 data={data} />} */}
          <PachinkoSimD3 />
        </div>
      </Container>
    </div>
  );
}

export default PachinkoSim;
