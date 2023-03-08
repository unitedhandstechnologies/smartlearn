import React, { useEffect, useState } from 'react';
import { Grid, Rating, Typography } from '@mui/material';
import {
  ButtonComp,
  DialogComp,
  Heading,
  MuiAccordionComp
} from 'src/components';
import { CalenderIconImg, PdfImg, TimeImg, VideoImg } from 'src/Assets';
import { ChipComp } from 'src/components/MultiSelectChip/ChipComp';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { makeStyles, useTheme } from '@material-ui/core';
import { toast } from 'react-hot-toast';
import {
  COURSE_TYPE_NAME,
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID
} from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => {
  return {
    dialogPaper: {
      width: 747,
      height: 505,
      padding: theme.spacing(2, 1, 2, 2),
      borderRadius: theme.MetricsSizes.regular
    },
    accordionClassName: {
      marginTop: 10,
      backgroundColor: 'white'
    },
    accordionDetailsClassName: {
      backgroundColor: '#FFFFFF',
      border: 'none'
    },
    quizHeading: {
      fontWeight: theme.fontWeight.bold,
      fontSize: theme.MetricsSizes.regular_xxx,
      color: theme.Colors.blueDark
    },
    scheduleHeading: {
      fontWeight: 700,
      fontSize: '18px',
      color: '#3C414B'
    }
  };
});

const objectives = [
  'One can learn the course of their choice through online resources.',
  'Students learn more comfortably in an environment that suits them best.',
  'Online courses look great on a resume and curriculum vitae.',
  'Students can learn at their own pace.',
  'Lower costs than conventional teaching approaches are provided by online Education.'
];

const headingProps = {
  headingColor: '#3C414B',
  headerFontWeight: 500,
  headerFontSize: 32,
  marginBottom: 20,
  headerFontFamily: 'IBM Plex Serif'
};

const sheduleHeading = {
  color: '#3C414B',
  fontSize: '18px',
  fontWeight: 700
};

