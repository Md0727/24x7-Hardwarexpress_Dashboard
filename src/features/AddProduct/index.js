import { image } from "../../constent/image"
import { ButtonCustome } from "../../components/Button/CustomeButton"
import { useEffect, useState } from "react";
import { APIRequest, APIRequestWithFile, ApiUrl } from '../../utils/api';
import { InputCustome2 } from "../../components/InputCustome/InputCustome2";
import { ImageTag } from "../../components/ImageTag/ImageTag";
import { toast } from "react-toastify";
import MultipleSelect from "../../components/selectDropdown/MultipleSelect";

function Integration() {
    const [isLoading, setIsLoading] = useState(false);
    const [productType, setProductType] = useState([])
    const [inputValue, setInputValue] = useState(
        {
            "name": "",
            "brand": "",
            "category": "",
            "quantity": "",
            "totalPrice": "",
            "description": "",
            "isPercent": "",
            "discount": "",
            "weight": "",
            "warranty": "",
            "images": [],
            "tags": [],
        }
    );

    const resetInputFeild = () => {
        setInputValue({
            "name": "",
            "brand": "",
            "category": "",
            "quantity": "",
            "totalPrice": "",
            "description": "",
            "isPercent": "",
            "discount": "",
            "weight": "",
            "warranty": "",
            "images": [],
        })
    }

    const handleImageInputChange = (file) => {
        const updatedItems = { ...inputValue };
        updatedItems.images = [...updatedItems.images, file];
        setInputValue(updatedItems);
    };

    const handlerTaxType = (e) => {
        const updatedItems = { ...inputValue };
        updatedItems.isPercent = e.target.value;
        setInputValue(updatedItems);
    }

    const handlerCategory = (e) => {
        const updatedItems = { ...inputValue };
        updatedItems.category = e.target.value;
        setInputValue(updatedItems);
    }

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

    const changeInputHandler = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value })
    }

    const uploadProduct = () => {
        setIsLoading(true)
        let config = {
            url: ApiUrl?.addProduct,
            method: "post",
            body: inputValue
        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    setIsLoading(false)
                    resetInputFeild()
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

    // ============== get tag base  ddon type ==============
    const getProductType = () => {
        setIsLoading(true)
        let config = {
            url: ApiUrl?.getCategoryAllRoute,
            method: 'get',
        }
        APIRequest(
            config,
            res => {
                setProductType(res?.data)
                console.log(res?.data, "inputValue?.category")
                setIsLoading(false)
            },
            err => {
                setIsLoading(false)
            }
        )
    }

    useEffect(() => {
        getProductType();
    }, [])

    return (
        <>
            <div className="bg-white">
                <h2 className="text-xl text-blue font-poppins font-bold">Add new product</h2>
                <div className="mb-4">
                    {/* row 01 */}
                    <div className="flex gap-2 mb-3 justify-between">
                        <div className="w-full">
                            <label htmlFor="" className="block">Product Name <span className="text-red">*</span></label>
                            <InputCustome2
                                placeholder={'Product Name'}
                                type="text"
                                searchValue={inputValue.name}
                                icon={false}
                                name="name"
                                onChange={(e) => changeInputHandler(e)}
                                className="outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="" className="block">Brand <span className="text-red">*</span></label>
                            <InputCustome2
                                placeholder={'Brand'}
                                type="text"
                                searchValue={inputValue.brand}
                                icon={false}
                                name="brand"
                                onChange={(e) => changeInputHandler(e)}
                                className="outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                            />
                        </div>
                    </div>

                    {/* row 02 */}
                    <div className="flex gap-2 mb-3 justify-between">
                        <div className="w-full">
                            <label htmlFor="" className="block">Category <span className="text-red">*</span></label>
                            <select name="seatCap" id="seatCap" value={inputValue.category} onChange={handlerCategory} className="outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black">
                                <option value="">Selected</option>
                                {
                                    productType?.map((cate, index) => (
                                        <option key={index} value={cate?.category}>{cate?.category}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="w-full">
                            <label htmlFor="" className="block">Discount <span className="text-red">*</span></label>
                            <InputCustome2
                                placeholder={'Discount'}
                                type="text"
                                searchValue={inputValue.discount}
                                icon={false}
                                name="discount"
                                onChange={(e) => changeInputHandler(e)}
                                className="outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                            />
                        </div>
                    </div>

                    {/* row 03 */}
                    <div className="flex gap-2 mb-3 justify-between">
                        <div className="w-full">
                            <label htmlFor="" className="block">Number of Units <span className="text-red">*</span></label>
                            <InputCustome2
                                placeholder={'eg. 100'}
                                type="number"
                                searchValue={inputValue.quantity}
                                icon={false}
                                name="quantity"
                                onChange={(e) => changeInputHandler(e)}
                                className="outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="" className="block">Total Price <span className="text-red">*</span></label>
                            <InputCustome2
                                placeholder={'Total Price'}
                                type="number"
                                searchValue={inputValue.totalPrice}
                                icon={false}
                                name="totalPrice"
                                onChange={(e) => changeInputHandler(e)}
                                className="outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                            />
                        </div>
                    </div>

                    {/* row 04 */}
                    <div className="flex gap-2 mt-3 justify-between">
                        <div className="w-full">
                            <label htmlFor="" className="block">Product Warranty <span className="text-red">*</span></label>
                            <InputCustome2
                                placeholder={'Product Warranty'}
                                type="text"
                                searchValue={inputValue.warranty}
                                icon={false}
                                name="warranty"
                                onChange={(e) => changeInputHandler(e)}
                                className="outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="" className="block">Weight <span className="text-red">*</span></label>
                            <InputCustome2
                                placeholder={'Weight'}
                                type="text"
                                searchValue={inputValue.weight}
                                icon={false}
                                name="weight"
                                onChange={(e) => changeInputHandler(e)}
                                className="outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                            />
                        </div>

                    </div>

                    {/* row 05 */}
                    <div className="flex gap-2 mt-3 justify-between">
                        <div className="w-full">
                            <label htmlFor="" className="block">Discount %<span className="text-red">*</span></label>
                            <select name="seatCap" onChange={handlerTaxType} id="seatCap" className="outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black">
                                <option value="">Selected</option>
                                <option value="true">Percentage</option>
                                <option value="false">Number</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-5">
                        <div className="w-full">
                            <h2 className='text-md font-poppins text-cyan font-100 not-italic mt-5 mb-2'>Upload Photos</h2>
                            <div className='flex items-start justify-start gap-3'>
                                {/* Display images */}

                                {
                                    inputValue?.images?.length > 0 ? inputValue.images?.map((filePath, index) => (
                                        <div className='w-16 h-12 rounded-lg p-1 shadow' key={index}>
                                            <ImageTag className="rounded-lg h-full" src={filePath ? filePath : image?.dubbing_img} />
                                        </div>
                                    )) : (
                                        <div className='w-16 h-12'>
                                            <ImageTag src={image?.dubbing_img} className="h-full" />
                                        </div>
                                    )
                                }

                                <div className='w-20 text-center '>
                                    <div className='relative'>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, "images")}
                                            className='d appearance-none absolute left-0 opacity-0 z-10 w-20 h-20 border-2 opacity-1'
                                        />
                                        <div className='absolute top-0 w-full h-full'>
                                            <svg className='cursor-pointer m-auto' xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                <path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1572 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18ZM14 9H11V6C11 5.73478 10.8946 5.48043 10.7071 5.29289C10.5196 5.10536 10.2652 5 10 5C9.73479 5 9.48043 5.10536 9.2929 5.29289C9.10536 5.48043 9 5.73478 9 6V9H6C5.73479 9 5.48043 9.10536 5.2929 9.29289C5.10536 9.48043 5 9.73478 5 10C5 10.2652 5.10536 10.5196 5.2929 10.7071C5.48043 10.8946 5.73479 11 6 11H9V14C9 14.2652 9.10536 14.5196 9.2929 14.7071C9.48043 14.8946 9.73479 15 10 15C10.2652 15 10.5196 14.8946 10.7071 14.7071C10.8946 14.5196 11 14.2652 11 14V11H14C14.2652 11 14.5196 10.8946 14.7071 10.7071C14.8946 10.5196 15 10.2652 15 10C15 9.73478 14.8946 9.48043 14.7071 9.29289C14.5196 9.10536 14.2652 9 14 9Z" fill="#252460" />
                                            </svg>
                                            <p className='text-center text-blue font-poppins text-md leading-none mt-1'>Add more photos</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex sm:flex-wrap justify-between gap-3">
                            <div className="w-full">
                                <input type="checkbox" id="chekcbox" />
                                <label htmlFor="chekcbox" className="ml-2">Manage Stock (enable stock management at product level)</label>
                            </div>
                            <div className="w-full">
                                <textarea
                                    className='w-full rounded-lg p-3 resize-none bg-cyan600 placeholder:text-black text-black outline-none'
                                    name="description"
                                    placeholder='Product Description.'
                                    id=""
                                    cols="30"
                                    rows="10"
                                    value={inputValue.description}
                                    icon={false}
                                    onChange={(e) => changeInputHandler(e)}
                                ></textarea>
                            </div>
                            <div className='w-full border'></div>
                            <div className="button flex jus justify-between w-full">
                                <div className='text-center'>
                                    <ButtonCustome
                                        className="text-md mt-10 w-md font-bold hover:bg-white hover:text-blue transition-all duration-500 text-white bg-blue border border-blue rounded-full px-10 m-auto p-2"
                                        buttonTitle="Upload Product"
                                        type="text"
                                        onClick={uploadProduct}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Integration
