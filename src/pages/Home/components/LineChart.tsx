import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Typography, Grid } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

interface LineChartProps {
  coinHistory: any;
  currentPrice: string;
  coinName: string;
}

const LineChart: React.FC<LineChartProps> = ({
  coinHistory,
  currentPrice,
  coinName,
}) => {
  if (!coinHistory?.data?.history) return null; // Avoid rendering until data is available

  const coinPrice: string[] = [];
  const coinTimestamp: string[] = [];

  for (let i = 0; i < coinHistory.data.history.length; i += 1) {
    coinPrice.push(coinHistory.data.history[i].price);
  }

  for (let i = 0; i < coinHistory.data.history.length; i += 1) {
    // Multiply timestamp by 1000 to convert to milliseconds
    coinTimestamp.push(
      new Date(
        coinHistory.data.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  // Reverse the arrays to show the current date on the right
  coinPrice.reverse();
  coinTimestamp.reverse();

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h2">
          {coinName} Price Chart
        </Typography>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              Change: {coinHistory?.data?.change}%
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              Current {coinName} Price: ${currentPrice}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
