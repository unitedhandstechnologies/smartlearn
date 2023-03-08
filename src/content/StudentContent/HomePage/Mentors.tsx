import React, { useState } from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Grid, useTheme } from '@mui/material';
import { LineBarIcon, ArrowNext } from '../../../Assets/Images';
import { ButtonComp, Heading } from 'src/components';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useNavigate } from 'react-router';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  eachItem: {
    '&.MuiGrid-item': {
      padding: theme.spacing(0)
    }
  }
}));

type Props = {
  mentorDetails?: any[];
  courseDetails?: any[];
  onMentorClick?: (item: any) => void;
  headingText?: any;
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
  const classes = useStyles();
  const [mentors, setMentors] = React.useState([]);
  const navigateTo = useNavigate();
  const [view, setView] = useState(sliceValue);

  const handleMentorClick = (item) => {
    navigateTo('/home/mentor-courseProfile', {
      state: { ...item, courses: courseDetails },
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

  const handleBackbtn = (value) => {
    if (view === value) {
      setView(mentorDetails?.length);
    } else {
      setView(value);
    }
  };

  return (
    <Grid
      container
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
            headerFontFamily={'IBM Plex Serif'}
            style={{
              [theme.breakpoints.down('xs')]: {
                fontSize: 15
              },
              padding: '20px 0px 20px 0px'
            }}
          />
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
          {viewButtonPosition === 'top' && mentors?.length > 4 ? (
            <ButtonComp
              variant="outlined"
              backgroundColor={'transparent'}
              buttonTextColor={'#3C78F0'}
              endIcon={view === 4 && <ArrowForwardIcon />}
              buttonText={view === 4 ? 'View All' : 'Back'}
              btnWidth="fit-content"
              btnBorderRadius={'4px'}
              height={'50px'}
              style={{
                borderColor: '#3C78F0',
                borderWidth: '1.5px',
                borderStyle: 'solid'
              }}
              onClick={() => handleBackbtn(4)}
            />
          ) : null}
        </Grid>
      </Grid>
      <Grid sx={{ paddingBottom: '20px' }}>
        <img src={LineBarIcon} alt="" />
      </Grid>
      <Grid
        container
        spacing={4}
        sx={{
          paddingTop: '20px',
          [theme.breakpoints.down('xs')]: {
            justifyContent: 'center'
          }
        }}
      >
        {mentors?.length
          ? mentors?.slice(0, view)?.map((item, index) => {
              return (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={3}
                  md={3}
                  className={classes.eachItem}
                >
                  <ImageListItem
                    sx={{
                      width: '100%',
                      cursor: 'pointer'
                    }}
                    key={index}
                    onClick={() => handleMentorClick(item)}
                  >
                    <img src={item?.image_url} alt="" />
                    <ImageListItemBar
                      title={`${item?.first_name} ${item?.last_name}`}
                      subtitle={item?.qualification}
                      sx={{ backgroundColor: 'transparent' }}
                    />
                  </ImageListItem>
                </Grid>
              );
            })
          : null}
      </Grid>
      {viewButtonPosition === 'bottom' && mentors?.length > 12 ? (
        <Grid item paddingTop={4} width={'100%'}>
          <ButtonComp
            style={{ border: '1.5px solid #3C78F0' }}
            variant="outlined"
            buttonFontFamily="Switzer"
            buttonFontSize={18}
            backgroundColor={'#FFFFFF'}
            buttonTextColor={'#3C78F0'}
            btnBorderRadius={'4px'}
            buttonText={sliceValue === 12 ? 'View All' : 'Back'}
            btnWidth="100%"
            iconImage={
              sliceValue === 12 ? (
                <img src={ArrowNext} style={{ marginLeft: '8px' }} />
              ) : null
            }
            onClick={() => handleBackbtn(12)}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default Mentors;
