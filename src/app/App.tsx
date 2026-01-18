import { Box, Container, Paper, Typography } from '@mui/material';
import RequestsTable from '../features/requests/RequestsTable';

export default function App() {
  return (
    <Box sx={{ py: 3 }}>
      <Container maxWidth={false} sx={{ maxWidth: 1440 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Плановая проверка • Заявки
        </Typography>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <RequestsTable />
        </Paper>
      </Container>
    </Box>
  );
}
