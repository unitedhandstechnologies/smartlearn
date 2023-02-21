import React from 'react';
import { Grid, makeStyles, useTheme } from '@material-ui/core';
import { useEdit } from 'src/hooks/useEdit';
import { TextInputComponent } from 'src/components';

const useStyles = makeStyles(() => ({}));

const TextInputGenerator = ({
  textBoxCount,
  responseData,
  isLesson,
  lessonNumber,
  iconEnd
}:{
textBoxCount,
responseData,
isLesson,
lessonNumber,
iconEnd?:any}
) => {
  const classes = useStyles();
  const theme = useTheme();
  const edit = useEdit(responseData);

  let lessonName = 'Section  ';
  lessonName += lessonNumber;

  const sectionTextGenerator = (textBoxCount) => {
    var sectionTextArray = [];
    for (var i = 1; i <= textBoxCount; i++) {
      let sectionName = 'Lesson  ';
      sectionName += i;
      sectionTextArray.push(<TextInputComponent  iconEnd={iconEnd} inputLabel={sectionName} />);
    }
/*     style = {{"&.MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: "green" } } }} */
    return sectionTextArray;
  };

  return (
    <>
      {isLesson && (
        <Grid container direction="row">
          <TextInputComponent inputWidth={"500px"} inputLabel={lessonName} style={{zIndex:1}} />
        </Grid>
      )}
      {!isLesson && (
        <Grid container direction="row">
          {sectionTextGenerator(textBoxCount)}
        </Grid>
      )}
    </>
  );
};

export default React.memo(TextInputGenerator);
