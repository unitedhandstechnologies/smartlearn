import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Grid, makeStyles, styled, useTheme } from '@material-ui/core';
import toast from 'react-hot-toast';
import { HTTP_STATUSES, LANGUAGE_ID } from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { Loader } from 'src/components';
import CourseMainPage from './CourseMainPage';
import { useLocation } from 'react-router';
import { getUserId } from 'src/Utils';

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    padding: '18px 18px',
    border: '1px solid',
    borderColor: theme.Colors.primary,
    borderRadius: '5px',
    backgroundColor: theme.Colors.whitePure,
    flexDirection: 'row'
  },
  playerContainer: {
    padding: '32px'
  },
  mainContainer: {
    [theme.breakpoints.down('sm')]: { flexWrap: ' wrap-reverse' }
  }
}));

const CourseBegin = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const [videoToPlay, setVideoToPlay] = useState();
  const [lessonData, setLessonData] = useState<any[]>([]);
  const [sectionData, setSectionData] = useState<any[]>([]);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [testTopic, setTestTopic] = useState(false);
  const [videoDetails, setVideoDetails] = useState<any[]>([]);
  const [videoPlaying, setVideoPlaying] = useState<Number>(0.0);

  const [autoPlay, setAutoPlay] = useState(true);
  const { state }: any = useLocation();
  const videoToPlayIndex = useRef({
    sectionNumber: 0,
    lessonNumber: 0
  });
  const data = state;
  const fetchData = useCallback(async () => {
    let id = state?.course_id;
    const userId = getUserId();

    try {
      const responseVideoDetails: any =
        await API_SERVICES.PreRecordedCourseVideoService.getVideoDetails(
          id,
          userId
        );
      const response: any = await Promise.all([
        API_SERVICES.courseManagementService.getById(id),
        API_SERVICES.quizService.getAllQuiz(LANGUAGE_ID.english, id)
      ]);
      if (response[1]?.status < HTTP_STATUSES.BAD_REQUEST) {
        setQuizData(response[1]?.data?.quiz);
      }
      if (response[0]?.status < HTTP_STATUSES.BAD_REQUEST) {
        setCourseData(response[0]?.data);

        try {
          setSectionData([]);
          const responseSection: any =
            await API_SERVICES.sectionAndLessonService.getAllSection(
              response[0]?.data?.course.id,
              LANGUAGE_ID.english
            );
          if (responseSection?.status < HTTP_STATUSES.BAD_REQUEST) {
            setSectionData(responseSection.data.Section);
            try {
              setLessonData([]);
              const responseLesson: any =
                await API_SERVICES.sectionAndLessonService.getAllLessonByCourseId(
                  response[0]?.data?.course.id,
                  LANGUAGE_ID.english
                );
              if (responseLesson?.status < HTTP_STATUSES.BAD_REQUEST) {
                setLessonData(responseLesson.data.Lessons);
                let videoPercentage =
                  responseVideoDetails.data.Video_percentage;
                let sectionData1 = responseSection.data.Section;
                let lessonData1 = responseLesson.data.Lessons;

                let tempVideoDetails = Array(sectionData1?.length)
                  .fill(0)
                  .map(
                    (sectionData1, index) =>
                      new Array(
                        (lessonData1.length
                          ? lessonData1.filter(
                              (lessonItm) =>
                                lessonItm.section_id === sectionData1.section_id
                            )
                          : []
                        ).length
                      )
                  );

                //let tempElapsedTime = [0.07, 0.16, 0.2, 0.5, 0.0];
                //let tempRemainingTime = [15.12, 4.33, 66.65, 7, 20.56];
                if (sectionData1?.length) {
                  sectionData1?.map((item, index) => {
                    const sectionNumber = index + 1;
                    let getLessonData: any = lessonData1.length
                      ? lessonData1.filter(
                          (lessonItm) =>
                            lessonItm.section_id === item.section_id
                        )
                      : [];
                    if (getLessonData.length) {
                      getLessonData?.map((item, index) => {
                        let tempPercentagePlayed = videoPercentage.filter(
                          (itemVideo) =>
                            itemVideo.course_id === id &&
                            itemVideo.user_id === userId &&
                            itemVideo.lesson_id === item.lesson_id
                        );

                        tempVideoDetails[sectionNumber - 1][index] = {
                          videoUrl: item.video_url,
                          videoName: item.lesson_name,
                          videoId: item.lesson_id,
                          videoDuration: item.duration,
                          videoPlayedFraction: tempPercentagePlayed[0].played
                          //videoElapsedTime: tempElapsedTime[sectionNumber - 1],
                          //videoPlayingTime: 0.0,
                          //videoRemainingTime:
                          //tempRemainingTime[sectionNumber - 1]
                        };
                      });
                    }
                  });
                }
                setVideoDetails(tempVideoDetails);
                setVideoToPlay(tempVideoDetails[0][0].videoUrl);
                videoToPlayIndex.current = {
                  sectionNumber: 0,
                  lessonNumber: 0
                };
              }
            } catch (err) {
              toast.error(err?.message);
            } finally {
              setLoading(false);
            }
          }
        } catch (err) {
          toast.error(err?.message);
        }
      }
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  //const fetchSectionsCompletedDetails
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <CourseMainPage
        courseData={courseData}
        videoToPlay={videoToPlay}
        lessonData={lessonData}
        sectionData={sectionData}
        videoToPlayIndex={videoToPlayIndex}
        //setVideoToPlayIndex={setVideoToPlayIndex}
        setVideoToPlay={setVideoToPlay}
        quizData={quizData}
        setTestTopic={setTestTopic}
        testTopic={testTopic}
        videoDetails={videoDetails}
        setVideoDetails={setVideoDetails}
        videoPlaying={videoPlaying}
        setVideoPlaying={setVideoPlaying}
        fetchData={fetchData}
        data={data}
      />
    );
  }
};

export default CourseBegin;
