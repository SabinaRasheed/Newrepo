import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import './PerformanceCards.css';

const PerformanceCards = ({ title, value, onClick }) => {
  return (
    <Card className="performance-card" onClick={onClick}>
      <CardContent>
        <Typography variant="h6" className="card-title">
          {title}
        </Typography>
        <Box className="value-container">
          <Typography variant="h3" className="card-value">
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PerformanceCards;
