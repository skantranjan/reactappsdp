import React, { useState } from 'react';
import Layout from '../components/Layout';

const mockYears = ['2022', '2023', '2024'];
const mockDummy = ['Option 1', 'Option 2', 'Option 3'];
const mockTableData = [
  { id: 1, name: 'Item 1', year: '2022', dummy: 'Option 1' },
  { id: 2, name: 'Item 2', year: '2023', dummy: 'Option 2' },
  { id: 3, name: 'Item 3', year: '2024', dummy: 'Option 3' },
  { id: 4, name: 'Item 4', year: '2023', dummy: 'Option 1' },
];

const SedForApproval: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDummy, setSelectedDummy] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Filtered data
  const filteredData = mockTableData.filter(row =>
    (selectedYear ? row.year === selectedYear : true) &&
    (selectedDummy ? row.dummy === selectedDummy : true)
  );

  // Select all logic
  const allSelected = filteredData.length > 0 && filteredData.every(row => selectedRows.includes(row.id));
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredData.map(row => row.id));
    } else {
      setSelectedRows(selectedRows.filter(id => !filteredData.some(row => row.id === id)));
    }
  };

  const handleRowSelect = (id: number, checked: boolean) => {
    setSelectedRows(checked ? [...selectedRows, id] : selectedRows.filter(rowId => rowId !== id));
  };

  return (
    <Layout>
      <div className="mainInternalPages" style={{ padding: 40 }}>
        <h1 style={{ color: '#30ea03', marginBottom: 24 }}>Send For Approval</h1>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
          <div>
            <label style={{ fontWeight: 600 }}>Years</label><br />
            <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)} style={{ minWidth: 120, padding: 6 }}>
              <option value="">All</option>
              {mockYears.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontWeight: 600 }}>Dummy Filter</label><br />
            <select value={selectedDummy} onChange={e => setSelectedDummy(e.target.value)} style={{ minWidth: 120, padding: 6 }}>
              <option value="">All</option>
              {mockDummy.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
        {/* Data Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead style={{ background: '#30ea03' }}>
            <tr>
              <th style={{ padding: 8, textAlign: 'center' }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={e => handleSelectAll(e.target.checked)}
                  aria-label="Select All"
                />
              </th>
              <th style={{ padding: 8 }}>Name</th>
              <th style={{ padding: 8 }}>Year</th>
              <th style={{ padding: 8 }}>Dummy</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr><td colSpan={4} style={{ textAlign: 'center', padding: 24 }}>No data available</td></tr>
            ) : (
              filteredData.map(row => (
                <tr key={row.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={e => handleRowSelect(row.id, e.target.checked)}
                      aria-label={`Select row ${row.id}`}
                    />
                  </td>
                  <td style={{ padding: 8 }}>{row.name}</td>
                  <td style={{ padding: 8 }}>{row.year}</td>
                  <td style={{ padding: 8 }}>{row.dummy}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default SedForApproval; 