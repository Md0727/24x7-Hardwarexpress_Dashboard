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
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"))
    const [inputValue, setInputValue] = useState({
        email: '',
        password: ''
    });

    function resetFun() {
        setInputValue({
            email: '',
            password: ''
        })
    }

    const loginAuth = () => {
        setIsLoading(true)
        let config = {
            url: ApiUrl?.login,
            method: "post",
            body: {
                "email": inputValue?.data,
                "password": inputValue?.password
            }
        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    setIsLoading(false)
                    resetFun()
                    toast.success(res?.message)
                    sessionStorage.setItem('data', JSON.stringify(res?.token))
                    navigation('/app/dashboard')
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

    const submitHandler = (e) => {
        e.preventDefault()
        if (inputValue?.data === '') {
            toast.error('Email field is required')
        } else if (inputValue?.password === '') {
            toast.error('Password field is required')
        } else {
            loginAuth()
        }

    }

    // useEffect(() => {
    //     themeChange(false)
    //     if (currentTheme === null) {
    //         if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //             setCurrentTheme("light")
    //         } else {
    //             setCurrentTheme("dark")
    //             
    //         }
    //     }
    //     // 👆 false parameter is required for react project
    // }, [])

    const createAccount = () => {
        navigation("/register")
    }

    const changeInputHandler = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value })
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-full  shadow-xl">
                <div className="grid md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className='py-16 setCustomeColor'>
                        <form onSubmit={submitHandler} className='shadow-md ml-52 p-10'>
                            <h1 className='text-2xl dark:text-white text-center font-poppins mb-6 not-italic font-bold text-black'>Login to Your Account</h1>
                            <div className="mb-4">
                                <InputCustome
                                    placeholder={'Email/Mobile No.'}
                                    searchValue={inputValue.data}
                                    icon={false}
                                    name="data"
                                    onChange={(e) => changeInputHandler(e)}
                                    className="outline-none rounded-lg mb-4 w-full px-3 py-2 placeholder:text-white bg-cyan600 text-white"
                                />

                                <InputCustome
                                    placeholder={'Password'}
                                    searchValue={inputValue.password}
                                    icon={false}
                                    name="password"
                                    onChange={(e) => changeInputHandler(e)}
                                    className="outline-none rounded-lg w-full px-3 py-2 placeholder:text-white bg-cyan600 text-white"
                                />

                            </div>

                            <div className='text-right flex justify-end text-primary'>
                                {/* <div>
                                    <input type="checkbox" id='RememberMe' />
                                    <label htmlFor="RememberMe" className='text-black'> Remember Me </label>
                                </div> */}
                                <Link to="/forgot-password">
                                    <span className="text-sm pb-2 w-full text-right block text-black  hover:text-text-black hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span>
                                </Link>
                            </div>

                            <ButtonCustome
                                className="text-md mt-0 w-full font-bold hover:bg-white hover:text-cyan transition-all duration-500 text-white bg-cyan border border-cyan rounded-full px-10 m-auto p-2"
                                buttonTitle="Sign-In"
                                type="text"
                            />
                            {/* <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button> */}

                            <div className='text-center mt-4'>Don't have an account yet? <Link to="/login"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></Link></div>
                        </form>
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