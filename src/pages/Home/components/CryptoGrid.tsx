import React from 'react';
import { Grid } from '@mui/material';
import CryptoCard from './CryptoCard';

interface CryptoGridProps {
  cryptos: any[];
}

const CryptoGrid: React.FC<CryptoGridProps> = React.memo(({ cryptos }) => (
  <Grid container spacing={3}>
    {cryptos.map((currency) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={currency.uuid}>
        <CryptoCard currency={currency} />
      </Grid>
    ))}
  </Grid>
));

export default CryptoGrid;
