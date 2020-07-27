import React, {useState} from 'react';
import {Container} from 'react-bootstrap';
import useFetchJobs from './useFetchJobs';
import Job from './Job';
import JobPagination from './JobPagination';
import SearchForm from './SearchForm';

function App() {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState({});

  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  const handleChangeParams = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setParams(prevParam => {return {...prevParam, [name]: value}})
  }

  const mainData = (
    <>
      
      <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {jobs.map((job) => (
        <Job key={job.id} job={job} />
      ))}
      <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </>
  );

  return (
    <Container className="my-4">
      <h1>GitHub Jobs</h1>
      <SearchForm params={params} onParamsChange={handleChangeParams} />
      {loading && <h1>Loading....</h1>}
      {error && <h1>Error. Try refreshing!</h1>}
      {mainData}
    </Container>
  );
}

export default App;
