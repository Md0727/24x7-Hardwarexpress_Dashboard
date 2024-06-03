import { useEffect, useState } from "react"
import TitleCard from "../../../components/Cards/TitleCard"
import { InputCustome2 } from "../../../components/InputCustome/InputCustome2"
import { APIRequest, APIRequestWithFile, ApiUrl } from "../../../utils/api"
import { toast } from "react-toastify"
import { jwtDecode } from "jwt-decode"
import { ButtonCustome } from "../../../components/Button/CustomeButton"

function ProfileSettings() {
    const [isLoading, setIsLoading] = useState(false)
    const [profile_vendor, setVendorProfile] = useState(null)
    const [inputValues, setInputValues] = useState({})
    const changeInputHandler = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value })
    }

    const getVendorProfile = () => {
        setIsLoading(true)
        let config = {
            url: ApiUrl?.getProfileVendor,
            method: "get",
        }
        APIRequest(
            config,
            res => {
                console.log('object', res?.user)
                setInputValues({
                    vendorId: res?.user?.userId,
                    name: res?.user?.name,
                    email: res?.user?.email,
                    mobileNo: res?.user?.contact,
                    fullAddress: res?.user?.fullAddress,
                    servieProvider: res?.user?.role,
                    companyName: res?.user?.companyInformation?.companyName,
                })
            },
            err => {
                setIsLoading(false)
                if (err?.error) {
                    toast.error(err?.message)
                }
            }
        )
    }

    const handlerUpdate = () => {
        setIsLoading(true)
        let config = {
            url: ApiUrl?.profile_updated,
            method: "post",
            body: {
                "name": inputValues?.name,
                "contact": inputValues?.mobileNo,
                "fullAddress": inputValues?.fullAddress
            }
        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    getVendorProfile()
                    toast.success(res?.message)
                    setIsLoading(false)
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

    const handlerUpdateProfile = () => {
        let formData = new FormData();
        formData.append("image", profile_vendor);
        setIsLoading(true)
        let config = {
            url: ApiUrl?.vendorUploadImage,
            method: "post",
            body: formData
        }
        APIRequestWithFile(
            config,
            res => {
                if (!res?.error) {
                    getVendorProfile()
                    // toast.success(res?.message)
                    window.location.reload(true);
                    setIsLoading(false)
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

    useEffect(() => {
        getVendorProfile()
    }, [])


    return (
        <>

            <TitleCard title={`Profile`} topMargin="mt-2">

                <div className="mb-4 flex">
                    <div className="w-full">
                        <div className="block">
                            {/* row 01 */}
                            <div className="flex justify-between gap-3 mb-2">
                                <div className="w-full">
                                    <label htmlFor="" className="block">Name</label>
                                    <InputCustome2
                                        placeholder={'Name'}
                                        type="text"
                                        searchValue={inputValues?.name}
                                        icon={false}
                                        name="name"
                                        onChange={changeInputHandler}
                                        className="outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-white bg-cyan600 text-white"
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="" className="block">Email Address</label>
                                    <InputCustome2
                                        placeholder={'Email Address'}
                                        type="email"
                                        searchValue={inputValues?.email}
                                        icon={false}
                                        name="email"
                                        disabled={true}
                                        onChange={changeInputHandler}
                                        className={`outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-cyan600 ${true ? 'disabled:bg-slate-100 disabled:text-slate-500' : 'bg-cyan600'}   text-white`}
                                    />
                                </div>
                            </div>
                            {/* row 02 */}
                            <div className="flex justify-between gap-3 mb-2">
                                <div className="w-full">
                                    <label htmlFor="" className="block">Phone Number</label>
                                    <InputCustome2
                                        placeholder={'Phone Number'}
                                        type="number"
                                        searchValue={inputValues?.mobileNo}
                                        icon={false}
                                        name="mobileNo"
                                        onChange={changeInputHandler}
                                        className="outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-white bg-cyan600 text-white"
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="" className="block">Full Address</label>
                                    <InputCustome2
                                        placeholder={'Full Address'}
                                        type="text"
                                        searchValue={inputValues?.fullAddress}
                                        icon={false}
                                        name="fullAddress"
                                        onChange={changeInputHandler}
                                        className="outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-white bg-cyan600 text-white"
                                    />
                                </div>
                            </div>
                            {/* row 03 */}
                            <div className="flex justify-between gap-3 mb-2">
                                <div className="w-full">
                                    <label htmlFor="" className="block">Service Provider</label>
                                    <InputCustome2
                                        placeholder={'Service Provider'}
                                        type="text"
                                        searchValue={inputValues?.servieProvider}
                                        icon={false}
                                        disabled={true}
                                        name="servieProvider"
                                        onChange={changeInputHandler}
                                        className={`outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-neutral-500 ${true ? 'disabled:bg-slate-100 disabled:text-slate-500' : 'bg-cyan600'}   text-black`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <ButtonCustome
                                className="text-md w-62 mt-3 font-bold hover:bg-white hover:text-cyan transition-all duration-500 text-white bg-cyan border border-cyan rounded-xl px-10 m-auto p-2"
                                buttonTitle="UPDATE"
                                type="text"
                                onClick={handlerUpdate}
                            />
                        </div>
                        {/* row 03 */}
                        <div className="flex justify-between gap-3 mb-2">
                            <div className="w-full">
                                <label htmlFor="" className="block">Profile Image</label>
                                <InputCustome2
                                    placeholder={'Profile Image'}
                                    type="file"
                                    // searchValue={inputValues?.companyName}
                                    icon={false}
                                    disabled={false}
                                    name="companyName"
                                    onChange={(e) => setVendorProfile(e.target.files[0])}
                                    className={`outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-neutral-500 ${true ? 'disabled:bg-slate-100 disabled:text-slate-500' : 'bg-cyan600'}   text-black`}
                                />
                                <div className="text-left">
                                    <ButtonCustome
                                        className="text-md w-62 mt-3 font-bold hover:bg-white hover:text-cyan transition-all duration-500 text-white bg-cyan border border-cyan rounded-xl px-10 m-auto p-2"
                                        buttonTitle="UPLOAD IMAGE"
                                        type="text"
                                        onClick={handlerUpdateProfile}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Name" defaultValue="Alex" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Email Id" defaultValue="alex@dashwind.com" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Title" defaultValue="UI/UX Designer" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Place" defaultValue="California" updateFormValue={updateFormValue}/>
                    <TextAreaInput labelTitle="About" defaultValue="Doing what I love, part time traveller" updateFormValue={updateFormValue}/>
                </div>
                <div className="divider" ></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Language" defaultValue="English" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Timezone" defaultValue="IST" updateFormValue={updateFormValue}/>
                    <ToogleInput updateType="syncData" labelTitle="Sync Data" defaultValue={true} updateFormValue={updateFormValue}/>
                </div>

                <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => updateProfile()}>Update</button></div> */}
            </TitleCard >
        </>
    )
}


export default ProfileSettings