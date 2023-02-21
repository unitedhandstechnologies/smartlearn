import { useTheme } from '@material-ui/core';
import { Divider, Grid, styled, Typography } from '@mui/material';

import { memo } from 'react';
import { ChipComp } from 'src/components/MultiSelectChip/ChipComp';

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 500,
  fontFamily: 'Switzer',
  color: '#3C414B',
  margin: theme.spacing(1.5, 0)
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 500,
  fontFamily: 'Switzer',
  color: '#3C414B',
  margin: theme.spacing(1.5, 0)
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}));

const AddAndSubtract = styled(Grid)(({ theme }) => ({
  backgroundColor: '#F2F4F7',
  borderRadius: '50%',
  padding: '1px 7px 1px 7px',
  fontFamily: 'Switzer',
  color: '#3C414B'
}));

const RightContainer = () => {
  const theme = useTheme();
  return (
    <Grid
      style={{
        alignItems: 'center',
        border: '1px solid',
        marginLeft: '35%',
        borderColor: '#3C78F0',
        borderRadius: 8,
        width: '373px',
        padding: theme.spacing(2, 3)
      }}
    >
      <Typography
        style={{
          fontSize: 24,
          fontWeight: 500,
          fontFamily: 'IBM Plex Serif',
          padding: theme.spacing(1.5, 0),
          color: '#3C414B'
        }}
      >
        Summary
      </Typography>
      <Typography
        style={{
          fontSize: 16,
          padding: theme.spacing(1.5, 0),
          color: '#78828C'
        }}
      >
        Items:
      </Typography>
      <Divider />
      <ChipComp
        label={'Course'}
        style={{
          fontSize: 12,
          borderColor: '#3CC878',
          fontFamily: 'Switzer',
          margin: theme.spacing(1.5, 0),
          color: '#78828C'
        }}
      />
      <StyledGrid sx={{ gap: 10 }}>
        <StyledTypography>Basics of Stock Market investments</StyledTypography>
        <StyledTypography>₹4,500</StyledTypography>
      </StyledGrid>
      <StyledGrid>
        <StyledTypography>No. of Seats</StyledTypography>
        <StyledGrid sx={{ margin: theme.spacing(1.5, 0) }}>
          <AddAndSubtract>-</AddAndSubtract>
          <Typography
            style={{
              border: '1px solid',
              borderColor: '#3C78F0',
              borderRadius: 4,
              padding: '1px 8px 1px 8px',
              fontFamily: 'Switzer',
              color: '#3C414B',
              margin: theme.spacing(0, 1)
            }}
          >
            1
          </Typography>
          <AddAndSubtract>+</AddAndSubtract>
        </StyledGrid>
      </StyledGrid>
      <TypographyStyled>Pricing:</TypographyStyled>
      <Divider />
      <StyledGrid>
        <TypographyStyled>Item(s):</TypographyStyled>
        <TypographyStyled>2 x ₹4,500</TypographyStyled>
      </StyledGrid>
      <StyledGrid>
        <TypographyStyled>Additional tax:</TypographyStyled>
        <TypographyStyled>₹450</TypographyStyled>
      </StyledGrid>
      <Divider />
      <StyledGrid>
        <Typography
          style={{
            fontSize: 24,
            fontWeight: 400,
            fontFamily: 'Switzer',
            color: '#3C414B',
            margin: theme.spacing(1.5, 0)
          }}
        >
          Subtotal:
        </Typography>
        <Typography
          style={{
            fontSize: 24,
            fontWeight: 600,
            fontFamily: 'Switzer',
            color: '#3C414B',
            margin: theme.spacing(1.5, 0)
          }}
        >
          ₹4,950
        </Typography>
      </StyledGrid>
    </Grid>
  );
};
export default memo(RightContainer);
