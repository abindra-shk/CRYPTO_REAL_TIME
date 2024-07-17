import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { useGetCryptosQuery } from '../../../services/cryptoApi';
import CryptoGrid from './CryptoGrid';
import { useDispatch } from 'react-redux';
import { setData, setFetching } from './cryptoSlice';

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

const Cryptocurrencies: React.FC<CryptocurrenciesProps> = React.memo(
  ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const [searchTerm, setSearchTerm] = useState('');
    const [pollingInterval, setPollingInterval] = useState<number>(0);

    const { data: cryptosList, isFetching, refetch } = useGetCryptosQuery(count, {
      pollingInterval: pollingInterval === 0 ? undefined : pollingInterval,
    });

    const dispatch = useDispatch();

    useEffect(() => {
      if (cryptosList?.data?.coins) {
        dispatch(setData(cryptosList.data.coins));
        dispatch(setFetching(isFetching));
      }
    }, [cryptosList, dispatch, isFetching]);

    const handleSearchTermChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value.toLowerCase());
    }, []);

    const handlePollingIntervalChange = useCallback((e: SelectChangeEvent<number>) => {
      setPollingInterval(Number(e.target.value));
    }, []);

    const handleRefetch = useCallback(() => {
      refetch();
    }, [refetch]);

    console.log('Cryptocurrencies rendered');

    return (
      <Box sx={!simplified ? { backgroundColor: '#f0f2f5', padding: '40px' } : {}}>
        {!simplified && (
          <Box
            sx={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '40px',
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
                onChange={handleSearchTermChange}
                sx={{ marginBottom: '20px' }}
              />
            </Box>
            <Box
              mb={2}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography variant="body1" component="div">
                Polling Interval:
                <Select
                  value={pollingInterval}
                  onChange={handlePollingIntervalChange}
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
                onClick={handleRefetch}
                disabled={isFetching}
                variant="contained"
                color="primary"
              >
                {isFetching ? 'Loading...' : 'Refetch Data'}
              </Button>
            </Box>
            <CryptoGrid searchTerm={searchTerm} />
          </Box>
        )}
        {simplified && <CryptoGrid searchTerm={searchTerm} />}
      </Box>
    );
  }
);

export default Cryptocurrencies;
