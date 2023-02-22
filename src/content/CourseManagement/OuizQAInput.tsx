import {
    CircularProgress,
    Grid,
    InputAdornment,
    Typography,
    useTheme
  } from '@material-ui/core';
  import React, { useState } from 'react';
  import { toast } from 'react-hot-toast';
  import { TextInputComponent } from 'src/components';
  import { capitalizeFirstLetter } from 'src/Utils';
  import  MultipleSelectComp  from 'src/components/MultipleSelectComp';

  type Props = {
    edit?: any;
    isError?: boolean;
    tabValue?: number;
  };
  
  const required = ({ edit, isError, tabValue }: Props) => {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);

    const answerOptions = [
      { optionId: 1, optionName: 'Option 1' },
      { optionId: 2, optionName: 'Option 2' },
      { optionId: 3, optionName: 'Option 3' },
      { optionId: 4, optionName: 'Option 4' },
    ];

    const getQuestionVal =
      tabValue === 1
        ? edit.getValue('engQuestion')
        : tabValue === 2
        ? edit.getValue('hinQuestion')
        : edit.getValue('gujQuestion');

        
    const getOption1Val =
      tabValue === 1
        ? edit.getValue('engOption1')
        : tabValue === 2
        ? edit.getValue('hinOption1')
        : edit.getValue('gujOption1');
    const getOption2Val =
        tabValue === 1
            ? edit.getValue('engOption2')
            : tabValue === 2
            ? edit.getValue('hinOption2')
            : edit.getValue('gujOption2');
    const getOption3Val =
        tabValue === 1
            ? edit.getValue('engOption3')
            : tabValue === 2
            ? edit.getValue('hinOption3')
            : edit.getValue('gujOption3');
    const getOption4Val =
        tabValue === 1
            ? edit.getValue('engOption4')
            : tabValue === 2
            ? edit.getValue('hinOption4')
            : edit.getValue('gujOption4');
       
    return (
      <Grid container direction="row" spacing={2} style={{ marginTop: '25px' }}>
        <Grid item xs={3}>
          <TextInputComponent
            inputLabel={'Question Number'}
            labelColor={theme.Colors.primary}
            value={edit.getValue('qNumber')}
            onChange={(e) => {
              edit.update({qNumber : e.target.value})
            }}            
            required
            isError={isError && !edit.allFilled('qNumber')}
            helperText={isError && !edit.allFilled('qNumber') && 'Please enter a question number'}
          />
        </Grid>     
        <Grid item xs={9}>
          <TextInputComponent
            inputLabel={'Question'}
            labelColor={theme.Colors.primary}
            value={getQuestionVal}
            required = {tabValue===1}
            onChange={(e) => {
              let value = capitalizeFirstLetter(e.target.value);
              if (tabValue === 1) {
                edit.update({ engQuestion: value });
              } else if (tabValue === 2) {
                edit.update({ hinQuestion: value });
              } else {
                edit.update({ gujQuestion: value });
              }
            }}
            isError={(tabValue===1 && isError && !getQuestionVal) ? true : false}
            helperText={(tabValue===1 && isError && !getQuestionVal) ? "Please enter a question" : ""}
                />
        </Grid>        
        <Grid item xs={6}>
        <TextInputComponent
            inputLabel={'Option 1'}
            labelColor={theme.Colors.primary}
            value={getOption1Val}
            onChange={(e) => {
              let value = capitalizeFirstLetter(e.target.value);
              if (tabValue === 1) {
                edit.update({ engOption1: value });
              } else if (tabValue === 2) {
                edit.update({ hinOption1: value });
              } else {
                edit.update({ gujOption1: value });
              }
            }}
            //isError={lessonError}
            //helperText={lessonError && 'Please enter the Lesson Name'}
          />
        </Grid>
        <Grid item xs={6}>
        <TextInputComponent
            inputLabel={'Option 2'}
            labelColor={theme.Colors.primary}
            value={getOption2Val}
            onChange={(e) => {
              let value = capitalizeFirstLetter(e.target.value);
              if (tabValue === 1) {
                edit.update({ engOption2: value });
              } else if (tabValue === 2) {
                edit.update({ hinOption2: value });
              } else {
                edit.update({ gujOption2: value });
              }
            }}
            //isError={lessonError}
            //helperText={lessonError && 'Please enter the Lesson Name'}
          />
        </Grid>
        <Grid item xs={6}>
        <TextInputComponent
            inputLabel={'Option 3'}
            labelColor={theme.Colors.primary}
            value={getOption3Val}
            onChange={(e) => {
              let value = capitalizeFirstLetter(e.target.value);
              if (tabValue === 1) {
                edit.update({ engOption3: value });
              } else if (tabValue === 2) {
                edit.update({ hinOption3: value });
              } else {
                edit.update({ gujOption3: value });
              }
            }}

          />
        </Grid>
        <Grid item xs={6}>
        <TextInputComponent
            inputLabel={'Option 4'}
            labelColor={theme.Colors.primary}
            value={getOption4Val}
            onChange={(e) => {
              let value = capitalizeFirstLetter(e.target.value);
              if (tabValue === 1) {
                edit.update({ engOption4: value });
              } else if (tabValue === 2) {
                edit.update({ hinOption4: value });
              } else {
                edit.update({ gujOption4: value });
              }
            }}
            //isError={lessonError}
            //helperText={lessonError && 'Please enter the Lesson Name'}
            
          />
        </Grid>
        <Grid item xs={6}>
        <MultipleSelectComp   
            required          
            titleText={'Answer'}          
            selectItems={
              answerOptions.length &&
              answerOptions?.map((item) => ({
                label: item.optionName,
                value: item.optionId
              }))}           
            value={edit.getValue('answer')}
            onChange={(e) => {              
                edit.update({ answer: (e.target.value) });
            }}
            isError={isError && !edit.allFilled('answer')}
            helperText={isError && !edit.allFilled('answer') && 'Please select an answer'}          />
        </Grid>
      </Grid>
    );
  };
  export default React.memo(required);
  