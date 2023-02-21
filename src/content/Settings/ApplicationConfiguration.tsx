import { useState, useEffect } from 'react';
import { Grid, makeStyles, Theme, useTheme } from '@material-ui/core';
import { TextInputComponent, ButtonComp, Loader } from 'src/components';
import { useEdit } from 'src/hooks/useEdit';
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES } from 'src/Config/constant';
import toast from 'react-hot-toast';
import { capitalizeFirstLetter } from 'src/Utils';
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
    textStyle: {
      color: theme.Colors.primary,
      fontWeight: theme.fontWeight.medium
    },
    mainAlign: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };
});

const ApplicationConfiguration = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const defaultValues = {
    id: 0,
    app_name: '',
    app_description: '',
    meta_keyword: '',
    app_email: '',
    app_contact_no: '',
    app_contact_address: '',
    map_key: '',
    student_app_playstore_link: '',
    student_app_appstore_link: '',
    instructor_android_link: '',
    instructor_appstore_link: '',
    admin_app_android_link: '',
    site_copyright: ''
  };

  const [appConfiguration, setAppConfiguration] = useState(defaultValues);
  const edit = useEdit(appConfiguration);

  const fetchData = async () => {
    const response: any =
      await API_SERVICES.settingsPageService.getAppConfiguration();
    if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
      setAppConfiguration(response?.data?.configuration[0]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = async () => {
    let id = appConfiguration.id;
    try {
      let updateAppConfig = { ...appConfiguration, ...edit.edits };
      let response: any =
        await API_SERVICES.settingsPageService.updateAppConfiguration(id, {
          data: updateAppConfig,
          successMessage: t('Toast.applicationConfigurationUpdateSuccessfully'),
          failureMessage: t('Toast.failedtoUpdate')
        });

      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        fetchData();
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };
  if (loading) {
    return <Loader />;
  } else {
    return (
      <Grid container className={classes.mainAlign}>
        <Grid container spacing={2} className={classes.contentStyle}>
          <Grid item xs={6}>
            <TextInputComponent
              inputLabel={t('setting.appName')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('app_name')}
              onChange={(e) => {
                edit.update({
                  app_name: capitalizeFirstLetter(e.target.value)
                });
              }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextInputComponent
              inputLabel={t('setting.appDescription')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('app_description')}
              onChange={(e) => {
                edit.update({ app_description: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInputComponent
              inputLabel={t('setting.metaKeyword')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('meta_keyword')}
              onChange={(e) =>
                edit.update({
                  meta_keyword: e.target.value
                })
              }
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextInputComponent
              inputLabel={t('setting.appEmail')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('app_email')}
              onChange={(e) => {
                edit.update({ app_email: e.target.value });
              }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextInputComponent
              inputLabel={t('setting.appContactNo')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('app_contact_no')}
              onChange={(e) => {
                if (isNaN(Number(e.target.value))) {
                  return;
                }
                edit.update({ app_contact_no: e.target.value });
              }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextInputComponent
              inputLabel={t('setting.appContactAddress')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('app_contact_address')}
              onChange={(e) => {
                edit.update({
                  app_contact_address: capitalizeFirstLetter(e.target.value)
                });
              }}
              required
            />
          </Grid>
          {/* <Grid item xs={6}>
            <TextInputComponent
              inputLabel={t('setting.mapKey')}
              labelColor={theme.Colors.primary}
              required
              value={edit.getValue('map_key')}
              onChange={(e) => {
                edit.update({ map_key: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInputComponent
              inputLabel={t('setting.studentAppPlayStoreLink')}
              labelColor={theme.Colors.primary}
              required
              value={edit.getValue('student_app_playstore_link')}
              onChange={(e) => {
                edit.update({
                  student_app_playstore_link: e.target.value
                });
              }}
            />
          </Grid> */}
          <Grid item xs={6}>
            <TextInputComponent
              inputLabel={t('setting.studentWebsiteLink')}
              labelColor={theme.Colors.primary}
              required
              value={edit.getValue('student_app_appstore_link')}
              onChange={(e) => {
                edit.update({ student_app_appstore_link: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInputComponent
              inputLabel={t('setting.instructorWebsiteLink')}
              labelColor={theme.Colors.primary}
              required
              value={edit.getValue('instructor_android_link')}
              onChange={(e) => {
                edit.update({
                  instructor_android_link: e.target.value
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInputComponent
              inputLabel={t('setting.adminwebsitelink')}
              labelColor={theme.Colors.primary}
              required
              value={edit.getValue('admin_app_android_link')}
              onChange={(e) => {
                edit.update({
                  admin_app_android_link: e.target.value
                });
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextInputComponent
              inputLabel={t('setting.siteCopyright')}
              labelColor={theme.Colors.primary}
              value={edit.getValue('site_copyright')}
              onChange={(e) =>
                edit.update({
                  site_copyright: capitalizeFirstLetter(e.target.value)
                })
              }
              required
            />
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
export default ApplicationConfiguration;
