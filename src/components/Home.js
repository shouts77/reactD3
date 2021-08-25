import React from 'react';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import RandomDotsD3 from './chart/RandomDotsD3';

function Home() {
  return (
    <div>
      <Container maxWidth="lg">
        <div>
          <Typography variant="h4">데이터 시각화 연습을 위한 앱</Typography>
          <br />
        </div>
        <Divider variant="fullWidth" />
        <div style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Typography paragraph>
            React와 D3.js로 데이터 시각화를 연습하기 위해 만든 앱입니다.
          </Typography>
        </div>
        <div>
          <RandomDotsD3 />
        </div>
      </Container>
    </div>
  );
}

export default Home;
