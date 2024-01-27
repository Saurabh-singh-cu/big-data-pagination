


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/photos';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(10);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await axios.get(API_URL);
      setPhotos(response.data);
    };

    fetchPhotos();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(photos.length / photosPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const pagesToShow = 5;
    const halfPagesToShow = Math.floor(pagesToShow / 2);

    let startPage, endPage;
    if (totalPages <= pagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= halfPagesToShow) {
        startPage = 1;
        endPage = pagesToShow;
      } else if (currentPage + halfPagesToShow >= totalPages) {
        startPage = totalPages - pagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - halfPagesToShow;
        endPage = currentPage + halfPagesToShow;
      }
    }

    // Add first page button
    if (currentPage > halfPagesToShow + 1) {
      pageNumbers.push(
        <button key={1} onClick={() => paginate(1)}>
          1
        </button>
      );
      if (currentPage > halfPagesToShow + 2) {
        pageNumbers.push(<span key="ellipsis1">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => paginate(i)} className={currentPage === i ? 'active' : ''}>
          {i}
        </button>
      );
    }

    // Add last page button
    if (currentPage < totalPages - halfPagesToShow) {
      if (currentPage < totalPages - halfPagesToShow - 1) {
        pageNumbers.push(<span key="ellipsis2">...</span>);
      }
      pageNumbers.push(
        <button key={totalPages} onClick={() => paginate(totalPages)}>
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="App">
      <h1>Photo Gallery</h1>
      <ul>
        {photos
          .slice((currentPage - 1) * photosPerPage, currentPage * photosPerPage)
          .map((photo) => (
            <li key={photo.id}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <p>{photo.title}</p>
            </li>
          ))}
      </ul>
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        {renderPageNumbers()}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;

