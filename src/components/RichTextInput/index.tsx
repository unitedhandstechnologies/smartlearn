import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme
} from '@material-ui/core/styles';
import './quill.css';

export interface StyleProps {
  displayValue: string;
  borderSize: string;
  heightValue: string;
  paddingValue: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  editorRoot: {
    '& .ql-container': {
      fontSize: '18px',
      fontWeight: 400,
      fontFamily: 'Switzer',
      minHeight: ({ heightValue }) => heightValue ?  heightValue : null  },
    '& .ql-toolbar.ql-snow': {
      display: ({ displayValue }) => (displayValue ? displayValue : '')
    },
    '& .ql-container.ql-snow': {
      border: ({ borderSize }) => borderSize
    },
    '& .ql-editor': {
      padding: ({ paddingValue }) => paddingValue
    }
  },
  editorView: {
    '& .ql-toolbar.ql-snow': {
      display: ({ displayValue }) => (displayValue ? displayValue : '')
    }
  }
}));

export const RichTextInput = ({
  onChange,
  value,
  modules,
  readOnly,
  displayToolBar,
  borderSize,
  heightValue,
  paddingValue
}: {
  onChange?: any;
  value: any;
  modules?: any;
  readOnly?: boolean;
  displayToolBar?: string;
  borderSize?: string;
  heightValue?: string;
  paddingValue?: string;
}) => {
  const props = {
    displayValue: displayToolBar,
    borderSize: borderSize,
    heightValue: heightValue,
    paddingValue: paddingValue
  };

  const theme = useTheme();
  const classes = useStyles(props);

  const icons = Quill.import('ui/icons');
  return (
    <div className={classes.editorRoot}>
      <ReactQuill
        onChange={onChange}
        value={value}
        modules={modules}
        readOnly={readOnly}
      />
    </div>
  );
};
