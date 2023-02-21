import {
  CircularProgress,
  Grid,
  InputAdornment,
  Typography,
  useTheme
} from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ButtonComp, TextInputComponent } from 'src/components';
import { HTTP_STATUSES } from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { capitalizeFirstLetter } from 'src/Utils';

type Props = {
  edit?: any;
  isError?: boolean;
  tabValue?: number;
};

const TextLesson = ({ edit, isError, tabValue }: Props) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const getLessonVal =
    tabValue === 1
      ? edit.getValue('engLessonName')
      : tabValue === 2
      ? edit.getValue('hinLessonName')
      : edit.getValue('gujLessonName');
  const getVideoVal =
    tabValue === 1
      ? edit.getValue('engVideoUrl')
      : tabValue === 2
      ? edit.getValue('hinVideoUrl')
      : edit.getValue('gujVideoUrl');
  const getPdfVal =
    tabValue === 1
      ? edit.getValue('engPdfUrl')
      : tabValue === 2
      ? edit.getValue('hinPdfUrl')
      : edit.getValue('gujPdfUrl');

  const lessonError = isError && !getLessonVal;
  const videoUrlError = isError && !getVideoVal;
  const pdfUrlError = isError && !getPdfVal;

  const onBrowseButtonClick = async (
    event: any,
    field: string,
    isVideoUpload: boolean = false
  ) => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append('file', event.target.files[0]);
      if (isVideoUpload) {
        const uploadVideoRes: any =
          await API_SERVICES.videoUploadService.uploadVideo(formData);
        if (uploadVideoRes?.status < HTTP_STATUSES.BAD_REQUEST) {
          if (uploadVideoRes?.data?.video?.length) {
            edit.update({ [field]: uploadVideoRes?.data?.video[0].Location });
          }
        }
      } else {
        const uploadImageRes: any =
          await API_SERVICES.imageUploadService.uploadImage(formData);
        if (uploadImageRes?.status < HTTP_STATUSES.BAD_REQUEST) {
          if (uploadImageRes?.data?.images?.length) {
            edit.update({
              [field]: uploadImageRes?.data?.images[0].Location
            });
          }
        }
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container direction="row" spacing={2} style={{ marginTop: '25px' }}>
      <Grid item xs={6}>
        <TextInputComponent
          inputLabel={'Lesson Name'}
          labelColor={theme.Colors.primary}
          value={getLessonVal}
          required = {tabValue===1}
          onChange={(e) => {
            let value = capitalizeFirstLetter(e.target.value);
            if (tabValue === 1) {
              edit.update({ engLessonName: value });
            } else if (tabValue === 2) {
              edit.update({ hinLessonName: value });
            } else {
              edit.update({ gujLessonName: value });
            }
          }}
          isError={(tabValue === 1)&&lessonError}
          helperText={(tabValue === 1)&&lessonError && 'Please enter the Lesson Name'}
        />
      </Grid>
      <Grid item xs={6}>
        <TextInputComponent
          disabled
          inputLabel={'Video'}
          labelColor={theme.Colors.primary}
          value={getVideoVal?.split('/')[3] ?? ''}
          isError={(tabValue === 1)&&videoUrlError}
          required = {tabValue===1}
          helperText={((tabValue === 1)&&videoUrlError )? 'Please select the video file':''}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ButtonComp
                  backgroundColor={theme.Colors.primary}
                  buttonText={'Browse'}
                  buttonFontSize={theme.MetricsSizes.small_x}
                  buttonTextColor="white"
                  buttonFontWeight={theme.fontWeight.medium}
                  disableElevation={true}
                  onBrowseButtonClick={(event) => {
                    let field: string;
                    if (tabValue === 1) {
                      field = 'engVideoUrl';
                    } else if (tabValue === 2) {
                      field = 'hinVideoUrl';
                    } else {
                      field = 'gujVideoUrl';
                    }
                    onBrowseButtonClick(event, field, true);
                  }}
                  acceptType="video/mp4,video/x-m4v,video/*"
                  isBrowseButton
                  height={25}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <HighlightOff
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    let field: string;
                    if (tabValue === 1) {
                      field = 'engVideoUrl';
                    } else if (tabValue === 2) {
                      field = 'hinVideoUrl';
                    } else {
                      field = 'gujVideoUrl';
                    }
                    edit.update({
                      [field]: ''
                    });
                  }}
                />
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextInputComponent
          disabled
          inputLabel={'Document'}
          labelColor={theme.Colors.primary}
          value={getPdfVal?.split('/')[3] ?? ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ButtonComp
                  backgroundColor={theme.Colors.primary}
                  buttonText={'Browse'}
                  buttonFontSize={theme.MetricsSizes.small_x}
                  buttonTextColor="white"
                  buttonFontWeight={theme.fontWeight.medium}
                  disableElevation={true}
                  onBrowseButtonClick={(event) => {
                    let field: string;
                    if (tabValue === 1) {
                      field = 'engPdfUrl';
                    } else if (tabValue === 2) {
                      field = 'hinPdfUrl';
                    } else {
                      field = 'gujPdfUrl';
                    }
                    onBrowseButtonClick(event, field);
                  }}
                  acceptType=".xlsx,.xls,.doc,.docx,.ppt,.pptx,.txt,.pdf"
                  isBrowseButton
                  height={25}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <HighlightOff
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    let field: string;
                    if (tabValue === 1) {
                      field = 'engPdfUrl';
                    } else if (tabValue === 2) {
                      field = 'hinPdfUrl';
                    } else {
                      field = 'gujPdfUrl';
                    }
                    edit.update({
                      [field]: ''
                    });
                  }}
                />
              </InputAdornment>
            )
          }}
          iconEnd={
            <ButtonComp
              backgroundColor={theme.Colors.primary}
              buttonText={'Browse'}
              buttonFontSize={theme.MetricsSizes.small_x}
              buttonTextColor="white"
              buttonFontWeight={theme.fontWeight.medium}
              disableElevation={true}
              onBrowseButtonClick={(event) => {
                let field: string;
                if (tabValue === 1) {
                  field = 'engPdfUrl';
                } else if (tabValue === 2) {
                  field = 'hinPdfUrl';
                } else {
                  field = 'gujPdfUrl';
                }
                onBrowseButtonClick(event, field);
              }}
              acceptType="application/pdf"
              isBrowseButton
              height={25}
            />
          }
        />
      </Grid>
      {loading ? (
        <Grid item container xs={6} style={{ marginTop: 20, gap: 10 }}>
          <CircularProgress color="primary" size={25} />
          <Typography>File uploading, Please wait...</Typography>
        </Grid>
      ) : null}
    </Grid>
  );
};
export default React.memo(TextLesson);
