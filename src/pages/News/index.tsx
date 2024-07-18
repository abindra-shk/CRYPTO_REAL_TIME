import React, { useState } from 'react';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';
import { Box, Grid, Typography, Pagination, Stack, PaginationItem } from '@mui/material';
import NewsCard from './newsCard';
import Loader from '../Home/components/Loader';

interface NewsProps {
  crypto: string;
  limit?: number;
}

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News: React.FC<NewsProps> = ({ crypto, limit }) => {
  const { data, error, isLoading } = useGetCryptoNewsQuery({ crypto });
  const [page, setPage] = useState(1);

  if (isLoading) return <Loader />;
  if (error) return <Typography>Error fetching data</Typography>;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const newsContent = (
    <Grid container spacing={4}>
      {data?.data?.slice((page - 1) * 10, page * 10).map(
        (
          article: any, // eslint-disable-line @typescript-eslint/no-explicit-any
          index: number
        ) => (
          <NewsCard key={index} article={article} demoImageUrl={demoImage} />
        )
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

        {data?.data.length > 0 && (
          <Stack spacing={2} sx={{ alignItems: 'center', marginTop: '20px' }}>
            <Pagination
              count={Math.ceil(data?.data.length / 10)}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#1976d2',
                      color: '#fff',
                    },
                    '&:hover': {
                      backgroundColor: '#115293',
                      color: '#fff',
                    },
                  }}
                />
              )}
            />
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default News;
