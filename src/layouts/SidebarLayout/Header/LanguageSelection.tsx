import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Languageicon } from 'src/Assets';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 250,
      height: 100
    },
    selectcontainer: {
      minWidth: 250,
      border: '1px solid #ced4da',
      borderRadius: 3,
      fontSize: 16
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    root: {
      padding: theme.spacing(2)
    }
  })
);

export default function LanguageSelection() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [lng, setLng] = React.useState<number | string>('');
  const { t, i18n } = useTranslation();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLng(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLngChange = () => {
    setOpen(false);
    if (lng === 1) {
      i18n.changeLanguage('en');
      toast.success(`${t('Toast.languageUpdatedSuccessfully')}`);
    } else if (lng === 2) {
      i18n.changeLanguage('hi');
      toast.success(`${t('Toast.languageUpdatedSuccessfully')}`);
    } else if (lng === 3) {
      i18n.changeLanguage('gu');
      toast.success(`${t('Toast.languageUpdatedSuccessfully')}`);
    }
  };

  return (
    <>
      <img
        style={{
          cursor: 'pointer',
          width: 35,
          height: 35,
          marginRight: 10
        }}
        src={Languageicon}
        onClick={handleClickOpen}
      />
      {/* <Button onClick={handleClickOpen}>{t('language')}</Button> */}
      <Dialog open={open} onClose={handleClose} className={classes.root}>
        <DialogTitle>{t('selectLanguage')}</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <Select
                native
                value={lng}
                className={classes.selectcontainer}
                onChange={handleChange}
              >
                <option>Select Language</option>
                <option value={1}>English</option>
                <option value={2}>Hindi</option>
                <option value={3}>Gujarati</option>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('cancel')}
          </Button>
          <Button onClick={handleLngChange} color="primary">
            {t('ok')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
