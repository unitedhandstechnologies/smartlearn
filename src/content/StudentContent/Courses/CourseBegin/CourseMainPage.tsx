import { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Grid,
  makeStyles,
  styled,
  Typography,
  useTheme
} from '@material-ui/core';
import CourseDetails from 'src/content/StudentContent/Courses/CourseBegin/CourseDetails';
import { API_SERVICES } from 'src/Services';
import ReactPlayer from 'react-player';
import React from 'react';
import Quiz from 'src/content/StudentContent/Courses/QASection/Quiz';
import { getUserId } from 'src/Utils';
import Certificate from 'src/content/StudentContent/Courses/Certificate';
import QuizUnlockedMessage from './QuizUnlockedMessage';
import PdfViewer from './PdfViewer';
import useStudentInfo from 'src/hooks/useStudentInfo';

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
    padding: '32px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px'
    }
  },
  mainContainer: {
    paddingLeft: '30px',
    paddingTop: '30px',
    paddingBottom: '10px',
    [theme.breakpoints.down('sm')]: {
      flexWrap: ' wrap-reverse',
      paddingLeft: '0px'
    }
  }
}));

const MainGrid = styled(Grid)(({ theme }) => ({
  sx: {
    [theme.breakpoints.down('sm')]: { flexWrap: 'wrap-reverse' }
  }
}));

