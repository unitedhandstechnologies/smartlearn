import { makeStyles, useTheme } from '@material-ui/core';
import {
  Grid,
  Typography,
  InputBase,
  InputAdornment,
  IconButton
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowNext,
  BarIcon,
  BasicStockIcon,
  LineBarIcon,
  SearchIconImg
} from 'src/Assets';
import { ButtonComp, Heading, MuiCardComp } from 'src/components';
import { ChipComp } from 'src/components/MultiSelectChip/ChipComp';
import { COURSE_TYPE_NAME } from 'src/Config/constant';
import ChipIconcomp from './ChipIconcomp';

const courses = [
  {
    id: 1,
    mentor_id: 2,
    mentor_name: 'Mentor',
    category_id: 2,
    category_name: 'FrontEnd English',
    sub_category_id: 2,
    sub_category_name: 'React',
    course_level_id: 3,
    course_level_name: 'Advanced',
    image_url:
      'https://smartlearn-video.s3.amazonaws.com/MicrosoftTeams-image%20%284%29.png',
    chapter: 0,
    section: 0,
    course_type: 'webinar',
    cost_type: 'Free',
    amount: 0,
    discount: 0,
    starting_date: '2023-01-25',
    ending_date: '2023-02-25',
    duration: '2 hours',
    course_mode: 'Online',
    course_status: 'disabled',
    starting_time: '01:12',
    ending_time: '01:11',
    meeting_location: '',
    meeting_link: 'link',
    created_at: '2023-02-09T07:46:29.756Z',
    updated_at: '2023-02-09T19:41:14.823Z',
    course_id: 1,
    language_id: 1,
    course_name: 'React English',
    course_description: '.net',
    requirements: 'undefined'
  },
  {
    id: 2,
    mentor_id: 2,
    mentor_name: 'Mentor',
    category_id: 2,
    category_name: 'FrontEnd English',
    sub_category_id: 2,
    sub_category_name: 'React',
    course_level_id: 3,
    course_level_name: 'Biggner',
    image_url:
      'https://smartlearn-video.s3.amazonaws.com/MicrosoftTeams-image%20%284%29.png',
    chapter: 0,
    section: 0,
    course_type: 'Live',
    cost_type: 'paid',
    amount: 0,
    discount: 0,
    starting_date: '2023-01-25',
    ending_date: '2023-02-25',
    duration: '2 hours',
    course_mode: 'Online',
    course_status: 'disabled',
    starting_time: '01:12',
    ending_time: '01:11',
    meeting_location: '',
    meeting_link: 'link',
    created_at: '2023-02-09T07:46:29.756Z',
    updated_at: '2023-02-09T19:41:14.823Z',
    course_id: 1,
    language_id: 1,
    course_name: 'React English',
    course_description: '.net',
    requirements: 'undefined'
  },
  {
    id: 3,
    mentor_id: 2,
    mentor_name: 'Mentor',
    category_id: 2,
    category_name: 'FrontEnd English',
    sub_category_id: 2,
    sub_category_name: 'React',
    course_level_id: 3,
    course_level_name: 'Intermediate',
    image_url:
      'https://smartlearn-video.s3.amazonaws.com/MicrosoftTeams-image%20%284%29.png',
    chapter: 0,
    section: 0,
    course_type: 'webinar',
    cost_type: 'paid',
    amount: 0,
    discount: 0,
    starting_date: '2023-01-25',
    ending_date: '2023-02-25',
    duration: '2 hours',
    course_mode: 'Online',
    course_status: 'disabled',
    starting_time: '01:12',
    ending_time: '01:11',
    meeting_location: 'Bangalore',
    meeting_link: '',
    created_at: '2023-02-09T07:46:29.756Z',
    updated_at: '2023-02-09T19:41:14.823Z',
    course_id: 1,
    language_id: 1,
    course_name: 'React English',
    course_description: '.net',
    requirements: 'undefined'
  },
  {
    id: 4,
    mentor_id: 2,
    mentor_name: 'Mentor',
    category_id: 2,
    category_name: 'FrontEnd English',
    sub_category_id: 2,
    sub_category_name: 'React',
    course_level_id: 3,
    course_level_name: 'Advanced',
    image_url:
      'https://smartlearn-video.s3.amazonaws.com/MicrosoftTeams-image%20%284%29.png',
    chapter: 0,
    section: 0,
    course_type: 'webinar',
    cost_type: 'paid',
    amount: 0,
    discount: 0,
    starting_date: '2023-01-25',
    ending_date: '2023-02-25',
    duration: '2 hours',
    course_mode: 'Online',
    course_status: 'disabled',
    starting_time: '01:12',
    ending_time: '01:11',
    meeting_location: '',
    meeting_link: 'link',
    created_at: '2023-02-09T07:46:29.756Z',
    updated_at: '2023-02-09T19:41:14.823Z',
    course_id: 1,
    language_id: 1,
    course_name: 'React English',
    course_description: '.net',
    requirements: 'undefined'
  }
];

const useStyle = makeStyles((theme) => ({
  eachItem: {
    '&.MuiGrid-grid-xs-4': {
      maxWidth: '33.3%',
      flexBasis: '33.3%'
    }
  }
}));

