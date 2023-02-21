import React, { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { Grid, Rating, Typography } from '@mui/material';
import {
  ButtonComp,
  DialogComp,
  Heading,
  MuiAccordionComp
} from 'src/components';
import { LeftArrow, RatingImg } from 'src/Assets';
import { ChipComp } from 'src/components/MultiSelectChip/ChipComp';
import StarIcon from '@mui/icons-material/Star';
import NotificationPopover from '../Notifications/StudentNotification';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CourseRating from '../CourseRating/Index';
import { makeStyles, useTheme } from '@material-ui/core';
import { toast } from 'react-hot-toast';
import {
  CONFIRM_MODAL,
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID
} from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { useTranslation } from 'react-i18next';
import { Delete, PlayCircleFilledOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => {
  return {
    dialogPaper: {
      width: 747,
      height: 505,
      padding: theme.spacing(2, 1, 2, 2),
      borderRadius: theme.MetricsSizes.regular
    },
    accordionClassName: {
      marginTop: 10
    },
    quizHeading: {
      fontWeight: theme.fontWeight.bold,
      fontSize: theme.MetricsSizes.regular_xxx,
      color: theme.Colors.blueDark
    }
  };
});

const courseDescription =
  'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.';

const chipItem = ['Stocks investing', 'Basics of options trading'];

const reviews = [
  {
    name: 'Tracy Wang',
    review:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    img: RatingImg
  },
  {
    name: 'Tracy Wang',
    img: RatingImg,
    review:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
  },
  {
    name: 'Tracy Wang',
    img: RatingImg,
    review:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
  }
];

const objectives = [
  'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
  'Velit officia consequat duis enim velit mollit',
  'Exercitation veniam consequat sunt nostrud amet.',
  'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet',
  'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet'
];

const rating = 4.5;

const headingProps = {
  headingColor: '#3C414B',
  headerFontWeight: 500,
  headerFontSize: 32,
  headerFontFamily: 'IBM Plex Serif'
};

const typographyStylProps = {
  fontFamily: 'Switzer',
  fontSize: 18,
  fontWeight: 400,
  color: '#78828C',
  padding: '10px'
};
type CourseDescriptionProps = {
  courseDescription?: any;
};
const CourseDescription = ({ courseDescription }: CourseDescriptionProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [lessonData, setLessonData] = useState<any[]>([]);
  const [sectionData, setSectionData] = useState<any[]>([]);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [openVideo, setOpenVideo] = useState<any>({ open: false });
  const [openQuizModal, setOpenQuizModal] = useState<any>({
    open: false
  });
  const fetchData = async () => {
    try {
      setLessonData([]);
      setSectionData([]);
      setQuizData([]);
      const response: any = await Promise.all([
        API_SERVICES.sectionAndLessonService.getAllLessonByCourseId(
          courseDescription?.id,
          LANGUAGE_ID.english
        ),
        API_SERVICES.sectionAndLessonService.getAllSection(
          courseDescription?.id,
          DETECT_LANGUAGE[i18n.language] ?? LANGUAGE_ID.english
        ),
        API_SERVICES.quizService.getAllQuiz(LANGUAGE_ID.english, courseDescription?.course_id)
      ]);
      if (response[0]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[0]?.data?.Lessons?.length) {
          setLessonData(response[0]?.data?.Lessons);
        }
      }
      if (response[1]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[1]?.data?.Section?.length) {
          setSectionData(response[1]?.data?.Section);
        }
      }
      if (response[2]?.status < HTTP_STATUSES.BAD_REQUEST) {
        {
          console.log('courseDescription', response[2])
          if (response[2]?.data?.quiz?.length) {
            setQuizData(response[2]?.data?.quiz);
          }
        }
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderCont = (url) => {
    return (
      <Grid>
        <video width="600" height="340" controls autoPlay={true}>
          <source src={url} type="video/mp4" />
        </video>
      </Grid>
    );
  };

  const handleClose = () => {
    setOpenVideo({ open: false });
  };

  const getAccordionContents: any = React.useMemo(() => {
    return sectionData?.length
      ? sectionData.map((item, index) => {
          let getLessonData: any = lessonData.length
            ? lessonData.filter(
                (lessonItm) => lessonItm.section_id === item.section_id
              )
            : [];

          return {
            id: index + 1,
            renderAccordionTitle: () => (
              <Grid container alignItems="center" style={{ gap: '10px' }}>
                <Typography
                  variant="h4"
                  style={{
                    color: theme.Colors.blackBerry,
                    fontWeight: theme.fontWeight.medium,
                    fontSize: theme.MetricsSizes.regular
                  }}
                >{`Section:${index + 1} - ${item.section_name}`}</Typography>
              </Grid>
            ),
            accContentDetail: () => (
              <Grid container direction="column" spacing={2}>
                {getLessonData.length
                  ? getLessonData.map((item, index) => {
                      return (
                        <Grid
                          item
                          key={index}
                          container
                          xs={12}
                          style={{ gap: 10 }}
                          alignItems="center"
                        >
                          <PlayCircleFilledOutlined fontSize="medium" />
                          <Typography
                            variant="h5"
                            style={{
                              fontWeight: 400,
                              fontSize: theme.MetricsSizes.regular,
                              color: theme.Colors.darkGrayishBlue
                            }}
                          >{`Lesson:${index + 1} - ${
                            item.lesson_name
                          }`}</Typography>
                          <Grid
                            item
                            xs
                            justifyContent="flex-end"
                            style={{ display: 'flex' }}
                          >
                            <ButtonComp
                              btnWidth={100}
                              height={25}
                              buttonFontSize={theme.MetricsSizes.small_x}
                              backgroundColor={theme.Colors.lightGrey}
                              buttonTextColor={theme.Colors.black}
                              buttonText={t('course.preview')}
                              onClickButton={() => {
                                setOpenVideo({
                                  open: true,
                                  dialogTitle: item.lesson_name,
                                  renderDialogContent: () =>
                                    renderCont(item.video_url)
                                });
                              }}
                            />
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

  const getAccordionContentsForQuiz: any = React.useMemo(() => {
    const getQuizDatass = quizData.length
      ? quizData.filter(
          (item) => item.course_id === courseDescription.course_id
        )
      : [];

    return getQuizDatass?.length
      ? getQuizDatass.map((item, index) => {
          return {
            id: index + 1,
            renderAccordionTitle: () => (
              <Grid container alignItems="center" style={{ gap: '10px' }}>
                <Typography
                  variant="h4"
                  style={{
                    color: theme.Colors.blackPrimary,
                    fontWeight: 600
                  }}
                >{`Question  :${index + 1} `}</Typography>
              </Grid>
            ),
            accContentDetail: () => (
              <Grid container direction="column" spacing={2}>
                {getQuizDatass.length ? (
                  <Grid
                    item
                    key={index}
                    container
                    xs={12}
                    style={{ gap: 10 }}
                    alignItems="center"
                  >
                    <Typography
                      variant="h5"
                      style={{
                        color: theme.Colors.blackPrimary,
                        fontWeight: 500
                      }}
                    >
                      <Grid container direction="row">
                        <Grid xs={12}>{`Question : ${item.question}`}</Grid>
                        <Grid xs={12}>{` Option 1 : ${item.option_1} `} </Grid>
                        <Grid xs={12}>{` Option 2 : ${item.option_2} `} </Grid>
                        <Grid xs={12}>{` Option 3 : ${item.option_3} `} </Grid>
                        <Grid xs={12}>{` Option 4 : ${item.option_4} `} </Grid>
                      </Grid>
                    </Typography>
                    <Grid
                      item
                      xs
                      justifyContent="flex-end"
                      style={{ display: 'flex' }}
                    ></Grid>
                  </Grid>
                ) : null}
              </Grid>
            )
          };
        })
      : [];
  }, [quizData]);

  return (
    <Grid
      container
      // justifyContent={'space-between'}
      sx={{
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'column'
        }
      }}
    >
      {/* <Grid item xs={12}>
        <CourseRating />
      </Grid> */}

      <Grid item xs={12}>
        <Grid paddingTop={4}>
          <Heading headingText={'Course description'} {...headingProps} />
          <Typography style={typographyStylProps}>
            {courseDescription?.course_description}
          </Typography>
        </Grid>
        <Grid paddingTop={4}>
          <Heading headingText={'Skills covered'} {...headingProps} />
          <Grid item container spacing={1}>
            {courseDescription?.category_name ? (
              <Grid item>
                <ChipComp
                  label={courseDescription?.category_name}
                  style={{ borderColor: '#3CC878' }}
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
          <Heading headingText={'Learning Objectives'} {...headingProps} />
          {objectives.map((item, index) => {
            return (
              <Grid key={index} container gap={1}>
                <Grid item paddingTop={0.5}>
                  <FiberManualRecordIcon
                    fontSize="small"
                    style={{ color: '#78828C', padding: 5 }}
                  />
                </Grid>
                <Grid item xs>
                  <Typography style={typographyStylProps}>{item}</Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Grid paddingTop={4}>
          <Heading headingText={'Topics in this course'} {...headingProps} />
          {courseDescription?.course_type === 'Recorded Course' && (
            <Grid item xs={12}>
              <MuiAccordionComp
                accordionOuterContainerClassName={classes.accordionClassName}
                config={getAccordionContents}
              />
            </Grid>
          )}
        </Grid>
        {/* {openVideo && (
          <DialogComp
            open={true}
            dialogClasses={{ paper: classes.dialogPaper }}
            dialogTitleStyle={{
              color: theme.Colors.blackMedium
            }}
            onClose={handleClose}
            {...openVideo}
          />
        )} */}
        {quizData?.length ? (
          <Grid container item sx={{ marginTop: 5 }}>
            <ButtonComp
              buttonText="Test Topics"
              btnWidth={'100%'}
              backgroundColor={theme.Colors.lightWhiteGrey}
              buttonTextColor={theme.Colors.darkGrayishBlue}
              onClickButton={() => {}}
            />
          </Grid>
        ) : null}
      </Grid>
      {/* <Grid
        item
        xs={3}
        sx={{
          [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
          }
        }}
      >
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
          <Grid>
            <Heading headingText={'Ratings'} {...headingProps} />
          </Grid>
          <Grid>
            <Grid container gap={1}>
              <Grid>
                <Typography style={{ fontSize: 20, fontWeight: 600 }}>
                  {rating}
                </Typography>
              </Grid>
              <Grid>
                <StarIcon style={{ color: '#F2C94C' }} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {reviews.map((item, index) => {
          return (
            <Grid container gap={2} key={index} paddingTop={3}>
              <Grid item>
                <img src={item.img} alt="Not Found" />
              </Grid>
              <Grid item xs>
                <Typography
                  style={{
                    fontFamily: 'IBM Plex Serif',
                    color: '#3C414B',
                    fontSize: 18,
                    fontWeight: 600
                  }}
                >
                  {item.name}
                </Typography>
                <Rating sx={{ color: '#F2C94C' }} />
              </Grid>
              <Typography style={typographyStylProps}>
                {item.review}
                <Divider style={{ height: 3, paddingTop: 20 }} />
              </Typography>
            </Grid>
          );
        })}
      </Grid> */}
    </Grid>
  );
};

export default CourseDescription;
