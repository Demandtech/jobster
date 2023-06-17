import { FormRow, FormRowSelect } from '.'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useSelector, useDispatch } from 'react-redux'

const SearchContainer = () => {
  const { isLoading, search, searchStatus, sort, sortOptions, searchType } = useSelector(
    (store) => store.allJobs
  )
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job)

  const dispatch = useDispatch()
  const handleSearch = (e) => {}
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <Wrapper>
      <form className='form'>
        <h4>Search form</h4>
        <div className='form-center'>
          {/* Search position */}
          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
          />
          {/* Search by Status */}
          <FormRowSelect
            labelText={'status'}
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            options={['all', ...statusOptions]}
          />
          {/* Search by Type */}
          <FormRowSelect
            labelText={'type'}
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            options={['all', ...jobTypeOptions]}
          />
          {/* Sort */}
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            options={sortOptions}
          />
          <button disabled={isLoading} className="btn btn-block btn-danger" onClick={handleSubmit}>
             clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
