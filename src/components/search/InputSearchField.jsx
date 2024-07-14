/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useCallback } from 'react'
import {Input} from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'lodash'

const InputSearchField = ({setInputSearch,loadingStatus}) => {
  const {Search} = Input;
  const dispatch = useDispatch()
  const debouncedFetchData = useCallback(
    debounce((query) => {
      setInputSearch(query);
    }, 500),
    [dispatch],
  )

  const handleInputSearch = (e)=>{
    const {value} = e.target;
    debouncedFetchData(value); 
  }
  return (<>
            <Search placeholder="Search..." size='medium' loading={false} onChange={handleInputSearch} allowClear loading={loadingStatus}/>
  </>)
}

export default InputSearchField
