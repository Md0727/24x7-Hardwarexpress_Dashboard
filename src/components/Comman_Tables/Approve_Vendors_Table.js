import * as React from 'react';
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
// import { showNotification } from "../common/headerSlice"
import SearchBar from "../../components/Input/SearchBar"
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom"
import { APIRequest, ApiUrl } from "../../utils/api"
import { toast } from "react-toastify"
import dayjs from "dayjs"
import { FaSearch } from "react-icons/fa";
import TablePagination from '@mui/material/TablePagination';
import Change_Status_Modal from '../Pop_Modal/Change_Status_Modal';
import Vendor_Details_Modal from '../Pop_Modal/Vendor_Details_Modal';

const TopSideButtons = ({ searchText, setSearchText, searchTextDataFun, ClearData }) => {

    return (
        <div className="inline-block float-right">
            <div className="flex items-center justify-end gap-0">
                <SearchBar styleClass="mr-4" setSearchText={setSearchText} searchText={searchText} />
                <FaSearch onClick={searchTextDataFun} className="border w- w-10 cursor-all-scrollsdsd" />
                <div onClick={ClearData} className="border leading-none w- w-10 cursor-all-scrollsdsd"> Clear </div>
            </div>
        </div>
    )
}

function Integration({ VendorsQuotation, status }) {
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
            url: VendorsQuotation,
            method: "post",
            body: {
                "data": searchText,
                "page": page + 1,
                "limit": rowsPerPage,
                "status": status
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
            url: VendorsQuotation,
            method: "post",
            body: {
                "data": "",
                "page": 1,
                "limit": 10,
                "status": "All"
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

    // Delete vendor funcation
    const handlerDeletVendor = (id) => {
        let confirmModle = window.confirm("Do you want Permanently Deleting Vendor Recode");
        if (confirmModle) {
            let config = {
                url: `${ApiUrl?.delete_vendor}/${id}`,
                method: "delete",
            }
            APIRequest(
                config,
                res => {
                    if (!res?.error) {
                        toast.success(res?.message)
                        getServiceDataFun();
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


    return (
        <>
            <TitleCard title="All Vendors" topMargin="mt-2" TopSideButtons={<TopSideButtons searchTextDataFun={searchTextDataFun} ClearData={ClearData} setSearchText={setSearchText} searchText={searchText} />}>
                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr className="">
                                <th className="text-blue bg-cyan600 rounded-l-xl font-poppins text-md font-bold">Id</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">Name</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">Email</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">Contact No</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">User Id</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">Status</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">Change Status</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">View Detail</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">Action</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">Date || Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getServiceRequestData?.length > 0 ? (
                                    getServiceRequestData?.map((item, index) => (
                                        <tr>
                                            <td className="text-blue font-poppins not-italic font-md dark:text-green800">{page * rowsPerPage + index + 1}</td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">
                                                <div className='w w-24'>{item?.name ? item?.name : '---'}</div>
                                            </td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">
                                                <div className='w-auto'>{item?.email ? item?.email : '---'}</div>
                                            </td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">
                                                <div className='w w-24'>{item?.contact ? item?.contact : '---'}</div>
                                            </td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">
                                                <div className='w w-24'>{item?.userId ? item?.userId : '---'}</div>
                                            </td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">
                                                <p className={`text-white ${(item?.status === "Pending" || item?.status === "Rejected") ? ('bg-red-500') : ('bg-green-500')} px-2 rounded-sm`}>{item?.status}</p>
                                            </td>
                                            {/* <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">
                                                <p className={`text-white ${(item?.status === "Pending" || item?.status === "Rejected") ? ('bg-red-500') : ('bg-green-500')} px-2 rounded-sm`}>{item?.status}</p>
                                            </td> */}

                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">
                                                <Change_Status_Modal
                                                    title={"Change Status"}
                                                    description={'Change Status'}
                                                    productId={item?._id}
                                                    getServiceDataFun={getServiceDataFun}
                                                    className="flex items-center justify-center gap-1 text-xs bg-green-500 w-24 text-white p-1 rounded-sm"
                                                />
                                            </td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">
                                                <Vendor_Details_Modal
                                                    title={"View Details"}
                                                    items={item}
                                                    className="flex items-center justify-center gap-1 text-xs bg-green-500 w-20 text-white p-1 rounded-sm"
                                                />
                                            </td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">
                                                <MdDelete size={25} className='m-auto cursor-pointer' onClick={() => handlerDeletVendor(item?._id)} />
                                            </td>
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