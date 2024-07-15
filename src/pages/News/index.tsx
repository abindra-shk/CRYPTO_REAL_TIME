import React from "react";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
} from "@mui/material";
import moment from "moment";

interface NewsProps {
  crypto: string;
}

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News: React.FC<NewsProps> = ({ crypto }) => {
  const { data, error, isLoading } = useGetCryptoNewsQuery({ crypto });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching data</Typography>;
  console.log("data is =>", data);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Crypto News
      </Typography>
      <Grid container spacing={4}>
        {data?.articles?.map((article: any, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                <CardMedia
                  component="img"
                  height="140"
                  image={article.photo_url || demoImage}
                  alt={article.title}
                />
                <CardContent>
                  <Typography variant="h6">{article.title}</Typography>
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    style={{ marginTop: "10px" }}
                  >
                    <Grid item>
                      <Avatar
                        src={article.source_favicon_url}
                        alt="source logo"
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="caption" display="block">
                        <a
                          href={article.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {article.source_url}
                        </a>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="caption">
                        {moment(article.published_datetime_utc)
                          .startOf("ss")
                          .fromNow()}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </a>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default News;
