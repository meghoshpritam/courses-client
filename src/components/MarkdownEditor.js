import React from 'react';
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

export default () => {
  return (
    <SunEditor
      setOptions={{
        height: '90vh',
        buttonList: buttonList.complex,
        callBackSave: (e) => {
          console.log('.cakk', e);
        },
      }}
    />
  );
};
