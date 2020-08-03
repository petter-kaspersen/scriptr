import React, {useState, useEffect} from 'react';
import AdminLayout from '../../src/client/layouts/AdminLayout';

import apiFetch from '../../src/util/api-fetch';

import LargePlus from '../../src/client/icons/LargePlus';

function AdminPackages({packages}) {
  /*   packages = {
    '@zeit/next-sass': '^1.0.1',
    dotenv: '^8.2.0',
    'isomorphic-fetch': '^2.2.1',
    koa: '^2.13.0',
    'koa-bodyparser': '^4.3.0',
    'koa-mount': '^4.0.0',
    'koa-router': '^9.1.0',
    'koa-static': '^5.0.0',
    next: '^9.5.1',
    'node-sass': '^4.14.1',
    'postcss-import': '^12.0.1',
    prismjs: '^1.20.0',
    react: '^16.13.1',
    'react-dom': '^16.13.1',
    'react-simple-code-editor': '^0.11.0',
    rimraf: '^3.0.2',
    sass: '^1.26.10',
  }; */
  const [code, setCode] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [sortedPackages, setSortedPackages] = useState(Object.keys(packages));

  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (searchTerm === '') {
      setSortedPackages(Object.keys(packages));
    } else {
      setSortedPackages(
        Object.keys(packages).filter((pck) =>
          pck.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm]);

  return (
    <AdminLayout activePage="packages" packages={packages}>
      <div className="p-6">
        <h2 className="font-bold text-4xl mb-4">Packages</h2>
        <div className="p-4 bg-gray-100 flex flex-row mb-1 sm:mb-0 items-center select-none">
          {isAdding ? (
            <div className="cancel--icon" onClick={() => setIsAdding(false)}>
              <LargePlus />
            </div>
          ) : (
            <div className="plus--icon" onClick={() => setIsAdding(true)}>
              <LargePlus />
            </div>
          )}
          {!isAdding && (
            <div className="block relative">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-gray-500"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          )}
        </div>
        {!isAdding && (
          <table className="table-auto bg-white shadow-md rounded-md min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Package name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Version
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
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
              ))}
              {/*   <tr>
              <td class="border px-4 py-2">react</td>
              <td class="border px-4 py-2">~0.0.0</td>
              <td class="border px-4 py-2">
                <a className="text-blue-400 underline" href="https://test.com">
                  https://test.com
                </a>
              </td>
            </tr>
            <tr>
              <td class="border px-4 py-2">react-dom</td>
              <td class="border px-4 py-2">~0.0.0</td>
              <td class="border px-4 py-2">
                <a
                  className="text-blue-400 underline"
                  a
                  href="https://test.com"
                >
                  https://test.com
                </a>
              </td>
            </tr>
            <tr>
              <td class="border px-4 py-2">next</td>
              <td class="border px-4 py-2">~0.0.0</td>
              <td class="border px-4 py-2">
                <a className="text-blue-400 underline" href="https://test.com">
                  https://test.com
                </a>
              </td>
            </tr>
            <tr>
              <td class="border px-4 py-2">tailwindcss</td>
              <td class="border px-4 py-2">~0.0.0</td>
              <td class="border px-4 py-2">
                <a className="text-blue-400 underline" href="https://test.com">
                  https://test.com
                </a>
              </td>
            </tr> */}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}

function ContentBox() {
  return (
    <div className="content--box">
      <div className="content--box--header">
        <div className="plus--icon">
          <LargePlus />
        </div>
        <h2>PACKAGES</h2>
      </div>
      <div className="content--row">
        <p className="">Installed:</p>
        <span>130</span>
      </div>
      <div className="content--row">
        <p>Last installed:</p>
        <span>fs ^0.1.0</span>
      </div>
      <button className="lbutton neutral--button">See all</button>
      <button className="lbutton positive--button">Add new</button>
    </div>
  );
}

AdminPackages.getInitialProps = async (ctx) => {
  return {
    packages: {},
  };
  /*   const packages = await apiFetch('packages');

  if (!packages)
    return {
      packages: {dependencies: []},
    };

  return {
    packages: packages || [],
  }; */
};

export default AdminPackages;