const headerChipItem = [
  {
    name: 'Difficulty level ',
    checkboxText: 'All',
    id: 1
  },
  {
    name: 'Language',
    checkboxText: 'English',
    id: 2
  }
];

type CourseProps = {
  courseDetails?: any[];
};
const LearnAtUrPace = ({ courseDetails }: CourseProps) => {
  const theme = useTheme();
  const classes = useStyle();
  const [searchValue, setSearchValue] = useState('');

  const getSearchValue = (searchValue) => {
    console.log(searchValue);
    setSearchValue(searchValue);
  };

  const openMenuItem = (id) => {
    console.log(id, 'test');
  };

  const onClickCardImage = (rowData) => {
    console.log('rowData', rowData);
  };

  const getFilterCourse = useMemo(() => {
    let recordedCourse = courseDetails.filter((item) => {
      return item.course_type === COURSE_TYPE_NAME[6];
    });
    return recordedCourse;
  }, [courseDetails]);

  return (
    <Grid container justifyContent={'center'} direction="column" rowSpacing={3}>
      <Grid style={{ margin: theme.spacing(4, 0) }}>
        {/* <Heading
          headingText={'Learn at your pace with recorded courses'}
          headerFontSize={'40px'}
          headerFontWeight={500}
          headingColor={'#3C414B'}
          style={{
            [theme.breakpoints.down('xs')]: {
              fontSize: 15
            }
          }}
        /> */}
        <Typography
          sx={{
            fontSize: '40px',
            fontWenghit: theme.fontWeight.medium,
            color: theme.Colors.blackBerry,
            lineHeight: '48px',
            fontFamily: 'IBM Plex Serif',
            [theme.breakpoints.down('xs')]: {
              fontSize: 25
            }
          }}
        >
          Learn at your pace
        </Typography>
        <Typography
          sx={{
            fontSize: '40px',
            fontWenghit: theme.fontWeight.medium,
            color: theme.Colors.blackBerry,
            lineHeight: '48px',
            padding: '0px 0px 20px 0px',
            fontFamily: 'IBM Plex Serif',
            [theme.breakpoints.down('xs')]: {
              fontSize: 25
            }
          }}
        >
          with recorded courses
        </Typography>
        <Grid
          container
          sx={{
            [theme.breakpoints.down('xs')]: {
              flexDirection: 'column'
            }
          }}
        >
          <Grid
            container
            item
            xs
            style={{ paddingBottom: '20px', gap: '10px' }}
          >
            {headerChipItem.map((item, index) => (
              <ChipIconcomp
                key={index}
                chipText={item.name}
                checkboxText={item.checkboxText}
                onClick={() => openMenuItem(item.id)}
              />
            ))}
          </Grid>
          <Grid item paddingBottom={2}>
            <InputBase
              onChange={(e) => getSearchValue(e.target.value)}
              value={searchValue}
              placeholder={'Search'}
              sx={{
                width: 65,
                transition: '0.5s',
                ':hover': {
                  width: 300,
                  border: '1px solid #3C78F0',
                  borderRadius: 50,
                  fontSize: 20,
                  fontWeight: 400,
                  padding: theme.spacing(0.3, 0.5)
                }
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <img src={SearchIconImg} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
        <Grid>
          <img src={LineBarIcon} alt="" />
        </Grid>
      </Grid>
      <Grid
        container
        //justifyContent={'center'}
        spacing={4}
        sx={{
          paddingBottom: '30px',
          [theme.breakpoints.down('xs')]: {
            justifyContent: 'center'
          }
        }}
      >
        {getFilterCourse.length
          ? getFilterCourse.slice(0, 6).map((item, index) => {
              return (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  className={classes.eachItem}
                >
                  <MuiCardComp
                    key={index}
                    imgUrl={item.image_url ? item.image_url : BasicStockIcon}
                    rightText={item.course_type}
                    leftText={item.cost_type}
                    heading={item.category_name}
                    title={item.course_name}
                    subText={item.course_description}
                    courseLevel={item.course_level_name}
                    courseLanguage={
                      item.language_id === 1
                        ? 'English'
                        : item.language_id === 2
                        ? 'Hindi'
                        : 'Gjarati'
                    }
                    date={`${item.starting_date} - ${item.ending_date}`}
                    zoomLink={item.meeting_link}
                    locationName={item.meeting_location}
                    subCategory={item.sub_category_name}
                    courseType={item.course_type}
                    onClickCardImage={() => onClickCardImage(item)}
                    courseLevelId={item.course_level_id}
                  />
                </Grid>
              );
            })
          : null}
      </Grid>
      <Grid item>
        <ButtonComp
          style={{ border: '1.5px solid #3C78F0' }}
          variant="outlined"
          buttonFontFamily="Switzer"
          buttonFontSize={theme.MetricsSizes.regular}
          backgroundColor={theme.Colors.white}
          buttonTextColor={'#3C78F0'}
          btnBorderRadius={'4px'}
          buttonText={'View All'}
          btnWidth="100%"
          iconImage={<img src={ArrowNext} style={{ marginLeft: '10px' }} />}
          onClickButton={() => {}}
        />
      </Grid>
    </Grid>
  );
};

export default LearnAtUrPace;
