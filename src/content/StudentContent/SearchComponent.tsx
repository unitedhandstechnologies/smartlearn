import { InputBase, InputAdornment, IconButton } from '@mui/material';
import { CloseIcon, SearchIconImg } from 'src/Assets';
import { makeStyles, useTheme } from '@material-ui/core';
import { capitalizeFirstLetter } from 'src/Utils';

const useStyles = makeStyles((theme) => ({
  emptySearchStyle: {
    width: 45,
    height: 42,
    transition: '0.5s',
    '&:hover': {
      width: 300,
      border: '1px solid #3C78F0',
      borderRadius: 50,
      fontSize: 20,
      fontWeight: 400,
      padding: theme.spacing(0.3, 0.5)
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      border: '1px solid #3C78F0',
      borderRadius: 50,
      fontSize: 16,
      fontWeight: 400,
      padding: theme.spacing(0.3, 0.5)
    }
  },
  nonEmptySearchStyle: {
    height: 45,
    width: 300,
    border: '1px solid #3C78F0',
    borderRadius: 50,
    fontSize: 20,
    fontWeight: 400,
    padding: theme.spacing(0.3, 0.5),
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  }
}));

type Props = {
  onSearchValChange?: (event) => void;
  handleClearSearchValue?: () => void;
  searchval?: string;
};

const SearchComponent = ({
  onSearchValChange,
  searchval,
  handleClearSearchValue
}: Props) => {
  const classes = useStyles();

  return (
    <InputBase
      onChange={(e) => onSearchValChange(capitalizeFirstLetter(e.target.value))}
      value={searchval}
      placeholder={'Search'}
      className={
        searchval !== ''
          ? classes.nonEmptySearchStyle
          : classes.emptySearchStyle
      }
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={handleClearSearchValue} disableRipple>
            <img
              src={searchval === '' ? SearchIconImg : CloseIcon}
              width={searchval === '' ? '40px' : '18px'}
              height={searchval === '' ? '40px' : '18px'}
            />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default SearchComponent;
