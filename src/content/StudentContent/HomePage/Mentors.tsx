import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Grid, useTheme } from '@mui/material';
import {
  LineBarIcon,
  Rectangle,
  BrooklynSimmons,
  KathrynMurphy,
  WadeWarren,
  ArrowNext
} from '../../../Assets/Images';
import { ButtonComp, Heading } from 'src/components';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useNavigate } from 'react-router';
import { makeStyles } from '@material-ui/core';
const useStyle = makeStyles((theme) => ({
  eachItem: {
    '&.MuiGrid-grid-xs-3': {
      maxWidth: '30%',
      flexBasis: '30%'
    }
  }
}));

type Props = {
  mentorDetails?: any[];
  courseDetails?: any[];
  onMentorClick?: (item: any) => void;
  headingText?: string;
  viewButtonPosition?: string;
  sliceValue?: number;
};
const Mentors = ({
  mentorDetails,
  courseDetails,
  onMentorClick,
  headingText,
  viewButtonPosition,
  sliceValue
}: Props) => {
  const theme = useTheme();
  const classes = useStyle();
  const [mentors, setMentors] = React.useState([]);
  const navigateTo = useNavigate();

  const handleMentorClick = (item) => {
    navigateTo('/home/Mentor-CourseProfile', {
      state: { ...item,courses:courseDetails },
      replace: true
    });
  };

  React.useEffect(() => {
    if (mentorDetails?.length) {
      setMentors(mentorDetails);
    } else {
      setMentors([]);
    }
  }, [mentorDetails]);

  return (
    <Grid
      container
      direction={'column'}
      style={{
        marginBottom: 40,
        paddingBottom: `${viewButtonPosition === 'bottom' ? '100px' : '0px'}`
      }}
    >
      <Grid container justifyContent={'space-between'} alignContent="center">
        <Grid item>
          <Heading
            headingText={headingText}
            headerFontSize={'40px'}
            headerFontWeight={500}
            headingColor={'#3C414B'}
            style={{
              [theme.breakpoints.down('xs')]: {
                fontSize: 15
              },
              padding: '20px 0px 20px 0px'
            }}
          />
          <Grid>
            <img src={LineBarIcon} alt="" />
          </Grid>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex',
            [theme.breakpoints.down('xs')]: {
              display: 'none'
            }
          }}
        >
          {viewButtonPosition === 'top' ? (
            <ButtonComp
              variant="outlined"
              backgroundColor={'transparent'}
              buttonTextColor={'#3C78F0'}
              endIcon={<ArrowForwardIcon />}
              buttonText={'View All'}
              btnWidth="fit-content"
              height={'50px'}
            />
          ) : null}
        </Grid>
      </Grid>

      <Grid
        container
        spacing={4}
        sx={{
          marginTop: '20',
          alignItems: 'center',
        }}
      >
        {mentors.length
          ? mentors.slice(0, sliceValue).map((item, index) => {
              return (
                <Grid  key={index} item xs={12} sm={2} md={3} className={classes.eachItem}>
                  <ImageListItem
                    sx={{ height: 348, width: '100%', marginTop: 5,cursor: "pointer" }}
                    key={index}
                  
                    onClick={() => handleMentorClick(item)}
                  >
                    <img src={item.image_url} alt="" />
                    <ImageListItemBar
                      title={`${item.first_name} ${item.last_name}`}
                      subtitle={item.qualification}
                      sx={{ backgroundColor: 'transparent' }}
                    />
                  </ImageListItem>
                </Grid>
              );
            })
          : null}
      </Grid>
      {viewButtonPosition === 'bottom' ? (
        <Grid item paddingTop={4}>
          <ButtonComp
            style={{ border: '1.5px solid #3C78F0' }}
            variant="outlined"
            buttonFontFamily="Switzer"
            buttonFontSize={18}
            backgroundColor={'#FFFFFF'}
            buttonTextColor={'#3C78F0'}
            btnBorderRadius={'4px'}
            buttonText={'View All'}
            btnWidth="100%"
            iconImage={<img src={ArrowNext} style={{ marginLeft: '8px' }} />}
            onClickButton={() => {}}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default Mentors;
