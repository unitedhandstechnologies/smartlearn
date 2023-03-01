import React, { useState } from 'react';
import {
  makeStyles,
  useTheme,
  Theme,
  IconButton,
  Avatar,
  Container
} from '@material-ui/core';
import { Box, Grid, Rating, Typography } from '@mui/material';
import Carousel from 'src/components/Carousel';
import LinesEllipsis from 'react-lines-ellipsis';

const useStyles = makeStyles((theme: Theme) => ({
  carouselStyle: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden'
  }
}));

const ReviewComp = ({ review, show, currentIndex }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Container>
      <Grid className={classes.carouselStyle}>
        <Carousel show={show} currentIndex={currentIndex}>
          {review?.length
            ? review?.map((item, index) => {
                return (
                  <Grid
                    item
                    xs={6}
                    key={index}
                    style={{
                      padding: '0px 20px 0px 20px',
                      width: '600px',
                      [theme.breakpoints.down('xs')]: {
                        width: '100%'
                      }
                    }}
                  >
                    <ReviewBox
                      imgUrl={item.img}
                      name={item.name}
                      subText={item.subText}
                      rating={true}
                      review={item.review}
                      sx={undefined}
                      courseIcon={undefined}
                      subTextStyle={undefined}
                      nameStyle={undefined}
                      spacingRating={3}
                    />
                  </Grid>
                );
              })
            : null}
        </Carousel>
      </Grid>
    </Container>
  );
};

export default ReviewComp;

type Props = {
  imgUrl?: any;
  name?: string;
  subText?: string;
  rating?: boolean;
  review?: any;
  sx?: any;
  courseIcon?: any;
  subTextStyle?: any;
  nameStyle?: any;
  spacingRating?: any;
  ratingValue?: any;
};

export const ReviewBox = ({
  sx,
  courseIcon,
  subTextStyle,
  nameStyle,
  imgUrl,
  name,
  subText,
  rating,
  review,
  ratingValue,
  spacingRating
}: Props) => {
  const theme = useTheme();
  const [maxLine, setMaxLine] = useState(5);

  const handleEllipseClick = () => {
    if (maxLine !== 5) {
      setMaxLine(5);
    } else {
      setMaxLine(10);
    }
  };

  return (
    <Box
      sx={{
        padding: '20px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 4px 24px rgba(0, 35, 80, 0.1)',
        backgroundColor: theme.Colors.white,
        height: '100%',
        ...sx
      }}
    >
      <Grid container spacing={spacingRating} direction={'row'}>
        {courseIcon && (
          <Grid
            sx={{
              background: 'rgba(255, 120, 60, 0.15)',
              borderRadius: '15px',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 2
            }}
          >
            <img
              src={courseIcon}
              alt="Not Found"
              style={{
                width: '20px',
                height: '20px'
              }}
            />
          </Grid>
        )}
        {imgUrl && (
          <Grid item sx={{ paddingRight: 3 }}>
            <Avatar src={imgUrl} alt="Not Found" />
          </Grid>
        )}
        <Grid item xs>
          <Grid item>
            <Typography
              sx={{
                color: '#3C414B',
                fontWeight: 700,
                fontSize: '20px',
                paddingBottom: '15px',
                ...nameStyle
              }}
            >
              {name}
              {rating && (
                <Rating
                  defaultValue={ratingValue}
                  sx={{ color: '#F2C94C', paddingLeft: '25px' }}
                />
              )}
            </Typography>
          </Grid>

          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '18px',
              color: '#78828C',
              padding: '0px 5px 0px 0px',
              ...subTextStyle
            }}
          >
            {subText}
            {review && (
              <Typography
                sx={{
                  padding: '5px 5px 0px 0px',
                  cursor: 'pointer'
                }}
              >
                <LinesEllipsis
                  text={review}
                  maxLine={maxLine}
                  ellipsis="......"
                  onClick={handleEllipseClick}
                />
              </Typography>
            )}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
