'use client';

import React from 'react';
import api from '#apis/api';
import { SemantleHistory } from '@prisma/client';

export interface HistoryProps {
  id: number;
}

export default function History({ id }: HistoryProps) {
  const [data, setData] = React.useState<SemantleHistory[]>([]);

  function getData() {
    api
      .get<SemantleHistory[]>(`/api/semantle/${id}/history`)
      .then(({ data: responseData }) => setData(responseData));
  }
  React.useEffect(() => {
    getData();
    const interval = setInterval(getData, 1000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        {data
          .sort((a, b) => b.sim - a.sim)
          .map((semantleHistory) => {
            return (
              <tr key={`Semantle-History${semantleHistory.id}`}>
                <td className="text-left p-2">{semantleHistory.id}</td>
                <td className="text-left p-2">{semantleHistory.name}</td>
                <td className="text-left p-2">{semantleHistory.guess}</td>
                <td className="text-left p-2">
                  {(semantleHistory.sim * 100).toFixed(4)}
                </td>
                <td className="text-left p-2">{semantleHistory.rank}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
