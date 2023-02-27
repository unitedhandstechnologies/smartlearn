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



const CourseMainPage = (
    {
        courseData,
        videoToPlay,
        lessonData,
        sectionData,
        videoToPlayIndex,
        setVideoToPlay,
        setVideoToPlayIndex,
        quizData,
        testTopic,
        setTestTopic,
        videoDetails,
        isReady,
        setIsReady
    }
) => {
    
    const classes = useStyles();
    const theme = useTheme();
    const videoPlayerRef = useRef();
    const [playerRef, setPlayerRef] = useState<any>();


   

    
    const handlePlayNext = () => {    
      let nextLessonIndex : number = videoToPlayIndex.lessonNumber;  
      let nextSectionIndex : number =  videoToPlayIndex.sectionNumber; 
      if (nextLessonIndex < videoDetails[nextSectionIndex].length-1)  {
        nextLessonIndex++;   
        setVideoToPlayIndex({sectionNumber : nextSectionIndex , lessonNumber : nextLessonIndex })
        setVideoToPlay(videoDetails[nextSectionIndex][nextLessonIndex].videoUrl); 
        return;
      }else {
        if (nextSectionIndex < videoDetails.length-1){
          nextSectionIndex++;
          nextLessonIndex=0;
          setVideoToPlayIndex({sectionNumber : nextSectionIndex , lessonNumber : nextLessonIndex })
          setVideoToPlay(videoDetails[nextSectionIndex][nextLessonIndex].videoUrl);           return;
        } else{
            nextSectionIndex=0;
            nextLessonIndex=0;
          setVideoToPlayIndex({sectionNumber : nextSectionIndex , lessonNumber : nextLessonIndex })
          setVideoToPlay(videoDetails[nextSectionIndex][nextLessonIndex].videoUrl);        
        }
      }
    };

    const handleVideoProgress = (event) => {
      console.log("event", event);
      //videoDetails[videoToPlayIndex.sectionNumber][videoToPlayIndex.lessonNumber].playingTime = event.played;
      //setPlayingTime(event.played);
    };

    const handleOnReady =useCallback((player) => {

      
        const timeToStart = videoDetails[videoToPlayIndex.sectionNumber][videoToPlayIndex.lessonNumber].videoElapsedTime;
        console.log("playerRef",playerRef);
        player.seekTo(timeToStart, 'minutes');
        setPlayerRef(player);
        setIsReady(true);
    

     /*  //console.log("event", player);
      console.log("playerRef",playerRef) ;
      let tempPR = playerRef;
      tempPR.seekTo(videoDetails[videoToPlayIndex.sectionNumber][videoToPlayIndex.lessonNumber].videoElapsedTime);
      setPlayerRef(tempPR);
      console.log("Aftyer Changed Ref",playerRef)
      //videoDetails[videoToPlayIndex.sectionNumber][videoToPlayIndex.lessonNumber].playingTime = event.played;
      //setPlayingTime(event.played); */
    },[isReady]);
  
  

   useEffect(() => {  
    
    //setPlayerRef(seekTo())       
    }, [videoToPlay]); 

  return (
    <Grid container className={classes.mainContainer}>
      <Grid item xs={12} sm={3} className={classes.outerContainer}>
        <CourseDetails
          courseData={courseData}
          setVideoToPlay={setVideoToPlay}
          sectionData={sectionData}
          lessonData={lessonData}
          //handleAutoPlay = {setAutoPlay}
          setVideoToPlayIndex={setVideoToPlayIndex}
          quizData={quizData}
          setTestTopic = {setTestTopic}
          videoDetails={videoDetails}
          />
      </Grid>
      <Grid item xs={12} sm={9} >
        { 
        !testTopic ? (
          <>
      <Typography style={{
        padding:'0px 32px',
        fontSize: theme.MetricsSizes.medium
      }}>{videoToPlayIndex.sectionNumber+1} . {videoToPlayIndex.lessonNumber+1} {videoDetails[videoToPlayIndex.sectionNumber][videoToPlayIndex.lessonNumber].videoName}</Typography>
        <Grid className={classes.playerContainer}>
          <ReactPlayer
            ref={(player)=>setPlayerRef(player)}
            url={videoToPlay}
            playing={true}
            controls={true}
            width={'100%'}
            height={'100%'}
            onEnded={handlePlayNext} 
            //onReady={handleOnReady}           
            //onProgress={handleVideoProgress}
          />
        </Grid>
        </>
        ): quizData.length ? <Quiz  /> : "No Test topic Available" }
      </Grid>
    </Grid>
  );
};

export default memo(CourseMainPage);
