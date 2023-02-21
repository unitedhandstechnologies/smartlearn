import { Grid, useTheme } from '@material-ui/core';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import React from 'react';
import {
  BarChartFillIcon,
  BarIcon,
  BeginnerIcon,
  CommendIcon,
  DateSvg,
  LocationIcon,
  WhiteDot,
  ZoomIcon
} from 'src/Assets';
import { COURSE_TYPE_NAME } from 'src/Config/constant';
import ButtonComp from '../ButtonComp';
import Heading from '../Heading';
import IconTextComp from '../IconTextComp';
import { ChipComp } from '../MultiSelectChip/ChipComp';
import ProgressBar from '../ProgressBar';

const TopBox = ({ leftText, rightText }) => {
  return (
    <Grid container justifyContent={leftText ? 'space-between' : 'flex-end'}>
      {leftText ? (
        <Grid item>
          <ButtonComp
            buttonText={leftText}
            buttonFontSize={14}
            backgroundColor="#3CC878"
            buttonTextColor="#FFF"
            btnBorderRadius={4}
            height={29}
          />
        </Grid>
      ) : null}
      {rightText === 'Live' ? (
        <Grid item>
          <ButtonComp
            buttonText={rightText}
            startIcon={<img src={WhiteDot} alt="Not found" />}
            buttonFontSize={14}
            backgroundColor="#FF783C"
            buttonTextColor="#FFF"
            btnBorderRadius={4}
            height={29}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

type Props = {
  imgUrl?: any;
  title?: string;
  heading?: string;
  subText?: string;
  rightText?: string;
  leftText?: string;
  renderCardActions?: () => void;
  imageStyle?: any;
  cardStyle?: any;
  titleStyle?: any;
  date?: any;
  zoomLink?: any;
  courseLevel?: string;
  courseLanguage?: string;
  locationName?: string;
  courseType?: string;
  subCategory?: string;
  progressValue?: number;
  onClickCardImage?: (val: any) => void;
};
const MuiCardComp = ({
  imgUrl,
  heading,
  title,
  subText,
  rightText,
  leftText,
  renderCardActions,
  imageStyle,
  cardStyle,
  titleStyle,
  courseLanguage,
  courseLevel,
  zoomLink,
  locationName,
  date,
  subCategory,
  courseType,
  progressValue,
  onClickCardImage
}: Props) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        color: '#FFF',
        padding: '16px',
        width: '100%',
        ...cardStyle
      }}
    >
      <CardActionArea onClick={onClickCardImage} sx={{ background: 'black' }}>
        {imgUrl ? (
          <ImageListItem>
            <img
              src={imgUrl}
              alt=""
              style={{
                height: 228,
                ...imageStyle
              }}
            />
            <ImageListItemBar
              title={<TopBox rightText={rightText} leftText={leftText} />}
              position="top"
              sx={{ backgroundColor: 'transparent' }}
            />
            <ImageListItemBar
              title={
                <Heading
                  headingText={title}
                  headerFontSize={'32px'}
                  headerFontWeight={700}
                  headingColor={theme.Colors.white}
                  style={{
                    [theme.breakpoints.down('xs')]: {
                      headerFontSize: 20
                    }
                  }}
                />
              }
              position="bottom"
              sx={{
                backgroundColor: 'transparent',
                position: 'absolute',
                bottom: 80,
                [theme.breakpoints.down('xs')]: {
                  bottom: 50
                },
                ...titleStyle
              }}
            />
          </ImageListItem>
        ) : null}
      </CardActionArea>
      {progressValue ? <ProgressBar value={progressValue} /> : null}
      <CardContent
        sx={{
          padding: '30px 16px 30px 0px'
        }}
      >
        {heading ? (
          <Typography
            variant="h5"
            component="div"
            sx={{ color: '#3C414B', fontSize: '20px', fontWeight: 700 }}
          >
            {heading}
          </Typography>
        ) : null}
        {subText ? (
          <Typography
            variant="body2"
            sx={{
              color: '#78828C',
              fontSize: '16px',
              fontWeight: 400,
              padding: '8px 0px 16px 0px'
            }}
          >
            {subText}
          </Typography>
        ) : null}
        {date ? (
          <Grid style={{ padding: '10px 0px' }}>
            <IconTextComp icon={DateSvg} value={date} />
          </Grid>
        ) : null}
        {zoomLink ? (
          <Grid style={{ padding: '10px 0px' }}>
            <IconTextComp icon={ZoomIcon} value={zoomLink} />
          </Grid>
        ) : null}
        {courseType === COURSE_TYPE_NAME[6] ? (
          <Grid style={{ padding: '10px 0px' }}>
            <IconTextComp icon={ZoomIcon} value={'Onlile'} />
          </Grid>
        ) : null}
        {locationName ? (
          <Grid style={{ padding: '10px 0px' }}>
            <IconTextComp icon={LocationIcon} value={locationName} />
          </Grid>
        ) : null}
        {courseLevel ? (
          <Grid style={{ padding: '10px 0px' }}>
            <IconTextComp
              icon={
                courseLevel === 'Advanced'
                  ? BarChartFillIcon
                  : courseLevel === 'Intermediate'
                  ? BarIcon
                  : BeginnerIcon
              }
              value={courseLevel}
            />
          </Grid>
        ) : null}
        {courseLanguage ? (
          <Grid style={{ padding: '10px 0px' }}>
            <IconTextComp icon={CommendIcon} value={courseLanguage} />
          </Grid>
        ) : null}
      </CardContent>
      <CardActions sx={{ padding: '8px 0px' }}>
        <Grid item container spacing={1}>
          {subCategory ? (
            <Grid item>
              <ChipComp
                label={subCategory}
                style={{ borderColor: '#3CC878' }}
              />
            </Grid>
          ) : null}
          {courseType ? (
            <Grid item xs>
              <ChipComp
                label={courseType}
                style={{
                  borderColor: '#3CC878',
                  fontSize: theme.MetricsSizes.small_xxx,
                  fontWeight: theme.fontWeight.regular
                }}
              />
            </Grid>
          ) : null}
        </Grid>
      </CardActions>
      {renderCardActions ? renderCardActions() : null}
    </Card>
  );
};

export default MuiCardComp;
