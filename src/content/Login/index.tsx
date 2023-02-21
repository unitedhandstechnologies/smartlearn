import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import LoginContainer from './LoginContainer';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { Loader } from 'src/components';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: 100,
    overflowX: 'hidden'
  },
  gridHeight: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flex: 1
  },
  LoginContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  }
}));

function Login() {
  const styles = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Box className={styles.root}>
        <Helmet>
          <title>SmartLearn</title>
        </Helmet>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <LoginContainer setLoading={setLoading} />
        </div>
      </Box>
    );
  }
}

export default Login;
