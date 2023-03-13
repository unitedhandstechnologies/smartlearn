import { memo, useCallback, useEffect, useState } from 'react';
import { Grid, Container } from '@mui/material';
import { useTheme, Typography, IconButton } from '@material-ui/core';
import CourseDescription from './CourseDescription/CourseDescription';
import PreRecordedCourses from './PreRecordedCourses';
import CourseRight from './CourseRight';
import { useLocation } from 'react-router';
import { API_SERVICES } from 'src/Services';
import {
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID
} from 'src/Config/constant';
import { toast } from 'react-hot-toast';
import RateYourExperience from '../HomePage/RateYourExperience/ExperienceRate';
import { useTranslation } from 'react-i18next';
import { Loader } from 'src/components';
import RelatedCourses from './RelatedCourses';
import { BackgroundLine } from 'src/Assets';
import LinkIcon from '@mui/icons-material/Link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PreRecordedDetails = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [mentorDetails, setMentorDetails] = useState<any>([]);
  const [courseRating, setCourseRating] = useState<any>([]);
  const [averageRating, setAverageRating] = useState<number>();
  const { state }: any = useLocation();
  const [lessonData, setLessonData] = useState<any>([]);
  const [sectionData, setSectionData] = useState<any[]>([]);
  const [course, setCourse] = useState<any>([]);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  let data = { ...state?.formData };
  let totalDuration = 0;
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setMentorDetails([]);
      setCourseRating([]);
      setCourse([]);
      const response: any = await Promise.all([
        API_SERVICES.adminUserService.getById(data.mentor_id),
        API_SERVICES.homeUserService.getAllCourseRating(data?.course_id),
        API_SERVICES.sectionAndLessonService.getAllLessonByCourseId(
          data?.course_id,
          LANGUAGE_ID.english
        ),
        API_SERVICES.courseManagementService.getAll(LANGUAGE_ID.english),
        API_SERVICES.sectionAndLessonService.getAllSection(
          data?.course_id,
          DETECT_LANGUAGE[i18n.language] ?? LANGUAGE_ID.english
        )
      ]);

      if (response[0]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[0]?.data?.user) {
          setMentorDetails(response[0]?.data?.user);
        }
      }
      if (response[1]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[1]?.data?.ratings?.length) {
          setCourseRating(response[1]?.data?.ratings);
          setAverageRating(response[1]?.data?.total_ratings);
        }
      }
      if (response[2]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[2]?.data?.Lessons?.length) {
          setLessonData(response[2]?.data?.Lessons);
        }
      }
      if (response[3]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[3]?.data?.courses?.length) {
          const courses = response[3]?.data?.courses;
          const filteredCourse = courses?.filter(
            (item) => item.course_id === data?.course_id
          );

          setCourse(filteredCourse);
        }
      }
      if (response[4]?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response[4]?.data?.Section?.length) {
          setSectionData(response[4]?.data?.Section);
        }
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  lessonData?.forEach((element) => (totalDuration += element.duration));
  if (totalDuration > 60) {
    totalDuration = totalDuration / 60;
  }

  useEffect(() => {
    fetchData();
  }, []);

  window.scrollTo(0, 0);

  const onClickCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    setIsCopied(!isCopied);
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Grid
        container
        sx={{
          padding: 5,
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
          }
        }}
      >
        <Grid item xs={12}>
          <PreRecordedCourses
            course={course[0]}
            data={data}
            mentorDetails={mentorDetails}
            totalDuration={totalDuration}
            backBtnRoute={state?.backBtnRoute}
            backBtnTxt={state?.backBtnTxt}
          />
        </Grid>
        <Container>
          <Grid
            container
            sx={{
              [theme.breakpoints.down('md')]: {
                paddingTop: 1
              }
            }}
          >
            <Grid item xs={12} md={8} paddingTop={5}>
              <CourseDescription
                courseDescription={course[0]}
                courseId={data}
                sectionData={sectionData}
                lessonData={lessonData}
              />
            </Grid>
            {courseRating?.length ? (
              <Grid container item xs={12} md={4} paddingTop={'9%'}>
                <CourseRight
                  courseRating={courseRating}
                  averageRating={averageRating}
                />
              </Grid>
            ) : null}
          </Grid>
          {data?.student_enrolled_course_id ? (
            <Grid>
              <RateYourExperience courseDetails={course[0]} />
            </Grid>
          ) : null}
          {state?.showZoomLink && course[0]?.course_mode === 'Online' ? (
            <Grid item sx={{ paddingTop: '20px' }}>
              <Typography
                style={{
                  color: '#3C414B',
                  fontWeight: 500,
                  fontSize: 32,

                  fontFamily: 'IBM Plex Serif'
                }}
              >
                Zoom Link
              </Typography>
              <Grid
                container
                item
                xs={12}
                md={8}
                sx={{ border: '1px solid lightGrey' }}
              >
                <Grid item xs sx={{ alignSelf: 'center', paddingLeft: 1 }}>
                  <Typography
                    variant="h5"
                    style={{
                      fontWeight: 400,
                      fontSize: theme.MetricsSizes.regular,
                      color: '#78828C'
                    }}
                  >
                    <a
                      href={data?.meeting_link}
                      rel="noopener noreferrer"
                      target={'_blank'}
                    >
                      {data?.meeting_link}
                    </a>
                  </Typography>
                </Grid>
                <Grid item sx={{ borderLeft: '1px solid lightGrey' }}>
                  <IconButton
                    style={{
                      color: isCopied
                        ? theme.Colors.lightGreen
                        : theme.Colors.darkGrayishBlue
                    }}
                    onClick={() => onClickCopyLink(data?.meeting_link)}
                  >
                    {isCopied ? <CheckCircleIcon /> : <LinkIcon />}
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Container>
        <Grid
          container
          direction="column"
          sx={{
            padding: theme.spacing(7, 0),
            backgroundImage: `url(${BackgroundLine})`,
            [theme.breakpoints.down('xs')]: { backgroundImage: 'none' }
          }}
        >
          <RelatedCourses courseDetails={data} />
        </Grid>
      </Grid>
    );
  }
};
export default memo(PreRecordedDetails);
