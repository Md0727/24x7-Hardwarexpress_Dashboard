import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Transactions from '../../features/transactions'
import { ApiUrl } from '../../utils/api'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Transactions"}))
      }, [])


    return(
        <Transactions transactions={ApiUrl?.transaction_get} />
    )
}

export default InternalPage