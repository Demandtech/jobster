import { FormRow, FormRowSelect } from '.'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useSelector, useDispatch } from 'react-redux'
import { handleChange, clearFilters } from '../features/alljobs/allJobsSlice'
import { useState, useMemo } from 'react'

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState()
  const { isLoading, searchStatus, sort, sortOptions, searchType } =
    useSelector((store) => store.allJobs)
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job)
  const dispatch = useDispatch()

  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLocalSearch('')
    dispatch(clearFilters())
  }

  const debounce = () => {
    console.log('debounce called')
    let timeoutId;
    return (e) => {
      setLocalSearch(e.target.value)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }))
      },1000)
    }
  }

  const optimizedDebounce = useMemo(()=>debounce(), [])
  return (
    <Wrapper>
      <form className='form'>
        <h4>Search form</h4>
        <div className='form-center'>
          {/* Search position */}
          <FormRow
            type='text'
            name='search'
            value={localSearch}
            handleChange={optimizedDebounce}
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
          <button
            disabled={isLoading}
            className='btn btn-block btn-danger'
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
