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
import { CONFIRM_MODAL, HTTP_STATUSES } from 'src/Config/constant';
import toast from 'react-hot-toast';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { t } from 'i18next';

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

const Notification = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const defaultValues = {
    id: 0,
    user_name: '',
    password: '',
    app_id: '',
    api_key: '',
    is_enabled: true
  };
  const [notificationConfiguration, setNotificationConfiguration] =
    useState(defaultValues);
  const edit = useEdit(notificationConfiguration);
  const [loading, setLoading] = useState(true);
  const onClickEyeIcon = () => {
    setShowPassword(!showPassword);
  };

  const fetchData = async () => {
    const response: any =
      await API_SERVICES.settingsPageService.getNotificationConfiguration();
    if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
      setNotificationConfiguration(response?.data?.notification[0]);
      setLoading(false);
    }
  };
  const handleEdit = async () => {
    let id = notificationConfiguration.id;
    try {
      let updateAppConfig = { ...notificationConfiguration, ...edit.edits };
      let response: any =
        await API_SERVICES.settingsPageService.updateNotificationConfiguration(
          id,{
            data: updateAppConfig,
            successMessage: t('Toast.notificationConfigurationUpdateSuccessfully'),
            failureMessage: t('Toast.failedtoUpdate')
          }
        );
        console.log(response,'reponse notification configuration');

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
              inputLabel={t('setting.notificationusername')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('user_name')}
              onChange={(e) => {
                edit.update({ user_name: e.target.value });
              }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextInputComponent
              required
              inputLabel={t('setting.notificationPassword')}
              variant="outlined"
              labelColor={theme.Colors.primary}
              size="medium"
              value={edit.getValue('password')}
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => edit.update({ password: e.target.value })}
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
              inputLabel={t('setting.notificationAppId')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('app_id')}
              onChange={(e) => edit.update({ app_id: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextInputComponent
              inputLabel={t('setting.notificationApiKey')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('api_key')}
              onChange={(e) => edit.update({ api_key: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={6}></Grid>

          <Grid item xs={6}>
            <FormControl>
              <FormLabel className={classes.formStyle}>
                {t('setting.isNoteEnabled')}
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
export default Notification;
