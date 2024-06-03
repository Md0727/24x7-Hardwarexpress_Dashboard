import React from "react"
import Help_Query_Table from "../../../../components/Comman_Tables/Help_Query_Table"
import { ApiUrl } from "../../../../utils/api"

function InternalPage() {

    return (
        <Help_Query_Table
            Get_Help_Query={ApiUrl?.Get_Help_Query}
        />
    )
}

export default InternalPage