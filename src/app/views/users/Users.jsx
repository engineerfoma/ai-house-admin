import { Fragment } from 'react'
import { Grid, styled, Pagination } from '@mui/material'
import UsersTableList from './shared/UsersTableList'
import UsersAddDialog from './shared/UsersAddDialog'
import { useEffect, useState } from 'react'
import axios from 'axios'

const BASE_URL = 'https://aihouse.asai-dev.ru/api/v1'

// STYLED COMPONENTS
const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}))

export default function Users() {
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState(null)
  const [count, setCount] = useState(null)
  const [pageQty, setPageQty] = useState(0)
  const [offset, setOffset] = useState(null)
  const [limit, setLimit] = useState(50)

  const handleChangeLimit = (value) => {
    setLimit(value)
    getUsers(value)
  }

  const handlePagination = (_, num) => {
    setPage(num)
    setOffset((num - 1) * limit)
  }

  const getUsers = async (userLimit) => {
    const query = {
      limit: userLimit,
    }

    if (offset) {
      query.offset = offset
    }
    const response = await axios.get(`${BASE_URL}/admin/users`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('auth_token')}`,
      },
      params: query,
    })
    setUsers(response.data.results)
    setCount(response.data.count)
    setPageQty(Math.ceil(response.data.count / userLimit))
    return await response.data.count
  }
  useEffect(() => {
    getUsers(limit)
  }, [offset])

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
            <UsersAddDialog />
            <UsersTableList
              userList={users}
              count={count}
              onSelect={handleChangeLimit}
            />
            {pageQty > 1 && (
              <Pagination
                onChange={handlePagination}
                count={pageQty}
                page={page}
              />
            )}
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  )
}
