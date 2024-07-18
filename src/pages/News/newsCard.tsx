import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import moment from "moment";

interface NewsCardProps {
  article: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  demoImageUrl: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, demoImageUrl }) => {
  return (
    
    <Grid item  xs={12} sm={6} md={4}>
      <Card>
        <a href={article.link} target="_blank" rel="noopener noreferrer">
          <CardMedia
            component="img"
            height="140"
            image={article.photo_url || demoImageUrl}
            alt={article.title}
          />
          <CardContent
           
          >
            <Typography variant="h6"
             sx={{
              WebkitLineClamp: 2,
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              display: "-webkit-box",
            }}
            >{article.title}</Typography>
            <Grid
              container
              alignItems="center"
              spacing={1}
              style={{ marginTop: "10px" }}
            >
              <Grid item 
              >
                <Avatar 
               src={article.source_favicon_url} alt="source logo" />
              </Grid>
              <Grid item>
                <Typography variant="caption" display="block"
                
                >
                  <a
                    href={article.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.source_url}
                  </a>
                </Typography>
              </Grid>
              <Grid item
              
              >
                <Typography variant="caption"
                >
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
  );
};

export default NewsCard;
