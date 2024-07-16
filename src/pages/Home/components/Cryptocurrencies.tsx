import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import Loader from './Loader';
import { useGetCryptosQuery } from '../../../services/cryptoApi';
import CryptoGrid from './CryptoGrid'; // Import the new component

interface CryptocurrenciesProps {
  simplified: boolean;
}

const intervalOptions = [
  { label: 'Off', value: 0 },
  { label: '3s', value: 3000 },
  { label: '5s', value: 5000 },
  { label: '10s', value: 10000 },
  { label: '1m', value: 60000 },
];

const Cryptocurrencies: React.FC<CryptocurrenciesProps> = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const [cryptos, setCryptos] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pollingInterval, setPollingInterval] = useState<number>(0);

  const {
    data: cryptosList,
    isFetching,
    refetch,
  } = useGetCryptosQuery(count, {
    pollingInterval: pollingInterval === 0 ? undefined : pollingInterval,
  });

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins || []);

    const filteredData = cryptosList?.data?.coins.filter((item: any) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <Box
      sx={!simplified ? { backgroundColor: '#f0f2f5', padding: '40px' } : {}}
    >
      {!simplified && (
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            marginBottom: '20px',
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: '20px' }}>
            100 Cryptos In The World
          </Typography>
          <Box>
            <TextField
              label="Search Cryptocurrency"
              variant="outlined"
              fullWidth
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              sx={{ marginBottom: '20px' }}
            />
          </Box>
          <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1" component="div">
              Polling Interval:
              <Select
                value={pollingInterval}
                onChange={(e) => setPollingInterval(Number(e.target.value))}
                style={{ marginLeft: '10px', minWidth: '80px' }}
              >
                {intervalOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Typography>
            <Button
              onClick={() => refetch()}
              disabled={isFetching}
              variant="contained"
              color="primary"
            >
              {isFetching ? 'Loading...' : 'Refetch Data'}
            </Button>
          </Box>
          <CryptoGrid cryptos={cryptos} />
        </Box>
      )}
      {simplified && <CryptoGrid cryptos={cryptos} />}
    </Box>
  );
};

export default Cryptocurrencies;
