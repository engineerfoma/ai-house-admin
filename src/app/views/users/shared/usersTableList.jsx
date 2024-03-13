// import { Edit } from '@mui/icons-material'
import {
  Box,
  Card,
  Table,
  Select,
  //   Avatar,
  styled,
  TableRow,
  // useTheme,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  //   IconButton,
} from '@mui/material'
import { Paragraph } from 'app/components/Typography'

// STYLED COMPONENTS
const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}))

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}))

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}))

export default function UsersTableList({ userList, count, onSelect }) {
  const handleChangeLimit = (event) => {
    onSelect(event.target.dataset.value)
  }

  return (
    <Card
      elevation={3}
      sx={{ pt: '20px', mb: 3 }}
    >
      <CardHeader>
        <Title>Пользовтаели</Title>
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={'15px'}
        >
          <Paragraph>Выводить по</Paragraph>
          <Select
            size='small'
            defaultValue='50'
            onClick={handleChangeLimit}
          >
            <MenuItem value='20'>20</MenuItem>
            <MenuItem value='50'>50</MenuItem>
            <MenuItem value='100'>100</MenuItem>
            <MenuItem value='200'>200</MenuItem>
            <MenuItem value={count}>Все</MenuItem>
          </Select>
        </Box>
      </CardHeader>
      <Box overflow={'auto'}>
        <ProductTable sx={{ tableLayout: 'auto' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3, whiteSpace: 'nowrap' }}>почта</TableCell>

              <TableCell
                colSpan={2}
                sx={{ pr: 4, whiteSpace: 'nowrap' }}
              >
                телефон
              </TableCell>
              <TableCell
                colSpan={2}
                sx={{ pr: 4, whiteSpace: 'nowrap' }}
              >
                баланс
              </TableCell>
              <TableCell
                colSpan={2}
                sx={{ pr: 4, whiteSpace: 'nowrap' }}
              >
                дата регистрации
              </TableCell>
              <TableCell
                colSpan={2}
                sx={{ pr: 4, whiteSpace: 'nowrap' }}
              >
                Администратор
              </TableCell>
              <TableCell
                colSpan={2}
                sx={{ pr: 4, whiteSpace: 'nowrap' }}
              >
                активен/неактивен
              </TableCell>
              <TableCell
                colSpan={3}
                sx={{ pr: 4, whiteSpace: 'nowrap' }}
              >
                aihouse id
              </TableCell>
              <TableCell
                colSpan={2}
                sx={{ pr: 4, whiteSpace: 'nowrap' }}
              >
                bitrix id
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList?.map((user) => {
              return (
                <TableRow
                  key={user.id}
                  hover
                >
                  <TableCell
                    align='left'
                    sx={{
                      pr: 4,
                      textTransform: 'capitalize',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Box
                      display='flex'
                      alignItems='center'
                      gap={4}
                    >
                      <Paragraph>{user.email}</Paragraph>
                    </Box>
                  </TableCell>
                  <TableCell
                    align='left'
                    colSpan={2}
                    sx={{
                      pr: 4,
                      textTransform: 'capitalize',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Box
                      display='flex'
                      alignItems='center'
                      gap={4}
                    >
                      <Paragraph>{user.phone}</Paragraph>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{ pr: 4, whiteSpace: 'nowrap' }}
                    align='left'
                    colSpan={2}
                  >
                    <Box
                      display='flex'
                      alignItems='center'
                      gap={4}
                    >
                      <Paragraph>{user.balance} ₽</Paragraph>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{ pr: 4, whiteSpace: 'nowrap' }}
                    colSpan={2}
                  >
                    <Box
                      display='flex'
                      alignItems='center'
                      gap={4}
                    >
                      <Paragraph>{user.date_time}</Paragraph>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{ pr: 4, whiteSpace: 'nowrap' }}
                    colSpan={2}
                  >
                    <Box
                      display='flex'
                      alignItems='center'
                      gap={4}
                    >
                      <Paragraph>{user.is_admin}</Paragraph>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{ pr: 4, whiteSpace: 'nowrap' }}
                    colSpan={2}
                  >
                    <Box
                      display='flex'
                      alignItems='center'
                      gap={4}
                    >
                      <Paragraph>{user.is_active ? 'Да' : 'Нет'}</Paragraph>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{ pr: 4, whiteSpace: 'nowrap' }}
                    colSpan={3}
                  >
                    <Box
                      display='flex'
                      alignItems='center'
                      gap={4}
                    >
                      <Paragraph>{user.aihouse_account_old_id}</Paragraph>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{ pr: 4, whiteSpace: 'nowrap' }}
                    colSpan={2}
                  >
                    <Box
                      display='flex'
                      alignItems='center'
                      gap={4}
                    >
                      <Paragraph>{user.bitrix_id}</Paragraph>
                    </Box>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  )
}
