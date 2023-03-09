import { memo, useState } from 'react';
import { Grid, Typography, Divider, Rating } from '@mui/material';
import { Avatar, useTheme } from '@material-ui/core';
import { Heading, ButtonComp } from 'src/components';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const headingProps = {
  headingColor: '#3C414B',
  headerFontWeight: 500,
  headerFontSize: 32,
  headerFontFamily: 'IBM Plex Serif'
};

const typographyStyleProps = {
  fontSize: 18,
  fontWeight: 400,
  color: '#78828C'
};

type CourseRatingProps = {
  courseRating?: any;
  averageRating?: number;
};

const CourseRight = ({ courseRating, averageRating }: CourseRatingProps) => {
  const theme = useTheme();
  const [view, setView] = useState(3);

  const handleView = () => {
    if (view === 3) {
      setView(courseRating?.length);
    } else {
      setView(3);
    }
  };

  return (
    <Grid container>
      <Grid
        sx={{
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
          }
        }}
      ></Grid>
      <Grid item xs={12}>
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
          <Grid>
            <Heading headingText={'Ratings'} {...headingProps} />
          </Grid>
          <Grid>
            <Grid container gap={1}>
              <Typography style={{ fontSize: 20, fontWeight: 600 }}>
                {averageRating}
              </Typography>
              <StarIcon style={{ color: '#F2C94C' }} />
            </Grid>
          </Grid>
        </Grid>
        {courseRating?.slice(0, view)?.map((item, index) => {
          return (
            <Grid
              item
              xs={12}
              container
              gap={2}
              key={index}
              paddingTop={3}
              sx={{
                [theme.breakpoints.down('sm')]: {
                  flexDirection: 'row',
                  width: '100%'
                }
              }}
            >
              <Grid item>
                <Avatar
                  src={item.user_image}
                  style={{ height: 44, width: 44 }}
                />
              </Grid>
              <Grid item xs>
                <Typography
                  style={{
                    color: '#3C414B',
                    fontSize: 18,
                    fontWeight: 600
                  }}
                >
                  {item?.user_name}
                </Typography>
                <Rating
                  readOnly={true}
                  defaultValue={item?.course_rating}
                  sx={{ color: '#F2C94C' }}
                />
              </Grid>

              <Typography style={typographyStyleProps}>
                {item?.command}
                <Divider
                  style={{ height: 2, paddingTop: 20, color: '#B4BEC8' }}
                />
              </Typography>
            </Grid>
          );
        })}
      </Grid>
      {courseRating?.length > 3 && (
        <Grid item xs={12}>
          <ButtonComp
            variant="outlined"
            buttonText={'View All'}
            buttonFontSize={18}
            buttonFontFamily={'Switzer'}
            backgroundColor={theme.Colors.white}
            buttonFontWeight={500}
            buttonTextColor={'#3C78F0'}
            btnWidth={'100%'}
            btnBorderRadius={'4px'}
            endIcon={<ExpandMoreIcon style={{ color: '#3C78F0' }} />}
            style={{
              borderColor: '#3C78F0'
            }}
            onClick={handleView}
          />
        </Grid>
      )}
    </Grid>
  );
};
export default memo(CourseRight);
