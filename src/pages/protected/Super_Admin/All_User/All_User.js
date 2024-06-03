import React from "react"
import All_Users_Table from "../../../../components/Comman_Tables/All_Users_Table"
import { ApiUrl } from "../../../../utils/api"

function InternalPage() {

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(setPageTitle({ title : "Uploaded Product"}))
    //   }, [])

    return (
        <All_Users_Table
            VendorsQuotation={ApiUrl?.get_all_users}
            status="All"
        />
    )
}

export default InternalPage