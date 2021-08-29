import React from 'react';
// import * as d3 from 'd3';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ForceDirectedTreeD3 from './ForceDirectedTreeD3';

function ForceDirectedTree() {
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
          <Typography variant="h4">Force-Directed Tree</Typography>
          <br />
        </div>
        <Divider variant="fullWidth" />
        <div style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Typography paragraph>
            D3.js Force Chart 연습 - Force-Directed Tree &nbsp;&nbsp;
            <em>
              {' '}
              [Credit:{' '}
              <a
                href="https://bl.ocks.org/mbostock/95aa92e2f4e8345aaa55a4a94d41ce37"
                target="_blank"
                rel="noopener noreferrer"
              >
                Force-Directed Tree by Mike Bostock]
              </a>
            </em>
          </Typography>
        </div>
        <div>
          {/* {loading && <div>loading</div>}
          {!loading && <ForceDirectedTreeD3 data={data} />} */}
          <ForceDirectedTreeD3 />
        </div>
      </Container>
    </div>
  );
}

export default ForceDirectedTree;
