import * as React from 'react';
import {
  styled,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import DialogueTitle from './DialogTitle';

const DialogBox = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

type Props = {
  open: boolean;
  handleClose: () => void;
  dialogTitle?: any;
  divider?: boolean;
  dialogContent?: any;
  dialogActions?: any;
  dialogWidth: string;
};

const ReUseableDialogBox = (props: Props) => {
  const {
    open,
    handleClose,
    dialogTitle,
    divider,
    dialogContent,
    dialogActions,
    dialogWidth
  } = props;

  return (
    <>
      <DialogBox
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          style: { width: dialogWidth, height:"470", maxWidth: '900px', padding: 10 }
        }}
      >
        {dialogTitle ? (
          <DialogueTitle id="customized-dialog-title" onClose={handleClose}>
            {dialogTitle}
          </DialogueTitle>
        ) : null}
        {divider ? <Divider /> : null}
        {dialogContent ? (
          <DialogContent style={{ padding: 15 }}>{dialogContent}</DialogContent>
        ) : null}
        {dialogActions ? (
          <DialogActions
            style={{ justifyContent: 'flex-start', paddingLeft: 10 }}
          >
            {dialogActions}
          </DialogActions>
        ) : null}
      </DialogBox>
    </>
  );
};

export default ReUseableDialogBox;
