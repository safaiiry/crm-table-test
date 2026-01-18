import type { RequestRow } from './requests.types';

export const uniq = <T,>(arr: T[]) => Array.from(new Set(arr));

const rub = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

export const formatRub = (value: unknown) => {
  const n = Number(value);
  return Number.isFinite(n) ? rub.format(n) : '—';
};

export const baseRow: Omit<RequestRow, 'id' | 'requestNo'> = {
  direction: 'ЦСО',
  invoiceRequest: 'idle',
  invoicesIssued: '',
  downloadInvoices: false,
  responsible: 'mila',
  companyName: 'Новая организация',
  inn: '0000000000',
  paidKfVv: 0,
  paidKfOdo: 0,
  paidChv: 0,
  paidVst: 0,
  objectType: 'Обычные',
  requestStatus: 'Направлено на проверку',
  documentType: '',
  control: '',
  remarks: '',
  downloadRemarks: false,
  regDate: '01.01',
};
