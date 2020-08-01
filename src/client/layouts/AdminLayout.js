import React, {useState, useEffect} from 'react';

import 'isomorphic-fetch';

import '../styles/admin-layout.scss';

import Plus from '../icons/Plus';

function ExpandableLi({
  title,
  addable = false,
  AddComponent = () => null,
  children,
}) {
  const [expanded, setExpanded] = useState(false);
  const [adding, setAdding] = useState(false);

  return (
    <li className="expandable--li">
      <div className="header">
        {addable && (
          <Plus onClick={() => setAdding(!adding)} width={25} fill="white" />
        )}
        <span onClick={() => setExpanded(!expanded)}>{title} ›</span>
      </div>
      {adding && <AddComponent />}
      {expanded && children}
    </li>
  );
}

export default function AdminLayout({packages = {dependencies: []}, children}) {
  return (
    <main className="admin--container">
      <aside className="sidebar">
        <nav>
          <ul>
            <ExpandableLi
              title="Scripts"
              addable
              AddComponent={() => {
                return <span>Testing</span>;
              }}
            >
              <ul>
                <li className="inner--li">
                  <span>test-script</span>
                </li>
              </ul>
            </ExpandableLi>

            <ExpandableLi title="NPM Packages">
              <ul>
                {Object.keys(packages.dependencies).map((pack) => {
                  return (
                    <li className="inner--li">
                      <span>{pack}</span>
                      <span>{packages.dependencies[pack]}</span>
                    </li>
                  );
                })}
              </ul>
            </ExpandableLi>
          </ul>
        </nav>
      </aside>
      {children}
    </main>
  );
}
