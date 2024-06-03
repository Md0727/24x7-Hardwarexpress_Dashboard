import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ButtonCustome } from '../components/Button/CustomeButton'
import { image } from '../constent/image'
import { InputCustome } from '../components/InputCustome/InputCustome'
import { ImageTag } from '../components/ImageTag/ImageTag'

export const VerifyOtp = () => {
    const navigation = useNavigate()
    const [inputValue, setInputValue] = useState({
        data: '',
        password: ''
    });

    const submitForm = (e) => {
        e.preventDefault()
        navigation("/verify-otp")
    }

    const changeInputHandler = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value })
    }

    console.log('inputValue', inputValue)

    return (
        <div className="min-h-screen bg-white flex items-center">
            <div className="card mx-auto w-full max-w-full ">
                <div className="bg-base-100 rounded-xl">
                    <div className='py-16 pt-10'>
                        <div className='relative -top-8 left-2'>
                            <ImageTag
                                src={image?.headerLogo}
                                alt="logo"
                                className="w-auto"
                            />
                        </div>
                        <form onSubmit={(e) => submitForm(e)} className='shadow-md p-10 sm:max-w-md m-auto'>
                            <h1 className='text-2xl text-center font-poppins mb-6 not-italic font-bold text-black'>Enter OTP</h1>
                            <p className='text-center font-poppins text-black text-md mb-5'>An OTP has been sent to your mobile number please verify it below</p>
                            <div className="mb-4 flex gap-3">

                                <InputCustome
                                    placeholder={''}
                                    type="number"
                                    searchValue={inputValue.data}
                                    icon={false}
                                    name="data"
                                    onChange={(e) => changeInputHandler(e)}
                                    className="outline-none text-center rounded-lg w-full px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                />

                                <InputCustome
                                    placeholder={''}
                                    type="number"
                                    searchValue={inputValue.password}
                                    icon={false}
                                    name="password"
                                    onChange={(e) => changeInputHandler(e)}
                                    className="outline-none text-center rounded-lg w-full px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                />

                                <InputCustome
                                    placeholder={''}
                                    type="number"
                                    searchValue={inputValue.password}
                                    icon={false}
                                    name="password"
                                    onChange={(e) => changeInputHandler(e)}
                                    className="outline-none text-center rounded-lg w-full px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                />

                                <InputCustome
                                    placeholder={''}
                                    searchValue={inputValue.password}
                                    icon={false}
                                    type="number"
                                    name="password"
                                    onChange={(e) => changeInputHandler(e)}
                                    className="outline-none text-center rounded-lg w-full px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                />

                            </div>
                            <p className='text-center font-poppins text-black text-md mb-0'>Didn’t Recive OTP? Resend OTP</p>

                            <ButtonCustome
                                className="text-md mt-10 w-full font-bold hover:bg-white hover:text-blue transition-all duration-500 text-white bg-blue border border-blue rounded-full px-10 m-auto p-2"
                                buttonTitle="Verify"
                                type="text"
                            />

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
