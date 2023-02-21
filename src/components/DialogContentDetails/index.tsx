import React from 'react';
import {
  makeStyles,
  Theme,
  useTheme,
  Grid,
  Typography
} from '@material-ui/core';
import { LinkComp } from 'src/components';
import { useTranslation } from 'react-i18next';

type Props = {
  contentDetails?: any[];
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    leftContentStyle: {
      color: theme.Colors.mediumBlack
    },
    rightContentStyle: {
      color: theme.Colors.mediumGrey
    }
  };
});

const DialogContentDetails = (props: Props) => {
  const { contentDetails } = props;
  const theme = useTheme();
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      {contentDetails.length &&
        contentDetails.map((item: any, index: number) => {
          return (
            <React.Fragment key={index}>
              <Grid item xs={4}>
                <Typography variant="h4" className={classes.leftContentStyle}>
                  {item.content}:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {item.isLink ? (
                  <LinkComp title={item.value} />
                ) : (
                  <Typography
                    variant="h4"
                    className={classes.rightContentStyle}
                  >
                    {item.value}
                  </Typography>
                )}
              </Grid>
            </React.Fragment>
          );
        })}
    </Grid>
  );
};

export default DialogContentDetails;
