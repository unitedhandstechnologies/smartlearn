import { Radio, useTheme } from '@material-ui/core';
import { FormControlLabel, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { LineBarIcon, PayTMIcom } from 'src/Assets';
import { ButtonComp, Heading, TextInputComponent } from 'src/components';
import { useEdit } from 'src/hooks/useEdit';
import { capitalizeFirstLetter, isValidPinCode } from 'src/Utils';

const city = [
  {
    id: 1,
    name: 'Bangalore'
  },
  {
    id: 2,
    name: 'Chennai'
  },
  {
    id: 3,
    name: 'Madurai'
  },
  {
    id: 4,
    name: 'Tirunelveli'
  },
  {
    id: 5,
    name: 'Rajapalayam'
  }
];
const CheckoutScreen = ({ total, onClickCheckout }) => {
  const theme = useTheme();
  const [isChecked, setIsChecked] = useState(false);

  const initialValues = {
    first_name: '',
    last_name: '',
    full_address: '',
    state: '',
    city: '',
    pincode: ''
  };
  const edit = useEdit(initialValues);
  const firstNameError = isChecked && !edit.allFilled('first_name');
  const lastNameError = isChecked && !edit.allFilled('last_name');
  const addressError = isChecked && !edit.allFilled('full_address');
  const stateError = isChecked && !edit.allFilled('state');
  const cityError = isChecked && !edit.allFilled('city');
  const pinCodeError =
    (isChecked && !edit.allFilled('pincode')) ||
    (isChecked &&
      edit.allFilled('pincode') &&
      !isValidPinCode(edit.getValue('pincode')));

  const handleChange = (e) => {
    setIsChecked(!isChecked);
  };

  return (
    <Grid container spacing={2} direction={'column'}>
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
            value={edit.getValue('first_name')}
            onChange={(e) => {
              edit.update({
                first_name: capitalizeFirstLetter(e.target.value)
              });
            }}
            isError={firstNameError}
            helperText={firstNameError && 'Please enter the name'}
          />
        </Grid>
        <Grid item xs>
          <TextInputComponent
            inputLabel="Last Name"
            labelColor={'#78828C'}
            value={edit.getValue('last_name')}
            onChange={(e) => {
              edit.update({ last_name: capitalizeFirstLetter(e.target.value) });
            }}
            isError={lastNameError}
            helperText={lastNameError && 'Please enter the name'}
          />
        </Grid>
      </Grid>
      <Grid item>
        <TextInputComponent
          inputLabel="Address"
          placeholder="Your full address"
          labelColor={'#78828C'}
          value={edit.getValue('full_address')}
          onChange={(e) => {
            edit.update({ full_address: e.target.value });
          }}
          isError={addressError}
          helperText={addressError && 'Please enter your full address'}
        />
      </Grid>
      <Grid container spacing={2} item>
        <Grid item xs>
          <TextInputComponent
            inputLabel="City"
            labelColor={'#78828C'}
            value={edit.getValue('city')}
            onChange={(e) => {
              edit.update({ city: capitalizeFirstLetter(e.target.value) });
            }}
            isError={cityError}
            helperText={cityError && 'Please enter your city'}
          />
          {/* <MultipleSelectComp
            titleText={'City'}
            isPlaceholderNone
            labelColor={'#78828C'}
            selectItems={
              city.length &&
              city?.map((item: any) => ({
                label: item.name,
                value: item.id
              }))
            }
            displayEmpty
            renderValue={(value: any) => {
              return value ? value : 'Select';
            }}
            value={edit.getValue('city')}
            onChange={(e) => {
              if (!e.target.value) {
                edit.update({
                  city: '',
                  id: 0
                });
                return;
              }
              let cityName = city.filter((item) => {
                return item.id === Number(e.target.value);
              })[0].name;
              edit.update({
                city: cityName,
                id: Number(e.target.value)
              });
            }}
          /> */}
        </Grid>
        <Grid item>
          <TextInputComponent
            inputLabel="State"
            labelColor={'#78828C'}
            value={edit.getValue('state')}
            onChange={(e) => {
              edit.update({ state: capitalizeFirstLetter(e.target.value) });
            }}
            isError={stateError}
            helperText={stateError && 'Please enter the state'}
          />
        </Grid>
        <Grid item>
          <TextInputComponent
            inputLabel="Zipcode"
            labelColor={'#78828C'}
            value={edit.getValue('pincode')}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                return;
              }
              edit.update({ pincode: e.target.value });
            }}
            helperText={pinCodeError && 'Please enter your valid pincode'}
            isError={pinCodeError}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Heading headingText={'Payment Method'} />
      </Grid>
      <Grid item>
        <Grid
          sx={{
            border: '1px solid #B4BEC8',
            borderRadius: '4px',
            padding: theme.spacing(1, 2)
          }}
        >
          <FormControlLabel
            labelPlacement="end"
            control={<Radio onChange={handleChange} />}
            label={
              <Grid
                sx={{
                  display: 'flex',
                  gap: 1,
                  paddingLeft: theme.spacing(0.5)
                }}
              >
                <img src={PayTMIcom} />
                <Typography>Paytm</Typography>
              </Grid>
            }
          />
        </Grid>
      </Grid>
      <Grid item>
        {isChecked ? (
          <ButtonComp
            buttonText={`Pay ₹${total?.toFixed(2)} and complete checkout`}
            btnWidth={'100%'}
            btnBorderRadius={4}
            buttonFontSize={16}
            buttonFontWeight={theme.fontWeight.regular}
            onClickButton={() => onClickCheckout(total)}
          />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default CheckoutScreen;
