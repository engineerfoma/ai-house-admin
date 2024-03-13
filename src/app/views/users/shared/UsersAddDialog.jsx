import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { Box, Card, IconButton, styled } from '@mui/material'
import { GroupAdd } from '@mui/icons-material'
import { Small } from 'app/components/Typography'
import UserAddForm from './UserAddForm'
import axios from 'axios'

const BASE_URL = 'https://aihouse.asai-dev.ru/api/v1'

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  width: 'fit-content',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}))

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': {
    opacity: 0.6,
    fontSize: '44px',
    color: theme.palette.primary.main,
  },
}))

export default function FormDialog() {
  const [open, setOpen] = useState(false)
  const [errorForm, setErrorForm] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const submitHandler = async (email, phone, password) => {
    const data = { email, phone, password }
    console.log(data)
    const response = await axios.post(`${BASE_URL}/admin/users`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('auth_token')}`,
      },
    })

    try {
      console.log(response)
    } catch (e) {
      setErrorForm(`Произошла ошибка: ${e}`)
    }
  }

  return (
    <Box>
      <Button
        onClick={handleClickOpen}
        sx={{ p: 0, pb: 2, pr: 1 }}
      >
        <StyledCard elevation={6}>
          <ContentBox>
            <GroupAdd className='icon' />
            <Small ml='12px'>Добавить пользователя</Small>
          </ContentBox>
        </StyledCard>
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Добавить пользователя</DialogTitle>
        <DialogContent>
          <UserAddForm
            handleClose={handleClose}
            onSubmit={submitHandler}
            errorForm={errorForm}
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}
