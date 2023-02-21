import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import {
  Grid,
  Typography,
  InputBase,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  ArrowNext,
  BasicStockIcon,
  LineBarIcon,
  SearchIconImg
} from 'src/Assets';
import MuiCardComp from 'src/components/MuiCardComp';
import { ButtonComp, Heading, MultiSelectChip } from 'src/components';
import { COURSE_TYPE_NAME } from 'src/Config/constant';
import { useNavigate } from 'react-router';
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

const useStyles = makeStyles((theme) => ({
  eachItem: {
    '&.MuiGrid-grid-xs-4': {
      maxWidth: '33.3%',
      flexBasis: '33.3%'
    }
  }
}));

const FILTER_CHIPS = ['All', 'Stock market', 'Options trading', 'Mutual funds'];

type WorkshopProps = {
  workshopDetails?: any[];
};
const UpComingWorkshop = ({ workshopDetails = [] }: WorkshopProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const [chipValue, setChipValue] = useState([FILTER_CHIPS[0]]);
  const [searchValue, setSearchValue] = useState('');

  const getSearchValue = (searchValue) => {
    console.log(searchValue);
    setSearchValue(searchValue);
  };
  const navigateTo = useNavigate();
  const handleChangeChipValue = (selectedChipItem: string[]) => {
    setChipValue(selectedChipItem);
  };

  const getCourses: any[] = useMemo(() => {
    const courses = [...workshopDetails];
    if (chipValue[0] === FILTER_CHIPS[0]) {
      return courses;
    } else if (chipValue[0] === FILTER_CHIPS[1]) {
      const newItem = workshopDetails.filter(
        (item) => item.category_name === FILTER_CHIPS[1]
      );
      return newItem;
    } else if (chipValue[0] === FILTER_CHIPS[2]) {
      const newItem = workshopDetails.filter(
        (item) => item.category_name === FILTER_CHIPS[2]
      );
      return newItem;
    } else if (chipValue[0] === FILTER_CHIPS[3]) {
      const newItem = workshopDetails.filter(
        (item) => item.category_name === FILTER_CHIPS[3]
      );
      return newItem;
    }
  }, [chipValue, workshopDetails]);

  const onClickCardImage = (rowData) => {
    if (rowData.course_type === COURSE_TYPE_NAME[4]) {
      navigateTo('/home/workshopDetails', { replace: true });
    }
  };

  return (
    <Grid container direction="column" rowSpacing={3}>
      <Grid item style={{ padding: '50px 0px 30px 0px' }}>
        <Heading
          headingText={'Upcoming Workshops'}
          headerFontSize={'40px'}
          headerFontWeight={500}
          headingColor={'#3C414B'}
          style={{
            [theme.breakpoints.down('xs')]: {
              fontSize: 15
            }
          }}
        />
        <Grid container direction="row">
          <Grid style={{ paddingBottom: '20px' }}>
            <MultiSelectChip
              chipItems={FILTER_CHIPS}
              selectedChipItem={chipValue}
              handleChange={handleChangeChipValue}
              chipStyle={{
                padding: theme.spacing(2, 0.8),
                height: theme.MetricsSizes.large,
                fontSize: theme.MetricsSizes.regular
              }}
            />
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
        {getCourses.length
          ? getCourses.slice(0, 6).map((item, index) => {
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
                  />
                </Grid>
              );
            })
          : null}
      </Grid>
    </Grid>
  );
};

export default UpComingWorkshop;
