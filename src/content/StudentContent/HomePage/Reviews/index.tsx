import React, { useState } from 'react';
import { Grid, IconButton, Container } from '@mui/material';
import { LineBarIcon } from 'src/Assets';
import { ReviewBox } from './ReviewComp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@material-ui/core';
import { Heading } from 'src/components';

const Reviews = ({ ratingData }) => {
  const theme = useTheme();
  const [view, setView] = useState([0, 2]);

  const handleNextClick = () => {
    setView([view[0] + 2, view[1] + 2]);
  };

  const handlePrevClick = () => {
    setView([view[0] - 2, view[1] - 2]);
  };

  return (
    <Container>
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
              headerFontFamily={'IBM Plex Serif'}
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
            <IconButton
              sx={{ color: '#3C78F0' }}
              onClick={handlePrevClick}
              disabled={view[0] <= 0}
            >
              <ChevronLeftIcon
                style={{
                  border: '1px solid #3C78F0',
                  paddingTop: 1,
                  width: 37,
                  height: 50,
                  borderRadius: 4
                }}
              />
            </IconButton>
            <IconButton
              sx={{ color: '#3C78F0' }}
              onClick={handleNextClick}
              disabled={view[1] >= ratingData?.length}
            >
              <ChevronRightIcon
                style={{
                  border: '1px solid #3C78F0',
                  paddingTop: 1,
                  width: 37,
                  height: 50,
                  borderRadius: 4
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {ratingData?.slice(view[0], view[1])?.map((item, index) => {
            return (
              <Grid item xs={12} sm={6} key={index}>
                <ReviewBox
                  name={item?.mentor_name}
                  subText={item?.course_name}
                  review={item?.command}
                  imgUrl={item?.user_image}
                  rating={true}
                  ratingValue={item?.mentor_rating}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reviews;
