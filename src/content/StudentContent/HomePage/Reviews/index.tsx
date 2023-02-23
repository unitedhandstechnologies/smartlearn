import React, { useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import { Avatar1, LineBarIcon } from 'src/Assets';
import ReviewComp, { ReviewBox } from './ReviewComp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@material-ui/core';
import { Heading } from 'src/components';

const review = [
  {
    mentor_name: 'John Doe',
    subText: 'ABC Company',
    command:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
    user_image: Avatar1,
    mentor_rating: 4,
    course_name: ''
  },
  {
    mentor_name: 'Kathryn Murphy',
    subText: 'BC Company',
    user_image: Avatar1,
    command:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ',
    mentor_rating: 4,
    course_name: ''
  }
];

const Reviews = ({ ratingData }) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = review?.length ?? 0;
  const [view, setView] = useState(2);
  const show = 3;

  const handleNextClick = () => {
    if (currentIndex < length) {
      if (currentIndex < length - show) {
        setCurrentIndex((prevState) =>
          prevState === show ? 0 : prevState + 0.5
        );
      }
    }
  };

  // const handleView = () => {
  //   if (view === 6) {
  //     setView(courses.length);
  //   } else {
  //     setView(6);
  //   }
  // };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 0.5);
    }
  };

  return (
    <Grid>
      <Grid
        container
        justifyContent={'space-between'}
        sx={{ padding: '0 0 30px 0px' }}
      >
        <Grid>
          <Heading
            headingText={'What our learners say'}
            headerFontSize={'40px'}
            headerFontWeight={500}
            headingColor={'#3C414B'}
            style={{
              [theme.breakpoints.down('xs')]: {
                fontSize: 15
              }
            }}
          />
          <Grid>
            <img src={LineBarIcon} alt="" />
          </Grid>
        </Grid>
        <Grid>
          <IconButton sx={{ color: '#3C78F0' }} onClick={handlePrevClick}>
            <Grid
              item
              sx={{
                border: '1px solid #3C78F0',
                paddingTop: 1,
                width: 37,
                borderRadius: 1
              }}
            >
              <ChevronLeftIcon />
            </Grid>
          </IconButton>
          <IconButton sx={{ color: '#3C78F0' }} onClick={handleNextClick}>
            <Grid
              item
              sx={{
                border: '1px solid #3C78F0',
                paddingTop: 1,
                width: 37,
                borderRadius: 1
              }}
            >
              <ChevronRightIcon />
            </Grid>
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {ratingData.slice(0, 2).map((item, index) => {
          return (
            <Grid item xs={12} sm={6} key={index}>
              <ReviewBox
                name={item.mentor_name}
                subText={item.course_name}
                review={item.command}
                imgUrl={item.user_image}
                rating={true}
                ratingValue={item.mentor_rating}
              />
            </Grid>
          );
        })}
      </Grid>
      {/* <Grid container spacing={3}>
        <ReviewComp review={review} show={show} currentIndex={currentIndex} />
      </Grid> */}
    </Grid>
  );
};

export default Reviews;
