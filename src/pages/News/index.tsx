import React from 'react';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';
import { Box, Grid, Typography } from '@mui/material';
import NewsCard from './newsCard';
import Loader from '../Home/components/Loader';

interface NewsProps {
  crypto: string;
  limit?: number;
}

const demoImage =
  'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News: React.FC<NewsProps> = ({ crypto, limit }) => {
  const { data, error, isLoading } = useGetCryptoNewsQuery({ crypto });

  if (isLoading) return <Loader />;
  if (error) return <Typography>Error fetching data</Typography>;

  const newsContent = (
    <Grid container spacing={4}>
      {data?.data?.slice(0, limit || data?.data.length).map(
        (
          article: any, // eslint-disable-line @typescript-eslint/no-explicit-any
          index: number
        ) => <NewsCard key={index} article={article} demoImageUrl={demoImage} />
      )}
    </Grid>
  );

  return limit ? (
    <div>{newsContent}</div>
  ) : (
    <Box sx={{ backgroundColor: '#f0f2f5', padding: '40px' }}>
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
          Crypto News
        </Typography>
        {newsContent}
      </Box>
    </Box>
  );
};

export default News;
