import { memo } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { makeStyles, useTheme } from '@material-ui/core';


interface Props {
    marks: any;
    outOf:any;
    value: number;
}



const CircularProgressWithLabel = ({ marks, outOf,  value }: Props) => {

    const theme = useTheme();
    return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress 
        variant="determinate" 
        value={value} 
        size={'150px'}
        thickness={1.8}        
        sx={{color:"#3CC878", /* : "#f2f4f0" */}}
       
        />
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
        <Typography  
            component="span" 
            color={theme.Colors.blackBerry}
            fontSize={theme.MetricsSizes.medium_x} 
            fontWeight={theme.fontWeight.medium}
            >
          {marks} /
        </Typography>
        <Typography  
            component="span" 
            color={theme.Colors.darkGrayishBlue}
            fontSize={theme.MetricsSizes.regular_x} 
            fontWeight={theme.fontWeight.medium}
            >
          {outOf}
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(CircularProgressWithLabel);
