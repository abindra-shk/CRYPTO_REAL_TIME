
import React from "react";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
import { Grid, Typography } from "@mui/material";
import NewsCard from "./newsCard";

interface NewsProps {
  crypto: string;
}

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News: React.FC<NewsProps> = ({ crypto }) => {
  const { data, error, isLoading } = useGetCryptoNewsQuery({ crypto });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching data</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Crypto News
      </Typography>
      <Grid container spacing={4}>
        {data?.data?.map((article: any, index: number) => (
          <NewsCard key={index} article={article} demoImage={demoImage} />
        ))}
      </Grid>
    </div>
  );
};

export default News;
