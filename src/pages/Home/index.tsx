import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import News from "../News";
const Home = () => {
  return (
    <>
      <div>
        Home
        <div className="home-heading-container">
          <Typography className="home-Typography">
            Latest Crypto News
          </Typography>
          <Typography>
            <Link to="/news">Show more</Link>
          </Typography>
          <News crypto={"crypto"} limit={6}/>
        </div>
      </div>
    </>
  );
};

export default Home;
