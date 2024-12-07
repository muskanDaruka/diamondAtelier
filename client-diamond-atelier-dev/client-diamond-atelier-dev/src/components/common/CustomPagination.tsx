import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import React from 'react';

function CustomPagination({page, count, onChange}:any) {
  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page}
      count={count}
      renderItem={(props2) =>{ 
        return <PaginationItem  {...props2} />
      }}
      onChange={onChange}
    />
  );
}

export default CustomPagination;
