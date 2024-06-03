import { image } from "../../constent/image"
import { ButtonCustome } from "../../components/Button/CustomeButton"
import { useState } from "react";
import { InputCustome2 } from "../../components/InputCustome/InputCustome2";
import { ImageTag } from "../../components/ImageTag/ImageTag";
import { APIRequest, APIRequestWithFile, ApiUrl } from "../../utils/api";
import { toast } from "react-toastify";
import PreviousButton from "../BackButton/PreviousButton";

function Integration({ isComponentId, setIscomponentId, getServiceDataFun }) {
    const [isLoading, setIsLoading] = useState(false)
    const [imageURl, setImageURl] = useState(null);

    const needHelpSubmit = () => {
        let formData = new FormData();
        formData.append("image", imageURl)

        setIsLoading(true)
        let config = {
            url: `${ApiUrl?.add_Hero_banners}`,
            method: "post",
            body: formData
        }
        APIRequestWithFile(
            config,
            res => {
                if (!res?.error) {
                    setIsLoading(false)
                    toast.success(res?.message)
                    setIscomponentId(1)
                    getServiceDataFun()
                }
            },
            err => {
                setIsLoading(false)
                if (err?.error) {
                    toast.error(err?.message)
                }
            }
        )
    }

    return (
        <>
            <div className="bg-white">
                <PreviousButton isComponentId={isComponentId} setIscomponentId={setIscomponentId} />
                <div className="mb-2 mt-3">
                    <h2 className="text-xl text-center mt-3 mb-0 text-blue font-poppins font-bold">Add Slider Images</h2>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    <div className="w-1/2">
                        <InputCustome2
                            type="file"
                            onChange={(e) => setImageURl(e.target.files[0])}
                            icon={false}
                            name="file"
                            className="outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                        />
                    </div>

                    <div className='w-full border'></div>

                    <div className='text-center w-full'>
                        <ButtonCustome
                            className="text-md mt-10 w-md font-bold hover:bg-white hover:text-blue transition-all duration-500 text-white bg-blue border border-blue rounded-full px-10 m-auto p-2"
                            buttonTitle="Submit"
                            type="text"
                            onClick={needHelpSubmit}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Integration