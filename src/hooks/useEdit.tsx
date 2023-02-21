import { useState } from 'react';
import { getCurrentFieldValue, isEmpty } from 'src/Utils';

export const useEdit = (initial) => {
  const [edits, setEdits] = useState<any>({});

  const reset = () => {
    setEdits({});
  };

  const update = (values) => {
    setEdits({ ...edits, ...values });
  };

  const allFilled = (...properties) => {
    return !properties.some((e) => !getValue(e));
  };

  const getValue = (field) => {
    return getCurrentFieldValue(initial, edits, field);
  };

  const isAnyModified = () => {
    return !isEmpty(edits);
  };

  return { reset, update, getValue, allFilled, edits, isAnyModified };
};
