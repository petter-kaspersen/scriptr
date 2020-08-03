import React, {useCallback} from 'react';

import AdminLayout from '../../src/client/layouts/AdminLayout';

import {useDropzone} from 'react-dropzone';

function AdminScriptView({scripts = []}) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles
      .filter((x) => x.name.endsWith('.zip'))
      .forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result;
          console.log(binaryStr);
        };
        reader.readAsDataURL(file);
      });
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <AdminLayout activePage="settings">
      <div className="p-6 flex justify-center">
        <div className="content--box--scripts" {...getRootProps()}>
          <h1>No scripts found.</h1>
          <p>Upload one now?</p>

          <input {...getInputProps()}></input>
          <span className="upload--button--span">
            {isDragActive ? 'Drop files here...' : 'Drag files here...'}
          </span>
        </div>
      </div>
    </AdminLayout>
  );
}
/*
export default () => {
  return (
    <AdminLayout activePage="settings">

    </AdminLayout>
  )
} */

AdminScriptView.getInitialProps = async (ctx) => {
  return {
    scripts: [],
  };
};

export default AdminScriptView;
