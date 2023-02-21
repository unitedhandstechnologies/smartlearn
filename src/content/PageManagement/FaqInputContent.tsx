import { Grid, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { TextInputComponent } from 'src/components';
import { capitalizeFirstLetter } from 'src/Utils';
import { useTranslation } from 'react-i18next';
import { RichTextInput } from 'src/components/RichTextInput';


type Props = {
  edit?: any;
  isError?: boolean;
  tabValue?: number;
  types?: any;
  type?:any;
};

const FaqInputContent = ({
  edit,
  isError,
  tabValue,
  types,
  type,
}: Props) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
console.log(edit.edits)
  const getQuestions =
    tabValue === 1
      ? edit.getValue('questionEnglish')
      : tabValue === 2
      ? edit.getValue('questionHindi')
      : edit.getValue('questionGujarati');

    const getAnswers =
    tabValue === 1
    ? edit.getValue('answerEnglish')
    : tabValue === 2
    ? edit.getValue('answerHindi')
    : edit.getValue('answerGujarati');

    const sortError = isError && !edit.getValue('sort_no');
   const questionError = isError && !edit.getValue('questionEnglish');
   const answerError = isError && !edit.getValue('answerEnglish');

 
  return (
    <Grid container direction="row" spacing={2} style={{ marginTop: '25px' }}>
        <Grid item xs={12}>
          <TextInputComponent
            inputLabel={'Sort Number'}
            required
            value={edit.getValue('sort_no')}
            onChange={(e) => { edit.update({sort_no : e.target.value }) }}  
            isError = {sortError}
            helperText = {sortError ? "Please enter Sort Number" : ""}           
          />
        </Grid>
        <Grid item xs={12}>
        <TextInputComponent
          inputLabel={'Question'}
          labelColor={theme.Colors.primary}
          value={getQuestions}
          onChange={(e) => {
            let value = capitalizeFirstLetter(e.target.value);
            if (tabValue === 1) {
              edit.update({ questionEnglish: value });
            } else if (tabValue === 2) {
              edit.update({ questionHindi: value });
            } else {
              edit.update({ questionGujarati: value });
            }
          }}
          required
          isError = {questionError}
          helperText = {questionError ? "Please enter the Question" : ""}
        />
      </Grid>

      <Grid item xs={12}>
        <RichTextInput
            value={getAnswers}
            onChange={(value) => {              
              if (tabValue === 1) {
                edit.update({ answerEnglish: value });
              } else if (tabValue === 2) {
                edit.update({ answerHindi: value });
              } else {
                edit.update({ answerGujarati: value });
              }
            }}
            modules={{
              toolbar: {
                container: [
                  "bold",
                  "italic",
                  "underline",
                  { list: "bullet" },
                  { list: "ordered" },
                  { color: [] },                                    
                ],
              },
            }}
            heightValue = {'150px'} 
        />
      </Grid>              
    </Grid>
  );
};
export default React.memo(FaqInputContent);
