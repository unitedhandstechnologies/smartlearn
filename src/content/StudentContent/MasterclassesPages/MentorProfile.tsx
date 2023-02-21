import { Grid, Typography, Rating, IconButton } from '@mui/material';
import {
  BlueLine,
  InstaImg,
  LinkIdImg,
  ProfileImage,
  TwitterImg
} from 'src/Assets';
import { ChipComp } from 'src/components/MultiSelectChip/ChipComp';

const chipItems = ['Stocks investing', 'Options trading', 'Strategies'];
const socialIcons = [InstaImg, LinkIdImg, TwitterImg];

type Props = {
  mentorDetails?: {};
}

const MentorProfile = ({mentorDetails}:Props) => {
  return (
    <>
      <Grid
        padding={2}
        style={{
          border: '1px solid #3C78F0',
          borderRadius: 4
        }}
      >
        <Grid>
          <img src={ProfileImage} style={{ width: '100px', height: '100px' }} />
        </Grid>
        <Typography
          style={{
            fontSize: '32px',
            fontFamily: 'IBM Plex Serif',
            fontWeight: 500,
            color: '#3C414B'
          }}
        >
          Johnny Nash
        </Typography>
        <Typography
          style={{
            fontSize: '18px',
            fontFamily: 'Switzer',
            fontWeight: 400,
            color: '#3C414B'
          }}
        >
          CEO, XYZ company
        </Typography>
        <Rating sx={{ color: '#3C78F0' }} />
        <Grid paddingTop={2}>
          <img src={BlueLine} />
        </Grid>
        <Typography
          style={{
            fontSize: '18px',
            fontFamily: 'Switzer',
            fontWeight: 400,
            color: '#78828C',
            paddingTop: 3
          }}
        >
          Jenny’s bio goes like this. Amet minim mollit non deserunt ullamco est
          sit aliqua dolor do amet sint. Velit officia consequat duis enim velit
          mollit. Exercitation veniam consequat sunt nostrud amet.
        </Typography>
        <Typography
          style={{
            fontSize: '18px',
            fontFamily: 'Switzer',
            fontWeight: 700,
            color: '#3C414B',
            paddingTop: 10
          }}
        >
          Talks about:
        </Typography>
        <Grid container gap={1} paddingTop={1}>
          {chipItems.map((item, index) => (
            <Grid key={index}>
              <ChipComp label={item} style={{ borderColor: '#3CC878' }} />
            </Grid>
          ))}
        </Grid>
        <Typography
          style={{
            fontSize: '18px',
            fontFamily: 'Switzer',
            fontWeight: 700,
            color: '#3C414B',
            paddingTop: 10
          }}
        >
          Social links:
        </Typography>
        <Grid container>
          {socialIcons.map((itm, index) => (
            <Grid key={index} marginLeft={-1.5}>
              <IconButton>
                <img src={itm} />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default MentorProfile;
