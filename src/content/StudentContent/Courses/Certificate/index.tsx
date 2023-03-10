import { Box, Grid, Typography } from '@material-ui/core';
import { CertificateImage } from 'src/Assets';
import { useTheme } from '@material-ui/core/styles';

const Certificate = ({ nameOnCertificate }) => {
  const theme = useTheme();
  return (
    <>
      <Grid
        container
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'inline-flex',
            height: '90%',
            width: '90%'
          }}
        >
          <img height="100%" width="100%" src={CertificateImage} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <Typography
              variant="caption"
              component="div"
              style={{
                fontSize: '48px',
                fontStyle: 'italic'
              }}
            >
              {nameOnCertificate}
            </Typography>
            {/* <Typography
            component={'div'}
            style={{
                paddingTop: '30px',
                fontSize: '12px',
                fontWeight: '600',
                color: theme.Colors.darkGrey,
            }}
        >
            Content
        </Typography> */}
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Certificate;
