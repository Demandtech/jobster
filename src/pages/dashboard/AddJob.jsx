import { FormRow, FormRowSelect } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {
  handleChange,
  clearValue,
  createJob,
} from '../../features/jobs/jobSlice'
import { useEffect } from 'react'

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    //editJobId,
  } = useSelector((store) => store.job)
  const { user } = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!position || !company || !jobLocation) {
      toast.error('Please fill out all fields')
      return
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }))
  }

  const handleJobInput = (event) => {
    const name = event.target.name
    const value = event.target.value
    dispatch(handleChange({ name, value }))
  }

  useEffect(() => {
    dispatch(handleChange({ name: 'jobLocation', value: user.location }))
  }, [])

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'Edit job' : 'add job'}</h3>
        <div className='form-center'>
          {/* Position */}
          <FormRow
            type='text'
            value={position}
            handleChange={handleJobInput}
            name='position'
          />
          {/* company */}
          <FormRow
            type='text'
            value={company}
            handleChange={handleJobInput}
            name='company'
          />
          {/* jobLocation */}
          <FormRow
            type='text'
            value={jobLocation}
            handleChange={handleJobInput}
            name='jobLocation'
            labelText='job Location'
          />
          {/* status */}
          <FormRowSelect
            value={status}
            handleChange={handleJobInput}
            options={statusOptions}
            name='status'
          />

          {/* Job Type */}
          <FormRowSelect
            value={jobType}
            handleChange={handleJobInput}
            options={jobTypeOptions}
            name='jobType'
            labelText='job type'
          />

          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearValue())}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
