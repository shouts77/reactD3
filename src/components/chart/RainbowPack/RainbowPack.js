import React from 'react';
// import * as d3 from 'd3';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import RainbowPackD3 from './RainbowPackD3';

function RainbowPack() {
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
          <Typography variant="h4">Rainbow Pack</Typography>
          <br />
        </div>
        <Divider variant="fullWidth" />
        <div style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Typography paragraph>
            D3.js Rainbow Pack 연습 &nbsp;
            <em>
              {' '}
              [Credit:{' '}
              <a
                href="https://bl.ocks.org/mbostock/b07f8ae91c5e9e45719c"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rainbow Pack by Mike Bostock]
              </a>
            </em>
          </Typography>
        </div>
        <div>
          {/* {loading && <div>loading</div>}
          {!loading && <ForceDirectedTreeD3 data={data} />} */}
          <RainbowPackD3 />
        </div>
      </Container>
    </div>
  );
}

export default RainbowPack;
