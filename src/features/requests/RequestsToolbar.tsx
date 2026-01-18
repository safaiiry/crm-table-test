import ClearRounded from '@mui/icons-material/ClearRounded';
import DownloadRounded from '@mui/icons-material/DownloadRounded';
import AddRounded from '@mui/icons-material/AddRounded';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import type { Direction } from './requests.types';

export interface FiltersState {
  query: string;
  direction: Direction | '';
  status: string;
  objectType: string;
  showClosed: boolean;
}

const btnSx = {
  height: 32,
  px: 1.25,
  minWidth: 0,
  borderRadius: 2,
  textTransform: 'none',
  whiteSpace: 'nowrap'
} as const;

export default function RequestsToolbar(props: {
  total: number;
  filters: FiltersState;
  directions: Direction[];
  statuses: string[];
  objectTypes: string[];
  onChange: (patch: Partial<FiltersState>) => void;
  onCreate: () => void;
  onExportExcel: () => void;
}) {
  const { total, filters, directions, statuses, objectTypes, onChange, onCreate, onExportExcel } = props;

  return (
    <Stack gap={1.5} sx={{ mb: 1.5 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        gap={1.5}
        alignItems={{ xs: 'stretch', md: 'center' }}
        justifyContent="space-between"
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} gap={1} alignItems={{ xs: 'stretch', sm: 'center' }}>
          <TextField
            size="small"
            label="Поиск"
            value={filters.query}
            onChange={(e) => onChange({ query: e.target.value })}
            sx={{ minWidth: 260 }}
            InputProps={{
              endAdornment: filters.query ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => onChange({ query: '' })} aria-label="Очистить">
                    <ClearRounded fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }}
          />

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select<Direction | ''>
              displayEmpty
              value={filters.direction}
              onChange={(e) => onChange({ direction: e.target.value as Direction | '' })}
            >
              <MenuItem value="">Все направления</MenuItem>
              {directions.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 220 }}>
            <Select displayEmpty value={filters.status} onChange={(e) => onChange({ status: String(e.target.value) })}>
              <MenuItem value="">Все статусы</MenuItem>
              {statuses.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 220 }}>
            <Select
              displayEmpty
              value={filters.objectType}
              onChange={(e) => onChange({ objectType: String(e.target.value) })}
            >
              <MenuItem value="">Все типы объектов</MenuItem>
              {objectTypes.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={<Checkbox checked={filters.showClosed} onChange={(e) => onChange({ showClosed: e.target.checked })} />}
            label="Показать закрытые"
          />
        </Stack>

        <Stack direction="row" gap={1} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
          <Button size="small" sx={btnSx} variant="contained" disableElevation startIcon={<AddRounded />} onClick={onCreate}>
            Создать заявку
          </Button>
          <Button size="small" sx={btnSx} variant="outlined" startIcon={<DownloadRounded />} onClick={onExportExcel}>
            Скачать Excel
          </Button>
        </Stack>
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Всего заявок: <b>{total}</b>
        </Typography>
      </Box>
    </Stack>
  );
}
