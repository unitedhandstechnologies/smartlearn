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
    name: 'A',
    subText: 'ABC Company',
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
    img: Avatar1
  },
  {
    name: 'B',
    subText: 'BC Company',
    img: Avatar1,
    review:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
  }
  // {
  //   name: 'c',
  //   subText: 'BC Company',
  //   img: Avatar1,
  //   review:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
  // },
  // {
  //   name: 'd',
  //   subText: 'BC Company',
  //   img: Avatar1,
  //   review:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
  // },
  // {
  //   name: 'Be',
  //   subText: 'BC Company',
  //   img: Avatar1,
  //   review:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
  // },
  // {
  //   name: 'fB',
  //   subText: 'BC Company',
  //   img: Avatar1,
  //   review:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
  // },
  // {
  //   name: 'gB',
  //   subText: 'BC Company',
  //   img: Avatar1,
  //   review:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
  // }
];

const Reviews = () => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = review?.length ?? 0;
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

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 0.5);
    }
  };

  return (
    <Grid >
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
        {review.map((item, index) => {
          return (
            <Grid item xs={12} sm={6} key={index}>
              <ReviewBox
                name={item.name}
                subText={item.subText}
                review={item.review}
                imgUrl={item.img}
                rating={true}
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
