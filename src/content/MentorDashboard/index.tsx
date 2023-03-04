import { Grid } from '@material-ui/core';
import { Chat, Persons, Rupee, RupeeSign } from 'src/Assets';
import { ContentDisplayTiles } from 'src/components/ContentDisplayTiles';
import Details from './Details';

const courseDetails = [
  {
    icon: Rupee,
    heading: 'Total Revenue',
    count: `50,000`,
    reports:[
      {
        heading: 'This month',
        subText: '16,250.00'
      },
      {
        heading: 'Pending Balance',
        subText: '16,250.00'
      },
    ]
  },
  {
    icon: Chat,
    heading: 'No. of Courses',
    count: '24',
    reports:[
      {
        heading: 'This month',
        subText: '16,250.00'
      },
      {
        heading: 'Pending Balance',
        subText: '16,250.00'
      },
    ]
  },
  {
    icon: Persons,
    heading: 'No. of Enrollment',
    count: '400',
    reports:[
      {
        heading: 'This month',
        subText: '16,250.00'
      },
      {
        heading: 'Pending Balance',
        subText: '16,250.00'
      },
    ]
  }
];

// const reports = [
//   {
//     heading: 'This Month',
//     subText: '',
//     iconImage: ''
//   },
//   {
//     heading: 'Pending Balance',
//     subText: '',
//     iconImage: ''
//   }
// ];



const MentorDashboard = () => {
  return (
    <Grid>
    <Grid container spacing={4}>
      {courseDetails.map((item, index) => {
        return (
          <Grid item key={index} xs={6}>
            <Details
              icon={item.icon}
              heading={item.heading}
              count={item.count}
              reports={item.reports}
            />
          </Grid>
        );
      })}
    </Grid>

    </Grid>
  );
};

export default MentorDashboard;
