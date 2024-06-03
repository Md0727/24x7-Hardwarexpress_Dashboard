import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ButtonCustome } from '../../components/Button/CustomeButton'
import { image } from '../../constent/image'
import { InputCustome } from '../../components/InputCustome/InputCustome'
import { ImageTag } from '../../components/ImageTag/ImageTag'
import { optionArr1 } from '../../constent/data'
import { UnderRevideModal } from '../../components/CustomeModal/UnderRevideModal'
import MultipleSelect from '../../components/selectDropdown/MultipleSelect'
import { APIRequest, ApiUrl } from '../../utils/api'
import { toast } from 'react-toastify'
import { TypeofServicValidation, aboutValidation, cityValidation, companyNameValidation, companyTypeValidation, countryValidation, dateValidation, emailValidation, landMarkValidation, localityValidation, mobileNoValidation, nameValidation, ownerNameValidation, permitCityValidation, permitNoValidation, permitStateValidation, permitTypeValidation, postalCodeValidation, registrationNoValidation, serviceTypeValidation, stateValidation, street1Validation, street2Validation, termsAndCondition, vatNoValidation } from '../../components/Validation'
import dayjs from 'dayjs'
import { CountryCodeDropdown } from '../../components/selectDropdown/CountryCodeDropdown'
import Terms_Condition_Modal from '../../components/Pop_Modal/Terms_Condition_Modal'
import { SelectDropdown } from '../../components/selectDropdown/SelectDropdown'

