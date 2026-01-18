import { Direction, RequestRow } from './requests.types';

const directions: Direction[] = ['ЦСО', 'ССП', 'ИГС'];
const objectTypes = ['Опасные', 'Обычные', 'Обычные, опасные и атомные'];
const statuses = ['Направлено на проверку', 'В работе', 'С замечаниями', 'Возврат на доработку', 'Закрыта'];
const docTypes = ['', 'Сканы', 'Сканы с замечаниями'];
const responsibles = ['sro_ork', 'mila', 'sro_kim', 'sro_petrov'];

const companies = [
  'НАУЧНО-ПРОИЗВОДСТВЕННАЯ КОРПОРАЦИЯ УРАЛВАГОНЗАВОД',
  'КНИТУ-КАИ (КФ)',
  'АНО ЦЕНТР НЕМЕДЛЕННОЙ ПОМОЩИ',
  'ГСК ЮГОРИЯ',
  'СО СМУ-152 ТРАНСИНЖСТРОЙ',
  'КЕЙДЖЕЙ МЕДИА',
  'ООО ТЕСТ',
  'ИП ИВАНОВ'
];

const rnd = (seed: number) => {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const money = (seed: number, max = 5_000_000, zeroChance = 0.35) => {
  const r = rnd(seed);

  if (r < zeroChance) return 0;

  const val = 5_000 + rnd(seed + 101) * (max - 5_000);

  return Math.round(val / 1000) * 1000;
};

const ddmm = (seed: number) => {
  const d = 1 + Math.floor(rnd(seed) * 28);
  const m = 1 + Math.floor(rnd(seed + 1) * 12);
  return `${String(d).padStart(2, '0')}.${String(m).padStart(2, '0')}`;
};

const ddmmyyyy = (seed: number) => {
  const base = ddmm(seed);
  const y = 2025;
  return `${base}.${y}`;
};

export const requestsMock: RequestRow[] = Array.from({ length: 48 }).map((_, i) => {
  const requestNo = 10 + i;
  const dir = directions[i % directions.length];
  const status = statuses[i % statuses.length];
  const hasRemarks = status === 'С замечаниями';

  return {
    id: requestNo,
    requestNo,
    direction: dir,
    invoiceRequest: i % 4 === 0 ? 'requested' : 'idle',
    invoicesIssued: i % 5 === 0 ? ddmmyyyy(i + 11) : '',
    downloadInvoices: i % 6 === 0,
    responsible: responsibles[i % responsibles.length],
    companyName: companies[i % companies.length],
    inn: String(1000000000 + Math.floor(rnd(i + 2) * 8999999999)),
    paidKfVv: money(i + 3),
    paidKfOdo: money(i + 4),
    paidChv: money(i + 5, 200000),
    paidVst: money(i + 6, 100000),
    objectType: objectTypes[i % objectTypes.length],
    requestStatus: status,
    documentType: docTypes[i % docTypes.length],
    control: i % 3 === 0 ? 'Требует проверки реквизитов и приложений. Длинный текст для проверки усечения.' : '',
    remarks: hasRemarks ? 'Есть замечания по сканам. Проверьте подписи и печати.' : '',
    downloadRemarks: hasRemarks,
    regDate: ddmm(i + 20)
  };
});
