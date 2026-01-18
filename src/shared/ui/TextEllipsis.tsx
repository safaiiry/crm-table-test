import { Tooltip, Typography } from '@mui/material';

export default function TextEllipsis({
  value,
  align = 'left'
}: {
  value: string;
  align?: 'left' | 'center' | 'right';
}) {
  if (!value) {
    return (
      <Typography component="span" color="text.secondary" sx={{ lineHeight: 1.2 }}>
        —
      </Typography>
    );
  }

  return (
    <Tooltip title={value} placement="top" arrow disableInteractive>
      <Typography
        component="span"
        noWrap
        sx={{ display: 'block', textAlign: align, lineHeight: 1.2 }}
      >
        {value}
      </Typography>
    </Tooltip>
  );
}
