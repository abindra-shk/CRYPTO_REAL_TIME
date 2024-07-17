import React from 'react';
import { Grid } from '@mui/material';
import CryptoCard from './CryptoCard';
import Loader from './Loader';
import { useSelector } from 'react-redux';

interface CryptoGridProps {
  searchTerm: string;
}

const CryptoGrid: React.FC<CryptoGridProps> = React.memo(({ searchTerm }) => {
  const { cryptos, isFetching } = useSelector((state: any) => ({
    cryptos: state.crypto.cryptos,
    isFetching: state.crypto.isFetching,
  }));

  const filteredCryptos = cryptos.filter((currency: any) =>
    currency.name.toLowerCase().includes(searchTerm)
  );

  return isFetching ? (
    <Loader />
  ) : (
    <Grid container spacing={3}>
      {filteredCryptos.map((currency: any) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={currency.uuid}>
          <CryptoCard currency={currency} />
        </Grid>
      ))}
    </Grid>
  );
});

export default CryptoGrid;
