import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import {
  Card,
  Grid,
  TextField,
  Box,
  Typography,
  CardContent,
  CardMedia,
} from '@mui/material';

import Loader from './Loader';
import { useGetCryptosQuery } from '../../../services/cryptoApi';

interface CryptocurrenciesProps {
  simplified: boolean;
}

const Cryptocurrencies: React.FC<CryptocurrenciesProps> = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins || []);

    const filteredData = cryptosList?.data?.coins.filter((item: any) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <Box mb={4}>
          <TextField
            label="Search Cryptocurrency"
            variant="outlined"
            fullWidth
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </Box>
      )}
      <Grid container spacing={4}>
        {cryptos?.map((currency) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={currency.uuid}>
            <Link
              to={`/crypto/${currency.uuid}`}
              style={{ textDecoration: 'none' }}
            >
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Typography variant="h6" component="div">
                      {currency.rank}. {currency.name}
                    </Typography>
                    <CardMedia
                      component="img"
                      image={currency.iconUrl}
                      alt={currency.name}
                      sx={{ width: 40, height: 40 }}
                    />
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    Price: {millify(currency.price)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Market Cap: {millify(currency.marketCap)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Daily Change: {currency.change}%
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Cryptocurrencies;
