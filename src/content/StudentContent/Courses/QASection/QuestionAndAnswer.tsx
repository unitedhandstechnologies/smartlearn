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
    setQuizResult : any;
}

const QuestionAndAnswer = ({
    quizDataDetails,
    setQuizDataDetails,
    questionToDisplayIndex,
    setQuestionToDisplayIndex,
    setQuizResult
}:Props) => {
  
  const theme = useTheme();
  
  const { i18n } = useTranslation();
  const [ optionClicked, setOptionClicked] = useState(0)

  const handleClickNextQuestion = () => {
    setOptionClicked(0);
        if(questionToDisplayIndex < quizDataDetails.length-1){
            if(quizDataDetails[questionToDisplayIndex].userAnswer)
                setQuestionToDisplayIndex(questionToDisplayIndex+1);
            else
                toast.error("Please Choose an option");
        } else {
            setQuizResult(true);
        };
  };

  const handleClickOption = (selectedOption) => {
    let tempQuizDetails = quizDataDetails;
    tempQuizDetails[questionToDisplayIndex].userAnswer = selectedOption
    if(selectedOption === parseInt(tempQuizDetails[questionToDisplayIndex].answer)){
        tempQuizDetails[questionToDisplayIndex].correctCount = 1;
        setQuizDataDetails(tempQuizDetails);
    }
    setOptionClicked(selectedOption);
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
                
                onClick = {()=>handleClickOption(1)}
                sx = {{
                    borderRadius: '8px',
                    padding : '8px 16px',
                    //marginRight : '16px',
                    backgroundColor : theme.Colors.whiteLightGrey,
                    display : 'flex',
                    alignItems : "center" ,  
                    border : optionClicked===1 ? '1px solid ' : '',
                    borderColor : optionClicked===1 ? theme.Colors.primary : '',   
                }}
            >
                <Typography>
                    1.{quizDataDetails[questionToDisplayIndex].option_1}
                </Typography>
            </Grid>
            <Grid xs={12} sm={6}
            onClick = {()=>handleClickOption(2)}
             sx = {{
                borderRadius: '8px',
                padding : '8px 16px',
                backgroundColor : theme.Colors.whiteLightGrey,
                display : 'flex',
                alignItems : "center" ,   
                border : optionClicked===2 ? '1px solid ' : '',
                borderColor : optionClicked===2 ? theme.Colors.primary : '',   
            }}
            >
                <Typography>
                    2.{quizDataDetails[questionToDisplayIndex].option_2}
                </Typography>
            </Grid>
            <Grid xs={12} sm={6}
            onClick = {()=>handleClickOption(3)}
             sx = {{
                borderRadius: '8px',
                padding : '8px 16px',
                backgroundColor : theme.Colors.whiteLightGrey,
                display : 'flex',
                alignItems : "center" ,  
                marginTop : '16px',
                border : optionClicked===3 ? '1px solid ' : '',
                borderColor : optionClicked===3 ? theme.Colors.primary : '', 
            }}
            >
                <Typography>
                    3.{quizDataDetails[questionToDisplayIndex].option_3}
                </Typography>
            </Grid>
            <Grid xs={12} sm={6}
            onClick = {()=>handleClickOption(4)}
             sx = {{
                borderRadius: '8px',
                padding : '8px 16px',
                backgroundColor : theme.Colors.whiteLightGrey,
                display : 'flex',
                alignItems : "center" ,
                marginTop : '16px', 
                border : optionClicked===4 ? '1px solid ' : '',
                borderColor : optionClicked===4 ? theme.Colors.primary : '',            
            }}
            >
                <Typography>
                    4.{quizDataDetails[questionToDisplayIndex].option_4}
                </Typography>
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
