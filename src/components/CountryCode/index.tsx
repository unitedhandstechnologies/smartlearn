import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography, Grid, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    height: 46
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 100
  },
  code: {
    minWidth: 40,
    borderRight: '1px solid #3C78F0',
    paddingRight: 8,
    marginRight: 8
  },
  required: {
    color: theme.Colors.redPrimary,
    fontWeight: theme.fontWeight.bold
  },
  customSelect: {
    width: 75,
    height: 46,
    border: '1px solid #3C78F0',
    //borderColor: '#3C78F0',
    '& .code': {
      borderRight: 'none',
      paddingRight: 0,
      marginRight: 0,
      borderColor: '#3C78F0'
    },
    '& .country': {
      display: 'none'
    }
  }
}));
type Props = {
  inputLabel?: string;
  labelColor?: string;
  handleChange?: (event: any) => void;
  isError?: boolean;
  required?: boolean;
  value?: string;
};
export default function CountryCode(props: Props) {
  const {
    inputLabel,
    labelColor,
    handleChange,
    isError,
    required,
    value,
    ...rest
  } = props;
  const classes = useStyles();
  const theme: Theme = useTheme();

  return (
    <Grid container direction="column">
      {inputLabel && (
        <Typography
          style={{
            color:
              (isError && theme.Colors.redPrimary) ||
              labelColor ||
              theme.Colors.primary,
            fontWeight: theme.fontWeight.medium
          }}
        >
          {inputLabel}
          {required && <span className={classes.required}>&nbsp;*</span>}
        </Typography>
      )}
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl} variant="outlined">
          <Select
            value={value}
            onChange={handleChange}
            inputProps={{
              name: 'code',
              id: 'age-simple'
            }}
            className={classes.customSelect}
            style={{
              borderColor: isError && 'red'
            }}
            {...rest}
          >
            <MenuItem value={91}>
              <span className={`${classes.code} code`}>91</span>
              <span className={`country`}>India</span>
            </MenuItem>
            <MenuItem value={61}>
              <span className={`${classes.code} code`}>61</span>
              <span className={`country`}>Australia</span>
            </MenuItem>
            <MenuItem value={43}>
              <span className={`${classes.code} code`}>43</span>
              <span className={`country`}>Austria</span>
            </MenuItem>
            {/* <MenuItem value={0}>
              <span className={`${classes.code} code`}>93</span>
              <span className={`country`}>Afghanistan</span>
            </MenuItem>
            <MenuItem value={1}>
              <span className={`${classes.code} code`}>355</span>
              <span className={`country`}>Albania</span>
            </MenuItem>
            <MenuItem value={2}>
              <span className={`${classes.code} code`}>213</span>
              <span className={`country`}>Algeria</span>
            </MenuItem>
            <MenuItem value={3}>
              <span className={`${classes.code} code`}>1-684</span>
              <span className={`country`}>American Samoa</span>
            </MenuItem>
            <MenuItem value={4}>
              <span className={`${classes.code} code`}>376</span>
              <span className={`country`}>Andorra</span>
            </MenuItem>
            <MenuItem value={5}>
              <span className={`${classes.code} code`}>244</span>
              <span className={`country`}>Angola</span>
            </MenuItem>
            <MenuItem value={6}>
              <span className={`${classes.code} code`}>1-264</span>
              <span className={`country`}>Anguilla</span>
            </MenuItem>
            <MenuItem value={7}>
              <span className={`${classes.code} code`}>672</span>
              <span className={`country`}>Antarctica</span>
            </MenuItem>
            <MenuItem value={8}>
              <span className={`${classes.code} code`}>1-268</span>
              <span className={`country`}>Antigua and Barbuda</span>
            </MenuItem>
            <MenuItem value={9}>
              <span className={`${classes.code} code`}>54</span>
              <span className={`country`}>Argentina</span>
            </MenuItem>
            <MenuItem value={10}>
              <span className={`${classes.code} code`}>374</span>
              <span className={`country`}>Armenia</span>
            </MenuItem>
            <MenuItem value={11}>
              <span className={`${classes.code} code`}>297</span>
              <span className={`country`}>Aruba</span>
            </MenuItem>
            <MenuItem value={12}>
              <span className={`${classes.code} code`}>61</span>
              <span className={`country`}>Australia</span>
            </MenuItem>
            <MenuItem value={13}>
              <span className={`${classes.code} code`}>43</span>
              <span className={`country`}>Austria</span>
            </MenuItem>
            <MenuItem value={14}>
              <span className={`${classes.code} code`}>994</span>
              <span className={`country`}>Azerbaijan</span>
            </MenuItem>
            <MenuItem value={15}>
              <span className={`${classes.code} code`}>1-242</span>
              <span className={`country`}>Bahamas</span>
            </MenuItem>
            <MenuItem value={16}>
              <span className={`${classes.code} code`}>973</span>
              <span className={`country`}>Bahrain</span>
            </MenuItem>
            <MenuItem value={17}>
              <span className={`${classes.code} code`}>880</span>
              <span className={`country`}>Bangladesh</span>
            </MenuItem>
            <MenuItem value={18}>
              <span className={`${classes.code} code`}>1-246</span>
              <span className={`country`}>Barbados</span>
            </MenuItem>
            <MenuItem value={19}>
              <span className={`${classes.code} code`}>375</span>
              <span className={`country`}>Belarus</span>
            </MenuItem>
            <MenuItem value={20}>
              <span className={`${classes.code} code`}>32</span>
              <span className={`country`}>Belgium</span>
            </MenuItem>
            <MenuItem value={21}>
              <span className={`${classes.code} code`}>501</span>
              <span className={`country`}>Belize</span>
            </MenuItem>
            <MenuItem value={22}>
              <span className={`${classes.code} code`}>229</span>
              <span className={`country`}>Benin</span>
            </MenuItem>
            <MenuItem value={23}>
              <span className={`${classes.code} code`}>1-441</span>
              <span className={`country`}>Bermuda</span>
            </MenuItem>
            <MenuItem value={24}>
              <span className={`${classes.code} code`}>975</span>
              <span className={`country`}>Bhutan</span>
            </MenuItem>
            <MenuItem value={25}>
              <span className={`${classes.code} code`}>591</span>
              <span className={`country`}>Bolivia</span>
            </MenuItem>
            <MenuItem value={26}>
              <span className={`${classes.code} code`}>387</span>
              <span className={`country`}>Bosnia and Herzegovina</span>
            </MenuItem>
            <MenuItem value={27}>
              <span className={`${classes.code} code`}>267</span>
              <span className={`country`}>Botswana</span>
            </MenuItem>
            <MenuItem value={28}>
              <span className={`${classes.code} code`}>55</span>
              <span className={`country`}>Brazil</span>
            </MenuItem>
            <MenuItem value={29}>
              <span className={`${classes.code} code`}>246</span>
              <span className={`country`}>British Indian Ocean Territory</span>
            </MenuItem>
            <MenuItem value={30}>
              <span className={`${classes.code} code`}>1-284</span>
              <span className={`country`}>British Virgin Islands</span>
            </MenuItem>
            <MenuItem value={31}>
              <span className={`${classes.code} code`}>673</span>
              <span className={`country`}>Brunei</span>
            </MenuItem>
            <MenuItem value={32}>
              <span className={`${classes.code} code`}>359</span>
              <span className={`country`}>Bulgaria</span>
            </MenuItem>
            <MenuItem value={33}>
              <span className={`${classes.code} code`}>226</span>
              <span className={`country`}>Burkina Faso</span>
            </MenuItem>
            <MenuItem value={34}>
              <span className={`${classes.code} code`}>257</span>
              <span className={`country`}>Burundi</span>
            </MenuItem>
            <MenuItem value={35}>
              <span className={`${classes.code} code`}>855</span>
              <span className={`country`}>Cambodia</span>
            </MenuItem>
            <MenuItem value={36}>
              <span className={`${classes.code} code`}>237</span>
              <span className={`country`}>Cameroon</span>
            </MenuItem>
            <MenuItem value={37}>
              <span className={`${classes.code} code`}>1</span>
              <span className={`country`}>Canada</span>
            </MenuItem>
            <MenuItem value={38}>
              <span className={`${classes.code} code`}>238</span>
              <span className={`country`}>Cape Verde</span>
            </MenuItem>
            <MenuItem value={39}>
              <span className={`${classes.code} code`}>1-345</span>
              <span className={`country`}>Cayman Islands</span>
            </MenuItem>
            <MenuItem value={40}>
              <span className={`${classes.code} code`}>236</span>
              <span className={`country`}>Central African Republic</span>
            </MenuItem>
            <MenuItem value={41}>
              <span className={`${classes.code} code`}>235</span>
              <span className={`country`}>Chad</span>
            </MenuItem>
            <MenuItem value={42}>
              <span className={`${classes.code} code`}>56</span>
              <span className={`country`}>Chile</span>
            </MenuItem>
            <MenuItem value={43}>
              <span className={`${classes.code} code`}>86</span>
              <span className={`country`}>China</span>
            </MenuItem>
            <MenuItem value={44}>
              <span className={`${classes.code} code`}>61</span>
              <span className={`country`}>Christmas Island</span>
            </MenuItem>
            <MenuItem value={45}>
              <span className={`${classes.code} code`}>61</span>
              <span className={`country`}>Cocos Islands</span>
            </MenuItem>
            <MenuItem value={46}>
              <span className={`${classes.code} code`}>57</span>
              <span className={`country`}>Colombia</span>
            </MenuItem>
            <MenuItem value={47}>
              <span className={`${classes.code} code`}>269</span>
              <span className={`country`}>Comoros</span>
            </MenuItem>
            <MenuItem value={48}>
              <span className={`${classes.code} code`}>682</span>
              <span className={`country`}>Cook Islands</span>
            </MenuItem>
            <MenuItem value={49}>
              <span className={`${classes.code} code`}>506</span>
              <span className={`country`}>Costa Rica</span>
            </MenuItem>
            <MenuItem value={50}>
              <span className={`${classes.code} code`}>385</span>
              <span className={`country`}>Croatia</span>
            </MenuItem>
            <MenuItem value={51}>
              <span className={`${classes.code} code`}>53</span>
              <span className={`country`}>Cuba</span>
            </MenuItem>
            <MenuItem value={52}>
              <span className={`${classes.code} code`}>599</span>
              <span className={`country`}>Curacao</span>
            </MenuItem>
            <MenuItem value={53}>
              <span className={`${classes.code} code`}>357</span>
              <span className={`country`}>Cyprus</span>
            </MenuItem>
            <MenuItem value={54}>
              <span className={`${classes.code} code`}>420</span>
              <span className={`country`}>Czech Republic</span>
            </MenuItem>
            <MenuItem value={55}>
              <span className={`${classes.code} code`}>243</span>
              <span className={`country`}>
                Democratic Republic of the Congo
              </span>
            </MenuItem>
            <MenuItem value={56}>
              <span className={`${classes.code} code`}>45</span>
              <span className={`country`}>Denmark</span>
            </MenuItem>
            <MenuItem value={57}>
              <span className={`${classes.code} code`}>253</span>
              <span className={`country`}>Djibouti</span>
            </MenuItem>
            <MenuItem value={58}>
              <span className={`${classes.code} code`}>1-767</span>
              <span className={`country`}>Dominica</span>
            </MenuItem>
            <MenuItem value={59}>
              <span className={`${classes.code} code`}>
                1-809, 1-829, 1-849
              </span>
              <span className={`country`}>Dominican Republic</span>
            </MenuItem>
            <MenuItem value={60}>
              <span className={`${classes.code} code`}>670</span>
              <span className={`country`}>East Timor</span>
            </MenuItem>
            <MenuItem value={61}>
              <span className={`${classes.code} code`}>593</span>
              <span className={`country`}>Ecuador</span>
            </MenuItem>
            <MenuItem value={62}>
              <span className={`${classes.code} code`}>20</span>
              <span className={`country`}>Egypt</span>
            </MenuItem>
            <MenuItem value={63}>
              <span className={`${classes.code} code`}>503</span>
              <span className={`country`}>El Salvador</span>
            </MenuItem>
            <MenuItem value={64}>
              <span className={`${classes.code} code`}>240</span>
              <span className={`country`}>Equatorial Guinea</span>
            </MenuItem>
            <MenuItem value={65}>
              <span className={`${classes.code} code`}>291</span>
              <span className={`country`}>Eritrea</span>
            </MenuItem>
            <MenuItem value={66}>
              <span className={`${classes.code} code`}>372</span>
              <span className={`country`}>Estonia</span>
            </MenuItem>
            <MenuItem value={67}>
              <span className={`${classes.code} code`}>251</span>
              <span className={`country`}>Ethiopia</span>
            </MenuItem>
            <MenuItem value={68}>
              <span className={`${classes.code} code`}>500</span>
              <span className={`country`}>Falkland Islands</span>
            </MenuItem>
            <MenuItem value={69}>
              <span className={`${classes.code} code`}>298</span>
              <span className={`country`}>Faroe Islands</span>
            </MenuItem>
            <MenuItem value={70}>
              <span className={`${classes.code} code`}>679</span>
              <span className={`country`}>Fiji</span>
            </MenuItem>
            <MenuItem value={71}>
              <span className={`${classes.code} code`}>358</span>
              <span className={`country`}>Finland</span>
            </MenuItem>
            <MenuItem value={72}>
              <span className={`${classes.code} code`}>33</span>
              <span className={`country`}>France</span>
            </MenuItem>
            <MenuItem value={73}>
              <span className={`${classes.code} code`}>689</span>
              <span className={`country`}>French Polynesia</span>
            </MenuItem>
            <MenuItem value={74}>
              <span className={`${classes.code} code`}>241</span>
              <span className={`country`}>Gabon</span>
            </MenuItem>
            <MenuItem value={75}>
              <span className={`${classes.code} code`}>220</span>
              <span className={`country`}>Gambia</span>
            </MenuItem>
            <MenuItem value={76}>
              <span className={`${classes.code} code`}>995</span>
              <span className={`country`}>Georgia</span>
            </MenuItem>
            <MenuItem value={77}>
              <span className={`${classes.code} code`}>49</span>
              <span className={`country`}>Germany</span>
            </MenuItem>
            <MenuItem value={78}>
              <span className={`${classes.code} code`}>233</span>
              <span className={`country`}>Ghana</span>
            </MenuItem>
            <MenuItem value={79}>
              <span className={`${classes.code} code`}>350</span>
              <span className={`country`}>Gibraltar</span>
            </MenuItem>
            <MenuItem value={80}>
              <span className={`${classes.code} code`}>30</span>
              <span className={`country`}>Greece</span>
            </MenuItem>
            <MenuItem value={81}>
              <span className={`${classes.code} code`}>299</span>
              <span className={`country`}>Greenland</span>
            </MenuItem>
            <MenuItem value={82}>
              <span className={`${classes.code} code`}>1-473</span>
              <span className={`country`}>Grenada</span>
            </MenuItem>
            <MenuItem value={83}>
              <span className={`${classes.code} code`}>1-671</span>
              <span className={`country`}>Guam</span>
            </MenuItem>
            <MenuItem value={84}>
              <span className={`${classes.code} code`}>502</span>
              <span className={`country`}>Guatemala</span>
            </MenuItem>
            <MenuItem value={85}>
              <span className={`${classes.code} code`}>44-1481</span>
              <span className={`country`}>Guernsey</span>
            </MenuItem>
            <MenuItem value={86}>
              <span className={`${classes.code} code`}>224</span>
              <span className={`country`}>Guinea</span>
            </MenuItem>
            <MenuItem value={87}>
              <span className={`${classes.code} code`}>245</span>
              <span className={`country`}>Guinea-Bissau</span>
            </MenuItem>
            <MenuItem value={88}>
              <span className={`${classes.code} code`}>592</span>
              <span className={`country`}>Guyana</span>
            </MenuItem>
            <MenuItem value={89}>
              <span className={`${classes.code} code`}>509</span>
              <span className={`country`}>Haiti</span>
            </MenuItem>
            <MenuItem value={90}>
              <span className={`${classes.code} code`}>504</span>
              <span className={`country`}>Honduras</span>
            </MenuItem>
            <MenuItem value={91}>
              <span className={`${classes.code} code`}>852</span>
              <span className={`country`}>Hong Kong</span>
            </MenuItem>
            <MenuItem value={92}>
              <span className={`${classes.code} code`}>36</span>
              <span className={`country`}>Hungary</span>
            </MenuItem>
            <MenuItem value={93}>
              <span className={`${classes.code} code`}>354</span>
              <span className={`country`}>Iceland</span>
            </MenuItem>
            <MenuItem value={91}>
              <span className={`${classes.code} code`}>91</span>
              <span className={`country`}>India</span>
            </MenuItem>
            <MenuItem value={95}>
              <span className={`${classes.code} code`}>62</span>
              <span className={`country`}>Indonesia</span>
            </MenuItem>
            <MenuItem value={96}>
              <span className={`${classes.code} code`}>98</span>
              <span className={`country`}>Iran</span>
            </MenuItem>
            <MenuItem value={97}>
              <span className={`${classes.code} code`}>964</span>
              <span className={`country`}>Iraq</span>
            </MenuItem>
            <MenuItem value={98}>
              <span className={`${classes.code} code`}>353</span>
              <span className={`country`}>Ireland</span>
            </MenuItem>
            <MenuItem value={99}>
              <span className={`${classes.code} code`}>44-1624</span>
              <span className={`country`}>Isle of Man</span>
            </MenuItem>
            <MenuItem value={100}>
              <span className={`${classes.code} code`}>972</span>
              <span className={`country`}>Israel</span>
            </MenuItem>
            <MenuItem value={101}>
              <span className={`${classes.code} code`}>39</span>
              <span className={`country`}>Italy</span>
            </MenuItem>
            <MenuItem value={102}>
              <span className={`${classes.code} code`}>225</span>
              <span className={`country`}>Ivory Coast</span>
            </MenuItem>
            <MenuItem value={103}>
              <span className={`${classes.code} code`}>1-876</span>
              <span className={`country`}>Jamaica</span>
            </MenuItem>
            <MenuItem value={104}>
              <span className={`${classes.code} code`}>81</span>
              <span className={`country`}>Japan</span>
            </MenuItem>
            <MenuItem value={105}>
              <span className={`${classes.code} code`}>44-1534</span>
              <span className={`country`}>Jersey</span>
            </MenuItem>
            <MenuItem value={106}>
              <span className={`${classes.code} code`}>962</span>
              <span className={`country`}>Jordan</span>
            </MenuItem>
            <MenuItem value={107}>
              <span className={`${classes.code} code`}>7</span>
              <span className={`country`}>Kazakhstan</span>
            </MenuItem>
            <MenuItem value={108}>
              <span className={`${classes.code} code`}>254</span>
              <span className={`country`}>Kenya</span>
            </MenuItem>
            <MenuItem value={109}>
              <span className={`${classes.code} code`}>686</span>
              <span className={`country`}>Kiribati</span>
            </MenuItem>
            <MenuItem value={110}>
              <span className={`${classes.code} code`}>383</span>
              <span className={`country`}>Kosovo</span>
            </MenuItem>
            <MenuItem value={111}>
              <span className={`${classes.code} code`}>965</span>
              <span className={`country`}>Kuwait</span>
            </MenuItem>
            <MenuItem value={112}>
              <span className={`${classes.code} code`}>996</span>
              <span className={`country`}>Kyrgyzstan</span>
            </MenuItem>
            <MenuItem value={113}>
              <span className={`${classes.code} code`}>856</span>
              <span className={`country`}>Laos</span>
            </MenuItem>
            <MenuItem value={114}>
              <span className={`${classes.code} code`}>371</span>
              <span className={`country`}>Latvia</span>
            </MenuItem>
            <MenuItem value={115}>
              <span className={`${classes.code} code`}>961</span>
              <span className={`country`}>Lebanon</span>
            </MenuItem>
            <MenuItem value={116}>
              <span className={`${classes.code} code`}>266</span>
              <span className={`country`}>Lesotho</span>
            </MenuItem>
            <MenuItem value={117}>
              <span className={`${classes.code} code`}>231</span>
              <span className={`country`}>Liberia</span>
            </MenuItem>
            <MenuItem value={118}>
              <span className={`${classes.code} code`}>218</span>
              <span className={`country`}>Libya</span>
            </MenuItem>
            <MenuItem value={119}>
              <span className={`${classes.code} code`}>423</span>
              <span className={`country`}>Liechtenstein</span>
            </MenuItem>
            <MenuItem value={120}>
              <span className={`${classes.code} code`}>370</span>
              <span className={`country`}>Lithuania</span>
            </MenuItem>
            <MenuItem value={121}>
              <span className={`${classes.code} code`}>352</span>
              <span className={`country`}>Luxembourg</span>
            </MenuItem>
            <MenuItem value={122}>
              <span className={`${classes.code} code`}>853</span>
              <span className={`country`}>Macau</span>
            </MenuItem>
            <MenuItem value={123}>
              <span className={`${classes.code} code`}>389</span>
              <span className={`country`}>Macedonia</span>
            </MenuItem>
            <MenuItem value={124}>
              <span className={`${classes.code} code`}>261</span>
              <span className={`country`}>Madagascar</span>
            </MenuItem>
            <MenuItem value={125}>
              <span className={`${classes.code} code`}>265</span>
              <span className={`country`}>Malawi</span>
            </MenuItem>
            <MenuItem value={126}>
              <span className={`${classes.code} code`}>60</span>
              <span className={`country`}>Malaysia</span>
            </MenuItem>
            <MenuItem value={127}>
              <span className={`${classes.code} code`}>960</span>
              <span className={`country`}>Maldives</span>
            </MenuItem>
            <MenuItem value={128}>
              <span className={`${classes.code} code`}>223</span>
              <span className={`country`}>Mali</span>
            </MenuItem>
            <MenuItem value={129}>
              <span className={`${classes.code} code`}>356</span>
              <span className={`country`}>Malta</span>
            </MenuItem>
            <MenuItem value={130}>
              <span className={`${classes.code} code`}>692</span>
              <span className={`country`}>Marshall Islands</span>
            </MenuItem>
            <MenuItem value={131}>
              <span className={`${classes.code} code`}>222</span>
              <span className={`country`}>Mauritania</span>
            </MenuItem>
            <MenuItem value={132}>
              <span className={`${classes.code} code`}>230</span>
              <span className={`country`}>Mauritius</span>
            </MenuItem>
            <MenuItem value={133}>
              <span className={`${classes.code} code`}>262</span>
              <span className={`country`}>Mayotte</span>
            </MenuItem>
            <MenuItem value={134}>
              <span className={`${classes.code} code`}>52</span>
              <span className={`country`}>Mexico</span>
            </MenuItem>
            <MenuItem value={135}>
              <span className={`${classes.code} code`}>691</span>
              <span className={`country`}>Micronesia</span>
            </MenuItem>
            <MenuItem value={136}>
              <span className={`${classes.code} code`}>373</span>
              <span className={`country`}>Moldova</span>
            </MenuItem>
            <MenuItem value={137}>
              <span className={`${classes.code} code`}>377</span>
              <span className={`country`}>Monaco</span>
            </MenuItem>
            <MenuItem value={138}>
              <span className={`${classes.code} code`}>976</span>
              <span className={`country`}>Mongolia</span>
            </MenuItem>
            <MenuItem value={139}>
              <span className={`${classes.code} code`}>382</span>
              <span className={`country`}>Montenegro</span>
            </MenuItem>
            <MenuItem value={140}>
              <span className={`${classes.code} code`}>1-664</span>
              <span className={`country`}>Montserrat</span>
            </MenuItem>
            <MenuItem value={141}>
              <span className={`${classes.code} code`}>212</span>
              <span className={`country`}>Morocco</span>
            </MenuItem>
            <MenuItem value={142}>
              <span className={`${classes.code} code`}>258</span>
              <span className={`country`}>Mozambique</span>
            </MenuItem>
            <MenuItem value={143}>
              <span className={`${classes.code} code`}>95</span>
              <span className={`country`}>Myanmar</span>
            </MenuItem>
            <MenuItem value={144}>
              <span className={`${classes.code} code`}>264</span>
              <span className={`country`}>Namibia</span>
            </MenuItem>
            <MenuItem value={145}>
              <span className={`${classes.code} code`}>674</span>
              <span className={`country`}>Nauru</span>
            </MenuItem>
            <MenuItem value={146}>
              <span className={`${classes.code} code`}>977</span>
              <span className={`country`}>Nepal</span>
            </MenuItem>
            <MenuItem value={147}>
              <span className={`${classes.code} code`}>31</span>
              <span className={`country`}>Netherlands</span>
            </MenuItem>
            <MenuItem value={148}>
              <span className={`${classes.code} code`}>599</span>
              <span className={`country`}>Netherlands Antilles</span>
            </MenuItem>
            <MenuItem value={149}>
              <span className={`${classes.code} code`}>687</span>
              <span className={`country`}>New Caledonia</span>
            </MenuItem>
            <MenuItem value={150}>
              <span className={`${classes.code} code`}>64</span>
              <span className={`country`}>New Zealand</span>
            </MenuItem>
            <MenuItem value={151}>
              <span className={`${classes.code} code`}>505</span>
              <span className={`country`}>Nicaragua</span>
            </MenuItem>
            <MenuItem value={152}>
              <span className={`${classes.code} code`}>227</span>
              <span className={`country`}>Niger</span>
            </MenuItem>
            <MenuItem value={153}>
              <span className={`${classes.code} code`}>234</span>
              <span className={`country`}>Nigeria</span>
            </MenuItem>
            <MenuItem value={154}>
              <span className={`${classes.code} code`}>683</span>
              <span className={`country`}>Niue</span>
            </MenuItem>
            <MenuItem value={155}>
              <span className={`${classes.code} code`}>850</span>
              <span className={`country`}>North Korea</span>
            </MenuItem>
            <MenuItem value={156}>
              <span className={`${classes.code} code`}>1-670</span>
              <span className={`country`}>Northern Mariana Islands</span>
            </MenuItem>
            <MenuItem value={157}>
              <span className={`${classes.code} code`}>47</span>
              <span className={`country`}>Norway</span>
            </MenuItem>
            <MenuItem value={158}>
              <span className={`${classes.code} code`}>968</span>
              <span className={`country`}>Oman</span>
            </MenuItem>
            <MenuItem value={159}>
              <span className={`${classes.code} code`}>92</span>
              <span className={`country`}>Pakistan</span>
            </MenuItem>
            <MenuItem value={160}>
              <span className={`${classes.code} code`}>680</span>
              <span className={`country`}>Palau</span>
            </MenuItem>
            <MenuItem value={161}>
              <span className={`${classes.code} code`}>970</span>
              <span className={`country`}>Palestine</span>
            </MenuItem>
            <MenuItem value={162}>
              <span className={`${classes.code} code`}>507</span>
              <span className={`country`}>Panama</span>
            </MenuItem>
            <MenuItem value={163}>
              <span className={`${classes.code} code`}>675</span>
              <span className={`country`}>Papua New Guinea</span>
            </MenuItem>
            <MenuItem value={164}>
              <span className={`${classes.code} code`}>595</span>
              <span className={`country`}>Paraguay</span>
            </MenuItem>
            <MenuItem value={165}>
              <span className={`${classes.code} code`}>51</span>
              <span className={`country`}>Peru</span>
            </MenuItem>
            <MenuItem value={166}>
              <span className={`${classes.code} code`}>63</span>
              <span className={`country`}>Philippines</span>
            </MenuItem>
            <MenuItem value={167}>
              <span className={`${classes.code} code`}>64</span>
              <span className={`country`}>Pitcairn</span>
            </MenuItem>
            <MenuItem value={168}>
              <span className={`${classes.code} code`}>48</span>
              <span className={`country`}>Poland</span>
            </MenuItem>
            <MenuItem value={169}>
              <span className={`${classes.code} code`}>351</span>
              <span className={`country`}>Portugal</span>
            </MenuItem>
            <MenuItem value={170}>
              <span className={`${classes.code} code`}>1-787, 1-939</span>
              <span className={`country`}>Puerto Rico</span>
            </MenuItem>
            <MenuItem value={171}>
              <span className={`${classes.code} code`}>974</span>
              <span className={`country`}>Qatar</span>
            </MenuItem>
            <MenuItem value={172}>
              <span className={`${classes.code} code`}>242</span>
              <span className={`country`}>Republic of the Congo</span>
            </MenuItem>
            <MenuItem value={173}>
              <span className={`${classes.code} code`}>262</span>
              <span className={`country`}>Reunion</span>
            </MenuItem>
            <MenuItem value={174}>
              <span className={`${classes.code} code`}>40</span>
              <span className={`country`}>Romania</span>
            </MenuItem>
            <MenuItem value={175}>
              <span className={`${classes.code} code`}>7</span>
              <span className={`country`}>Russia</span>
            </MenuItem>
            <MenuItem value={176}>
              <span className={`${classes.code} code`}>250</span>
              <span className={`country`}>Rwanda</span>
            </MenuItem>
            <MenuItem value={177}>
              <span className={`${classes.code} code`}>590</span>
              <span className={`country`}>Saint Barthelemy</span>
            </MenuItem>
            <MenuItem value={178}>
              <span className={`${classes.code} code`}>290</span>
              <span className={`country`}>Saint Helena</span>
            </MenuItem>
            <MenuItem value={179}>
              <span className={`${classes.code} code`}>1-869</span>
              <span className={`country`}>Saint Kitts and Nevis</span>
            </MenuItem>
            <MenuItem value={180}>
              <span className={`${classes.code} code`}>1-758</span>
              <span className={`country`}>Saint Lucia</span>
            </MenuItem>
            <MenuItem value={181}>
              <span className={`${classes.code} code`}>590</span>
              <span className={`country`}>Saint Martin</span>
            </MenuItem>
            <MenuItem value={182}>
              <span className={`${classes.code} code`}>508</span>
              <span className={`country`}>Saint Pierre and Miquelon</span>
            </MenuItem>
            <MenuItem value={183}>
              <span className={`${classes.code} code`}>1-784</span>
              <span className={`country`}>
                Saint Vincent and the Grenadines
              </span>
            </MenuItem>
            <MenuItem value={184}>
              <span className={`${classes.code} code`}>685</span>
              <span className={`country`}>Samoa</span>
            </MenuItem>
            <MenuItem value={185}>
              <span className={`${classes.code} code`}>378</span>
              <span className={`country`}>San Marino</span>
            </MenuItem>
            <MenuItem value={186}>
              <span className={`${classes.code} code`}>239</span>
              <span className={`country`}>Sao Tome and Principe</span>
            </MenuItem>
            <MenuItem value={187}>
              <span className={`${classes.code} code`}>966</span>
              <span className={`country`}>Saudi Arabia</span>
            </MenuItem>
            <MenuItem value={188}>
              <span className={`${classes.code} code`}>221</span>
              <span className={`country`}>Senegal</span>
            </MenuItem>
            <MenuItem value={189}>
              <span className={`${classes.code} code`}>381</span>
              <span className={`country`}>Serbia</span>
            </MenuItem>
            <MenuItem value={190}>
              <span className={`${classes.code} code`}>248</span>
              <span className={`country`}>Seychelles</span>
            </MenuItem>
            <MenuItem value={191}>
              <span className={`${classes.code} code`}>232</span>
              <span className={`country`}>Sierra Leone</span>
            </MenuItem>
            <MenuItem value={192}>
              <span className={`${classes.code} code`}>65</span>
              <span className={`country`}>Singapore</span>
            </MenuItem>
            <MenuItem value={193}>
              <span className={`${classes.code} code`}>1-721</span>
              <span className={`country`}>Sint Maarten</span>
            </MenuItem>
            <MenuItem value={194}>
              <span className={`${classes.code} code`}>421</span>
              <span className={`country`}>Slovakia</span>
            </MenuItem>
            <MenuItem value={195}>
              <span className={`${classes.code} code`}>386</span>
              <span className={`country`}>Slovenia</span>
            </MenuItem>
            <MenuItem value={196}>
              <span className={`${classes.code} code`}>677</span>
              <span className={`country`}>Solomon Islands</span>
            </MenuItem>
            <MenuItem value={197}>
              <span className={`${classes.code} code`}>252</span>
              <span className={`country`}>Somalia</span>
            </MenuItem>
            <MenuItem value={198}>
              <span className={`${classes.code} code`}>27</span>
              <span className={`country`}>South Africa</span>
            </MenuItem>
            <MenuItem value={199}>
              <span className={`${classes.code} code`}>82</span>
              <span className={`country`}>South Korea</span>
            </MenuItem>
            <MenuItem value={200}>
              <span className={`${classes.code} code`}>211</span>
              <span className={`country`}>South Sudan</span>
            </MenuItem>
            <MenuItem value={201}>
              <span className={`${classes.code} code`}>34</span>
              <span className={`country`}>Spain</span>
            </MenuItem>
            <MenuItem value={202}>
              <span className={`${classes.code} code`}>94</span>
              <span className={`country`}>Sri Lanka</span>
            </MenuItem>
            <MenuItem value={203}>
              <span className={`${classes.code} code`}>249</span>
              <span className={`country`}>Sudan</span>
            </MenuItem>
            <MenuItem value={204}>
              <span className={`${classes.code} code`}>597</span>
              <span className={`country`}>Suriname</span>
            </MenuItem>
            <MenuItem value={205}>
              <span className={`${classes.code} code`}>47</span>
              <span className={`country`}>Svalbard and Jan Mayen</span>
            </MenuItem>
            <MenuItem value={206}>
              <span className={`${classes.code} code`}>268</span>
              <span className={`country`}>Swaziland</span>
            </MenuItem>
            <MenuItem value={207}>
              <span className={`${classes.code} code`}>46</span>
              <span className={`country`}>Sweden</span>
            </MenuItem>
            <MenuItem value={208}>
              <span className={`${classes.code} code`}>41</span>
              <span className={`country`}>Switzerland</span>
            </MenuItem>
            <MenuItem value={209}>
              <span className={`${classes.code} code`}>963</span>
              <span className={`country`}>Syria</span>
            </MenuItem>
            <MenuItem value={210}>
              <span className={`${classes.code} code`}>886</span>
              <span className={`country`}>Taiwan</span>
            </MenuItem>
            <MenuItem value={211}>
              <span className={`${classes.code} code`}>992</span>
              <span className={`country`}>Tajikistan</span>
            </MenuItem>
            <MenuItem value={212}>
              <span className={`${classes.code} code`}>255</span>
              <span className={`country`}>Tanzania</span>
            </MenuItem>
            <MenuItem value={213}>
              <span className={`${classes.code} code`}>66</span>
              <span className={`country`}>Thailand</span>
            </MenuItem>
            <MenuItem value={214}>
              <span className={`${classes.code} code`}>228</span>
              <span className={`country`}>Togo</span>
            </MenuItem>
            <MenuItem value={215}>
              <span className={`${classes.code} code`}>690</span>
              <span className={`country`}>Tokelau</span>
            </MenuItem>
            <MenuItem value={216}>
              <span className={`${classes.code} code`}>676</span>
              <span className={`country`}>Tonga</span>
            </MenuItem>
            <MenuItem value={217}>
              <span className={`${classes.code} code`}>1-868</span>
              <span className={`country`}>Trinidad and Tobago</span>
            </MenuItem>
            <MenuItem value={218}>
              <span className={`${classes.code} code`}>216</span>
              <span className={`country`}>Tunisia</span>
            </MenuItem>
            <MenuItem value={219}>
              <span className={`${classes.code} code`}>90</span>
              <span className={`country`}>Turkey</span>
            </MenuItem>
            <MenuItem value={220}>
              <span className={`${classes.code} code`}>993</span>
              <span className={`country`}>Turkmenistan</span>
            </MenuItem>
            <MenuItem value={221}>
              <span className={`${classes.code} code`}>1-649</span>
              <span className={`country`}>Turks and Caicos Islands</span>
            </MenuItem>
            <MenuItem value={222}>
              <span className={`${classes.code} code`}>688</span>
              <span className={`country`}>Tuvalu</span>
            </MenuItem>
            <MenuItem value={223}>
              <span className={`${classes.code} code`}>1-340</span>
              <span className={`country`}>U.S. Virgin Islands</span>
            </MenuItem>
            <MenuItem value={224}>
              <span className={`${classes.code} code`}>256</span>
              <span className={`country`}>Uganda</span>
            </MenuItem>
            <MenuItem value={225}>
              <span className={`${classes.code} code`}>380</span>
              <span className={`country`}>Ukraine</span>
            </MenuItem>
            <MenuItem value={226}>
              <span className={`${classes.code} code`}>971</span>
              <span className={`country`}>United Arab Emirates</span>
            </MenuItem>
            <MenuItem value={227}>
              <span className={`${classes.code} code`}>44</span>
              <span className={`country`}>United Kingdom</span>
            </MenuItem>
            <MenuItem value={228}>
              <span className={`${classes.code} code`}>1</span>
              <span className={`country`}>United States</span>
            </MenuItem>
            <MenuItem value={229}>
              <span className={`${classes.code} code`}>598</span>
              <span className={`country`}>Uruguay</span>
            </MenuItem>
            <MenuItem value={230}>
              <span className={`${classes.code} code`}>998</span>
              <span className={`country`}>Uzbekistan</span>
            </MenuItem>
            <MenuItem value={231}>
              <span className={`${classes.code} code`}>678</span>
              <span className={`country`}>Vanuatu</span>
            </MenuItem>
            <MenuItem value={232}>
              <span className={`${classes.code} code`}>379</span>
              <span className={`country`}>Vatican</span>
            </MenuItem>
            <MenuItem value={233}>
              <span className={`${classes.code} code`}>58</span>
              <span className={`country`}>Venezuela</span>
            </MenuItem>
            <MenuItem value={234}>
              <span className={`${classes.code} code`}>84</span>
              <span className={`country`}>Vietnam</span>
            </MenuItem>
            <MenuItem value={235}>
              <span className={`${classes.code} code`}>681</span>
              <span className={`country`}>Wallis and Futuna</span>
            </MenuItem>
            <MenuItem value={236}>
              <span className={`${classes.code} code`}>212</span>
              <span className={`country`}>Western Sahara</span>
            </MenuItem>
            <MenuItem value={237}>
              <span className={`${classes.code} code`}>967</span>
              <span className={`country`}>Yemen</span>
            </MenuItem>
            <MenuItem value={238}>
              <span className={`${classes.code} code`}>260</span>
              <span className={`country`}>Zambia</span>
            </MenuItem>
            <MenuItem value={239}>
              <span className={`${classes.code} code`}>263</span>
              <span className={`country`}>Zimbabwe</span>
            </MenuItem> */}
          </Select>
        </FormControl>
      </form>
    </Grid>
  );
}
