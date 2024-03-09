import { Fragment } from 'react'
import { Card, Grid, styled, useTheme } from '@mui/material'
import UsersTableList from './shared/usersTableList'

import { useEffect, useState } from 'react'
import axios from 'axios'

const BASE_URL = 'https://aihouse.asai-dev.ru/api/v1'

// STYLED COMPONENTS
const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}))

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}))

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}))

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}))

export default function Users() {
  const { palette } = useTheme()
  const [users, setUsers] = useState(null)
  const [count, setCount] = useState(null)
  const baseLimit = 50
  const handleChangeLimit = (value) => {
    getUsers(value)
  }

  const getUsers = async (userLimit) => {
    const response = await axios.get(
      `${BASE_URL}/admin/users?limit=${userLimit}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('auth_token')}`,
        },
      }
    )
    setUsers(response.data.results)
    setCount(response.data.count)
    return await response.data.count
  }
  useEffect(() => {
    getUsers(baseLimit)
  }, [])

  return (
    <Fragment>
      <ContentBox className='users'>
        <Grid>
          <Grid
            item
            lg={8}
            md={8}
            sm={12}
            xs={12}
          >
            <UsersTableList
              userList={users}
              count={count}
              onSelect={handleChangeLimit}
            />
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  )
}