const CourseMainPage = ({
  courseData,
  videoToPlay,
  lessonData,
  sectionData,
  videoToPlayIndex,
  setVideoToPlay,
  //setVideoToPlayIndex,
  quizData,
  testTopic,
  setTestTopic,
  videoDetails,
  setVideoDetails,
  videoPlaying,
  setVideoPlaying,
  fetchData,
  data,
  setShowCertificate,
  showCertificate,
  setCompletedCourse,
  completedCourse,
  setShowQuizUnlockedMsg,
  showQuizUnlockedMsg,
  fetchLevelCompleted,
  completedQuiz,
  setCompletedQuiz,
  showNotes,
  setShowNotes
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const videoPlayerRef = useRef();
  const [playerRef, setPlayerRef] = useState<any>();
  const [isReady, setIsReady] = React.useState(false);
  const timePaused = useRef(0);
  const userId = getUserId();
  const { studentDetails } = useStudentInfo();
  const handlePlayNext = useCallback(async () => {
    let updateData = {
      played: 1
    };
    let id = data.course_id;
    const responseUpdateVideoDetails: any =
      await API_SERVICES.PreRecordedCourseVideoService.updateVideoDetails(
        id,
        userId,
        videoDetails[videoToPlayIndex.current.sectionNumber][
          videoToPlayIndex.current.lessonNumber
        ].videoId,
        {
          data: updateData
        }
      );
    fetchLevelCompleted();
    let tempVideoDetails = videoDetails;
    tempVideoDetails[videoToPlayIndex.current.sectionNumber][
      videoToPlayIndex.current.lessonNumber
    ].videoPlayedFraction = 1;

    setVideoDetails(tempVideoDetails);

    let nextLessonIndex: number = videoToPlayIndex.current.lessonNumber;
    let nextSectionIndex: number = videoToPlayIndex.current.sectionNumber;
    if (nextLessonIndex < videoDetails[nextSectionIndex].length - 1) {
      nextLessonIndex++;
      videoToPlayIndex.current = {
        sectionNumber: nextSectionIndex,
        lessonNumber: nextLessonIndex
      };
      setVideoToPlay(videoDetails[nextSectionIndex][nextLessonIndex].videoUrl);
      return;
    } else {
      if (nextSectionIndex < videoDetails.length - 1) {
        nextSectionIndex++;
        nextLessonIndex = 0;
        videoToPlayIndex.current = {
          sectionNumber: nextSectionIndex,
          lessonNumber: nextLessonIndex
        };
        setVideoToPlay(
          videoDetails[nextSectionIndex][nextLessonIndex].videoUrl
        );
        return;
      } else {
        nextSectionIndex = 0;
        nextLessonIndex = 0;
        videoToPlayIndex.current = {
          sectionNumber: nextSectionIndex,
          lessonNumber: nextLessonIndex
        };
        setVideoToPlay(
          videoDetails[nextSectionIndex][nextLessonIndex].videoUrl
        );
        fetchLevelCompleted();
      }
    }
  }, []);

  const handleVideoProgress = (event) => {
    setVideoPlaying(event.played);
    timePaused.current = event.played;
  };

  const handleOnReady = useCallback(
    (player) => {
      if (!isReady) {
        if (
          videoDetails[videoToPlayIndex.current.sectionNumber][
            videoToPlayIndex.current.lessonNumber
          ].videoPlayedFraction === 1
        ) {
          player.seekTo(0.0);
        } else {
          player.seekTo(
            videoDetails[videoToPlayIndex.current.sectionNumber][
              videoToPlayIndex.current.lessonNumber
            ].videoPlayedFraction,
            'fraction'
          );
        }

        setIsReady(true);
      }
    },
    [isReady]
  );

  const handleOnPause = useCallback(async () => {
    let id = data.course_id;
    if (
      timePaused.current >
      videoDetails[videoToPlayIndex.current.sectionNumber][
        videoToPlayIndex.current.lessonNumber
      ].videoPlayedFraction
    ) {
      let updateData = {
        played: timePaused.current
      };

      const responseUpdateVideoDetails: any =
        await API_SERVICES.PreRecordedCourseVideoService.updateVideoDetails(
          id,
          userId,
          videoDetails[videoToPlayIndex.current.sectionNumber][
            videoToPlayIndex.current.lessonNumber
          ].videoId,
          {
            data: updateData
          }
        );
    }

    let tempVideoDetails = videoDetails;
    tempVideoDetails[videoToPlayIndex.current.sectionNumber][
      videoToPlayIndex.current.lessonNumber
    ].videoPlayedFraction = timePaused.current;

    setVideoDetails(tempVideoDetails);
  }, []);

  useEffect(() => {}, []);

  return (
    <Grid container className={classes.mainContainer}>
      <Grid item xs={12} sm={3} className={classes.outerContainer}>
        <CourseDetails
          courseData={courseData}
          setVideoToPlay={setVideoToPlay}
          sectionData={sectionData}
          lessonData={lessonData}
          //handleAutoPlay = {setAutoPlay}
          videoToPlayIndex={videoToPlayIndex}
          quizData={quizData}
          setTestTopic={setTestTopic}
          videoDetails={videoDetails}
          setIsReady={setIsReady}
          setShowCertificate={setShowCertificate}
          setShowNotes={setShowNotes}
          completedQuiz={completedQuiz}
          completedCourse={completedCourse}
        />
      </Grid>
      <Grid item xs={12} sm={9}>
        {!testTopic &&
          !showCertificate &&
          (!showNotes ? (
            <>
              <Typography
                style={{
                  padding: '0px 32px',
                  fontSize: theme.MetricsSizes.medium
                }}
              >
                {videoToPlayIndex.current.sectionNumber + 1} .{' '}
                {videoToPlayIndex.current.lessonNumber + 1}{' '}
                {
                  videoDetails[videoToPlayIndex.current.sectionNumber][
                    videoToPlayIndex.current.lessonNumber
                  ].videoName
                }
              </Typography>
              <Grid className={classes.playerContainer}>
                <ReactPlayer
                  ref={(player) => setPlayerRef(player)}
                  url={videoToPlay}
                  playing={true}
                  controls={true}
                  width={'100%'}
                  height={'100%'}
                  onEnded={handlePlayNext}
                  onReady={handleOnReady}
                  onPause={handleOnPause}
                  onProgress={handleVideoProgress}
                  config={{
                    file: { attributes: { controlsList: 'nodownload' } }
                  }}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Grid>
            </>
          ) : (
            <PdfViewer
              pdfFile={
                videoDetails[videoToPlayIndex.current.sectionNumber][
                  videoToPlayIndex.current.lessonNumber
                ].pdfUrl
              }
            />
          ))}
        {showQuizUnlockedMsg && completedCourse && !completedQuiz && (
          <QuizUnlockedMessage
            setTestTopic={setTestTopic}
            setShowQuizUnlockedMsg={setShowQuizUnlockedMsg}
          />
        )}
        {completedCourse ? (
          !showCertificate && testTopic && quizData.length ? (
            <Quiz
              courseData={courseData}
              data={data}
              fetchLevelCompleted={fetchLevelCompleted}
            />
          ) : testTopic ? (
            'No Test topic Available'
          ) : null
        ) : testTopic ? (
          'Complete the Course to Unlock Quiz'
        ) : null}
        {showCertificate && !testTopic && completedQuiz ? (
          <Certificate
            nameOnCertificate={
              studentDetails.first_name + ' ' + studentDetails.last_name
            }
          />
        ) : showCertificate ? (
          'Complete Course and Quiz to get your Certificate'
        ) : null}
      </Grid>
    </Grid>
  );
};

export default memo(CourseMainPage);
