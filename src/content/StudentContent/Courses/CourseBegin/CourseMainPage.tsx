import { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Grid,
  makeStyles,
  styled,
  Typography,
  useTheme
} from '@material-ui/core';

import CourseDetails from 'src/content/StudentContent/Courses/CourseBegin/CourseDetails';
import toast from 'react-hot-toast';
import { HTTP_STATUSES, LANGUAGE_ID } from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { Loader } from 'src/components';
import ReactPlayer from 'react-player';
import React from 'react';
import { number } from 'prop-types';
import Quiz from 'src/content/StudentContent/Courses/QASection/Quiz';

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
  fetchData
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const videoPlayerRef = useRef();
  const [playerRef, setPlayerRef] = useState<any>();
  const [isReady, setIsReady] = React.useState(false);
  const timePaused = useRef(0);

  const handlePlayNext = useCallback(async () => {
    let updateData = {
      played: 1
    };
    let userId = 3;
    let id = 19;
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
        player.seekTo(
          videoDetails[videoToPlayIndex.current.sectionNumber][
            videoToPlayIndex.current.lessonNumber
          ].videoPlayedFraction,
          'fraction'
        );
        setIsReady(true);
      }
    },
    [isReady]
  );

  const handleOnPause = useCallback(async () => {
    if (
      timePaused.current >
      videoDetails[videoToPlayIndex.current.sectionNumber][
        videoToPlayIndex.current.lessonNumber
      ].videoPlayedFraction
    ) {
      let updateData = {
        played: timePaused.current
      };
      let userId = 3;
      let id = 19;
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
        />
      </Grid>
      <Grid item xs={12} sm={9}>
        {!testTopic ? (
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
              />
            </Grid>
          </>
        ) : quizData.length ? (
          <Quiz courseData={courseData} />
        ) : (
          'No Test topic Available'
        )}
      </Grid>
    </Grid>
  );
};

export default memo(CourseMainPage);
