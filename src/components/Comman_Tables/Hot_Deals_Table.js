import * as React from 'react';
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
// import { showNotification } from "../common/headerSlice"
import SearchBar from "../../components/Input/SearchBar"
import { image } from "../../constent/image"
import { ButtonCustome } from "../../components/Button/CustomeButton"
import { useNavigate } from "react-router-dom"
import { APIRequest, ApiUrl } from "../../utils/api"
import { toast } from "react-toastify"
import dayjs from "dayjs"
import { CiCircleRemove } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import TablePagination from '@mui/material/TablePagination';
import Service_Request_Modal from '../../components/Pop_Modal/Service_Request_Modal';
import Service_Quotes_Modal from '../../components/Pop_Modal/Service_Quotes_Modal';

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

function Integration({totalQuotation}) {
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const [getServiceRequestData, setGetServiceRequestData] = useState([])
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
            url: totalQuotation,
            method: "post",
            body: {
                "data": searchText,
                "page": page + 1,
                "limit": rowsPerPage
            }
        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    setGetServiceRequestData(res?.data)
                }
            },
            err => {
                if (err?.error) {
                    toast.error(err?.message)
                }
            }
        )
    }

    const ClearData = () => {
        setSearchText('')
        let config = {
            url: ApiUrl?.getAllVendor,
            method: "post",
            body: {
                "data": "All",
                "page": 1,
                "limit": 10
            }
        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    setGetServiceRequestData(res?.data)
                }
            },
            err => {
                if (err?.error) {
                    toast.error(err?.message)
                }
            }
        )
    }

    const searchTextDataFun = () => {
        getServiceDataFun()
    }

    useEffect(() => {
        getServiceDataFun()
    }, [page, rowsPerPage, setSearchText])

    return (
        <>
            <TitleCard title="Uploaded Service Request." topMargin="mt-2" TopSideButtons={<TopSideButtons searchTextDataFun={searchTextDataFun} ClearData={ClearData} setSearchText={setSearchText} searchText={searchText} />}>
                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr className="">
                                <th className="text-blue bg-cyan600 rounded-l-xl font-poppins text-md font-bold">Id</th>
                                <th className="text-blue font-poppins bg-cyan600 not-italic font-md">Service Type</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">Total Amount</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">Discount</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">Payable Amount</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">Status</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">Size</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">Vehicle</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">Date || Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getServiceRequestData?.length > 0 ? (
                                    getServiceRequestData?.map((item, index) => (
                                        <tr>
                                            <td className="text-blue font-poppins not-italic font-md dark:text-white">{index + 1}</td>
                                            <td className="text-left text-blue font-poppins not-italic font-md dark:text-white">
                                                <div className='w w-24'>{item?.serviceType ? item?.serviceType : '---'}</div>
                                            </td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">
                                                <div className='w w-24'>{item?.totalAmount ? item?.totalAmount : '---'}</div>
                                            </td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">
                                                <div className='w w-24'>{item?.discount ? item?.discount : '---'}</div>
                                            </td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">
                                                <div className='w w-24'>{item?.payableAmount ? item?.payableAmount : '---'}</div>
                                            </td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">
                                                <p className={`text-white ${(item?.status === "Pending" || item?.status === "Deny") ? ('bg-red-500') : ('bg-green-500')} px-2 rounded-sm`}>{item?.status}</p>
                                            </td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">{item?.size ? item?.size : '---'}</td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">{item?.vehicle ? item?.vehicle : '---'}</td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">{dayjs(item?.createdAt).format('DD/MM/YYYY') ? dayjs(item?.createdAt).format('DD/MM/YYYY') : '---'}</td>
                                            
                                        </tr>
                                    ))
                                ) : (
                                    <h1 className='text3xl '>Data not Found</h1>
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

export default Integration