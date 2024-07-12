import millify from 'millify';
import { Typography, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import Cryptocurrencies from './components/Cryptocurrencies';
import Loader from './components/Loader';

// import News from './News';

const Home = () => {
  const { data, isFetching } = useGetCryptosQuery(10);

  console.log('data====>', data);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Global Crypto Stats
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Box>
            <Typography variant="subtitle1">Total Cryptocurrencies</Typography>
            <Typography variant="h6">{globalStats.total}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box>
            <Typography variant="subtitle1">Total Exchanges</Typography>
            <Typography variant="h6">
              {millify(globalStats.totalExchanges)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box>
            <Typography variant="subtitle1">Total Market Cap</Typography>
            <Typography variant="h6">
              ${millify(globalStats.totalMarketCap)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box>
            <Typography variant="subtitle1">Total 24h Volume</Typography>
            <Typography variant="h6">
              ${millify(globalStats.total24hVolume)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box>
            <Typography variant="subtitle1">Total Cryptocurrencies</Typography>
            <Typography variant="h6">{globalStats.total}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box>
            <Typography variant="subtitle1">Total Markets</Typography>
            <Typography variant="h6">
              {millify(globalStats.totalMarkets)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          marginTop: '30px',
          marginBottom: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Top 10 Cryptos In The World
        </Typography>
        <Typography variant="h6">
          <Link
            to="/cryptocurrencies"
            // style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Show more
          </Link>
        </Typography>
      </Box>
      <Cryptocurrencies simplified />
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Latest Crypto News
        </Typography>
        <Typography variant="h6">
          <Link to="/news">Show more</Link>
        </Typography>
      </Box>
      {/* <News simplified /> */}
    </>
  );
};

export default Home;
