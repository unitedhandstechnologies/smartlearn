import { DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type DialogTitleProps = {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
  iconRight?: number;
  iconTop?: number;
};

const DialogueTitle = (props: DialogTitleProps) => {
  const { children, onClose, iconRight, iconTop, ...other } = props;

  return (
    <DialogTitle sx={{ margin: 0, padding: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: iconRight || 8,
            top: iconTop || 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default DialogueTitle;
