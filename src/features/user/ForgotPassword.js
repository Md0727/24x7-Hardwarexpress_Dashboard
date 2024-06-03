import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ButtonCustome } from '../../components/Button/CustomeButton'
import { image } from '../../constent/image'
import { InputCustome } from '../../components/InputCustome/InputCustome'
import { ImageTag } from '../../components/ImageTag/ImageTag'
import { toast } from 'react-toastify';
import { APIRequest, ApiUrl } from '../../utils/api'

function Login() {
    const navigation = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [statusCode, setStatusCode] = useState(false)
    // forgote password input field =========
    const [inputValue, setInputValue] = useState({
        data: '',
    });

    // Reset password input field =========
    const [resetInputValue, setResetInputValue] = useState({
        data: '',
        OTP: '',
        password: ''
    });

    // get input's function value =============
    const changeInputHandler = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value })
        setResetInputValue({ ...resetInputValue, [e.target.name]: e.target.value })
    }

    // forgote password state, function, submit function =========
    function resetFun() {
        setInputValue({
            data: '',
            password: ''
        })
    }

    const emailVerifyAuth = () => {
        setIsLoading(true)
        let config = {
            url: ApiUrl?.forgotPassword,
            method: "post",
            body: {
                "data": inputValue?.data,
            }
        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    setIsLoading(false)
                    resetFun()
                    setStatusCode(res?.statusCode)
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

    const emailVerifyHandler = (e) => {
        e.preventDefault()
        if (inputValue?.data === '') {
            toast.error('Email field is required')
        } else {
            emailVerifyAuth()
        }

    }
    // forgote password state, function, submit function =========


    // Reset password state, function, submit function =========
    function resetFun2() {
        setResetInputValue({
            data: '',
            OTP: '',
            password: ''
        })
    }

    const resetPasswordAuth = () => {
        setIsLoading(true)
        let config = {
            url: ApiUrl?.resetPassword,
            method: "post",
            body: {
                "data": resetInputValue?.data,
                "OTP": resetInputValue?.OTP,
                "password": resetInputValue?.password
            }
        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    setIsLoading(false)
                    resetFun2()
                    toast.success(res?.message)
                    navigation('/')
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

    const resetPasswordHandler = (e) => {
        e.preventDefault()
        if (resetInputValue?.data === '') {
            toast.error('Email field is required')
        } else if (resetInputValue?.OTP === '') {
            toast.error('OTP field is required')
        } else if (resetInputValue?.password === '') {
            toast.error('Password field is required')
        } else {
            resetPasswordAuth()
        }

    }
     // Reset password state, function, submit function =========

    const createAccount = () => {
        navigation("/register")
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-full  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className='py-16'>
                        {/* ============== email feild is show ============ */}
                        {
                            !statusCode ? (
                                <form onSubmit={emailVerifyHandler} className='shadow-md ml-52 p-10'>
                                    <h1 className='text-2xl text-center font-poppins mb-6 not-italic font-bold text-black'>Forgot Password</h1>
                                    <div className="mb-4">
                                        <InputCustome
                                            placeholder={'Email/Mobile No.'}
                                            searchValue={inputValue.data}
                                            icon={false}
                                            name="data"
                                            onChange={(e) => changeInputHandler(e)}
                                            className="outline-none rounded-lg mb-4 w-full px-3 py-2 placeholder:text-white bg-cyan600 text-white"
                                        />
                                    </div>
                                    <ButtonCustome
                                        className="text-md mt-0 w-full font-bold hover:bg-white hover:text-cyan transition-all duration-500 text-white bg-cyan border border-cyan rounded-full px-10 m-auto p-2"
                                        buttonTitle="Forgote Password"
                                        type="text"
                                    />
                                    {/* <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button> */}

                                    <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                                </form>
                            ) : (
                                <form onSubmit={resetPasswordHandler} className='shadow-md ml-52 p-10'>
                                    <h1 className='text-2xl text-center font-poppins mb-2 not-italic font-bold text-black'>Forgot Password</h1>
                                    {
                                        <p className='text-md text-center font-poppins mb-6'>We will send OTP on your email Id</p>
                                    }
                                    <div className="mb-4">
                                        <InputCustome
                                            placeholder={'Email/Mobile No.'}
                                            searchValue={resetInputValue.data}
                                            icon={false}
                                            name="data"
                                            onChange={(e) => changeInputHandler(e)}
                                            className="outline-none rounded-lg mb-4 w-full px-3 py-2 placeholder:text-white bg-cyan600 text-white"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <InputCustome
                                            placeholder={'OTP'}
                                            searchValue={resetInputValue.OTP}
                                            icon={false}
                                            name="OTP"
                                            onChange={(e) => changeInputHandler(e)}
                                            className="outline-none rounded-lg mb-4 w-full px-3 py-2 placeholder:text-white bg-cyan600 text-black"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <InputCustome
                                            placeholder={'Password'}
                                            searchValue={resetInputValue.password}
                                            icon={false}
                                            name="password"
                                            onChange={(e) => changeInputHandler(e)}
                                            className="outline-none text-white rounded-lg mb-4 w-full px-3 py-2 placeholder:text-white bg-cyan600"
                                        />
                                    </div>
                                    <ButtonCustome
                                        className="text-md mt-0 w-full font-bold hover:bg-white hover:text-cyan transition-all duration-500 text-white bg-cyan border border-cyan rounded-full px-10 m-auto p-2"
                                        buttonTitle="Reset Password"
                                        type="text"
                                    />
                                    {/* <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button> */}

                                    <div className='text-center mt-4'>Don't have an account yet? <Link to="/login"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></Link></div>
                                </form>
                            )
                        }

                    </div>
                    <div className=''>
                        <div className="hero min-h-full bg-cyan600">
                            <div className="hero-content py-12">
                                <div className="max-w-md text-center">
                                    <div className="text-center mt-12"><img src={image?.logo} alt="Dashwind Admin Template" className="w-48 inline-block"></img></div>

                                    {/* Importing pointers component */}
                                    <div className="text-center w-56">
                                        <h1 className="text-2xl mt-8 font-bold text-white">New Here?</h1>
                                        <p className='text-white'>Sign up and discover a great amount of new opportunities!</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login