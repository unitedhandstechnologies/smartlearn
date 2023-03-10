import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { RichTextInput } from 'src/components/RichTextInput';

const useStyles = makeStyles((theme) => ({
  questionStyle: {
    color: '#78828C',
    fontFamily: 'Switzer',
    fontWeight: 500,
    fontSize: '20px',
    cursor: 'pointer'
  },
  activeQuestion: {
    color: '#3C414B',
    fontWeight: 500,
    fontSize: '20px',
    cursor: 'pointer'
  },
  answerStyle: {
    color: '#78828C',
    fontFamily: 'Switzer',
    fontWeight: 400,
    fontSize: '18px'
  },
  iconStyle: {
    color: '#3C78F0',
    cursor: 'pointer'
  }
}));

const Faq = ({ question, answer }) => {
  const classes = useStyles();
  const [active, setActive] = useState<boolean>(false);

  return (
    <Grid container spacing={2} style={{padding: '15px 0px'}}>
      <Grid container item onClick={() => setActive(!active)} >
        <Grid item xs>
          <Typography
            className={!active ? classes.questionStyle : classes.activeQuestion}
          >
            {question}
          </Typography>
        </Grid>
        <Grid item className={classes.iconStyle}>
          {active ? <RemoveIcon fontSize='small'/> : <AddIcon fontSize='small'/>}
        </Grid>
      </Grid>
      {active ? (
        <Grid item>
          {/* <Typography className={classes.answerStyle}>{answer}</Typography> */}
          <RichTextInput value={answer}
        readOnly={true} displayToolBar={"none"} 
        heightValue = {'auto'} borderSize={'0px'}
         />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default Faq;
