import { Grid, makeStyles, Typography} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { memo } from 'react';
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
import { useTheme } from '@material-ui/core';

type Props = {
    quizDataDetails: any[];
    setQuizDataDetails: any;
    questionToDisplayIndex : any;
    setQuestionToDisplayIndex : any;
}

const QuestionAndAnswer = ({
    quizDataDetails,
    setQuizDataDetails,
    questionToDisplayIndex,
    setQuestionToDisplayIndex
}:Props) => {
  
  const theme = useTheme();
  
  const { i18n } = useTranslation();

  const handleClickNextQuestion = () => {

  };

    return (
      <Grid container
        sx = {{
            padding : '0px 24px',
        }}
      >
        <Grid item xs={12}
            sx = {{
                paddingBottom : '24px',
            }}
        >
            <Typography>
                Quiz : {quizDataDetails[questionToDisplayIndex].quizName}
            </Typography>
        </Grid>
         <Grid item xs={12}
            sx = {{
                padding : '24px 0px',
            }}
         >
            <Typography>
            {quizDataDetails[questionToDisplayIndex].question_number}.{quizDataDetails[questionToDisplayIndex].question}
            </Typography>
        </Grid>        

        <Grid item xs={12} 
            container 
            sx = {{
            }}
        
        >
            <Grid xs={12} sm={6}
                sx = {{
                    padding : '8px 16px',
                    //marginRight : '16px',
                    backgroundColor : theme.Colors.whiteLightGrey,
                    display : 'flex',
                    alignItems : "center" ,     
                }}
            >
                <ButtonComp
                    backgroundColor='transparent'
                    buttonTextColor= {theme.Colors.black}
                    buttonText={
                        "1."+quizDataDetails[questionToDisplayIndex].option_1                               
                    }
                    onClickButton = {handleClickNextQuestion}
                />                
            </Grid>
            <Grid xs={12} sm={6}
             sx = {{
                padding : '8px 16px',
                backgroundColor : theme.Colors.whiteLightGrey,
                display : 'flex',
                alignItems : "center" ,     
            }}
            >
               <ButtonComp
                    backgroundColor='transparent'
                    buttonTextColor= {theme.Colors.black}
                    buttonText={
                        "2."+quizDataDetails[questionToDisplayIndex].option_2                               
                    }
                    onClickButton = {handleClickNextQuestion}
                />    
            </Grid>
            <Grid xs={12} sm={6}
             sx = {{
                padding : '8px 16px',
                backgroundColor : theme.Colors.whiteLightGrey,
                display : 'flex',
                alignItems : "center" ,  
                marginTop : '16px',
            }}
            >
                <ButtonComp
                    backgroundColor='transparent'
                    buttonTextColor= {theme.Colors.black}
                    buttonText={
                        "3."+quizDataDetails[questionToDisplayIndex].option_3                               
                    }
                    onClickButton = {handleClickNextQuestion}
                />    
            </Grid>
            <Grid xs={12} sm={6}
             sx = {{
                padding : '8px 16px',
                backgroundColor : theme.Colors.whiteLightGrey,
                display : 'flex',
                alignItems : "center" ,
                marginTop : '16px',            
            }}
            >
               <ButtonComp
                    backgroundColor='transparent'
                    buttonTextColor= {theme.Colors.black}
                    buttonText={
                        "4."+quizDataDetails[questionToDisplayIndex].option_4                              
                    }
                    onClickButton = {handleClickNextQuestion}
                />    
            </Grid>
        </Grid>
        <Grid item xs={12}
            sx = {{
                display : 'flex',
                alignItems : "center" ,
                justifyContent : "flex-end"
            }}
        >
            <ButtonComp
                buttonTextColor= {theme.Colors.whitePure}
                buttonText={'Next'}
                onClickButton = {handleClickNextQuestion}
            ></ButtonComp>
        </Grid> 
      </Grid>
    );
};



export default memo(QuestionAndAnswer);
