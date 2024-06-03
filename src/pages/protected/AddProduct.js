import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AddProduct from '../../features/AddProduct'

function InternalPage(){

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(setPageTitle({ title : "Uploaded Product"}))
    //   }, [])
      
    return(
        <AddProduct />
    )
}

export default InternalPage