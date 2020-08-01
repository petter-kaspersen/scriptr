import React from 'react';
import AdminLayout from '../../src/client/layouts/AdminLayout';

function Packages({packages = []}) {
  return <AdminLayout></AdminLayout>;
}

Packages.getInitialProps = async (ctx) => {
  const rawPackages = {
    '@zeit/next-sass': '^1.0.1',
    dotenv: '^8.2.0',
    'isomorphic-fetch': '^2.2.1',
    koa: '^2.13.0',
    'koa-mount': '^4.0.0',
    'koa-router': '^9.1.0',
    'koa-static': '^5.0.0',
    next: '^9.5.1',
    'node-sass': '^4.14.1',
    prismjs: '^1.20.0',
    react: '^16.13.1',
    'react-dom': '^16.13.1',
    'react-simple-code-editor': '^0.11.0',
    rimraf: '^3.0.2',
  };

  const packages = Object.keys(rawPackages).map((pkg) => {
    return {
      name: pkg,
      version: rawPackages[pkg],
    };
  });

  return {
    packages: packages,
  };
};

export default Packages;
