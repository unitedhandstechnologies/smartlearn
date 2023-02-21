import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: 400 }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Loader;
