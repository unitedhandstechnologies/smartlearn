import { memo, useCallback, useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  ExpandLess,
  ExpandMore,
  FamilyRestroomTwoTone
} from '@mui/icons-material';

import { CourseSubTitleDetailsProps, CourseTitleDetailsProps } from 'src/content/StudentContent/types';
import CourseSubTitleDetails from 'src/content/StudentContent/Courses/CourseBegin/CourseSubTitleDetails';
import { MuiAccordionComp, SuspenseLoader } from 'src/components';
import React from 'react';
import { useTheme} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgressWithLabel from './CircularProgressWithLable';
import { TestTopic, TrophyLine, videoLine } from 'src/Assets/Images';
import { greenTick } from 'src/Assets/Images';
import { string } from 'prop-types';

const useStyles = makeStyles((theme)=>({

  accordianTitleStyle : {
    backgroundColor : theme.Colors.whiteLightGrey,
  },
  accordionDetailStyles : {
    backgroundColor: theme.Colors.whitePure,
    border: '0px solid',
    borderColor: theme.Colors.whitePure, 
  },
  accordionSummaryStyle : {
    backgroundColor : theme.Colors.whiteLightGrey,
    borderRadius : '4px',
    margin: '8px 0px',
  },

}));

const CourseTitleDetails = ({
  lessonData,
  sectionData,
  quizData,
  setVideoToPlay,
  //handleAutoPlay,
  setVideoToPlayIndex,
  setTestTopic,
  videoDetails,
  setIsReady
})=> {

  console.log("lessonData dfg",lessonData)
  console.log("sectionData dzfgsdfg",sectionData)
  const classes = useStyles();
  //const icon = completed ? <CheckCircleIcon /> : <ExpandMoreIcon />;

/*   const items = () => {
    return list.map((item: CourseSubTitleDetailsProps, i) => (
      <CourseSubTitleDetails key={i} {...item} />
    ));
  }; */

  const theme = useTheme();

  const  getSectionLessonValue = (sectionNumber, index) => {
    return(
  <Typography
  style={{
    color: theme.Colors.blackPrimary,
    fontWeight: 400,
    fontSize : '12px'
  }}
>{`${sectionNumber} ${index + 1}`} 
</Typography>

  )};

  const getAccordionQuizCertificateContents: any = React.useMemo(() => {
   
    return(
      [{
        id : sectionData?.length + 1,
        renderAccordionTitle: () => (
          <Grid 
            container 
            alignItems="center" 
            style={{ gap: '10px' }}
            onClick={()=>{setTestTopic(true)}}
          >               
          <img src={TestTopic} />
          <Divider orientation='vertical' flexItem style={{color : theme.Colors.redPrimary}} />
          <Typography
          style={{
            color: theme.Colors.blackPrimary,
            fontWeight: 400,
            fontSize : '18px'
          }}
          >Test Topic</Typography>
      </Grid>)
      },
      {
        id : sectionData?.length + 2,
        renderAccordionTitle: () => (
          <Grid 
            container 
            alignItems="center" 
            style={{ gap: '10px' }}
            onClick={()=>{setTestTopic(false)}}
            >               
          <img src={TrophyLine} />
          <Divider orientation='vertical' flexItem style={{color : theme.Colors.redPrimary}} />
          <Typography
          style={{
            color: theme.Colors.blackPrimary,
            fontWeight: 400,
            fontSize : '18px'
          }}
          >Get Your Certificate</Typography>
      </Grid>)
      }]
    )
  },[quizData]);


  

  const getAccordionContents: any = React.useMemo(() => {
  
    return sectionData?.length
      ? sectionData.map((item, index) => {
        const sectionNumber = index + 1;
          let getLessonData: any = lessonData.length
            ? lessonData.filter(
                (lessonItm) => lessonItm.section_id === item.section_id
              )
            : [];
            
          return {
            id: index + 1,
            renderAccordionTitle: () => (
              <Grid container alignItems="center" style={{ gap: '10px' }}>               
                <Typography
                  style={{
                    color: theme.Colors.blackPrimary,
                    fontWeight: 400,
                    fontSize : '18px'
                  }}
                >
                
                  {`${index + 1} `}</Typography>

                  <Divider orientation='vertical' flexItem style={{color : theme.Colors.redPrimary}} />
                  <Typography
                  style={{
                    color: theme.Colors.blackPrimary,
                    fontWeight: 400,
                    fontSize : '18px'
                  }}
                >
                
                  {` ${item.section_name} `}</Typography>
              </Grid>
            ),
            accContentDetail: () => (
              <Grid container direction="column" spacing={2}>
                {getLessonData.length
                  ? getLessonData.map((item, index) => {
                    let duration =String(item.duration);
                    let minSec = duration.split(".");
                      return (
                        <Grid
                          item
                          key={index}
                          container
                          xs={12}
                          style={{ gap: 10 }}
                          alignItems="center"
                          direction={'row'}
                          onClick={()=>{
                            setTestTopic(false);
                            setVideoToPlay(item.video_url);
                            setVideoToPlayIndex({sectionNumber:sectionNumber-1,lessonNumber : index});
                            setIsReady(false);}}
                        >
                          <Grid item display={'flex'} alignItems={'center'} justifyContent={'center'}>
                          <CircularProgressWithLabel 
                            title={getSectionLessonValue(sectionNumber, index)}
                             value={(videoDetails[sectionNumber-1][index].videoPlayedTime)*100} />
                             </Grid>
                             <Grid item>
                          <Grid container direction={'column'}>
                            <Grid item xs={6}>
                          <Typography
                          style={{
                            color: theme.Colors.blackPrimary,
                            fontWeight: 400,
                            fontSize : '16px'
                          }}> {`${item.lesson_name}`}
                          
                          </Typography>
                          </Grid>
                          <Grid item xs={6}>
                          <img src={videoLine} ></img>
                          <Typography
                          component={'span'}
                          style={{
                            color: theme.Colors.blackPrimary,
                            fontWeight: 400,
                            fontSize : '12px'
                            
                          }}>
                            
                            { 
                            
                            `${ minSec[0]}m  ${ minSec[1]}s`}
                          
                          </Typography>
                          </Grid>
                           </Grid>
                          </Grid>
                          </Grid>

                      );
                    })
                  : null}
                 
              </Grid>
            )
           
          };
          
        }
       
        )
        
      : [];
      
  }, [sectionData, lessonData]);

  
  useEffect(() => {    

  }, []);

  return (
    <>
    <MuiAccordionComp
            config={getAccordionContents}
            isBorder = {false}            
            accordianTitleClassName = {classes.accordianTitleStyle}
            accordionSummaryClassName = {classes.accordionSummaryStyle}
            accordionDetailClassName = {classes.accordionDetailStyles}
            iconColor = {"primary"}
            isSectionCompleted = {true}
            //customActiveAccItem = {[videoToPlayIndex.sectionNumber]}

            renderExpandIcons = {(isActive)=>{
              if (isActive) {
                return <ExpandLess color={"primary"} />;
              } else {
                return <img src={greenTick} ></img>;
              }
            }}
    />

    {console.log(getAccordionQuizCertificateContents)}
    <MuiAccordionComp
            config={getAccordionQuizCertificateContents}
            isBorder = {false}            
            accordianTitleClassName = {classes.accordianTitleStyle}
            accordionSummaryClassName = {classes.accordionSummaryStyle}
            accordionDetailClassName = {classes.accordionDetailStyles}
            iconColor = {"primary"}
            isSectionCompleted = {true}
            expanded = {false}
            renderExpandIcons = {(isActive)=>{
              if (isActive) {
                return null ;
              } else {
                return null;
              }
            }}
             />
    </>
  );
};

export default memo(CourseTitleDetails);
