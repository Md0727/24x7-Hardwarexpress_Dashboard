import React, { useState } from "react"
import { APIRequestWithFile, ApiUrl } from "../../../../utils/api"
import { InputCustome2 } from "../../../../components/InputCustome/InputCustome2"
import Banner_Hero_Table from "../../../../components/Comman_Tables/Banner_Hero_Table"
import { toast } from "react-toastify"

function InternalPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [imageType, setImageType] = useState('')
    const [imagePath, setImagePath] = useState('')

    let data = new FormData();
    data.append('image', imagePath);
    data.append('type', imageType);

    const uploadProduct = () => {
        if (imageType === "") {
            toast.error("Image type is required. Please Select like this : Appliances, Furniture, Hero Slider")
        } else {
            setIsLoading(true)
            let config = {
                url: ApiUrl?.trending_deals,
                method: "post",
                body: data
            }
            APIRequestWithFile(
                config,
                res => {
                    if (!res?.error) {
                        setIsLoading(false)
                        toast.success(res?.message)
                    }
                },
                err => {
                    if (err?.data?.error) {
                        toast.error(err.data?.message)
                    }
                    setIsLoading(false)
                }
            )
        }

    }

    return (
        <>
            <div>
                <Banner_Hero_Table 
                    totalQuotation={`${ApiUrl?.get_Hero_banners}`}
                />
            </div>
        </>
    )
}

export default InternalPage