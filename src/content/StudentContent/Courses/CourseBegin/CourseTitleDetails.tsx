import { memo } from 'react';
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
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

import { CourseSubTitleDetailsProps, CourseTitleDetailsProps } from 'src/content/StudentContent/types';
import CourseSubTitleDetails from 'src/content/StudentContent/Courses/CourseBegin/CourseSubTitleDetails';
import { MuiAccordionComp, SuspenseLoader } from 'src/components';
import React from 'react';
import { useTheme} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgressWithLabel from './CircularProgressWithLable';

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
  studentDetails
})=> {

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

  const getAccordionContents: any = React.useMemo(() => {
    console.log("sectionData",sectionData);

    console.log("lessonData", lessonData);
    
    
    console.log("inside get accordian")
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


                      return (
                        <Grid
                          item
                          key={index}
                          container
                          xs={12}
                          style={{ gap: 10 }}
                          alignItems="center"
                        >
                          <CircularProgressWithLabel 
                            title={getSectionLessonValue(sectionNumber, index)}
                             value={89} />
           
                          <Typography
                          style={{
                            color: theme.Colors.blackPrimary,
                            fontWeight: 400,
                            fontSize : '16px'
                          }}> {`${item.lesson_name}`}</Typography>
                          
                          </Grid>

                      );
                    })
                  : null}
                 
              </Grid>
            )
          };
        })
      : [];
  }, [sectionData, lessonData]);
  return (
 
    <MuiAccordionComp
            config={getAccordionContents}
            isBorder = {false}            
            accordianTitleClassName = {classes.accordianTitleStyle}
            accordionSummaryClassName = {classes.accordionSummaryStyle}
            accordionDetailClassName = {classes.accordionDetailStyles}
    />
  );
};

export default memo(CourseTitleDetails);
