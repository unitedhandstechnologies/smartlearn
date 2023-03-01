import { useTheme } from '@material-ui/core';
import { Grid } from '@mui/material';
import React from 'react';
import { LineBarIcon } from 'src/Assets';
import { Heading, TextInputComponent } from 'src/components';
import { useEdit } from 'src/hooks/useEdit';

const CheckoutScreen = () => {
  const theme = useTheme();
  const initialValues = {
    first_name: '',
    last_name: '',
    full_address: '',
    state: '',
    city: '',
    zipcode: ''
  };
  const edit = useEdit(initialValues);
  const handleChange = () => {};
  return (
    <Grid container direction={'column'}>
      <Grid item>
        <Heading
          headingText={'Checkout'}
          headerFontSize={'32px'}
          headerFontWeight={500}
          headingColor={'#3C414B'}
          headerFontFamily={'IBM Plex Serif'}
          style={{
            [theme.breakpoints.down('xs')]: {
              fontSize: 15
            }
          }}
        />
        <img src={LineBarIcon} />
      </Grid>
      <Grid item>
        <Heading
          headingText={'Billing Address'}
          headerFontSize={'24px'}
          headerFontWeight={500}
          headingColor={'#3C414B'}
          headerFontFamily={'IBM Plex Serif'}
        />
      </Grid>
      <Grid container spacing={2} item>
        <Grid item xs>
          <TextInputComponent
            inputLabel="First Name"
            labelColor={'#78828C'}
            borderColor={'#3C78F0'}
            value={edit.getValue('first_name')}
            inputRef={(ele) => {
              if (ele) {
                ele.focus();
              }
            }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs>
          <TextInputComponent
            inputLabel="Last Name"
            labelColor={'#78828C'}
            borderColor={'#3C78F0'}
            value={edit.getValue('last_name')}
            inputRef={(ele) => {
              if (ele) {
                ele.focus();
              }
            }}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid item>
        <TextInputComponent
          inputLabel="Address"
          labelColor={'#78828C'}
          borderColor={'#3C78F0'}
          value={edit.getValue('full_adress')}
          inputRef={(ele) => {
            if (ele) {
              ele.focus();
            }
          }}
          onChange={handleChange}
        />
      </Grid>
      <Grid container spacing={2} item>
        <Grid item xs>
          <TextInputComponent
            inputLabel="City"
            labelColor={'#78828C'}
            borderColor={'#3C78F0'}
            value={edit.getValue('city')}
            inputRef={(ele) => {
              if (ele) {
                ele.focus();
              }
            }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextInputComponent
            inputLabel="State"
            labelColor={'#78828C'}
            borderColor={'#3C78F0'}
            value={edit.getValue('state')}
            inputRef={(ele) => {
              if (ele) {
                ele.focus();
              }
            }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextInputComponent
            inputLabel="Zipcode"
            labelColor={'#78828C'}
            borderColor={'#3C78F0'}
            value={edit.getValue('zipcode')}
            inputRef={(ele) => {
              if (ele) {
                ele.focus();
              }
            }}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckoutScreen;
