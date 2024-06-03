import { image } from "../../constent/image"
import { ButtonCustome } from "../../components/Button/CustomeButton"
import { useState } from "react";
import { InputCustome2 } from "../../components/InputCustome/InputCustome2";
import { APIRequest, ApiUrl } from "../../utils/api";
import { toast } from "react-toastify";

function Integration() {
    const [isLoading, setIsLoading] = useState(false)
    const [inputValue, setInputValue] = useState({
        name: '',
        email: '',
        description: ''
    });

    function resetFun() {
        setInputValue({
            name: '',
            email: '',
            description: ''
        })
    }

    const changeInputHandler = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value })
    }

    const needHelpSubmit = () => {
        setIsLoading(true)
        let config = {
            url: ApiUrl?.helpQueryAdd,
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
                <div className="mb-10">
                    <div className="w-36 m-auto">
                        <img src={image?.needHelp} className="w-full h-auto" alt="need help" />
                    </div>
                    <h2 className="text-xl text-center mt-2 mb-3 text-blue font-poppins font-bold">Need Help</h2>
                </div>
                <div className="mb-4 flex">
                    <div className="">
                        <div className="flex flex-wrap justify-between gap-3">
                            <div className="w-96">
                                <InputCustome2
                                    placeholder={'Name'}
                                    type="text"
                                    searchValue={inputValue.name}
                                    icon={false}
                                    name="name"
                                    onChange={(e) => changeInputHandler(e)}
                                    className="outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                />
                            </div>
                            <div className="w-96">
                                <InputCustome2
                                    placeholder={'Email Address'}
                                    type="email"
                                    searchValue={inputValue.email}
                                    icon={false}
                                    name="email"
                                    onChange={(e) => changeInputHandler(e)}
                                    className="outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                />
                            </div>

                            <div className="w-full">
                                <textarea
                                    className='w-full rounded-lg p-3 resize-none bg-cyan600 placeholder:text-black text-black outline-none'
                                    name="description"
                                    value={inputValue?.description}
                                    placeholder='Brief Explanation'
                                    id=""
                                    cols="30"
                                    rows="10"
                                    onChange={(e) => changeInputHandler(e)}
                                ></textarea>
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