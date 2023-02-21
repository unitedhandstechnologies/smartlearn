import { Grid, IconButton, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './carousel.css';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme: Theme) => ({
  arrowForward: {
    top: '100%',
    position: 'absolute',
    zIndex: 1,
    transform: 'translateY(50%)',
    right: theme.spacing(2),
    width: '48px',
    height: '48px'
  },
  arrowBack: {
    top: '100%',
    position: 'absolute',
    zIndex: 1,
    transform: 'translateY(50%)',
    right: theme.spacing(7),
    width: '48px',
    height: '48px',
    color: 'red'
  },
  carouselWrapper: {
    display: 'flex',
    width: '100%',
    position: 'relative'
  },
  carouselContentWrapper: {
    overflow: 'hidden',
    width: '100%',
    height: '100%'
  }
}));

// const Carousel = (props) => {
//   const classes = useStyles();
//   const { children, show, dataLength } = props;
//   const [currentIndex, setCurrentIndex] = useState(0);
//   let length = dataLength ?? 0;

//   const handleNextClick = () => {
//     if (currentIndex < length - show) {
//       setCurrentIndex((prevState) => prevState + 1);
//     }
//   };

//   const handlePrevClick = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((prevState) => prevState - 1);
//     }
//   };

//   return (
//     <Grid className={classes.carouselWrapper}>
//       <Grid className={classes.carouselContentWrapper}>
//         <Grid
//           className={`carousel-content show-${show}`}
//           style={{
//             transform: `translateX(-${currentIndex * (100 / show)}%)`
//           }}
//         >
//           {children}
//         </Grid>
//       </Grid>
//       {currentIndex > 0 && (
//         <IconButton onClick={handlePrevClick} className={classes.arrowBack}>
//           <ChevronLeftIcon />
//         </IconButton>
//       )}
//       {currentIndex < length - show && (
//         <IconButton onClick={handleNextClick} className={classes.arrowForward}>
//           <ChevronRightIcon />
//         </IconButton>
//       )}
//     </Grid>
//   );
// };
type CarouselProp = {
  children: any;
  show?: any;
  currentIndex?: any;
};
export const Carousel = (props: CarouselProp) => {
  const { children, show, currentIndex } = props;
  const classes = useStyles();

  return (
    <Grid className={classes.carouselWrapper}>
      <Grid
        style={{
          transform: `translateX(-${currentIndex * (80 / show)}%)`,
          display: 'flex'
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default Carousel;
