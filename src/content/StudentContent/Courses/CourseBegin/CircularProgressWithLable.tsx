import { memo } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface Props {
  title: any;
  value: number;
}

const CircularProgressWithLabel = ({ title, value }: Props) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={value} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(CircularProgressWithLabel);
