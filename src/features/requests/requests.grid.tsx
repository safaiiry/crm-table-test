import DownloadRounded from '@mui/icons-material/DownloadRounded';
import { Button, Chip, IconButton } from '@mui/material';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import TextEllipsis from '../../shared/ui/TextEllipsis';
import type { Direction, RequestRow } from './requests.types';
import { formatRub } from './requests.constants';

const center = { align: 'center' as const, headerAlign: 'center' as const };

const dirChipColor = (dir: Direction) => {
  switch (dir) {
    case 'ЦСО': return 'error';
    case 'ССП': return 'primary';
    case 'ИГС': return 'success';
  }
};

const statusChipColor = (status: string) => {
  if (status === 'Закрыта') return 'default';
  if (status === 'В работе') return 'warning';
  if (status === 'С замечаниями') return 'error';
  return 'info';
};

const moneyFormatter = (arg: unknown) => {
  const value =
    arg && typeof arg === 'object' && 'value' in arg
      ? (arg as { value: unknown }).value
      : arg;

  return formatRub(value);
};

const moneyCol = (field: keyof RequestRow, headerName: string): GridColDef<RequestRow> => ({
  field: field as string,
  headerName,
  type: 'number',
  minWidth: 140,
  align: 'right',
  headerAlign: 'right',
  valueFormatter: moneyFormatter,
});

export const requestColumns: GridColDef<RequestRow>[] = [
  // Идентификация
  {
    field: 'requestNo',
    headerName: '№ заявки',
    minWidth: 90,
    sortable: true,
    ...center,
    headerClassName: 'requestsGrid__pin',
    cellClassName: 'requestsGrid__pin',
  },
  {
    ...center,
    field: 'companyName',
    headerName: 'Наименование',
    minWidth: 360,
    flex: 1,
    sortable: true,
    renderCell: (p) => <TextEllipsis value={p.value || ''} align="center" />,
  },
  { ...center, field: 'inn', headerName: 'ИНН', minWidth: 130, sortable: true },

  // Процесс
  {
    ...center,
    field: 'direction',
    headerName: 'Направление',
    minWidth: 120,
    sortable: true,
    renderCell: (p: GridRenderCellParams<RequestRow, Direction>) => (
      <Chip size="small" label={p.value} color={dirChipColor(p.value!)} />
    ),
  },
  {
    ...center,
    field: 'objectType',
    headerName: 'Тип объектов',
    minWidth: 180,
    sortable: true,
    renderCell: (p) => <TextEllipsis value={p.value || ''} align="center" />,
  },
  {
    ...center,
    field: 'requestStatus',
    headerName: 'Статус заявки',
    minWidth: 220,
    sortable: true,
    renderCell: (p) => (
      <Chip size="small" label={p.value} color={statusChipColor(String(p.value))} />
    ),
  },
  { ...center, field: 'responsible', headerName: 'Ответственный', minWidth: 140, sortable: true },
  { ...center, field: 'regDate', headerName: 'Дата регистрации', minWidth: 160, sortable: true },
  {
    ...center,
    field: 'documentType',
    headerName: 'Тип документов',
    minWidth: 180,
    sortable: true,
    renderCell: (p) => <TextEllipsis value={p.value || ''} align="center" />,
  },

  // Финансы
  moneyCol('paidKfVv', 'КФ ВВ оплачено'),
  moneyCol('paidKfOdo', 'КФ ОДО оплачено'),
  moneyCol('paidChv', 'ЧВ оплачено'),
  moneyCol('paidVst', 'ВСТ оплачено'),

  // Счета
  {
    ...center,
    field: 'invoiceRequest',
    headerName: 'Запрос счетов',
    minWidth: 150,
    sortable: false,
    renderCell: (p: GridRenderCellParams<RequestRow, RequestRow['invoiceRequest']>) => (
      <Button
        size="small"
        variant="contained"
        disableElevation
        disabled={p.value === 'requested'}
        onClick={() => console.log('request invoices', p.row.requestNo)}
      >
        {p.value === 'requested' ? 'Запрошено' : 'Запросить'}
      </Button>
    ),
  },
  {
    ...center,
    field: 'invoicesIssued',
    headerName: 'Счета выставлены',
    minWidth: 150,
    sortable: true,
    renderCell: (p) => <TextEllipsis value={p.value || ''} align="center" />,
  },
  {
    ...center,
    field: 'downloadInvoices',
    headerName: 'Скачать счета',
    minWidth: 140,
    sortable: false,
    renderCell: (p: GridRenderCellParams<RequestRow, boolean>) => (
      <IconButton
        size="small"
        disabled={!p.value}
        onClick={() => console.log('download invoices', p.row.requestNo)}
        aria-label="Скачать счета"
      >
        <DownloadRounded fontSize="small" />
      </IconButton>
    ),
  },

  // Контроль / замечания
  {
    ...center,
    field: 'control',
    headerName: 'Контроль',
    minWidth: 260,
    sortable: false,
    renderCell: (p) => <TextEllipsis value={p.value || ''} align="center" />,
  },
  {
    ...center,
    field: 'remarks',
    headerName: 'Замечания',
    minWidth: 240,
    sortable: false,
    renderCell: (p) => <TextEllipsis value={p.value || ''} align="center" />,
  },
  {
    ...center,
    field: 'downloadRemarks',
    headerName: 'Скачать замечание',
    minWidth: 190,
    sortable: false,
    renderCell: (p: GridRenderCellParams<RequestRow, boolean>) => (
      <Button
        size="small"
        variant="outlined"
        disabled={!p.value}
        onClick={() => console.log('download remarks', p.row.requestNo)}
      >
        Скачать
      </Button>
    ),
  },
];
