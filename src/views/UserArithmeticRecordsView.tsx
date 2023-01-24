import React from 'react';
import { useState, useEffect } from 'react';

import { ArithmeticRecordsComponent, PaginationComponent } from '../components';

// MARK: User Arithmetic Records
const UserArithmeticRecordsView = () => {
  const [recordsData, setRecordsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage] = useState(2);

  useEffect(() => {
    console.log('effect loading after component rendered');

    setRecordsData([
      {
        id: 1,
        dp2: 'test 1',
        dp3: 'test 1',
        dp4: 'test 1',
      },
      {
        id: 2,
        dp2: 'data 2',
        dp3: 'data 3',
        dp4: 'data 4',
      },
      {
        id: 3,
        dp2: 'data 2',
        dp3: 'data 3',
        dp4: 'data 4',
      },
      {
        id: 4,
        dp2: 'data 2',
        dp3: 'data 3',
        dp4: 'data 4',
      },
      {
        id: 5,
        dp2: 'data 2',
        dp3: 'data 3',
        dp4: 'data 4',
      },
      {
        id: 6,
        dp2: 'data 2',
        dp3: 'data 3',
        dp4: 'data 4',
      },
    ]);
  }, []);

  const lastRecordIndex = (currentPage + 1) * recordsPerPage;
  const firstRecordIndex = lastRecordIndex - recordsPerPage;
  const currentRecords = recordsData.slice(firstRecordIndex, lastRecordIndex);
  const nPages = Math.ceil(recordsData.length / recordsPerPage);

  console.log('60:', nPages);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col"></div>
        <div className="col-auto ml-auto">
          <button className="btn btn-sm btn-danger mt-1">Back</button>
        </div>
      </div>
      <div className="row text-center">
        <h3 className="mt-2">Arithmetic Records</h3>
      </div>
      <ArithmeticRecordsComponent recordsData={currentRecords} />
      <PaginationComponent
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default UserArithmeticRecordsView;
