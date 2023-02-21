import { Box, CircularProgress } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';

function SuspenseLoader() {
  const theme: Theme = useTheme();
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor={theme.Colors.white}
    >
      <CircularProgress size={44} color="primary" thickness={4} />
    </Box>
  );
}

export default SuspenseLoader;
