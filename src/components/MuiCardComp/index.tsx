import React, { useContext, useState } from 'react';
import { Grid, InputAdornment, useTheme } from '@material-ui/core';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Typography
} from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import {
  BarChartFillIcon,
  BarIcon,
  BeginnerIcon,
  CommendIcon,
  DateSvg,
  IntermediateIcon,
  LocationIcon,
  RupeeSign,
  WhiteDot,
  ZoomIcon
} from 'src/Assets';
import { COURSE_TYPE_NAME, HTTP_STATUSES } from 'src/Config/constant';
import ButtonComp from '../ButtonComp';
import Heading from '../Heading';
import IconTextComp from '../IconTextComp';
import ListItemCell from '../ListItemCell';
import { ChipComp } from '../MultiSelectChip/ChipComp';
import ProgressBar from '../ProgressBar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LinesEllipsis from 'react-lines-ellipsis';
import { StudentInfoContext } from 'src/contexts/StudentContext';
import { useNavigate } from 'react-router';
import { API_SERVICES } from 'src/Services';

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
  prize?: any;
  startLearning?: boolean;
  nextClass?: string;
  course_id?: number;
  discount?: number;
  item?: any;
  isActive?: any;
  handleOnClick?: (val: any) => void;
};
const MuiCardComp = ({
  course_id,
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
  prize,
  discount,
  onClickCardImage,
  startLearning = true,
  nextClass,
  item,
  isActive,
  handleOnClick
}: Props) => {
  const theme = useTheme();
  const navigateTo = useNavigate();
  const { studentDetails } = useContext(StudentInfoContext);

  return (
    <Card
      sx={{
        color: '#FFF',
        padding: '16px',
        width: '100%',
        height: '100%',
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
                height: 188,
                opacity: 0.5,
                ...imageStyle
              }}
            />
            <ImageListItemBar
              title={<TopBox rightText={rightText} leftText={leftText} />}
              position="top"
              sx={{ backgroundColor: 'transparent' }}
            />
            <Grid
              style={{
                backgroundColor: 'transparent',
                position: 'absolute',
                overflow: 'visible',
                bottom: title.length > 23 ? 30 : 50,
                paddingLeft: 20,
                paddingRight: 5,
                [theme.breakpoints.down('xs')]: {
                  bottom: 50
                },
                ...titleStyle
              }}
            >
              <Typography
                style={{
                  fontSize: '32px',
                  fontFamily: 'Switzer',
                  fontWeight: 700
                }}
              >
                {title}
              </Typography>
            </Grid>
          </ImageListItem>
        ) : null}
      </CardActionArea>
      {progressValue ? (
        <ProgressBar style={{ width: '100%' }} value={progressValue} />
      ) : null}
      <CardContent
        sx={{
          padding: '15px 16px 5px 0px'
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
              padding: '0px 0px 10px 0px'
            }}
          >
            <LinesEllipsis text={subText} maxLine={2} ellipsis="....." />
          </Typography>
        ) : null}
        {date ? (
          <Grid style={{ padding: '5px 0px' }}>
            <IconTextComp icon={DateSvg} value={date} />
          </Grid>
        ) : null}
        {nextClass ? (
          <Grid style={{ padding: '5px 0px' }}>
            <IconTextComp icon={DateSvg} nextvalue={nextClass} />
          </Grid>
        ) : null}
        {zoomLink ? (
          <Grid style={{ padding: '5px 0px' }}>
            <IconTextComp icon={ZoomIcon} value={zoomLink ? 'Zoom' : null} />
          </Grid>
        ) : null}
        {courseType === COURSE_TYPE_NAME[6] ? (
          <Grid style={{ padding: '5px 0px' }}>
            <IconTextComp icon={ZoomIcon} value={'Online'} />
          </Grid>
        ) : null}
        {locationName ? (
          <Grid style={{ padding: '5px 0px' }}>
            <IconTextComp icon={LocationIcon} value={locationName} />
          </Grid>
        ) : null}
        {courseLevel ? (
          <Grid style={{ padding: '5px 0px' }}>
            <IconTextComp
              icon={
                courseLevel === 'Advanced'
                  ? BarChartFillIcon
                  : courseLevel === 'Intermediate'
                  ? IntermediateIcon
                  : BeginnerIcon
              }
              value={courseLevel}
            />
          </Grid>
        ) : null}
        {courseLanguage ? (
          <Grid style={{ padding: '5px 0px' }}>
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
                style={{
                  borderColor: '#3CC878',
                  fontSize: theme.MetricsSizes.small_xxx,
                  fontWeight: theme.fontWeight.regular
                }}
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
      {startLearning ? (
        <Grid
          container
          style={{
            padding: '10px 0px 0',
            display: 'flex',
            alignItems: 'center',
            gap: 5
          }}
        >
          <Grid item style={{ marginRight: 10 }}>
            {leftText === 'PAID' ? (
              <ListItemCell
                title={
                  <Grid container style={{ gap: 5 }}>
                    <Grid>₹{(prize - (discount / 100) * prize).toFixed()}</Grid>
                    <Grid
                      style={{
                        textDecoration: 'line-through',
                        color: '#78828C'
                      }}
                    >
                      ₹{prize}
                    </Grid>{' '}
                    <Grid style={{ color: '#3CC878' }}>{discount}% off</Grid>
                  </Grid>
                }
                subTitle={'including GST'}
                titleStyle={{
                  fontSize: theme.MetricsSizes.small_xx,
                  fontWeight: theme.fontWeight.bold
                }}
              />
            ) : (
              <h1 style={{ color: '#3cc878', textAlign: 'center' }}>Free</h1>
            )}
          </Grid>
          <Grid item xs>
            <ButtonComp
              height={40}
              buttonText={'Start learning'}
              btnWidth={'100%'}
              backgroundColor={theme.Colors.secondary}
              buttonFontWeight={theme.fontWeight.regular}
              buttonFontSize={14}
              btnBorderRadius={'4px'}
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                padding: theme.spacing(0, 0)
              }}
              onClickButton={() => {
                if (studentDetails.id !== 0) {
                  navigateTo('/home/course-details', {
                    state: { formData: item },
                    replace: true
                  });
                } else {
                  navigateTo('/home/user-login', {
                    state: {
                      formData: item,
                      route: '/home/course-details'
                    },
                    replace: true
                  });
                }
              }}
            />
          </Grid>
          <Grid
            item
            style={{
              borderRadius: '6px',
              background: '#F2F4F7'
            }}
          >
            <IconButton
              style={{
                // color: '#3C78F0',
                color: isActive ? '#3C78F0' : theme.Colors.darkGrayishBlue,
                background: 'transparent',
                [theme.breakpoints.down('md')]: {
                  display: 'none'
                }
              }}
              onClick={handleOnClick}
              disableRipple
            >
              {isActive ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Grid>
          )
        </Grid>
      ) : null}
      {renderCardActions ? renderCardActions() : null}
    </Card>
  );
};

export default MuiCardComp;
