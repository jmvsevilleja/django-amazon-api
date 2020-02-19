import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(month, amount) {
  return { month, amount };
}

const data = [
  createData('January', 0),
  createData('February', 300),
  createData('March', 600),
  createData('April', 800),
  createData('May', 1500),
];



export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Monthly Sales</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}

        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />


          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'bottom', fill: theme.palette.text.primary }}
            > $
            </Label>
          </YAxis>

          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={true} />
          <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}