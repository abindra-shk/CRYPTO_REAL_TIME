import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import CryptoCard from './CryptoCard';
import Loader from './Loader';
import { useSelector } from 'react-redux';

interface CryptoGridProps {
  searchTerm: string;
}

const CryptoGrid: React.FC<CryptoGridProps> = React.memo(({ searchTerm }) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const { cryptos, isFetching } = useSelector((state: any) => ({
    cryptos: state.crypto.cryptos,
    isFetching: state.crypto.isFetching,
  }));

  useEffect(() => {
    if (!isFetching) {
      setInitialLoad(false);
    }
  }, [isFetching]);

  const filteredCryptos = cryptos.filter((currency: any) =>
    currency.name.toLowerCase().includes(searchTerm)
  );

  if (initialLoad && isFetching) {
    return <Loader />;
  }

  return (
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
