import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Typography, Paper } from '@mui/material';

interface DataPoint {
  name: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
}

const LineChartComponent: React.FC<LineChartProps> = ({ data }) => {
  // Datos ficticios para hardcodear en el gráfico
  const dataHardcoded: DataPoint[] = [
    { name: 'Enero', value: 10 },
    { name: 'Febrero', value: 15 },
    { name: 'Marzo', value: 25 },
    { name: 'Abril', value: 12 },
    { name: 'Mayo', value: 20 },
  ];

  return (
    <Paper elevation={3}>
      <Typography variant="h6" align="center" gutterBottom>
        Gráfico de Líneas
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data || dataHardcoded}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" name="Valor" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default LineChartComponent;
