import { image } from "../../constent/image"
import { ButtonCustome } from "../../components/Button/CustomeButton"
import { useState } from "react";
import { InputCustome2 } from "../../components/InputCustome/InputCustome2";
import { ImageTag } from "../../components/ImageTag/ImageTag";
import { APIRequest, APIRequestWithFile, ApiUrl } from "../../utils/api";
import { toast } from "react-toastify";
import PreviousButton from "../BackButton/PreviousButton";
import { SelectDropdown } from "../selectDropdown/SelectDropdown";
import { optionArr } from "../../constent/data";

function Integration({ isComponentId, setIscomponentId, getServiceDataFun }) {
    const [isLoading, setIsLoading] = useState(false)
    const [inputValue, setInputValue] = useState({
        url: '',
        type: '',
        title: '',
        description: '',
    });

    // select function ===========
    const handleOnChange = (event, newValue) => {
        let updatedItems = {...inputValue}
        updatedItems.type = newValue?.label
        setInputValue(updatedItems);
    };

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

    const handleImageInputChange = (file) => {
        const updatedItems = { ...inputValue };
        updatedItems.url = file;
        setInputValue(updatedItems);
    };
    let returnFilePath = (selectedFiles) => {
        setIsLoading(true)
        let config = {
            url: ApiUrl?.uploadiImage,
            method: 'post',
            body: {
                image: selectedFiles[0]
            }
        }
        APIRequestWithFile(
            config,
            res => {
                setIsLoading(false)
                // setFilePaths([...filePaths, res?.image]);
                handleImageInputChange(res?.image)
            },
            err => {
                setIsLoading(false)
                console.log(err, '=============== err')
            }
        )
    }

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        returnFilePath(selectedFiles)
    };

    const needHelpSubmit = () => {
        setIsLoading(true)
        let config = {
            url: ApiUrl?.trendingAdd,
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
                    <h2 className="text-xl text-center mt-3 mb-0 text-blue font-poppins font-bold">Add Hot deals</h2>
                </div>
                <div className="mb-4 flex">
                    <div className="">
                        <div className="flex flex-wrap justify-center gap-3">

                            <div className="w-1/2">
                                <SelectDropdown
                                    labelTitle={'Type'}
                                    optionArr={optionArr}
                                    handleOnChange={handleOnChange}
                                    className="outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                />
                            </div>

                            <div className="w-1/2">
                                <InputCustome2
                                    placeholder={'Title'}
                                    type="email"
                                    searchValue={inputValue.title}
                                    icon={false}
                                    name="title"
                                    onChange={(e) => changeInputHandler(e)}
                                    className="outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                />
                            </div>

                            <div className="w-1/2">
                                <InputCustome2
                                    placeholder='Brief Explanation'
                                    type="email"
                                    value={inputValue?.description}
                                    icon={false}
                                    name="description"
                                    onChange={(e) => changeInputHandler(e)}
                                    className="outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                />
                            </div>

                            <div className="w-1/2">
                                <InputCustome2
                                    type="file"
                                    value={inputValue?.url}
                                    onChange={(e) => handleFileChange(e, "images")}
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
                </div>
            </div>
        </>
    )
}

export default Integration