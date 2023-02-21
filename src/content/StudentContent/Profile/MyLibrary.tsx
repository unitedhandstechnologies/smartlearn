import { useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Heading, MuiCardComp, MultiSelectChip } from 'src/components';
import CompletedCourse from './CompletedCourse';
import ContinueLearning from './ContinueLearning';
import WishListCourse from './WishListCourse';
import { BasicStockIcon } from 'src/Assets';

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
    cost_type: '36% completed',
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
    cost_type: '36% completed',
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

const FILTER_CHIPS = ['Active', 'Completed', 'Whishlist'];
const MyLibrary = () => {
  const theme = useTheme();
  const [chipValue, setChipValue] = useState([FILTER_CHIPS[0]]);
  const handleChangeChipValue = (selectedChipItem: string[]) => {
    setChipValue(selectedChipItem);
  };

  return (
    <Grid container direction="column" rowSpacing={3}>
      <Grid item style={{ padding: '50px 0px 30px 0px' }}>
        <Grid item
          style={{
            padding: '0px 0px 20px 0px',
            [theme.breakpoints.down('xs')]: {
              padding: '20px 0px'
            }
          }}
        >
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
        <Grid item>
          <Heading
            headingText={'Upcoming'}
            headerFontSize={'24px'}
            headerFontWeight={theme.fontWeight.medium}
            headingColor={theme.Colors.blackBerry}
          />
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          paddingBottom: '30px',
          gap: 7
        }}
      >
        {courses.length ? courses.map((item, index) => {
          return (
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
              //progressValue={Number(item.course_type.slice(0,2))}
              progressValue={36}
              cardStyle={{ maxWidth: 330 }}
            />
          );
        }): null}
      </Grid>
      <ContinueLearning />
      <CompletedCourse />
      <WishListCourse />
    </Grid>
  );
};

export default MyLibrary;