const Register = () => {
    const navigation = useNavigate()
    const [selectedValue, setSelectedValue] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [countryCode, setCountryCode] = useState('');
    const [checked, setChecked] = useState(false);
    const [abc, setAbc] = useState(false);
    const [modal, setModal] = useState(false)
    const [selectedValueDr, setSelectedValueDr] = useState([])
    const [moverAndPackerService, setMoverAndPackerService] = useState(true);
    const [furnitureService, setFurnitureService] = useState(false);
    const [appliancesService, setAppliancesService] = useState(false);
    const [inputValue, setInputValue] = useState({
        fullName: '',
        email: '',
        dob: '',
        contact: '',
        countryCode: '',
        alternateContact: '',
        street1: '',
        street2: '',
        postalCode: '',
        country: '',
        state: '',
        city: '',
        companyName: '',
        ownerName: '',
        registrationNo: '',
        vatNo: '',
        about: '',
        companyType: '',
        permitDetails: [
            {
                "permitState": "",
                "permitType": "",
                "permitNo": "",
                "permitCity": "",
                "tillDate": ""
            }
        ],
        services: [],
    });

    // reset state function ===========
    const resetFun = () => {
        setInputValue({
            fullName: '',
            email: '',
            dob: '',
            contact: '',
            countryCode: '',
            alternateContact: '',
            street1: '',
            street2: '',
            postalCode: '',
            country: '',
            state: '',
            city: '',
            companyName: '',
            ownerName: '',
            ownerName: '',
            registrationNo: '',
            vatNo: '',
            about: '',
            companyType: '',
            permitDetails: [
                {
                    "permitState": "",
                    "permitType": "",
                    "permitNo": "",
                    "permitCity": "",
                    "tillDate": ""
                }
            ],
            services: [],
            moverAndPackerService: '',
            furnitureService: '',
            appliancesService: '',
        })
    }

    // Select Company Type get value function ==============
    const handleOnChange = (event, newValue) => {
        let updateResult = { ...inputValue }
        updateResult.services = newValue;
        setInputValue(updateResult)
    };

    const changeInputHandler = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value })
    }

    const addMoreItems = () => {
        let updateResult = { ...inputValue }
        updateResult.permitDetails = [...updateResult.permitDetails, {
            "permitState": "",
            "permitType": "",
            "permitNo": "",
            "permitCity": "",
            "tillDate": ""
        }]
        setInputValue(updateResult)
    }

    const removeItem = (index) => {
        const userConfirmed = window.confirm('Do you want to remove the record? Press "OK to confirm or "Cancel" to abort.');
        if (userConfirmed) {
            let updateResult = { ...inputValue }
            updateResult.permitDetails.splice(index, 1)
            setInputValue(updateResult)
        }

    }

    const permitDetailHandler = (value, field, index) => {
        let updateResult = { ...inputValue }
        updateResult.permitDetails[index][field] = value;
        setInputValue(updateResult)
    }

    const handleOnChange1 = (event, newValue) => {
        setSelectedValueDr(newValue)
    }

    const registrationFun = () => {
        // setModal(true)
        setIsLoading(true)
        let config = {
            url: ApiUrl?.signup,
            method: "post",
            body: {
                "fullName": inputValue?.fullName,
                "email": inputValue?.email,
                "dob": dayjs(inputValue.dob).format("MM/DD/YYYY"),
                "contact": inputValue?.contact,
                "countryCode": countryCode ? countryCode : '+01',
                "alternateContact": inputValue?.alternateContact,
                "address": {
                    "street1": inputValue?.street1,
                    "street2": inputValue?.street2,
                    "postalCode": inputValue?.postalCode,
                    "country": inputValue?.country,
                    "state": inputValue?.state,
                    "city": inputValue?.city
                },
                "companyInformation": {
                    "companyName": inputValue?.companyName,
                    "ownerName": inputValue?.ownerName,
                    "registrationNo": inputValue?.registrationNo,
                    "vatNo": selectedValueDr.label,
                    "about": inputValue?.about
                },
                "companyType": inputValue?.companyType,
                "permitDetails": moverAndPackerService ? inputValue?.permitDetails : [],
                "services": inputValue?.services,
                "moverAndPackerService": moverAndPackerService,
                "furnitureService": furnitureService,
                "appliancesService": appliancesService,
                "termAndCondition": checked
            }
        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    setIsLoading(false)
                    setModal(false)
                    resetFun()
                    toast.success(res?.message)
                    navigation("/")
                }
            },
            err => {
                setIsLoading(false)
                setModal(false)
                if (err?.error) {
                    toast.error(err?.message)
                }
            }
        )
    }

    let permitState;
    let permitType;
    let permitNo;
    let permitCity;
    if (moverAndPackerService) {
        permitState = inputValue?.permitDetails?.some((item) => item?.permitState === '');
        permitType = inputValue?.permitDetails?.some((item) => item?.permitType === '');
        permitNo = inputValue?.permitDetails?.some((item) => item?.permitNo === '');
        permitCity = inputValue?.permitDetails?.some((item) => item?.permitCity === '');
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (
            nameValidation(inputValue?.fullName) &&
            emailValidation(inputValue?.email) &&
            mobileNoValidation(inputValue?.contact) &&
            dateValidation(inputValue?.dob) &&
            street1Validation(inputValue?.street1) &&
            // street2Validation(inputValue?.street2) &&
            postalCodeValidation(inputValue?.postalCode) &&
            countryValidation(inputValue?.country) &&
            stateValidation(inputValue?.state) &&
            cityValidation(inputValue?.city) &&
            companyNameValidation(inputValue?.companyName) &&
            ownerNameValidation(inputValue?.ownerName) &&
            // registrationNoValidation(inputValue?.registrationNo) &&
            vatNoValidation(inputValue?.vatNo) &&
            aboutValidation(inputValue?.about) &&
            serviceTypeValidation(inputValue?.services.length, moverAndPackerService) &&
            TypeofServicValidation(moverAndPackerService, furnitureService, appliancesService) &&
            permitStateValidation(permitState) &&
            permitTypeValidation(permitType) &&
            permitNoValidation(permitNo) &&
            permitCityValidation(permitCity) &&
            termsAndCondition(checked)
        ) {
            registrationFun()
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center dark:bg-white">
            <div className="card mx-auto w-full max-w-full ">
                <div className="bg-base-100 rounded-xl relative">
                    <div className=''>
                        <form onSubmit={(e) => submitForm(e)} className='p-10'>
                            {/* logo image ====== */}
                            <div>
                                <div className='relative mb-10'>
                                    <ImageTag
                                        src={image?.headerLogo}
                                        alt="logo"
                                        className="w-auto"
                                    />
                                </div>
                                <h1 className='text-2xl text-left font-poppins mb-6 not-italic font-bold text-black dark:text-white'>Create Account</h1>
                            </div>

                            {/* row 01 */}
                            <div className="mb-4">
                                <p className='text-left font-poppins text-black text-md mb-2'>Gereral Information <span className='text-red'>*</span></p>
                                <div className='removeGap flex flex-2 flex-wrap gap-x-20 gap-y-5'>
                                    <InputCustome
                                        placeholder={'Full Name'}
                                        type="text"
                                        searchValue={inputValue.fullName}
                                        icon={false}
                                        name="fullName"
                                        onChange={(e) => changeInputHandler(e)}
                                        className="outline-none sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                    />

                                    <InputCustome
                                        placeholder={'Email Address'}
                                        type="email"
                                        searchValue={inputValue.email}
                                        icon={false}
                                        name="email"
                                        onChange={(e) => changeInputHandler(e)}
                                        className="outline-none sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                    />
                                    <div className='flex'>
                                        <div className='w w-32'>
                                            <CountryCodeDropdown
                                                setCountryCode={setCountryCode}
                                                countryCode={countryCode}
                                            />
                                        </div>
                                        <div className='max-sm:w-full'>
                                            <InputCustome
                                                placeholder={'Mobile Number'}
                                                type="number"
                                                searchValue={inputValue.contact}
                                                icon={false}
                                                name="contact"
                                                onChange={(e) => changeInputHandler(e)}
                                                className="outline-none fsfdsfds-sdfdsf w-full text-left rounded-tr-lg rounded-br-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                            />
                                        </div>
                                    </div>
                                    <InputCustome
                                        placeholder={'Alternative Mobile Number (optional)'}
                                        type="number"
                                        searchValue={inputValue.alternateContact}
                                        icon={false}
                                        name="alternateContact"
                                        onChange={(e) => changeInputHandler(e)}
                                        className="outline-none sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                    />

                                    <InputCustome
                                        placeholder={'Date of Birth (DD/MM/YYYY)'}
                                        type="date"
                                        searchValue={inputValue.dob}
                                        icon={false}
                                        name="dob"
                                        onChange={(e) => changeInputHandler(e)}
                                        className="outline-none sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                    />

                                </div>
                            </div>

                            {/* row 02 */}
                            <div className="mb-4">
                                <p className='text-left font-poppins text-black text-md mb-2 mt-10'>Address <span className='text-red'>*</span></p>
                                <div className='removeGap flex flex-2 flex-wrap gap-x-20 gap-y-5'>
                                    <InputCustome
                                        placeholder={'Street 1'}
                                        type="text"
                                        searchValue={inputValue.street1}
                                        icon={false}
                                        name="street1"
                                        onChange={(e) => changeInputHandler(e)}
                                        className="outline-none sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                    />

                                    <InputCustome
                                        placeholder={'Street 2'}
                                        type="text"
                                        searchValue={inputValue.street2}
                                        icon={false}
                                        name="street2"
                                        onChange={(e) => changeInputHandler(e)}
                                        className="outline-none sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                    />

                                    <InputCustome
                                        placeholder={'Zip Code'}
                                        type="number"
                                        searchValue={inputValue.postalCode}
                                        icon={false}
                                        name="postalCode"
                                        onChange={(e) => changeInputHandler(e)}
                                        className="outline-none sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                    />

                                    <InputCustome
                                        placeholder={'Country'}
                                        type="text"
                                        searchValue={inputValue.country}
                                        icon={false}
                                        name="country"
                                        onChange={(e) => changeInputHandler(e)}
                                        className="outline-none sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                    />

                                    <InputCustome
                                        placeholder={'State'}
                                        type="text"
                                        searchValue={inputValue.state}
                                        icon={false}
                                        name="state"
                                        onChange={(e) => changeInputHandler(e)}
                                        className="outline-none sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                    />

                                    <InputCustome
                                        placeholder={'City'}
                                        type="text"
                                        searchValue={inputValue.city}
                                        icon={false}
                                        name="city"
                                        onChange={(e) => changeInputHandler(e)}
                                        className="outline-none sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                    />

                                </div>
                            </div>

                            <div className='w-full border'></div>

                            {/* row 03 */}
                            <div className="mb-4">
                                <p className='text-left font-poppins text-black text-md mb-2 mt-10'>Company Information <span className='text-red'>*</span></p>
                                <div className='removeGap flex flex-2 flex-wrap gap-x-20 gap-y-5'>
                                    <InputCustome
                                        placeholder={'Name of Company'}
                                        type="text"
                                        searchValue={inputValue.companyName}
                                        icon={false}
                                        name="companyName"
                                        onChange={(e) => changeInputHandler(e)}
                                        className="outline-none seperateDiv sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                    />

                                    <InputCustome
                                        placeholder={'Registered owner name of company'}
                                        type="text"
                                        searchValue={inputValue.ownerName}
                                        icon={false}
                                        name="ownerName"
                                        onChange={(e) => changeInputHandler(e)}
                                        className="outline-none seperateDiv sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                    />

                                    {/* <InputCustome
                                        placeholder={'Company registration no.'}
                                        type="text"
                                        searchValue={inputValue.registrationNo}
                                        icon={false}
                                        name="registrationNo"
                                        onChange={(e) => changeInputHandler(e)}
                                        className="outline-none seperateDiv sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                    /> */}
                                    <div className='w-[28%]'>
                                        <SelectDropdown
                                            className="outline-none seperateDiv sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                            optionArr={[{ label: "VAT NO" }, { label: "US DOT" }]}
                                            handleOnChange={handleOnChange1}
                                            labelTitle="Choose your Tax No"
                                        />
                                    </div>
                                    {/* <InputCustome
                                        placeholder={'VAT No.'}
                                        type="number"
                                        searchValue={inputValue.vatNo}
                                        icon={false}
                                        name="vatNo"
                                        onChange={(e) => changeInputHandler(e)}
                                        className="outline-none seperateDiv sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                    /> */}
                                    <InputCustome
                                        placeholder={'Company Type'}
                                        type="text"
                                        searchValue={inputValue.companyType}
                                        icon={false}
                                        name="companyType"
                                        onChange={(e) => changeInputHandler(e)}
                                        className="outline-none seperateDiv sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                    />
                                    <textarea
                                        className='w-full rounded-lg p-3 resize-none bg-cyan600 placeholder:text-black text-black outline-none'
                                        name="about"
                                        value={inputValue?.about}
                                        onChange={(e) => changeInputHandler(e)}
                                        placeholder='About Company' id="" cols="30" rows="10"></textarea>
                                </div>

                            </div>

                            {/* row 04 */}
                            <div className="mb-4">
                                <div className='flex flex-2 flex-wrap gap-x-20 gap-y-5'>
                                    <div className='mb-3'>
                                        <p className='text-blue mb-3 font-poppins'>Type of Service <span className='text-red'>*</span></p>
                                        <div class="inline-flex items-center" >
                                            <label class="relative flex items-center p-2 rounded-full cursor-pointer" htmlFor="tab01" onClick={() => setMoverAndPackerService(!moverAndPackerService)}>
                                                <input name="type" type="checkbox"
                                                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-blue transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity"
                                                    id={'tab01'} checked={`${moverAndPackerService ? 'checked' : ''}`} />
                                                <span
                                                    class="absolute text-blue transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                                        <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                                    </svg>
                                                </span>
                                            </label>
                                            <label class="mt-px font-poppins font-light text-gray-700 cursor-pointer select-none" htmlFor={'tab01'}>
                                                Packers & Movers
                                            </label>
                                        </div>
                                        <div class="inline-flex items-center" >
                                            <label class="relative flex items-center p-2 rounded-full cursor-pointer" htmlFor="tab02" onClick={() => setFurnitureService(!furnitureService)}>
                                                <input name="type" type="checkbox"
                                                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-blue transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity"
                                                    id={'tab02'} checked={`${furnitureService ? 'checked' : ''}`} />
                                                <span
                                                    class="absolute text-blue transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                                        <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                                    </svg>
                                                </span>
                                            </label>
                                            <label class="mt-px font-poppins font-light text-gray-700 cursor-pointer select-none" htmlFor={'tab02'}>
                                                Furniture
                                            </label>
                                        </div>
                                        <div class="inline-flex items-center">
                                            <label class="relative flex items-center p-2 rounded-full cursor-pointer" htmlFor="tab03" onClick={() => setAppliancesService(!appliancesService)}>
                                                <input name="type" type="checkbox"
                                                    class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-blue transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity"
                                                    id={'tab03'} checked={`${appliancesService ? 'checked' : ''}`} />
                                                <span
                                                    class="absolute text-blue transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                                        <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                                    </svg>
                                                </span>
                                            </label>
                                            <label class="mt-px font-light text-gray-700 cursor-pointer font-poppins select-none" htmlFor={'tab03'}>
                                                Appliances
                                            </label>
                                        </div>
                                    </div>

                                    {
                                        (moverAndPackerService) ? (
                                            <div>
                                                <p className='text-blue mb-3 font-poppins'>Service Type <span className='text-red'>*</span></p>
                                                <MultipleSelect
                                                    className="outline-none sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                                    optionArr={optionArr1}
                                                    handleOnChange={handleOnChange}
                                                    labelTitle={'Service Type'}
                                                    width={300}
                                                />
                                            </div>
                                        ) : ''
                                    }
                                </div>
                            </div>

                            <div className='w-full border'></div>

                            {
                                (moverAndPackerService) && (
                                    <div className="mb-4">
                                        <p className='text-left font-poppins text-black text-md mb-2 mt-10'>Permit Details <span className='text-red'>*</span></p>
                                        {
                                            inputValue?.permitDetails?.map((item, index) => (
                                                <>
                                                    <div className='removeGap flex mt-5 gap-x-5 gap-y-5'>
                                                        <InputCustome
                                                            placeholder={'Enter city where permit is issued'}
                                                            type="text"
                                                            searchValue={inputValue.permitDetails.permitCity}
                                                            icon={false}
                                                            name="permitCity"
                                                            onChange={(e) => permitDetailHandler(e.target.value, "permitCity", index)}
                                                            className="outline-none sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                                        />
                                                        <InputCustome
                                                            placeholder={'Enter Permit Type'}
                                                            type="text"
                                                            searchValue={inputValue.permitDetails.permitType}
                                                            icon={false}
                                                            name="permitType"
                                                            onChange={(e) => permitDetailHandler(e.target.value, "permitType", index)}
                                                            className="outline-none sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                                        />

                                                        <InputCustome
                                                            placeholder={'Enter Permit No.'}
                                                            type="text"
                                                            searchValue={inputValue.permitDetails.permitNo}
                                                            icon={false}
                                                            name="permitNo"
                                                            onChange={(e) => permitDetailHandler(e.target.value, "permitNo", index)}
                                                            className="outline-none sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                                        />
                                                        <InputCustome
                                                            placeholder={'Enter state where permit is issued.'}
                                                            type="text"
                                                            searchValue={inputValue.permitDetails.permitState}
                                                            icon={false}
                                                            name="permitState"
                                                            onChange={(e) => permitDetailHandler(e.target.value, "permitState", index)}
                                                            className="outline-none sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                                        />

                                                        <InputCustome
                                                            placeholder={'Valid till'}
                                                            type="date"
                                                            searchValue={inputValue.permitDetails.tillDate}
                                                            icon={false}
                                                            name="tillDate"
                                                            onChange={(e) => permitDetailHandler(e.target.value, "tillDate", index)}
                                                            className="outline-none sm:w-2/6 w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                                                        />

                                                    </div>
                                                    <div>
                                                        <div className='cursor-pointer font-poppins text-md' onClick={() => removeItem(index)}>{index === 0 ? '' : '- Remote Items'} </div>
                                                    </div>
                                                </>
                                            ))
                                        }

                                        {/* button */}
                                        <div className='flex items-center justify-start gap-3 mt-5 cursor-pointer' onClick={addMoreItems}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                <rect x="13" y="5" width="4" height="20" fill="#252460" />
                                                <rect x="5" y="17" width="4" height="20" transform="rotate(-90 5 17)" fill="#252460" />
                                                <circle cx="15" cy="15" r="14.5" stroke="#252460" />
                                            </svg>
                                            <h1 className='text-xl font-poppins text-blue not-italic font-bold'>Add More Permits</h1>
                                        </div>
                                    </div>
                                )
                            }



                            <div className='flex justify-start gap-1 items-center'>
                                <input type="checkbox" checked={checked ? checked : ''} name="termsCondition" onClick={() => setChecked(!checked)} id="checkbox" />
                                <Terms_Condition_Modal
                                    title={"Terms & Conditions"}
                                    description={'Terms & Agreements'}
                                    setChecked={setChecked}
                                    className="flex items-center cursor-pointer justify-start gap-1 text-md w-full text-blue p-1 rounded-sm"
                                />
                            </div>
                            <div className='text-center'>
                                <ButtonCustome
                                    className="text-md mt-10 w-md font-bold hover:bg-white hover:text-blue transition-all duration-500 text-white bg-blue border border-blue rounded-full px-10 m-auto p-2"
                                    buttonTitle="Submit for Approval"
                                    type="submit"
                                />
                            </div>
                        </form>
                    </div>
                    <UnderRevideModal
                        modal={modal}
                        setModal={setModal}
                    />
                </div>
            </div>
        </div>
    )
}

export default Register;

