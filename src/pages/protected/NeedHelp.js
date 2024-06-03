import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import NeedHelp from '../../features/NeedHelp'

function InternalPage(){

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(setPageTitle({ title : "Uploaded Product"}))
    //   }, [])
      
    return(
        <NeedHelp />
    )
}

export default InternalPage