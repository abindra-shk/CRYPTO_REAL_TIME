import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Box, Grid, Typography, Select, MenuItem, FormControl, InputLabel} from '@mui/material';
import { Money, AttachMoney, TrendingUp, ErrorOutline, Block, EmojiEvents, CheckCircle, Numbers, Bolt } from '@mui/icons-material';

import Loader from './Loader';
import { useGetCryptoDetailsQuery } from '../../services/cryptoApi';
// import LineChart from './LineChart';

const CryptoDetails: React.FC = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
//   const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <AttachMoney /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <Numbers /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <Bolt /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <AttachMoney /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <EmojiEvents /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <TrendingUp /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <Money /> },
    { title: 'Approved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckCircle /> : <Block />, icon: <ErrorOutline /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ErrorOutline /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ErrorOutline /> },
  ];

  return (
    <Box sx={{ padding: '2rem' }}>
      <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Typography variant="h3" gutterBottom>
          {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
        </Typography>
        <Typography variant="subtitle1">
          {cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap, and supply.
        </Typography>
      </Box>

      <FormControl fullWidth variant="outlined" sx={{ marginBottom: '2rem' }}>
        <InputLabel id="time-period-label">Select Time Period</InputLabel>
        <Select
          labelId="time-period-label"
          value={timePeriod}
          label="Select Time Period"
          onChange={(event) => setTimePeriod(event.target.value)}
        >
          {time.map((date) => (
            <MenuItem key={date} value={date}>{date}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} /> */}

      <Box sx={{ marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>{cryptoDetails.name} Value Statistics</Typography>
        <Typography variant="subtitle1" gutterBottom>
          An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.
        </Typography>
        <Grid container spacing={2}>
          {stats.map(({ icon, title, value }) => (
            <Grid item xs={12} sm={6} md={4} key={title}>
              <Box sx={{ display: 'flex', alignItems: 'center', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                <Box sx={{ marginRight: '1rem' }}>{icon}</Box>
                <Box>
                  <Typography variant="subtitle1">{title}</Typography>
                  <Typography variant="h6">{value}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>Other Stats Info</Typography>
        <Typography variant="subtitle1" gutterBottom>
          An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.
        </Typography>
        <Grid container spacing={2}>
          {genericStats.map(({ icon, title, value }) => (
            <Grid item xs={12} sm={6} md={4} key={title}>
              <Box sx={{ display: 'flex', alignItems: 'center', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                <Box sx={{ marginRight: '1rem' }}>{icon}</Box>
                <Box>
                  <Typography variant="subtitle1">{title}</Typography>
                  <Typography variant="h6">{value}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>What is {cryptoDetails.name}?</Typography>
        <Typography variant="body1">{HTMLReactParser(cryptoDetails.description)}</Typography>
      </Box>

      <Box sx={{ marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>{cryptoDetails.name} Links</Typography>
        {cryptoDetails.links?.map((link:any) => (
          <Box key={link.name} sx={{ display: 'flex', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #ddd' }}>
            <Typography variant="subtitle1" sx={{ marginRight: '1rem' }}>{link.type}</Typography>
            <a href={link.url} target="_blank" rel="noreferrer" style={{ color: '#1a0dab' }}>{link.name}</a>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CryptoDetails;
