import React, {useState} from 'react';
import AdminLayout from '../../src/client/layouts/AdminLayout';

import Editor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import apiFetch from '../../src/util/api-fetch';

function AdminIndex({packages}) {
  const [code, setCode] = useState('');

  return (
    <AdminLayout activePage="/" packages={packages}>
      <h1>Hello</h1>
    </AdminLayout>
  );
}

AdminIndex.getInitialProps = async (ctx) => {
  const packages = await apiFetch('packages');

  if (!packages)
    return {
      packages: {dependencies: []},
    };

  return {
    packages: packages || [],
  };
};

export default AdminIndex;
