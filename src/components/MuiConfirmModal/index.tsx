import React, { createElement } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  makeStyles,
  Grid,
  useTheme,
  alpha,
  Theme
} from '@material-ui/core';
import ButtonComp from '../ButtonComp';
import { CONFIRM_MODAL } from 'src/Config/constant';
import * as Icons from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

type styleProps = {
  color?: string;
  dialogWidth?: string | number;
};

const useStyles = makeStyles<Theme, styleProps>((theme: Theme) => {
  return {
    title: {
      fontWeight: theme.fontWeight.mediumBold
    },
    description: {
      align: 'center'
    },
    iconBackground: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      marginBottom: theme.MetricsSizes.small_xx,
      justifyContent: 'center',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: (props) =>
        alpha(props.color || theme.Colors.primary, 0.2)
    },
    buttonAlignment: {
      margin: theme.spacing(2)
    },
    dialogPaper: {
      width: (props) => props.dialogWidth || 400,
      padding: theme.spacing(1, 2, 0, 2)
    },
    inputOtpStyle: {
      borderRadius: 0,
      borderBottom: '1px solid #6BB043',
      background: 'transparent'
    }
  };
});

type Props = {
  color?: string;
  iconType?: string;
  description?: string;
  title: string;
  open: boolean;
  dialogWidth?: string | number;
  onCancelClick: () => void;
  onConfirmClick?: () => void;
  renderDialogContent?: () => React.ReactNode;
  btnText?: string;
};

const MuiConfirmModal = ({
  color,
  iconType,
  description,
  title,
  open,
  dialogWidth,
  onCancelClick,
  onConfirmClick,
  btnText,
  renderDialogContent
}: Props) => {
  const theme = useTheme();
  const classes = useStyles({ color, dialogWidth });
  const { t } = useTranslation();

  const types = {
    [CONFIRM_MODAL.delete]: {
      icon: 'Delete'
    },
    [CONFIRM_MODAL.cancel]: {
      icon: 'CancelOutlined'
    },
    [CONFIRM_MODAL.accept]: {
      icon: 'DoneOutlined'
    },
    [CONFIRM_MODAL.reject]: {
      icon: 'BlockOutlined'
    },
    [CONFIRM_MODAL.logout]: {
      icon: 'ExitToApp'
    }
  };

  const renderIcon = () => {
    if (!iconType) {
      return null;
    }
    return (
      <Box display="flex" justifyContent="center">
        <div className={classes.iconBackground}>
          {createElement(Icons[types[iconType].icon], {
            style: { color: color || theme.Colors.primary }
          })}
        </div>
      </Box>
    );
  };

  return (
    <Dialog open={open} classes={{ paper: classes.dialogPaper }}>
      <DialogTitle disableTypography>
        {renderIcon()}
        <Typography align="center" variant="h4" className={classes.title}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography align="center" variant="h6" className={classes.description}>
          {description}
        </Typography>
        {renderDialogContent ? renderDialogContent() : null}
      </DialogContent>
      <DialogActions className={classes.buttonAlignment}>
        <Grid container direction="row" justifyContent={'space-evenly'}>
          <ButtonComp
            backgroundColor={'transparent'}
            height={35}
            buttonText={t('cancel')}
            buttonFontSize={theme.MetricsSizes.small_xx}
            buttonTextColor={theme.Colors.black}
            buttonFontWeight={theme.fontWeight.medium}
            onClickButton={onCancelClick}
            btnWidth="fit-content"
          />
          <ButtonComp
            backgroundColor={color || theme.Colors.primary}
            height={35}
            buttonText={btnText || t('confirm')}
            buttonFontSize={theme.MetricsSizes.small_xx}
            buttonTextColor={theme.Colors.whitePure}
            buttonFontWeight={theme.fontWeight.medium}
            btnWidth="fit-content"
            onClickButton={onConfirmClick}
          />
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(MuiConfirmModal);
