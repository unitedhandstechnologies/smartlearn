import React, { useState, useEffect } from 'react';
import {
  Grid,
  makeStyles,
  Theme,
  useTheme,
  IconButton
} from '@material-ui/core';
import { TextInputComponent, ButtonComp, Loader } from 'src/components';
import { useEdit } from 'src/hooks/useEdit';
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES } from 'src/Config/constant';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { toast } from 'react-hot-toast';
import { t } from 'i18next';
import { isValidEmail } from 'src/Utils';

const useStyles = makeStyles((theme: Theme) => {
  return {
    dialogPaper: {
      width: 847,
      padding: theme.spacing(2, 1, 2, 5),
      borderRadius: 18
    },
    contentStyle: {
      padding: theme.spacing(3, 10, 0, 0)
    },
    buttonStyle: {
      padding: theme.spacing(8, 0, 8, 0),
      justifyContent: 'center'
    },
    formStyle: {
      color: theme.Colors.primary,
      fontWeight: theme.fontWeight.medium
    },
    radioStyle: {
      color: theme.Colors.primary,
      fontWeight: theme.fontWeight.medium,
      flexDirection: 'row',
      padding: theme.spacing(1, 1, 0, 0)
    },
    textStyle: {
      color: theme.Colors.primary,
      fontWeight: theme.fontWeight.medium
    },
    eyeIcon: {
      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    mainAlign: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };
});

const RequiredFields = [
  'host',
  'port',
  'user_name',
  'password'
];

const Smtp = () => {
  const defaultValues = {
    id: 0,
    host: '',
    port: 0,
    password: '',
    encryption: '',
    user_name: '',
    is_enabled: true
  };
  const theme = useTheme();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(true);
  const [smtpConfiguration, setSmtpConfiguration] = useState(defaultValues);
  const [loading, setLoading] = useState(true);
  const edit = useEdit(smtpConfiguration);
  const [error, setError] = useState(false);

  const onClickEyeIcon = () => {
    setShowPassword(!showPassword);
  };

  const userNameError = error && !edit.allFilled('user_name');
  const portNumberError = error && !edit.allFilled('port');

  const passwordError =
  (error && !edit.getValue('password')) ||
  (error &&
    edit.getValue('password') &&
    edit.getValue('password').length < 7);

  const emailError =
  (error && !edit.allFilled('host')) ||
  (error &&
    edit.allFilled('host') &&
    !isValidEmail(edit.getValue('host')));

  const fetchData = async () => {
    const response: any =
      await API_SERVICES.settingsPageService.getSmtpConfiguration();
    if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
      setSmtpConfiguration(response?.data?.smtp[0]);
      setLoading(false);
    }
  };
  const handleEdit = async () => {
    let id = smtpConfiguration.id;
    try {
      let updateAppConfig = { ...smtpConfiguration, ...edit.edits };
      if (!edit.allFilled(...RequiredFields)) {
        setError(true);
        return toast.error('Please fill all the required fields');
      }
      if (!isValidEmail(edit.getValue('host'))) {
        setError(true);
        return toast.error('Please enter valid SMTP Host');
      } else {
        setError(false);
      }
      let response: any =
        await API_SERVICES.settingsPageService.updateSmtpConfiguration(id, {
          data: updateAppConfig,
          successMessage: t('Toast.sMTPConfigurationUpdateSuccessfully'),
          failureMessage: t('Toast.failedtoUpdate')
        });

      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        fetchData();
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return <Loader />;
  } else {
    return (
      <Grid container className={classes.mainAlign}>
        <Grid container spacing={2} className={classes.contentStyle}>
          <Grid item xs={6}>
            <TextInputComponent
              inputLabel={t('setting.sMTPHost')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('host')}
              onChange={(e) => {
                edit.update({ host: e.target.value });
              }}
              required
              isError={emailError}
              helperText={emailError && 'Please enter valid SMTP host'}
            />
          </Grid>

          <Grid item xs={6}>
            <TextInputComponent
              inputLabel={t('setting.sMTPUserName')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('user_name')}
              onChange={(e) =>
                edit.update({
                  user_name: e.target.value
                })
              }
              required
              isError={userNameError}
              helperText={userNameError && 'Please enter your user name'}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInputComponent
              required
              inputLabel={t('password')}
              variant="outlined"
              labelColor={theme.Colors.primary}
              value={edit.getValue('password')}
              size="medium"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => edit.update({ password: e.target.value })}
              isError={passwordError}
              helperText={passwordError && 'The password must contain minimum 7 and maximum 12 characters!'
            }
              iconEnd={
                <IconButton
                  className={classes.eyeIcon}
                  onClick={onClickEyeIcon}
                  disableFocusRipple
                  disableRipple
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </IconButton>
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextInputComponent
              inputLabel={t('setting.sMTPPort')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('port')}
              onChange={(e) => edit.update({ port: e.target.value })}
              required
              isError={portNumberError}
              helperText={portNumberError && 'Please enter valid Port Number'}
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={3}>
            <FormControl>
              <FormLabel className={classes.formStyle}>
                {t('setting.isSmtpEnabled')}
              </FormLabel>
              <RadioGroup
                value={`${edit.getValue('is_enabled')}`}
                onChange={(e) => {
                  edit.update({
                    is_enabled: (e.target as HTMLInputElement).value
                  });
                }}
                className={classes.radioStyle}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label={t('setting.yes')}
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label={t('setting.no')}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={5} className={classes.buttonStyle}>
          <Grid item xs={1}>
            <ButtonComp
              btnWidth={90}
              backgroundColor={theme.Colors.primary}
              buttonFontSize={theme.MetricsSizes.small}
              btnBorderRadius={theme.MetricsSizes.tiny}
              buttonText={t('save')}
              onClickButton={handleEdit}
              height={theme.MetricsSizes.large}
              style={{ marginBottom: theme.MetricsSizes.large }}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
};
export default Smtp;
