import { Grid, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { CheckStatus, TextInputComponent } from 'src/components';
import { capitalizeFirstLetter } from 'src/Utils';
import { useTranslation } from 'react-i18next';


type Props = {
  edit?: any;
  isError?: boolean;
  tabValue?: number;
  labelName?: string;
};

const CourseLevelTextInput = ({
  edit,
  isError,
  tabValue,
  labelName,
}: Props) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const getCourseVal =
    tabValue === 1
      ? edit.getValue('engCourseName')
      : tabValue === 2
      ? edit.getValue('hinCourseName')
      : edit.getValue('gujCourseName');

  const courseError = isError && !getCourseVal;
  const sortError = isError && !edit.getValue('sort_no');

  return (
    <Grid container direction="row" spacing={2} style={{ marginTop: '25px' }}>
      <Grid item xs={6}>
        <TextInputComponent
          inputLabel={labelName || t('courselevel.name')}
          labelColor={theme.Colors.primary}
          value={getCourseVal}
          onChange={(e) => {
            let value = capitalizeFirstLetter(e.target.value);
            if (tabValue === 1) {
              edit.update({ engCourseName: value });
            } else if (tabValue === 2) {
              edit.update({ hinCourseName: value });
            } else {
              edit.update({ gujCourseName: value });
            }
          }}
          isError={courseError}
          helperText={courseError && 'Please enter the Course Level Name'}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <TextInputComponent
          inputLabel={t('courselevel.sort')}
          labelColor={theme.Colors.primary}
          value={edit.getValue('sort_no')}
          onChange={(e) => {
            edit.update({ sort_no: e.target.value });
          }}
          isError={sortError}
          helperText={sortError && 'Please enter the Sort Number'}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <Typography
          style={{
            color: theme.Colors.primary,
            fontWeight: theme.fontWeight.medium,
            paddingBottom: theme.spacing(1),
            paddingTop: theme.spacing(0.5)
          }}
        >
          Course Status
        </Typography>
        <CheckStatus
          Value={edit.getValue('status') === 1 ? true : false}
          onClick={(e) => {
            let value = !!e ? 2 : 1;
            edit.update({ status: value });
          }}
        />
      </Grid>
    </Grid>
  );
};
export default React.memo(CourseLevelTextInput);