type CourseDescriptionProps = {
  courseDescription?: any;
  courseId?: any;
  sectionData?: any;
  lessonData?: any;
};
const CourseDescription = ({
  courseDescription,
  courseId,
  sectionData,
  lessonData
}: CourseDescriptionProps) => {
  console.log(courseDescription, 'courseDescription');
  const theme = useTheme();
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  // const [lessonData, setLessonData] = useState<any[]>([]);
  // const [sectionData, setSectionData] = useState<any[]>([]);
  // const [quizData, setQuizData] = useState<any[]>([]);
  const [openVideoPreview, setOpenVideoPreview] = useState<any>({
    open: false
  });
  const [openQuizModal, setOpenQuizModal] = useState<any>({
    open: false
  });

  const typographyStyleProps = {
    fontFamily: 'Switzer',
    fontSize: 18,
    fontWeight: 400,
    color: '#78828C',
    padding: '10px',
    [theme.breakpoints.down('xs')]: {
      fontSize: 12
    }
  };

  const fetchData = async () => {
    try {
      // setLessonData([]);
      // setSectionData([]);
      // setQuizData([]);
      const response: any = await Promise.all([
        API_SERVICES.sectionAndLessonService.getAllLessonByCourseId(
          courseId?.id,
          LANGUAGE_ID.english
        ),
        API_SERVICES.sectionAndLessonService.getAllSection(
          courseId?.id,
          DETECT_LANGUAGE[i18n.language] ?? LANGUAGE_ID.english
        )
        // API_SERVICES.quizService.getAllQuiz(
        //   LANGUAGE_ID.english,
        //   courseDescription?.course_id
        // )
      ]);
      // if (response[0]?.status < HTTP_STATUSES.BAD_REQUEST) {
      //   if (response[0]?.data?.Lessons?.length) {
      //     setLessonData(response[0]?.data?.Lessons);
      //   }
      // }
      // if (response[1]?.status < HTTP_STATUSES.BAD_REQUEST) {
      //   if (response[1]?.data?.Section?.length) {
      //     setSectionData(response[1]?.data?.Section);
      //   }
      // }
      // if (response[2]?.status < HTTP_STATUSES.BAD_REQUEST) {
      //   {
      //     if (response[2]?.data?.quiz?.length) {
      //       setQuizData(response[2]?.data?.quiz);
      //     }
      //   }
      // }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const renderCont = (url) => {
    return (
      <Grid>
        <video width="600" height="340" controls autoPlay={true}>
          <source src={url} type="video/mp4" />
        </video>
      </Grid>
    );
  };

  const handleClickPreview = (lessonName, videoUrl) => {
    setOpenVideoPreview({
      open: true,
      dialogTitle: lessonName,
      renderDialogContent: () => renderCont(videoUrl)
    });
  };

  const handleClosePreviewDialog = () => {
    setOpenVideoPreview({ open: false });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getAccordionContents: any = React.useMemo(() => {
    return sectionData?.length
      ? sectionData?.map((item, index) => {
          const sectionNumber = index;
          let getLessonData: any = lessonData?.length
            ? lessonData?.filter(
                (lessonItm) => lessonItm.section_id === item.section_id
              )
            : [];

          return {
            id: index + 1,
            renderAccordionTitle: () => (
              <Grid container alignItems="center">
                <Typography
                  variant="h4"
                  style={{
                    color: theme.Colors.blackBerry,
                    fontWeight: theme.fontWeight.medium,
                    fontSize: theme.MetricsSizes.regular
                  }}
                >{`Lesson :${index + 1} - ${item.section_name}`}</Typography>
              </Grid>
            ),
            accContentDetail: () => (
              <Grid container direction="column" spacing={2}>
                {getLessonData?.length
                  ? getLessonData?.map((item, index) => {
                      return (
                        <Grid
                          item
                          key={index}
                          container
                          xs={12}
                          style={{ gap: 10 }}
                          alignItems="center"
                        >
                          <img
                            src={item?.video_url ? VideoImg : PdfImg}
                            width={'18px'}
                            height={'18px'}
                          />
                          <Typography
                            variant="h5"
                            style={{
                              fontWeight: 400,
                              fontSize: theme.MetricsSizes.regular,
                              color: '#78828C'
                            }}
                          >
                            {item?.lesson_name}
                          </Typography>
                          <Grid
                            item
                            xs
                            justifyContent="flex-end"
                            style={{ display: 'flex' }}
                          >
                            {index === 0 && sectionNumber === 0 && (
                              <ButtonComp
                                style={{
                                  marginRight: '10px'
                                }}
                                buttonFontSize={12}
                                height={'25px'}
                                buttonTextColor={theme.Colors.whitePure}
                                buttonText={'Preview'}
                                onClickButton={() =>
                                  handleClickPreview(
                                    item?.lesson_name,
                                    item?.video_url
                                  )
                                }
                              ></ButtonComp>
                            )}
                            <Typography
                              variant="h5"
                              style={{
                                fontWeight: 400,
                                fontSize: theme.MetricsSizes.regular,
                                color: '#78828C'
                              }}
                            >
                              {item?.duration} min
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    })
                  : null}
              </Grid>
            )
          };
        })
      : [];
  }, [sectionData, lessonData]);

  const courseShudule = [
    {
      start_title: "Start Date",
      start_date: courseDescription?.starting_date,
      end_data: courseDescription?.ending_date,
      end_title: "End Date"
    },
    {
      start_title: "Start Time",
      start_date: courseDescription?.starting_time,
      end_data: courseDescription?.ending_time,
      end_title: "End Time"
    }
  ];

  return (
    <Grid
      container
      paddingRight={'13px'}
      sx={{
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'column'
        }
      }}
    >
      <Grid item xs={12}>
        <Grid paddingTop={0}>
          <Heading headingText={'Course description'} {...headingProps} />
          <Typography style={typographyStyleProps}>
            {courseDescription?.course_description}
          </Typography>
        </Grid>
        {courseDescription?.course_type !== 'Recorded Course' && (
          <Grid paddingTop={4} xs={12} md={10}>
            <Heading headingText={'Course schedule'} {...headingProps} />
            {courseShudule?.map((item, index) => {
              return (
                <Grid container key={index} paddingTop={2}>
                  <Grid container>
                    <Grid item xs={6} md={7}>
                      <Typography style={sheduleHeading}>{item.start_title}</Typography>
                    </Grid>
                    <Grid item md={5}>
                      <Typography style={sheduleHeading}>{item.end_title}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} md={7}>
                    <Grid container alignItems={'center'}>
                      <Grid>
                        <img src={index > 0 ? TimeImg : CalenderIconImg} />
                      </Grid>
                      <Grid>
                        <Typography
                          sx={typographyStyleProps}
                        >
                          {item.start_date}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={5}>
                    <Grid container alignItems={'center'}>
                      <Grid>
                        <img src={index > 0 ? TimeImg : CalenderIconImg} />
                      </Grid>
                      <Grid>
                        <Typography
                          sx={typographyStyleProps}>
                          {item.end_data}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        )}

        <Grid paddingTop={4}>
          <Heading headingText={'Skills covered'} {...headingProps} />
          <Grid item container spacing={1}>
            {courseDescription?.requirements ? (
              <Grid item>
                <ChipComp
                  label={courseDescription?.category_name}
                  style={{
                    borderColor: '#3CC878',
                    fontSize: theme.MetricsSizes.small_xxx,
                    fontWeight: theme.fontWeight.regular
                  }}
                />
              </Grid>
            ) : null}
            {courseDescription?.sub_category_name ? (
              <Grid item xs>
                <ChipComp
                  label={courseDescription?.sub_category_name}
                  style={{
                    borderColor: '#3CC878',
                    fontSize: theme.MetricsSizes.small_xxx,
                    fontWeight: theme.fontWeight.regular
                  }}
                />
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        <Grid paddingTop={4}>
          <Heading headingText={'Requirements'} {...headingProps} />
          <Grid item>
            <Typography style={typographyStyleProps}>
              {courseDescription?.requirements}
            </Typography>
          </Grid>
        </Grid>
        <Grid paddingTop={4}>
          <Heading headingText={'Learning Objectives'} {...headingProps} />
          {objectives?.map((item, index) => {
            return (
              <Grid key={index} container gap={1} alignItems={'center'}>
                <Grid item>
                  <FiberManualRecordIcon
                    fontSize="small"
                    style={{ color: '#78828C', padding: 5 }}
                  />
                </Grid>
                <Grid item xs>
                  <Typography style={typographyStyleProps}>{item}</Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        {courseDescription?.course_type === COURSE_TYPE_NAME[6] && (
          <Grid paddingTop={4}>
            <Heading headingText={'Topics in this course'} {...headingProps} />
            {courseDescription?.course_type === 'Recorded Course' && (
              <Grid item xs={12} md={11.7}>
                <MuiAccordionComp
                  accordionOuterContainerClassName={classes.accordionClassName}
                  config={getAccordionContents}
                  accordionDetailClassName={classes.accordionDetailsClassName}
                  bgColor={'#FFFFFF'}
                  iconColor={'#3C78F0'}
                />
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
      {openVideoPreview && (
        <DialogComp
          open={true}
          dialogClasses={{ paper: classes.dialogPaper }}
          dialogTitleStyle={{
            color: theme.Colors.blackMedium
          }}
          onClose={handleClosePreviewDialog}
          {...openVideoPreview}
        />
      )}
    </Grid>
  );
};

export default CourseDescription;
