import { Grid, makeStyles, Typography} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { memo } from 'react';
import { ButtonComp, DividerLine, Loader } from 'src/components';
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
    setPreviewResult : any;
}

const quizPreview = ({
    quizDataDetails,
    setPreviewResult

}:Props) => {
  
  const theme = useTheme();
  
  const { i18n } = useTranslation();
  
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
                Quiz : {quizDataDetails[0].quizName}
            </Typography>
        </Grid>

        {quizDataDetails.map((item,index)=>{
            return(
            <>
            <Grid item xs={12}
            sx = {{
                padding : '24px 0px',
            }}
         >
            <Typography>
            {quizDataDetails[index].question_number}.{quizDataDetails[index].question}
            </Typography>
        </Grid>        

        <Grid item xs={12} 
            container 
            sx = {{
            }}
        
        >
            <Grid xs={12} sm={6}>
                <Grid
                sx = {{
                    marginRight: '20px',
                    borderRadius: '8px',
                    padding : '8px 16px',
                    //marginRight : '16px',
                    backgroundColor : theme.Colors.whiteLightGrey,
                    display : 'flex',
                    alignItems : "center" ,  
                    border : parseInt(item.answer)=== 1? '1px solid ' : '' || parseInt(item.userAnswer)=== 1? '1px solid ' : '',
                    borderColor : parseInt(item.answer)=== 1 ? theme.Colors.darkGreen : '' || parseInt(item.userAnswer)=== 1? theme.Colors.redPrimary : '',        
                }}
            >
                <Typography>
                    1.{quizDataDetails[index].option_1}
                </Typography>
                </Grid>
            </Grid>
            <Grid xs={12} sm={6}
             sx = {{
                borderRadius: '8px',
                padding : '8px 16px',
                backgroundColor : theme.Colors.whiteLightGrey,
                display : 'flex',
                alignItems : "center" ,   
                border : parseInt(item.answer)=== 2? '1px solid ' : '' || parseInt(item.userAnswer)=== 2? '1px solid ' : '',
                borderColor : parseInt(item.answer)=== 2 ? theme.Colors.darkGreen : '' || parseInt(item.userAnswer)=== 2? theme.Colors.redPrimary : '',       
            }}
            >
                <Typography>
                    2.{quizDataDetails[index].option_2}
                </Typography>
            </Grid>
            <Grid xs={12} sm={6}>
                <Grid
             sx = {{
                marginRight: '20px',
                borderRadius: '8px',
                padding : '8px 16px',
                backgroundColor : theme.Colors.whiteLightGrey,
                display : 'flex',
                alignItems : "center" ,  
                marginTop : '20px',
                border : parseInt(item.answer)=== 3? '1px solid ' : '' || parseInt(item.userAnswer)=== 3? '1px solid ' : '',
                borderColor : parseInt(item.answer)=== 3 ? theme.Colors.darkGreen : '' || parseInt(item.userAnswer)=== 3? theme.Colors.redPrimary : '',      
            }}
            >
                <Typography>
                    3.{quizDataDetails[index].option_3}
                </Typography>
            </Grid>
            </Grid>

            <Grid xs={12} sm={6}
             sx = {{
                borderRadius: '8px',
                padding : '8px 16px',
                backgroundColor : theme.Colors.whiteLightGrey,
                display : 'flex',
                alignItems : "center" ,
                marginTop : '20px', 
                border : parseInt(item.answer)=== 4? '1px solid ' : '' || parseInt(item.userAnswer)=== 4? '1px solid ' : '',
                borderColor : parseInt(item.answer)=== 4 ? theme.Colors.darkGreen : '' || parseInt(item.userAnswer)=== 4? theme.Colors.redPrimary : '',      
            }}
            >
                <Typography>
                    4.{quizDataDetails[index].option_4}
                </Typography>
            </Grid>
        </Grid>

        <DividerLine 
            marginValue={60} 
            backgroundColor = {theme.Colors.greyLightMedium}
        />
        </>
        )})}
         
        
      </Grid>
    );
};



export default memo(quizPreview);
