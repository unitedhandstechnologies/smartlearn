import { Grid, useTheme } from '@mui/material';
import { ReviewBox } from '../../HomePage/Reviews/ReviewComp';
import {
  chatIcon,
  Star,
  Online,
  CalenderImg,
  BeginnerIcon,
  IntermediateIcon,
  BarChartFillIcon,
  OfflineImg
} from 'src/Assets';
import { COURSE_LEVEL_NAME, LANGUAGE_NAME } from 'src/Config/constant';

const levelIcons = [
  BeginnerIcon,
  BeginnerIcon,
  IntermediateIcon,
  BarChartFillIcon
];

const CourseRating = ({ course }) => {
  const theme = useTheme();

  const reviews = [
    {
      name:
        course?.course_type === 'Recorded Course'
          ? course?.ratings || 4.5
          : course?.starting_date,
      subText:
        course?.course_type === 'Recorded Course'
          ? 'Rating'
          : course?.course_type === 'Masterclass'
          ? 'Starts from '
          : 'Happening on',
      img: course?.course_type === 'Recorded Course' ? Star : CalenderImg
    },
    {
      name: LANGUAGE_NAME[course?.language_id] || 'English',
      subText: 'Course language',
      img: chatIcon
    },
    {
      name: COURSE_LEVEL_NAME[course?.course_level_id] || 'Beginner',
      subText: 'Difficulty level',
      img: levelIcons[course?.course_level_id]
    },
    {
      name: course?.course_mode || 'Offline',
      subText: 'Study mode',
      img: course?.course_mode === 'Online' ? Online : OfflineImg
    }
  ];

  return (
    <Grid
      container
      sx={{
        zIndex: 1,
        marginTop: 5,
        background: '#FFFFFF',
        borderRadius: '4px',
        borderBottomLeftRadius: 1,
        borderTopRightRadius: 1,
        display: 'flex',
        flexDirection: 'row',
        boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.09)',
        [theme.breakpoints.down('xs')]: {
          display: 'none'
        },
        width: '100%'
      }}
    >
      {reviews?.map((item, index) => {
        return (
          <Grid key={index}>
            <ReviewBox
              name={item?.name}
              subText={item?.subText}
              courseIcon={item?.img}
              spacingRating={0}
              sx={{
                boxShadow: 'white',
                width: '100%',
                padding: 3
              }}
              subTextStyle={{
                fontWeight: 400,
                fontSize: '12px',
                color: '#78828C',
                fontFamily: 'Switzer',
                padding: '1px 0px 0px 10px'
              }}
              nameStyle={{
                fontWeight: 600,
                fontSize: '18px',
                color: '#3C414B',
                fontFamily: 'Switzer',
                padding: '0px 5px 0px 10px'
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CourseRating;
