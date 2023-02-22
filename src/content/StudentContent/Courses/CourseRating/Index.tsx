import { Grid, useTheme } from '@mui/material';
import { ReviewBox } from '../../HomePage/Reviews/ReviewComp';

const CourseRating = ({ review }) => {
  const theme = useTheme();
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
