import { Grid, makeStyles, Typography, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { ButtonComp, Loader } from 'src/components';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  COURSE_STATUS_ID,
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  LANGUAGE_ID
} from 'src/Config/constant';
import toast from 'react-hot-toast';
import { API_SERVICES } from 'src/Services';
import { useTranslation } from 'react-i18next';

type Props = {
    quizDataDetails: any[];
    setQuizDataDetails: any;
    questionToDisplayIndex : any;
    setQuestionToDisplayIndex : any;
}

const QuestionAndAnswer = (props:Props) => {
  
  const theme = useTheme();
  
  const { i18n } = useTranslation();


  useEffect(() => {
   
  }, []);

    return (
      <Grid container>
        {/* <Grid item xs={12}>
            {props.quizDataDetails[props.questionToDisplayIndex].question}
        </Grid>
        <Grid item xs={12} container>
            <Grid xs={6}>{props.quizDataDetails[props.questionToDisplayIndex].option_1}</Grid>
            <Grid xs={6}>{props.quizDataDetails[props.questionToDisplayIndex].option_2}</Grid>
            <Grid xs={6}>{props.quizDataDetails[props.questionToDisplayIndex].option_3}</Grid>
            <Grid xs={6}>{props.quizDataDetails[props.questionToDisplayIndex].option_4}</Grid>            
        </Grid>
        <Grid item xs={12}>
            <ButtonComp>Next</ButtonComp>
        </Grid> */}
      </Grid>
    );
};



export default QuestionAndAnswer;
