import customFetch,{checkForUnaurizedResponse} from '../../utils/axios'
import { clearAllJobsState } from '../alljobs/allJobsSlice'
import { clearValue } from '../jobs/jobSlice'
import { logoutUser } from './userSlice'

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user)
    return resp.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const updateUserThunk = async (url, user, thunkAPI)=>{
  try {
    const resp = await customFetch.patch(url, user)
    return resp.data
  } catch (error) {
    
   return checkForUnaurizedResponse(error, thunkAPI)
  }
}

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message))
    thunkAPI.dispatch(clearAllJobsState())
    thunkAPI.dispatch(clearValue())
    return Promise.resolve
  } catch (error) {
    return Promise.reject()
  }
}