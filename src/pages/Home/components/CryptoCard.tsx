import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import millify from 'millify';

interface CryptoCardProps {
  currency: any;
}

const CryptoCard: React.FC<CryptoCardProps> = React.memo(({ currency }) => {
  const isPositiveChange = currency.change > 0;

  return (
    <Link to={`/crypto/${currency.uuid}`} style={{ textDecoration: 'none' }}>
      <Card
        variant="outlined"
        sx={{
          height: '100%',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          },
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="subtitle1">
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
            <strong>Price:</strong>{' '}
            <span style={{ color: isPositiveChange ? 'green' : 'red' }}>
              ${currency.price}
            </span>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Market Cap:</strong> ${millify(currency.marketCap)}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <strong>Daily Change:</strong>
            {isPositiveChange ? (
              <ArrowDropUp sx={{ color: 'green' }} />
            ) : (
              <ArrowDropDown sx={{ color: 'red' }} />
            )}
            <span
              style={{
                color: isPositiveChange ? 'green' : 'red',
                marginLeft: 1,
              }}
            >
              {Math.abs(currency.change)}%
            </span>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Volume(24h):</strong> ${currency['24hVolume']}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
});

export default CryptoCard;
