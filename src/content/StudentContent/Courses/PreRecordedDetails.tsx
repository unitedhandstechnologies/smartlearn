import { memo, useCallback, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import {
  BarIcon,
  BasicStockIcon,
  CommendIcon,
  DateSvg,
  ZoomIcon
} from 'src/Assets';
import { useTheme } from '@material-ui/core';
import CourseDescription from './CourseDescription/CourseDescription';
import PreRecordedCourses from './PreRecordedCourses';
import CourseRight from './CourseRight';
import { useLocation, useNavigate } from 'react-router';
import UpComingSession from '../HomePage/UpComingSession';
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES, LANGUAGE_ID } from 'src/Config/constant';
import { toast } from 'react-hot-toast';

const data = [
  {
    imgUrl: BasicStockIcon,
    title: 'Professional Trading Course',
    subText:
      'Some description goes here like this. Second line of description goes here like...',
    leftText: 'Free',
    rightText: 'Live'
  },
  {
    imgUrl: BasicStockIcon,
    title: 'Basics of Stock Investing',
    subText:
      'Some description goes here like this. Second line of description goes here like...'
    // leftText: 'Free',
    // rightText: '12 Oct – 23 Oct, 2023'
  },
  {
    imgUrl: BasicStockIcon,
    title: 'title',
    subText:
      'Some description goes here like this. Second line of description goes here like...',
    // leftText: 'Free',
    rightText: '12 Oct – 23 Oct, 2023'
  },
  {
    imgUrl: BasicStockIcon,
    title: 'title',
    subText:
      'Some description goes here like this. Second line of description goes here like...',
    leftText: 'Free'
    // rightText: '12 Oct – 23 Oct, 2023'
  },
  {
    imgUrl: BasicStockIcon,
    title: 'title',
    subText:
      'Some description goes here like this. Second line of description goes here like...',
    // leftText: 'Free',
    rightText: '12 Oct – 23 Oct, 2023'
  },
  {
    imgUrl: BasicStockIcon,
    title: 'title',
    subText:
      'Some description goes here like this. Second line of description goes here like...',
    leftText: 'Free'
    // rightText: '12 Oct – 23 Oct, 2023'
  }
];

const iconText = [
  {
    icon: DateSvg,
    value: '25 Oct 2023'
  },
  {
    icon: ZoomIcon,
    value: 'Zoom'
  },
  {
    icon: BarIcon,
    value: 'Intermediate'
  },
  {
    icon: CommendIcon,
    value: 'Gujarati'
  }
];

const PreRecordedDetails = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [mentorDetails, setMentorDetails] = useState<any>([]);
  const [courseRating, setCourseRating] = useState<any>([]);
  const [averageRating, setAverageRating] = useState<number>();
  const { state }: any = useLocation();
  const [lessons, setLessons] = useState<any>([]);
  let data = { ...state?.formData };
  let totalDuration = 0;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setMentorDetails([]);
      setCourseRating([]);
      const response: any = await Promise.all([
        API_SERVICES.adminUserService.getById(data.mentor_id),
        API_SERVICES.homeUserService.getAllCourseRating(data?.course_id),
        API_SERVICES.sectionAndLessonService.getAllLessonByCourseId(
          data?.course_id,
          LANGUAGE_ID.english
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
          setLessons(response[2]?.data?.Lessons);
        }
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  lessons.forEach((element) => (totalDuration += element.duration));
  if (totalDuration > 60) {
    totalDuration = totalDuration / 60;
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
      <Grid
        container
        sx={{
          padding: 5 ,
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
          }
        }}
      >
        <Grid item xs={12}>
          <PreRecordedCourses
            data={data}
            mentorDetails={mentorDetails}
            totalDuration={totalDuration}
          />
        </Grid>
        <Grid
          container
          sx={{
            [theme.breakpoints.down('md')]: {
              paddingTop: 1
            }
          }}
        >
          <Grid item xs={12} md={9} paddingTop={5}>
            <CourseDescription courseDescription={data} />
          </Grid>
          <Grid container item xs={12} md={3} paddingTop={'9%'}>
            <CourseRight
              courseRating={courseRating}
              averageRating={averageRating}
            />
          </Grid>
        </Grid>
        {/* <Grid>
          <UpComingSession />
        </Grid> */}
      </Grid>
  );
};
export default memo(PreRecordedDetails);
