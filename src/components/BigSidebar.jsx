import Wrapper from '../assets/wrappers/BigSidebar'
import NavLinks from './NavLinks'
import Logo from '../components/Logo'
import { useSelector } from 'react-redux'
const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user)
  return (
    <Wrapper>
      <div
        className={`${
          isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }`}
      >
        <div className='content'></div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar
