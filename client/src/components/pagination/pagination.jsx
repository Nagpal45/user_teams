import React, { useEffect, useState } from 'react';
import './pagination.css';
import axios from 'axios';
import { KeyboardArrowLeft, KeyboardArrowRight, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';

export default function Pagination({ filters, setPage }) {
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const getUsers = async () => {
            const res = await axios.get('/api/users', { params: { ...filters } });
            const data = res.data;
            setTotalPages(data.totalPages);
        };
        getUsers();
    }, [filters]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            setPage(newPage);
        }
    };

    const renderPagination = () => {
      const pages = [];
      const maxVisiblePages = 5;
      const pageStart = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const pageEnd = Math.min(pageStart + maxVisiblePages - 1, totalPages);

      for (let i = pageStart; i <= pageEnd; i++) {
          pages.push(
              <button
                  key={i}
                  className={currentPage === i ? 'active page' : 'page'}
                  onClick={() => handlePageChange(i)}
              >
                  {i}
              </button>
          );
      }
      if (totalPages > maxVisiblePages) { 
          if (currentPage !== 1) {
            pages.unshift(
                <button key="first" className='page' onClick={() => handlePageChange(1)}>
                    <KeyboardDoubleArrowLeft style={{fontSize:"1.2vw"}}/>
                </button>
            );
        }
        if (currentPage !== totalPages) {
            pages.push(
                <button key="last" className='page' onClick={() => handlePageChange(totalPages)}>
                    <KeyboardDoubleArrowRight style={{fontSize:"1.2vw"}}/>
                </button>
            );
        }
      }
  
      return pages;
  };

    const handlePrevPage = () => {
        handlePageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        handlePageChange(currentPage + 1);
    };

    return (
        <div className='pagination'>
            <button className='page' onClick={handlePrevPage} disabled={currentPage === 1}>
                <KeyboardArrowLeft style={{fontSize:"1.2vw"}}/>
            </button>
            {renderPagination()}
            <button className='page' onClick={handleNextPage} disabled={currentPage === totalPages}>
                <KeyboardArrowRight style={{fontSize:"1.2vw"}}/>
            </button>
        </div>
    );
}
