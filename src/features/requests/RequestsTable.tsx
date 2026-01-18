import { useMemo, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import RequestsToolbar, { FiltersState } from './RequestsToolbar';
import { requestsMock } from './requests.mock';
import type { Direction, RequestRow } from './requests.types';
import { baseRow, uniq } from './requests.constants';
import { requestColumns } from './requests.grid';
import './RequestsTable.less';

const match = (hay: string, needle: string) => hay.toLowerCase().includes(needle);

export default function RequestsTable() {
  const [rows, setRows] = useState<RequestRow[]>(requestsMock);
  const [filters, setFilters] = useState<FiltersState>({
    query: '',
    direction: '',
    status: '',
    objectType: '',
    showClosed: false,
  });

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const directions = useMemo(() => uniq(rows.map((r) => r.direction)) as Direction[], [rows]);
  const statuses = useMemo(() => uniq(rows.map((r) => r.requestStatus)), [rows]);
  const objectTypes = useMemo(() => uniq(rows.map((r) => r.objectType)), [rows]);

  const filteredRows = useMemo(() => {
    const q = filters.query.trim().toLowerCase();

    return rows.filter((r) => {
      if (!filters.showClosed && r.requestStatus === 'Закрыта') return false;
      if (filters.direction && r.direction !== filters.direction) return false;
      if (filters.status && r.requestStatus !== filters.status) return false;
      if (filters.objectType && r.objectType !== filters.objectType) return false;
      if (!q) return true;

      return (
        match(String(r.requestNo), q) ||
        match(r.companyName, q) ||
        match(r.inn, q) ||
        match(r.responsible, q) ||
        match(r.control || '', q) ||
        match(r.remarks || '', q)
      );
    });
  }, [rows, filters]);

  const onChange = (patch: Partial<FiltersState>) => setFilters((s) => ({ ...s, ...patch }));

  const onCreate = () => {
    const nextNo = Math.max(...rows.map((r) => r.requestNo)) + 1;
    setRows((prev) => [{ id: nextNo, requestNo: nextNo, ...baseRow }, ...prev]);
  };

  const onExportExcel = () => console.log('export', filteredRows);

  return (
    <>
      <RequestsToolbar
        total={filteredRows.length}
        filters={filters}
        directions={directions}
        statuses={statuses}
        objectTypes={objectTypes}
        onChange={onChange}
        onCreate={onCreate}
        onExportExcel={onExportExcel}
      />

      <DataGrid
        className="requestsGrid"
        rows={filteredRows}
        columns={requestColumns}
        disableRowSelectionOnClick
        density="compact"
        pagination
        initialState={{
          sorting: { sortModel: [{ field: 'requestNo', sort: 'asc' }] },
          pagination: { paginationModel: { pageSize: 15, page: 0 } },
          columns: mdDown ? { columnVisibilityModel: { control: false, remarks: false } } : undefined,
        }}
        pageSizeOptions={[10, 15, 20, 50, 100]}
        getRowClassName={(p) => (p.indexRelativeToCurrentPage % 2 === 0 ? 'requestsGrid__row requestsGrid__row--even' : 'requestsGrid__row')}
        sx={{
          '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(0,0,0,0.02)' },
          '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 700 },
          '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': { outline: 'none' },
        }}
      />
    </>
  );
}
