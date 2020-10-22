import React, {useState} from 'react';

export default function ScriptRow({script}) {
  const [expanded, setExpanded] = useState(true);
  const [running, setRunning] = useState(true);

  return (
    <React.Fragment>
      <tr>
        <td className="border px-4 py-2">{script.config.name}</td>
        <td className="border px-4 py-2">{script.config.description}</td>
        <td className="border px-4 py-2">
          {script.config.lastRan === null
            ? 'Never'
            : new Date(script.config.lastRan)}
        </td>
        <td className="border px-4 py-2 flex flex-row">
          <div
            className={`script--button run--button ${
              running ? 'button--disabled' : ''
            }`}
          >
            <span>Run script</span>
          </div>
          <div className="script--button delete--button">
            <span>Delete script</span>
          </div>
          <div
            className="script--button details--button"
            onClick={() =>
              (window.location.href = `/admin/scripts/${script.config.name}`)
            }
          >
            <span>Details</span>
          </div>
        </td>
      </tr>
      {/*       {expanded && (
        <div className="p-6 flex flex-col w-200 details">
          <h2 className="text-xl font-bold">
            Details for {script.config.name}
          </h2>

          <h3 className="text-lg font-bold mt-2 mb-2">Last run stdout:</h3>

          <textarea className="hacker--font  hacker--box w-full">
            {`npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN test-..@1.0.0 No description
npm WARN test-..@1.0.0 No repository field.

+ is-even@1.0.0
added 5 packages from 10 contributors and audited 5 packages in 0.993s
found 0 vulnerabilities`}
          </textarea>
        </div>
      )} */}
    </React.Fragment>
  );
}
