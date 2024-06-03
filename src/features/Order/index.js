import React, { useEffect, useState } from "react"
import TitleCard from "../../components/Cards/TitleCard"
import DashboardStats from "../dashboard/components/DashboardStats"
import { APIRequest, ApiUrl } from "../../utils/api"
import { toast } from "react-toastify"
import dayjs from "dayjs"
import { TablePagination } from "@mui/material"
import Product_Details_Modal from "../../components/Pop_Modal/Product_Details_Modal"
import Change_Status_Modal from "../../components/Pop_Modal/Change_Status_Modal"

const TopSideButtons = () => {

    return (
        <div className="inline-block float-right">
            {/* <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button> */}
        </div>
    )
}

function Orders() {
    const [getServiceData, setGetServiceData] = useState([])
    const [searchText, setSearchText] = useState('')

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getServiceDataFun = () => {
        let config = {
            url: ApiUrl?.getAllOrder,
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

    useEffect(() => {
        getServiceDataFun()
    }, [page, rowsPerPage, setSearchText])

    return (
        <>
            <div>
                {/** ---------------------- Different stats content 1 ------------------------- */}
                <div className="grid lg:grid-cols-3 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                    <DashboardStats />
                </div>
                <div className="grid lg:grid-cols-1 mt-4 grid-cols-1 gap-0">
                    {/* <LineChart /> */}
                </div>
            </div>

            <TitleCard title="Orders" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr className="">
                                <th className="text-white bg-cyan600 rounded-l-xl font-poppins text-md font-bold">Id</th>
                                <th className="text-white font-poppins bg-cyan600 not-italic font-md">User Name</th>
                                <th className="text-center bg-cyan600 text-white font-poppins not-italic font-md">Status</th>
                                <th className="text-center bg-cyan600 text-white font-poppins not-italic font-md">Address</th>
                                <th className="text-center bg-cyan600 text-white font-poppins not-italic font-md">Amount</th>
                                <th className="text-center bg-cyan600 text-white font-poppins not-italic font-md">Date || Time</th>
                                <th className="text-center bg-cyan600 text-white font-poppins not-italic font-md">View Details</th>
                                <th className="text-center bg-cyan600 text-white font-poppins not-italic font-md">Change Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getServiceData?.length > 0 ? (
                                    getServiceData?.map((item, index) => (
                                        <tr>
                                            <td className="text-blue font-poppins not-italic font-md dark:text-white">{page * rowsPerPage + index + 1}</td>
                                            <td className="text-left text-blue font-poppins not-italic font-md dark:text-white">{item?.userName ? item?.userName : '---'}</td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">
                                                <p className={`${item?.status === "Pending" ? "bg-red-500" : item?.status === "Processing" ? 'bg-yellow' : item?.status === "Packed" ? 'bg-Purple' : item?.status === "Out for Delivery" ? 'bg-Turquoise' : item?.status === "Delivered" ? 'bg-green800' : ''} px-2 rounded-sm text-white font-poppins`}>{item?.status ? item?.status : '---'}</p>
                                            </td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">{item?.fullAddress ? item?.fullAddress : '---'}</td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">{item?.total ? item?.total : '---'} </td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">{dayjs(item?.createdAt).format('DD/MM/YYYY')}</td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">
                                                <Product_Details_Modal
                                                    title={"View Details"}
                                                    description={'Product details.'}
                                                    items={item?._id}
                                                    className="flex items-center justify-center gap-1 text-xs bg-green-500 w-20 text-white p-1 rounded-sm"
                                                />
                                            </td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">
                                                <Change_Status_Modal
                                                    title={"Change Status"}
                                                    description={'Change Status'}
                                                    productId={item?._id}
                                                    getServiceDataFun={getServiceDataFun}
                                                    className="flex items-center justify-center gap-1 text-xs bg-green-500 w-24 text-white p-1 rounded-sm"
                                                />
                                            </td>
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


export default Orders