import React, { useState } from 'react';

export default function Tablelist() {
  const [books] = useState([
    {
      id: 1,
      judul: 'Petualangan Adi dan Adam',
      penulis: 'Riki Pratama',
      aliran: 'Fiksi',
      jenis: 'Pelajaran',
      lokasi: 'TBM Kantor Kelurahan'
    },
    {
      id: 2,
      judul: 'Lima Sekawan Kendaraan',
      penulis: 'Roihan Afifi',
      aliran: 'Fiksi',
      jenis: 'Novel',
      lokasi: 'TBM Kantor Kelurahan'
    },
    {
      id: 3,
      judul: 'Ollie Si Anjing Super',
      penulis: 'Aphrodity Jazzy',
      aliran: 'Non Fiksi',
      jenis: 'Non Fiksi',
      lokasi: 'TBM RW 02'
    }
  ]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-500">
                Judul
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">
                Penulis
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">
                Aliran
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">
                Jenis
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">
                Lokasi
              </th>
              <th className="px-6 py-3 text-right font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{book.judul}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{book.penulis}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{book.aliran}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{book.jenis}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{book.lokasi}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}