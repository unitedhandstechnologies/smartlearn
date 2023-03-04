import React, { useEffect, useState } from 'react';
import { Grid, Rating, Typography } from '@mui/material';
import {
  ButtonComp,
  DialogComp,
  Heading,
  MuiAccordionComp
} from 'src/components';
import { PdfImg, VideoImg } from 'src/Assets';
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
        API_SERVICES.quizService.getAllQuiz(
          LANGUAGE_ID.english,
          courseDescription?.course_id
        )
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

  const getAccordionContents: any = React.useMemo(() => {
    return sectionData?.length
      ? sectionData?.map((item, index) => {
          let getLessonData: any = lessonData?.length
            ? lessonData.filter(
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
                            src={item.video_url ? VideoImg : PdfImg}
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
                            {item.lesson_name}
                          </Typography>
                          <Grid
                            item
                            xs
                            justifyContent="flex-end"
                            style={{ display: 'flex' }}
                          >
                            <Typography
                              variant="h5"
                              style={{
                                fontWeight: 400,
                                fontSize: theme.MetricsSizes.regular,
                                color: '#78828C'
                              }}
                            >
                              {item.duration} min
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

  return (
    <Grid
      container
      paddingRight={'13px'}
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
        <Grid paddingTop={0}>
          <Heading headingText={'Course description'} {...headingProps} />
          <Typography style={typographyStylProps}>
            {courseDescription?.course_description}
          </Typography>
        </Grid>
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
            <Typography style={typographyStylProps}>
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
                  <Typography style={typographyStylProps}>{item}</Typography>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        {courseDescription.course_type === COURSE_TYPE_NAME[6] && (
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
    </Grid>
  );
};

export default CourseDescription;
