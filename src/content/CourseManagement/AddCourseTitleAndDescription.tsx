import { Grid, makeStyles, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { MuiTabComponent, TextInputComponent } from 'src/components';
import { RichTextInput } from 'src/components/RichTextInput';

const useStyles = makeStyles((theme) => ({
  selectedTab: {
    fontWeight: theme.fontWeight.bold,
    color: theme.Colors.secondary
  },
  spacingTop: {
    marginTop: 10
  }
}));

const InputTitleAndDescription = ({ selectedLanguage, edit }) => {
  const theme = useTheme();
  const onChangeInput = (event, field) => {
    let updateIndex = edit
      .getValue('language_details')
      .findIndex((item) => item.language_id === selectedLanguage);

    let data: any = Array.from(edit.getValue('language_details'));
    if (field === 'course_name') {
      data[updateIndex].course_name = event.target.value;
    } else if (field === 'course_description') {
      data[updateIndex].course_description = event.target.value;
    } else {
      data[updateIndex].requirements = event.target.value;
    }
    edit.update({ language_details: [...data] });
  };
  const getInputValues = edit
    .getValue('language_details')
    .filter((item) => item.language_id === selectedLanguage);

  return (
    <>
      <Grid item xs={12}>
        <TextInputComponent
          inputLabel="Course Name"
          placeholderText="Enter Course Name"
          variant="outlined"
          //required={true}
          containerStyle={{
            marginTop: 10
          }}
          value={getInputValues[0]?.course_name}
          onChange={(event) => onChangeInput(event, 'course_name')}
        />
      </Grid>
      <Grid item xs={12}>
        {/* <TextInputComponent
          multiline={true}
          maxRows={4}
          inputHeight={100}
          inputLabel="Description"
          placeholderText="Describe the Course"
          variant="outlined"
          //required={true}
          containerStyle={{
            marginTop: 10
          }}
          value={getInputValues[0]?.course_description}
          onChange={(event) => {
            onChangeInput(event, 'course_description');
          }}
        /> */}
        <RichTextInput
            value={getInputValues[0]?.course_description}
            onChange={(value) => {              
              onChangeInput(value, 'course_description');
            }}
            modules={{
              toolbar: {
                container: [
                  "bold",
                  "italic",
                  // { list: "bullet" },
                  // { list: "ordered" },                                 
                ],
              },
            }}
            heightValue = {'150px'} 
        />
      </Grid>
      <Grid item xs={12}>
        <TextInputComponent
          multiline={true}
          maxRows={2}
          inputHeight={70}
          inputLabel="Requirements"
          placeholderText="Enter the requirements"
          variant="outlined"
          //required={true}
          containerStyle={{
            marginTop: 10
          }}
          value={getInputValues[0]?.requirements}
          onChange={(event) => {
            onChangeInput(event, 'requirements');
          }}
        />
      </Grid>
    </>
  );
};

type Props = {
  edit: any;
};
const AddCourseTitleAndDescription = ({ edit }: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(1);

  const tabItems = [
    {
      label: 'English',
      component: () => (
        <InputTitleAndDescription selectedLanguage={selectedTab} edit={edit} />
      ),
      id: 1
    },
    {
      label: 'Hindi',
      component: () => (
        <InputTitleAndDescription selectedLanguage={selectedTab} edit={edit} />
      ),
      id: 2
    },
    {
      label: 'Gujarati',
      component: () => (
        <InputTitleAndDescription selectedLanguage={selectedTab} edit={edit} />
      ),
      id: 3
    }
  ];

  const onTabChange = (value: any) => {
    setSelectedTab(value);
  };

  const renderTabContent = (tabVal?: any) => {
    const findActiveTab = tabItems.find(({ id }) => id === tabVal);
    return <Grid>{findActiveTab ? findActiveTab.component() : null}</Grid>;
  };

  return (
    <MuiTabComponent
      currentTabVal={selectedTab}
      tabContent={tabItems}
      tabIndicatorColor={theme.Colors.secondary}
      renderTabContent={renderTabContent}
      onTabChange={onTabChange}
      tabClasses={{
        selected: classes.selectedTab
      }}
    />
  );
};

export default AddCourseTitleAndDescription;
