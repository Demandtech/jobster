import { useEffect } from 'react'
import { StatsContainer, ChartsContainer } from '../../components'
import Loading from '../../components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { showStats } from '../../features/alljobs/allJobsSlice'
const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(showStats())
  }, [])

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  )
}

export default Stats
