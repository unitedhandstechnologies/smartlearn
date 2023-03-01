import { memo, useCallback, useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { useTheme, Container } from '@material-ui/core';
import { Loader } from 'src/components';
import UpComingCourse from './UpComingCourse';
import LearnAtUrPace from './LearnAtUrPace';
import CourseBegin from 'src/content/StudentContent/Courses/CourseBegin/CourseBegin';
import { API_SERVICES } from 'src/Services';
import {
  COURSE_STATUS_NAME,
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID
} from 'src/Config/constant';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import PreRecordedCourses from './PreRecordedCourses';
import Quiz from './QASection/Quiz';
import {
  BarChartFillIcon,
  BeginnerIcon,
  IntermediateIcon,
  Language,
  LocationIcon,
  Offline,
  ZoomIcon
} from 'src/Assets';

const headerChipItem = [
  {
    name: 'Difficulty',
    id: 0,
    labelItems: [
      {
        id: 0,
        label: 'All'
      },
      {
        id: 1,
        label: 'Beginner',
        icon: BeginnerIcon
      },
      {
        id: 2,
        label: 'Intermediate',
        icon: IntermediateIcon
      },
      {
        id: 3,
        label: 'Advanced',
        icon: BarChartFillIcon
      }
    ]
  },
  {
    name: 'Mode',
    img: Offline,
    id: 1,
    labelItems: [
      {
        id: 0,
        label: 'All'
      },
      {
        id: 1,
        label: 'Online',
        icon: ZoomIcon
      },
      {
        id: 2,
        label: 'Offline',
        icon: LocationIcon
      }
    ]
  },
  {
    name: 'Language',
    img: Language,
    id: 2,
    labelItems: [
      {
        id: 0,
        label: 'All'
      },
      {
        id: 1,
        label: 'English'
      },
      {
        id: 2,
        label: 'Hindi'
      },
      {
        id: 3,
        label: 'Gujarati'
      }
    ]
  }
];

const Courses = () => {
  const theme = useTheme();
  const [courseDetails, setCourseDetails] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { i18n } = useTranslation();
  const [chipFilterItem, setChipFilterItem] = useState([0, 0, 1]);
  const [menuItem, setMenuItem] = useState<any>({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [chipIconText, setChipIconText] = useState([0, 0, 1]);
  const [chipRecorderText, setChipRecorderText] = useState([0, 1]);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response: any = await API_SERVICES.courseManagementService.getAll(
        DETECT_LANGUAGE[i18n.language]
      );
      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        if (response?.data?.courses?.length) {
          let enabledCourse = response?.data?.courses.filter((item) => {
            return item.course_status === COURSE_STATUS_NAME[1];
          });
          setCourseDetails(enabledCourse);
        }
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [DETECT_LANGUAGE[i18n.language]]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Box sx={{ py: 5 }}>
        <Container>
          <Grid
          // container
          // direction={'column'}
          // style={{ padding: theme.spacing(7, 7) }}
          // padding={6}
          >
            <UpComingCourse
              courseDetails={courseDetails}
              chipIconText={chipIconText}
              setChipIconText={setChipIconText}
            />
            <LearnAtUrPace
              courseDetails={courseDetails}
              chipIconText={chipRecorderText}
              setChipIconText={setChipRecorderText}
            />
            {/* <Quiz courseDetails={courseDetails} /> */}
            {/* <CourseBegin /> */}
          </Grid>
          <CourseBegin />
        </Container>
      </Box>
    );
  }
};
export default memo(Courses);
