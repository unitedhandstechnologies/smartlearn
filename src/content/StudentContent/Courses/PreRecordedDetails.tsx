import { memo } from 'react';
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
import { useNavigate } from 'react-router';
import UpComingSession from '../HomePage/UpComingSession';

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
  const navigateTo = useNavigate();
  return (
    <Grid>
      <Grid
        container
        sx={{
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
          }
        }}
      >
        <Grid item xs={12}>
          <PreRecordedCourses />
        </Grid>
        <Grid item xs={12} md={9} paddingTop={15}>
          <CourseDescription />
        </Grid>
        <Grid container item xs={12} md={3} paddingTop={20}>
          <CourseRight />
        </Grid>
        <UpComingSession />
      </Grid>
    </Grid>
  );
};
export default memo(PreRecordedDetails);
