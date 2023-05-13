import React from 'react';

export default function History() {
  return (
    <table width="100%">
      <colgroup>
        <col width={70} />
        <col width={200} />
        <col width={150} />
        <col width={100} />
        <col />
      </colgroup>
      <thead>
        <tr className="border-b">
          <th className="text-left p-2">#</th>
          <th className="text-left p-2">Name</th>
          <th className="text-left p-2">Word</th>
          <th className="text-left p-2">Rate</th>
          <th className="text-left p-2">Ranking</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-left p-2">1</td>
          <td className="text-left p-2">Name</td>
          <td className="text-left p-2">Word</td>
          <td className="text-left p-2">0</td>
          <td className="text-left p-2">1</td>
        </tr>
        <tr>
          <td className="text-left p-2">2</td>
          <td className="text-left p-2">Name</td>
          <td className="text-left p-2">Word</td>
          <td className="text-left p-2">0</td>
          <td className="text-left p-2">1</td>
        </tr>
        <tr>
          <td className="text-left p-2">3</td>
          <td className="text-left p-2">Name</td>
          <td className="text-left p-2">Word</td>
          <td className="text-left p-2">0</td>
          <td className="text-left p-2">1</td>
        </tr>
        <tr>
          <td className="text-left p-2">4</td>
          <td className="text-left p-2">Name</td>
          <td className="text-left p-2">Word</td>
          <td className="text-left p-2">0</td>
          <td className="text-left p-2">1</td>
        </tr>
      </tbody>
    </table>
  );
}
