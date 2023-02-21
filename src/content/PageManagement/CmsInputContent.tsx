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

const CmsInputContent = ({
  edit,
  isError,
  tabValue,
  types,
  type,
}: Props) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
 
  const getName =
    tabValue === 1
      ? edit.getValue('nameEnglish')
      : tabValue === 2
      ? edit.getValue('nameHindi')
      : edit.getValue('nameGujarati');

    const getTitle =
    tabValue === 1
    ? edit.getValue('titleEnglish')
    : tabValue === 2
    ? edit.getValue('titleHindi')
    : edit.getValue('titleGujarati');

    const getKeywords =
    tabValue === 1
    ? edit.getValue('keywordsEnglish')
    : tabValue === 2
    ? edit.getValue('keywordsHindi')
    : edit.getValue('keywordsGujarati');

    const getDescription =
    tabValue === 1
    ? edit.getValue('descriptionEnglish')
    : tabValue === 2
    ? edit.getValue('descriptionHindi')
    : edit.getValue('descriptionGujarati');

    const getPage =
    tabValue === 1
    ? edit.getValue('pageEnglish')
    : tabValue === 2
    ? edit.getValue('pageHindi')
    : edit.getValue('pageGujarati');

   const sortError = isError && !edit.getValue('sort_no');
   const nameError = isError && !edit.getValue('nameEnglish');
   const titleError = isError && !edit.getValue('titleEnglish');
   const pageContentError = isError && !edit.getValue('pageEnglish');

 
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
        <Grid item xs={6}>
        <TextInputComponent
          inputLabel={'Name'}
          labelColor={theme.Colors.primary}
          value={getName}
          onChange={(e) => {
            let value = capitalizeFirstLetter(e.target.value);
            if (tabValue === 1) {
              edit.update({ nameEnglish: value });
            } else if (tabValue === 2) {
              edit.update({ nameHindi: value });
            } else {
              edit.update({ nameGujarati: value });
            }
          }}
          isError = {nameError}
          helperText = {nameError ? "Please enter the Name" : ""}
          required
        />
      </Grid>

      <Grid item xs={6}>
        <TextInputComponent
          inputLabel={'Title'}
          labelColor={theme.Colors.primary}
          value={getTitle}
          onChange={(e) => {
            let value = capitalizeFirstLetter(e.target.value);
            if (tabValue === 1) {
              edit.update({ titleEnglish: value });
            } else if (tabValue === 2) {
              edit.update({ titleHindi: value });
            } else {
              edit.update({ titleGujarati: value });
            }
          }}
          required
          isError = {titleError}
          helperText = {titleError ? "Please enter the Title" : ""}
        />
      </Grid>      
      <Grid item xs={6}>
        <TextInputComponent
          inputLabel={'Keywords'}
          labelColor={theme.Colors.primary}
          value={getKeywords}
          onChange={(e) => {
            let value = capitalizeFirstLetter(e.target.value);
            if (tabValue === 1) {
              edit.update({ keywordsEnglish: value });
            } else if (tabValue === 2) {
              edit.update({ keywordsHindi: value });
            } else {
              edit.update({ keywordsGujarati: value });
            }
          }}
        />
      </Grid>           
      <Grid item xs={6}>
        <TextInputComponent
          inputLabel={'Description'}
          labelColor={theme.Colors.primary}
          value={getDescription}
          onChange={(e) => {
            let value = capitalizeFirstLetter(e.target.value);
            if (tabValue === 1) {
              edit.update({ descriptionEnglish: value });
            } else if (tabValue === 2) {
              edit.update({ descriptionHindi: value });
            } else {
              edit.update({ descriptionGujarati: value });
            }
          }}
        />
      </Grid>     
      <Grid item xs={12}>
        <RichTextInput
          value={getPage}
          onChange={(value) => {
            if (tabValue === 1) {
              edit.update({ pageEnglish: value });
            } else if (tabValue === 2) {
              edit.update({ pageHindi: value });
            } else {
              edit.update({ pageGujarati: value });
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
export default React.memo(CmsInputContent);
