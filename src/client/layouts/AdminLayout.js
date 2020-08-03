import React, {useState, useEffect} from 'react';

import 'isomorphic-fetch';

import Plus from '../icons/Plus';
import FilledHeart from '../icons/FilledHeart';

import Link from 'next/link';

import getConfig from 'next/config';

export default ({children, activePage = ''}) => {
  const {publicRuntimeConfig} = getConfig();
  console.log(publicRuntimeConfig);
  return (
    <React.Fragment>
      <header className="p-6 bg-gray-900 text-white flex flex-row">
        <nav className="flex flex-row ml-2">
          <ul className="flex flex-row main--nav">
            <li
              className={`px-5 py-1 ${
                activePage == 'packages' ? 'text-blue-200 underline' : ''
              }`}
            >
              <Link href="/admin/packages">
                <a>Packages</a>
              </Link>
            </li>
            <li
              className={`px-5 py-1 ${
                activePage == 'scripts' ? 'text-blue-200 underline' : ''
              }`}
            >
              <Link href="/admin/scripts">
                <a>Scripts</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="admin--container">{children}</main>
      <footer className="p-6 bg-gray-900 text-white">
        {publicRuntimeConfig.showFooterAttribution && (
          <span className="w-full flex flex-row">
            Made with{' '}
            <span className="mx-2">
              <FilledHeart />
            </span>{' '}
            by Petter Kaspersen
          </span>
        )}
      </footer>
    </React.Fragment>
  );
};
