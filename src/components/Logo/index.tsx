import { Box } from '@material-ui/core';
import logo from '../../Assets/Images/Logo.svg';

function Logo({ onClick }) {
  return (
    <Box
      style={{
        display: 'flex',
        flex: 1,
        cursor: 'pointer'
      }}
    >
      <img
        style={{
          display: 'flex',
          height: '100%',
          width: 'inherit'
        }}
        src={logo}
        onClick={onClick}
      />
    </Box>
  );
}

export default Logo;
