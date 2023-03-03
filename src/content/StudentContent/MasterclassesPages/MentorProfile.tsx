import { Avatar } from '@material-ui/core';
import { Grid, Typography, Rating, IconButton } from '@mui/material';
import { BlueLine, InstaImg, LinkIdImg, TwitterImg } from 'src/Assets';
import { ChipComp } from 'src/components/MultiSelectChip/ChipComp';

// const chipItems = ['Stocks investing', 'Options trading', 'Strategies'];
const socialIcons = [InstaImg, LinkIdImg, TwitterImg];

type Props = {
  mentorDetails?: any;
  category: any[];
};

const MentorProfile = ({ mentorDetails, category }: Props) => {
  const socialUrls = [];
  socialUrls.push(mentorDetails.social_information_url);
  socialUrls.push(mentorDetails.social_information_url_2);
  socialUrls.push(mentorDetails.social_information_url_3);

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
          <Avatar
            src={mentorDetails.image_url}
            style={{ width: '100px', height: '100px' }}
          />
        </Grid>
        <Typography
          style={{
            fontSize: '32px',
            fontFamily: 'IBM Plex Serif',
            fontWeight: 500,
            color: '#3C414B',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {mentorDetails.first_name + ' ' + mentorDetails.last_name}
        </Typography>
        <Typography
          style={{
            fontSize: '18px',
            fontFamily: 'Switzer',
            fontWeight: 400,
            color: '#3C414B',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {mentorDetails.about}
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
          {mentorDetails.qualification}
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
          {category?.map((item, index) => (
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
          {socialIcons?.map((itm, index) => {
            return socialUrls[index] !== '' || undefined ? (
              <Grid key={index} marginLeft={-1.5}>
                <IconButton onClick={() => window.open(socialUrls[index])}>
                  <img src={itm} />
                </IconButton>
              </Grid>
            ) : null;
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default MentorProfile;
