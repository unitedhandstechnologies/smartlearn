import { Grid, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { LineBarIcon } from 'src/Assets';
import { Heading } from 'src/components';
import Faq from './Faq';

// const faq = [
//   {answer:
//       'consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congueconsectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue',
//     question:
//       'Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla ?'
//   },
//   {
//     answer:
//       'consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congueconsectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue',
//     question:
//       'Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla ?'
//   },
//   {
//     answer:
//       'consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congueconsectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue',
//     question:
//       'Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla ?'
//   },
//   ,
//   {
//     answer:
//       'consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congueconsectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue',
//     question:
//       'Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla ?'
//   }
// ];

type FaqProps = {
  faqDetails?: any[];
};
const FAQs = ({ faqDetails }: FaqProps) => {
  const theme = useTheme();
  const [faq, setFaq] = useState([]);
  useEffect(() => {
    if (faqDetails?.length) {
      setFaq(faqDetails);
    } else {
      setFaq([]);
    }
  }, [faqDetails]);
  return (
    <Grid container direction="column">
      <Grid style={{ padding: '0px 0px 20px 0px' }}>
        <Heading
          headingText={'FAQs'}
          headerFontSize={'40px'}
          headerFontWeight={500}
          headingColor={'#3C414B'}
          style={{
            [theme.breakpoints.down('xs')]: {
              fontSize: 15
            }
          }}
        />
        <Grid>
          <img src={LineBarIcon} alt="" />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {faq.map((item, index) => (
          <Faq
            key={index}
            question={item.question}
            answer={item.answer}
            borderTop={index === 0 ? '1px solid #F2F4F7' : 'none'}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default FAQs;
