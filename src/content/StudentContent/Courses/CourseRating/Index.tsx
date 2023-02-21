import { Grid, useTheme } from '@mui/material';
import React from 'react';
import {
  Intermediate,
  Online,
  Star,
  chatIcon
} from '../../../../Assets/Images';
import { ReviewBox } from '../../HomePage/Reviews/ReviewComp';

// const review = [
//   {
//     name: '4.5',
//     subText: 'Ratings',
//     img: Star
//   },
//   {
//     name: 'English',
//     subText: 'Course language',
//     img: chatIcon
//   },
//   {
//     name: 'Intermediate',
//     subText: 'Difficulty level',
//     img: Intermediate
//   },
//   {
//     name: 'Online',
//     subText: 'Study mode',
//     img: Online
//   }
// ];

const CourseRating = ({ review }) => {
  const theme = useTheme();
  return (
    <Grid
      container
      sx={{
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'row',
        boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.09)',
        [theme.breakpoints.down('md')]: {
          display: 'none'
        },
        width: '100%'
      }}
    >
      {review.map((item, index) => {
        return (
          <Grid key={index}>
            <ReviewBox
              name={item.name}
              subText={item.subText}
              courseIcon={item.img}
              spacingRating={0}
              sx={{
                boxShadow: 'white',
                width: '100%',
                padding: 5
              }}
              subTextStyle={{
                fontWeight: 400,
                fontSize: '12px',
                color: '#78828C',
                fontFamily: 'Switzer',
                fontStyle: 'normal',
                padding: '5px 0px 0px 10px',
                justifyContent: 'start',
                alignItems: 'start'
              }}
              nameStyle={{
                fontWeight: 600,
                fontSize: '18px',
                color: '#3C414B',
                fontFamily: 'Switzer',
                fontStyle: 'normal',
                padding: '0px 10px 0px 10px'
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CourseRating;
