import React, {useCallback} from 'react';

import AdminLayout from '../../src/client/layouts/AdminLayout';

import {useDropzone} from 'react-dropzone';
import apiFetch from '../../src/util/api-fetch';

import RunIcon from '../../src/client/icons/RunIcon';

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
      <div className="p-6">
        {scripts.length == 0 ? (
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
        ) : (
          <table className="table-auto bg-white shadow-md rounded-md min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Script name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Last ran
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {scripts.map((script) => {
                return (
                  <tr>
                    <td className="border px-4 py-2">{script.config.name}</td>
                    <td className="border px-4 py-2">
                      {script.config.description}
                    </td>
                    <td className="border px-4 py-2">
                      {script.config.lastRan === null
                        ? 'Never'
                        : new Date(script.config.lastRan)}
                    </td>
                    <td className="border px-4 py-2">
                      <div className="run--icon">
                        <span>Run script</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/*           <tbody>
            {sortedPackages.length == 0 && (
              <tr>
                <td className="px-4 py-2">No packages installed :-(</td>
              </tr>
            )}
            {sortedPackages.map((pck) => (
              <tr>
                <td className="border px-4 py-2">{pck}</td>
                <td className="border px-4 py-2">{packages[pck]}</td>
                <td className="border px-4 py-2">
                  <a
                    className="text-blue-400 underline"
                    href={`https://www.npmjs.com/package/${pck}`}
                    target="_blank"
                  >
                    https://www.npmjs.com/package/{pck}
                  </a>
                </td>
              </tr>
            ))} */}
          </table>
        )}
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
  const scripts = await apiFetch('scripts');

  return {
    scripts: scripts,
  };
};

export default AdminScriptView;
