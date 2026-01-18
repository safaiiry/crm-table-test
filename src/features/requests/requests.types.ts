export type Direction = 'ЦСО' | 'ССП' | 'ИГС';

export interface RequestRow {
  id: number; 
  requestNo: number;
  direction: Direction;
  invoiceRequest: 'idle' | 'requested';
  invoicesIssued: string; 
  downloadInvoices: boolean;
  responsible: string;
  companyName: string;
  inn: string;
  paidKfVv: number;
  paidKfOdo: number;
  paidChv: number;
  paidVst: number;
  objectType: string;
  requestStatus: string;
  documentType: string;
  control: string;
  remarks: string;
  downloadRemarks: boolean;
  regDate: string; 
}
