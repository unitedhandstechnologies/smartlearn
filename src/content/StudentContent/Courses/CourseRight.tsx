import { memo } from 'react';
import { Grid, Typography, Divider, Rating } from '@mui/material';
import {
  BarIcon,
  BasicStockIcon,
  CommendIcon,
  DateSvg,
  LineBarIcon,
  RatingImg,
  WadeWarren,
  ZoomIcon
} from 'src/Assets';
import MuiCardComp from 'src/components/MuiCardComp';
import { Avatar, useTheme } from '@material-ui/core';
import { Heading, ButtonComp } from 'src/components';
import StarIcon from '@mui/icons-material/Star';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ApplyNow from './ApplyNow';

const data = [
  {
    imgUrl: BasicStockIcon,
    title: 'Professional Trading Course',
    subText:
      'Some description goes here like this. Second line of description goes here like...',
    leftText: 'Free',
    rightText: 'Live'
  },
  {
    imgUrl: BasicStockIcon,
    title: 'Basics of Stock Investing',
    subText:
      'Some description goes here like this. Second line of description goes here like...'
    // leftText: 'Free',
    // rightText: '12 Oct – 23 Oct, 2023'
  },
  {
    imgUrl: BasicStockIcon,
    title: 'title',
    subText:
      'Some description goes here like this. Second line of description goes here like...',
    // leftText: 'Free',
    rightText: '12 Oct – 23 Oct, 2023'
  },
  {
    imgUrl: BasicStockIcon,
    title: 'title',
    subText:
      'Some description goes here like this. Second line of description goes here like...',
    leftText: 'Free'
    // rightText: '12 Oct – 23 Oct, 2023'
  },
  {
    imgUrl: BasicStockIcon,
    title: 'title',
    subText:
      'Some description goes here like this. Second line of description goes here like...',
    // leftText: 'Free',
    rightText: '12 Oct – 23 Oct, 2023'
  },
  {
    imgUrl: BasicStockIcon,
    title: 'title',
    subText:
      'Some description goes here like this. Second line of description goes here like...',
    leftText: 'Free'
    // rightText: '12 Oct – 23 Oct, 2023'
  }
];

const iconText = [
  {
    icon: DateSvg,
    value: '25 Oct 2023'
  },
  {
    icon: ZoomIcon,
    value: 'Zoom'
  },
  {
    icon: BarIcon,
    value: 'Intermediate'
  },
  {
    icon: CommendIcon,
    value: 'Gujarati'
  }
];

const chipItem = [
  {
    id: 1,
    name: 'Stock Investment'
  }
];

const reviews = [
  {
    name: 'Tracy Wang',
    review:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    img: RatingImg
  },
  {
    name: 'Tracy Wang',
    img: RatingImg,
    review:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
  },
  {
    name: 'Tracy Wang',
    img: RatingImg,
    review:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
  }
];
const rating = 4.5;
const headingProps = {
  headingColor: '#3C414B',
  headerFontWeight: 500,
  headerFontSize: 32,
  headerFontFamily: 'IBM Plex Serif'
};
const typographyStylProps = {
  fontFamily: 'Switzer',
  fontSize: 18,
  fontWeight: 400,
  color: '#78828C'
};

type CourseRatingProps = {
  courseRating?: any;
  averageRating?: number;
};
const CourseRight = ({ courseRating, averageRating }: CourseRatingProps) => {
  console.log('courseRating', courseRating);

  const theme = useTheme();
  return (
    <Grid container>
      <Grid
        sx={{
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
          }
        }}
      >
        {/* <ApplyNow /> */}
      </Grid>
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
        {courseRating.map((item, index) => {
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
                    fontFamily: 'IBM Plex Serif',
                    color: '#3C414B',
                    fontSize: 18,
                    fontWeight: 600
                  }}
                >
                  {item.user_name}
                </Typography>
                <Rating
                  defaultValue={item.course_rating}
                  sx={{ color: '#F2C94C' }}
                />
              </Grid>

              <Typography style={typographyStylProps}>
                {item.command}
                <Divider
                  style={{ height: 2, paddingTop: 20, color: '#B4BEC8' }}
                />
              </Typography>
            </Grid>
          );
        })}
      </Grid>
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
        />
      </Grid>
    </Grid>
  );
};
export default memo(CourseRight);
