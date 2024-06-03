import * as React from 'react';
import { useEffect, useState } from "react"
import TitleCard from "../../components/Cards/TitleCard"
import { APIRequest, ApiUrl } from "../../utils/api"
import { toast } from "react-toastify"
import dayjs from "dayjs"
import { CiCircleRemove } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import TablePagination from '@mui/material/TablePagination';
import AddHeroSliderForm from "../../components/InformationForm/AddHeroSliderForm"
import SearchBar from '../../components/Input/SearchBar';
import { ButtonCustome } from '../../components/Button/CustomeButton';

const TopSideButtons = ({ searchText, setSearchText, searchTextDataFun, ClearData }) => {

    return (
        <div className="inline-block float-right">
            <div className="flex items-center justify-end gap-0">
                <SearchBar styleClass="mr-4" setSearchText={setSearchText} searchText={searchText} />
                <FaSearch onClick={searchTextDataFun} className="border w- w-10 cursor-all-scrollsdsd" />
                <div onClick={ClearData} className="border leading-none w- w-10 cursor-all-scrollsdsd"> Clear </div>
            </div>
            {/* {filterParam != "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2"/></button>}
            <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-sm btn-outline"><FunnelIcon className="w-5 mr-2"/>Filter</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
                    {
                        locationFilters.map((l, k) => {
                            return  <li key={k}><a onClick={() => showFiltersAndApply(l)}>{l}</a></li>
                        })
                    }
                    <div className="divider mt-0 mb-0"></div>
                    <li><a onClick={() => removeAppliedFilter()}>Remove Filter</a></li>
                </ul>
            </div> */}
        </div>
    )
}

function Integration() {
    const [isComponentId, setIscomponentId] = useState(1)
    const [getServiceData, setGetServiceData] = useState([])
    const [searchText, setSearchText] = useState('')

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getServiceDataFun = () => {
        let config = {
            url: `${ApiUrl?.get_Hero_banners}`,
            method: "get",
        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    setGetServiceData(res?.data)
                }
            },
            err => {
                if (err?.error) {
                    toast.error(err?.message)
                }
            }
        )
    }

    const removeItems = (id) => {
        const userConfirmed = window.confirm('Do you want to Delete the record? Press "OK to confirm or "Cancel" to abort.');
        if (userConfirmed) {
            let config = {
                url: `${ApiUrl?.bannerDelete}${id}`,
                method: "delete",
            }
            APIRequest(
                config,
                res => {
                    console.log('res', res)
                    if (!res?.error) {
                        toast.success(res?.message)
                        getServiceDataFun()
                    }
                },
                err => {
                    if (err?.error) {
                        toast.error(err?.message)
                    }
                }
            )
        }
    }

    useEffect(() => {
        getServiceDataFun()
    }, [page, rowsPerPage, setSearchText])

    const addProduct = () => {
        setIscomponentId(2)
    }


    return (
        <>
            {
                (isComponentId === 1) && (
                    <>
                        <div className="bg-white">
                            <div className="w-full border-2 p-5 rounded-md border-gray-400 border-dashed ">
                                <h1 className="text-center font-poppins font-bold text-2xl text-black">Ready to start something awesome</h1>
                                <img />
                                <div className="text-center">
                                    <ButtonCustome
                                        className="text-md w-62 mt-3 font-bold hover:bg-white hover:text-cyan transition-all duration-500 text-white bg-cyan border border-cyan rounded-xl px-10 m-auto p-2"
                                        buttonTitle="Add Hero Slider"
                                        type="text"
                                        onClick={addProduct}
                                    />
                                </div>
                            </div>
                        </div>
                        <TitleCard title="Add Hero Slider" topMargin="mt-2" TopSideButtons={<TopSideButtons setSearchText={setSearchText} searchText={searchText} />}>
                            {/* Team Member list in table format loaded constant */}
                            <div className="overflow-x-auto w-full">
                                <table className="table w-full">
                                    <thead>
                                        <tr className="">
                                            <th className="text-white bg-cyan600 rounded-l-xl font-poppins text-md font-bold">Id</th>
                                            <th className="text-white font-poppins bg-cyan600 not-italic font-md">Image</th>
                                            <th className="text-center bg-cyan600 text-white font-poppins not-italic font-md">Type</th>
                                            <th className="text-center bg-cyan600 text-white font-poppins not-italic font-md">Title</th>
                                            <th className="text-center bg-cyan600 text-white font-poppins not-italic font-md">Description</th>
                                            <th className="text-center bg-cyan600 text-white font-poppins not-italic font-md">Date || Time</th>
                                            <th className="text-center rounded-r-xl bg-cyan600 text-white font-poppins not-italic font-md">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getServiceData?.length > 0 ? (
                                                getServiceData?.map((item, index) => (
                                                    <tr>
                                                        <td className="text-blue font-poppins not-italic font-md dark:text-white">{index + 1}</td>
                                                        <td className="text-left text-blue font-poppins not-italic font-md dark:text-white">
                                                            <div className='max-w-xl w-16'>
                                                                <img src={item?.image} className='w-full h-auto' alt="product image" />
                                                            </div>
                                                        </td>
                                                        <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">{item?.type ? item?.type : '---'}</td>
                                                        <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">{item?.title ? item?.title : '---'}</td>
                                                        <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">{item?.description ? item?.description : '---'}</td>
                                                        <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">{dayjs(item?.createdAt).format('DD/MM/YYYY')}</td>
                                                        <td className="text-blue text-center font-poppins not-italic font-md dark:text-white">
                                                            <button onClick={() => removeItems(item?._id)} className="flex w-full items-center justify-center gap-1 text-xs bg-red-500 text-white p-1 rounded-sm"><CiCircleRemove /> Remove</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <h1 className='text3xl w-28'>Data not Found</h1>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <TablePagination
                                component="div"
                                count={100}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TitleCard>
                    </>
                )
            }
            {
                (isComponentId === 2) && (
                    <>
                        <AddHeroSliderForm
                            setIscomponentId={setIscomponentId}
                            isComponentId={isComponentId}
                            getServiceDataFun={getServiceDataFun}
                        />
                    </>
                )
            }
        </>
    )
}

export default Integration