import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import HotDeals from '../../features/HotDeals'

function InternalPage(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Uploaded Product"}))
      }, [])
      
    return(
        <HotDeals />
    )
}

export default InternalPage