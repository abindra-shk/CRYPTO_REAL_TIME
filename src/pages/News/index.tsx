import React, { useState } from "react";
// import {
//   Select,
//   MenuItem,
//   Typography,
//   Grid,
//   Avatar,
//   Card,
//   CardContent,
//   CardMedia,
// } from "@mui/material";
// import moment from "moment";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";

// const demoImage =
//   "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
// const { Text, Title } = Typography;

const News: React.FC = () => {
  const [newsCategory, setNewsCategory] = useState<string>("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: 6,
  });
  console.log("data in news", cryptoNews);

  //   if (cryptoNews?.value) return <Typography>Loading...</Typography>;
  //   if (error) return <Typography>Error loading news</Typography>;

  return (
    // <Grid container spacing={4}>
    //   {!simplified && (
    //     <Grid item xs={12}>
    //       <Select
    //         value={newsCategory}
    //         onChange={(e) => setNewsCategory(e.target.value)}
    //         displayEmpty
    //         fullWidth
    //         variant="outlined"
    //       >
    //         <MenuItem value="Cryptocurrency">Cryptocurrency</MenuItem>
    //         {/* {data?.data?.coins?.map((currency) => (
    //           <MenuItem key={currency.id} value={currency.name}>{currency.name}</MenuItem>
    //         ))} */}
    //       </Select>
    //     </Grid>
    //   )}
    //   {cryptoNews?.value.map((news, i) => (
    //     <Grid item xs={12} sm={6} lg={4} key={i}>
    //       <Card variant="outlined">
    //         <a href={news.url} target="_blank" rel="noopener noreferrer">
    //           <CardMedia
    //             component="img"
    //             height="140"
    //             image={news?.image?.thumbnail?.contentUrl || demoImage}
    //             alt="news"
    //           />
    //           <CardContent>
    //             <Title variant="h6" component="div">
    //               {news.name}
    //             </Title>
    //             <Typography variant="body2" color="textSecondary">
    //               {news.description.length > 100
    //                 ? `${news.description.substring(0, 100)}...`
    //                 : news.description}
    //             </Typography>
    //             <Grid
    //               container
    //               alignItems="center"
    //               justifyContent="space-between"
    //               style={{ marginTop: "10px" }}
    //             >
    //               {/* <Grid item>
    //                 <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
    //                 <Typography variant="caption" display="block">{news.provider[0]?.name}</Typography>
    //               </Grid> */}
    //               {/* <Grid item>
    //                 <Typography variant="caption">{moment(news.datePublished).startOf('ss').fromNow()}</Typography>
    //               </Grid> */}
    //             </Grid>
    //           </CardContent>
    //         </a>
    //       </Card>
    //     </Grid>
    //   ))}
    // </Grid>
    <>NEWS </>
  );
};

export default News;
