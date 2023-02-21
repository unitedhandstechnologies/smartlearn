import React from 'react';
import { Box, Divider } from '@mui/material';
import { Grid, Rating, Typography } from '@mui/material';
import { ButtonComp, Heading } from 'src/components';
import { LeftArrow, RatingImg } from 'src/Assets';
import { ChipComp } from 'src/components/MultiSelectChip/ChipComp';
import StarIcon from '@mui/icons-material/Star';
import NotificationPopover from '../Notifications/StudentNotification';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CourseRating from '../CourseRating/Index';
import { useTheme } from '@material-ui/core';

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

const CourseDescription = () => {
  const theme = useTheme();
  return (
    <Grid
      container
      justifyContent={'space-between'}
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
            {courseDescription}
          </Typography>
        </Grid>
        <Grid paddingTop={4}>
          <Heading headingText={'Skills covered'} {...headingProps} />
          <Grid container gap={1}>
            {chipItem.map((item, index) => (
              <ChipComp
                key={index}
                label={item}
                style={{ borderColor: '#3CC878' }}
              />
            ))}
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
          <Typography style={typographyStylProps}>
            {courseDescription}
          </Typography>
        </Grid>
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
