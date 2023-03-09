import { Grid } from '@mui/material';
import { ButtonComp } from 'src/components';
import { useTheme, makeStyles, Container } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ApplyNow from '../ApplyNow';
import { useNavigate } from 'react-router';
import CourseBanner from '../CourseBanner';
import { getUserId } from 'src/Utils';
import { API_SERVICES } from 'src/Services';
import {
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID
} from 'src/Config/constant';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
// import useStudentInfo from 'src/hooks/useStudentInfo';

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: 0,
    padding: theme.spacing(0, 1, 0, 0)
  },
  AvatarStyle: {
    width: '32px',
    height: '32px',
    margin: theme.spacing(0, 1, 0, 1)
  }
}));

type PreRecordedCourseProps = {
  data?: any;
  mentorDetails?: any;
  totalDuration?: number;
  course?: any;
  backBtnTxt?: string;
  backBtnRoute?: string;
};

const PreRecordedCourses = ({
  data,
  mentorDetails,
  totalDuration,
  course,
  backBtnTxt,
  backBtnRoute
}: PreRecordedCourseProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const { i18n } = useTranslation();
  const navigateTo = useNavigate();
  let userId = getUserId();
  const [wishList, setWishList] = useState<number[]>([])

  const getAllWishList = async () => {
    if (userId !== null) {
      let response: any = await API_SERVICES.WishListService.getAllWishlist(
        userId,
        DETECT_LANGUAGE[i18n.language] ?? LANGUAGE_ID.english
      );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        const getIds = response.data.wishList.map((i) => i.course_id);
        setWishList(getIds);
      }
    }
  };

  const handleOnClick = async (item, isActive) => {
    if (userId !== null) {
      let response: any;
      if (isActive) {
        response = await API_SERVICES.WishListService.delete(
          userId,
          item?.course_id,{
            successMessage: 'Successfully Removed From WishList'
          }
        );
      } else {
        response = await API_SERVICES.WishListService.create(
          userId,
          item?.course_id,
          { successMessage: 'Successfully Added In WishList' }
        );
      }
      if (response.status < HTTP_STATUSES.BAD_REQUEST) {
        await getAllWishList();
      }
    } else {
      toast.error('Please login');
    }
  };

  useEffect(()=>{
    getAllWishList()
  },[])

  return (
    <Container>
      <ButtonComp
        buttonText={backBtnTxt || 'All Courses'}
        startIcon={
          <span style={{ color: theme.Colors.secondary }}>
            <ArrowBackIcon />
          </span>
        }
        backgroundColor={'transparent'}
        buttonTextColor={'#78828C'}
        buttonFontFamily={'Switzer'}
        buttonFontSize={18}
        btnWidth={'fit-content'}
        height={'40px'}
        classes={{ root: classes.button }}
        onClickButton={() =>
          navigateTo(backBtnRoute || '/home', {
            replace: true
          })
        }
      />
      <Grid sx={{ position: 'relative' }}>
        <Grid
          sx={{
            display: 'flex',
            flex: 1,
            position: 'relative',
            paddingTop: 3
          }}
        >
          <CourseBanner
            courseDetails={data}
            courseTitle={data?.course_name}
            mentorName={data?.mentor_name}
            mentorProfile={mentorDetails?.image_url}
            bannerOuterContainerStyle={{
              minHeight: 360
            }}
          />
        </Grid>
        <Grid
          container
          width={'380px'}
          xs={12}
          sx={{
            zIndex: 1,
            paddingBottom: '3%',
            bottom: 0,
            top: '130px',
            position: 'absolute',
            right: '40px',
            [theme.breakpoints.down('md')]: {
              paddingTop: 5,
              justifyContent: 'center',
              position: 'relative',
              width: '100%',
              top: 0,
              alignItems: 'center',
              right: '0px'
            },
            [theme.breakpoints.up(1400)]: {
              alignItems: 'flex-start'
            }
          }}
        >
          <ApplyNow
            course={data}
            timeType={totalDuration >= 60 ? 'hours' : 'mins'}
            duration={
              totalDuration >= 60
                ? (totalDuration / 60).toFixed()
                : totalDuration.toFixed(2)
            }
            handleOnClick={handleOnClick}
            isActive={wishList.includes(data.id)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default PreRecordedCourses;
