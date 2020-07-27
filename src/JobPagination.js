import React from 'react'
import { Pagination } from 'react-bootstrap';

const JobPagination = ({page, setPage, hasNextPage}) => {
    const handleClick = (amount) => {
        setPage(prevPage => prevPage + amount)
    }
    return (
      <Pagination>
        {page !== 1 && (
          <Pagination.Prev onClick={() => handleClick(-1)}></Pagination.Prev>
        )}
        {page !== 1 && <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>}
        {page > 2 && <Pagination.Ellipsis></Pagination.Ellipsis>}
        {page > 2 && (
          <Pagination.Item onClick={() => handleClick(-1)}>
            {page - 1}
          </Pagination.Item>
        )}
        <Pagination.Item active>{page}</Pagination.Item>
        {hasNextPage && (
          <Pagination.Item onClick={() => handleClick(1)}>
            {page + 1}
          </Pagination.Item>
        )}
        {hasNextPage && (
          <Pagination.Next onClick={() => handleClick(1)}></Pagination.Next>
        )}
      </Pagination>
    );
}

export default JobPagination
