import { image } from "../../constent/image"
import { ButtonCustome } from "../Button/CustomeButton"
import { useState } from "react";
import { InputCustome2 } from "../InputCustome/InputCustome2";
import { ImageTag } from "../ImageTag/ImageTag";
import { APIRequest, APIRequestWithFile, ApiUrl } from "../../utils/api";
import { toast } from "react-toastify";
import PreviousButton from "../BackButton/PreviousButton";
import { SelectDropdown } from "../selectDropdown/SelectDropdown";
import { optionArr } from "../../constent/data";

function Integration({ isComponentId, setIscomponentId, getServiceDataFun }) {
    const [isLoading, setIsLoading] = useState(false)
    const [inputValue, setInputValue] = useState({
        category: '',
    });

    function resetFun() {
        setInputValue({
            url: '',
            type: '',
            title: '',
            description: '',
        })
    }

    const changeInputHandler = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value })
    }

    const needHelpSubmit = () => {
        setIsLoading(true)
        let config = {
            url: ApiUrl?.addCategoryRoute,
            method: "post",
            body: inputValue
        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    setIsLoading(false)
                    resetFun()
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
                    <h2 className="text-xl text-center mt-3 mb-0 text-blue font-poppins font-bold">Add Category</h2>
                </div>
                <div className="mb-4 flex justify-center">
                    <div className="">
                        <div className="flex flex-wrap justify-center gap-3">
                            <div className="w-full m-auto">
                                <InputCustome2
                                    placeholder={'Category'}
                                    type="text"
                                    searchValue={inputValue.category}
                                    icon={false}
                                    name="category"
                                    onChange={(e) => changeInputHandler(e)}
                                    className="outline-none w-full m-auto text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                />
                            </div>

                            <div className='w-full border'></div>

                            <div className='text-center w-full'>
                                <ButtonCustome
                                    className="text-md mt-5 w-md font-bold hover:bg-white hover:text-blue transition-all duration-500 text-white bg-blue border border-blue rounded-full px-10 m-auto p-2"
                                    buttonTitle="Submit"
                                    type="text"
                                    onClick={needHelpSubmit}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Integration