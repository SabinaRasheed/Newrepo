import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './PerformanceCards.css';  // Importing the CSS file for styling

const PerformanceCards = ({ title, value }) => {
  return (
    <Card className="performance-card">
      <CardContent>
        <Typography variant="h6" className="card-title">
          {title}
        </Typography>
        <Typography variant="h4" className="card-value">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PerformanceCards;
