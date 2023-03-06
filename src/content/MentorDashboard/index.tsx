import { Grid } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { Chat, Persons, Rupee } from 'src/Assets';
import Details from './Details';

const courseDetails = [
  {
    icon: Rupee,
    heading: 'Total Revenue ',
    count: `50,000.00`,
    reports: [
      {
        heading: 'This month',
        subText: '16,250.00'
      },
      {
        heading: 'Pending Balance',
        subText: '16,250.00'
      }
    ]
  },
  {
    icon: Chat,
    heading: 'No. of Courses',
    count: '24',
    reports: [
      {
        heading: 'Recorded',
        subText: '15'
      },
      {
        heading: 'Live',
        subText: '15'
      },
      {
        heading: 'Webinars',
        subText: '15'
      }
    ]
  },
  {
    icon: Persons,
    heading: 'No. of Enrollment',
    count: '400',
    reports: [
      {
        heading: 'This month',
        subText: '25'
      },
      {
        heading: 'Currently Active',
        subText: '5'
      }
    ]
  },
  {
    icon: '',
    heading: '',
    questions: 'Have any questions?',
    mobile: '+91 98765 43210',
    email: 'support@smartlearn.com',
    count:
      'We’re regularly working on adding new features. For suggestions, queries, and feedback, get in touch with us',
    reports: [
      {
        heading: '',

        subText: ''
      }
    ]
  }
];

const MentorDashboard = () => {
  const navigateTo = useNavigate();
  const handleClickDetails = (index: any) => {
    if (index === 0) {
      navigateTo('/admin/reports', { replace: true });
    } else if (index === 1) {
      navigateTo('/admin/course-management', { replace: true });
    } else if (index === 2) {
      navigateTo('/admin/reports', { replace: true });
    }
  };
  return (
    <Grid>
      <Grid container spacing={4}>
        {courseDetails?.map((item, index) => {
          return (
            <Grid item key={index} xs={6}>
              <Details
                icon={item.icon}
                heading={item.heading}
                questions={item.questions}
                count={item.count}
                reports={item.reports}
                mobile={item.mobile}
                email={item.email}
                handleClickIcon={() => handleClickDetails(index)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default MentorDashboard;
