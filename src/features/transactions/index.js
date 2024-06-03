import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import { RECENT_TRANSACTIONS } from "../../utils/dummyData"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../../components/Input/SearchBar"
import { APIRequest, ApiUrl } from "../../utils/api"
import { toast } from "react-toastify"
import { FaSearch } from "react-icons/fa"
import TablePagination from '@mui/material/TablePagination';
import dayjs from "dayjs"

const TopSideButtons = ({ searchText, setSearchText, get_All_Transaction, ClearData }) => {

    return (
        <div className="inline-block float-right">
            {/* <SearchBar styleClass="mr-4" setSearchText={setSearchText} searchText={searchText} /> */}
            <div className="flex items-center justify-end gap-0">
                <SearchBar styleClass="mr-4" setSearchText={setSearchText} searchText={searchText} />
                <FaSearch onClick={get_All_Transaction} className="border w- w-10 cursor-all-scrollsdsd" />
                {/* <div onClick={() => alert('click')} className="border leading-none w- w-10 cursor-all-scrollsdsd"> Clear </div> */}
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


function Transactions({transactions}) {
    const [getTransaction, setGetTransaction] = useState([])
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

    const get_All_Transaction = () => {
        let config = {
            url: transactions,
            method: "post",
            body: {
                "data": searchText,
                "page": page + 1,
                "limit": rowsPerPage,
                "status": "All",
            }
        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    setGetTransaction(res?.data)
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
        get_All_Transaction()
    }, [page, rowsPerPage, searchText, setSearchText])
    return (
        <>

            <TitleCard title="Transaction" topMargin="mt-2" TopSideButtons={<TopSideButtons get_All_Transaction={get_All_Transaction} setSearchText={setSearchText} searchText={searchText} />}>

                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr className="">
                                <th className="text-white bg-cyan600 rounded-l-xl font-poppins text-md font-bold">Id</th>
                                <th className="text-center bg-cyan600 text-white font-poppins not-italic font-md">Invoice No</th>
                                <th className="text-center bg-cyan600 text-white font-poppins not-italic font-md">First Name</th>
                                <th className="text-center bg-cyan600 text-white font-poppins not-italic font-md">Last Name</th>
                                <th className="text-center bg-cyan600 text-white font-poppins not-italic font-md">Transaction Status</th>
                                <th className="text-center bg-cyan600 text-white font-poppins not-italic font-md">Payment Id</th>
                                <th className="text-center bg-cyan600 text-white font-poppins not-italic font-md">Amount</th>
                                <th className="text-white bg-cyan600 rounded-r-xl font-poppins text-md font-bold text-center">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (getTransaction?.length > 0) ? (
                                    getTransaction?.map((transaction, index) => (
                                        <tr key={index}>
                                            <td className="text-blue font-poppins not-italic font-md dark:text-white">{page * rowsPerPage + index + 1}</td>
                                            <td className="text-blue font-poppins not-italic font-md dark:text-white">{transaction?.invoiceNo}</td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">{transaction?.first_name}</td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">{transaction?.last_name}</td>
                                            {/* <td className="text-center text-blue font-poppins not-italic font-md dark:text-white"></td> */}
                                            <td><button className="bg-orange-300 w-full text-blue font-poppins not-italic font-md dark:text-white text-xs px-2 py-1 rounded-md block">{transaction?.status}</button></td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">{transaction?.paymentId}</td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">{transaction?.amount}</td>
                                            <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">{dayjs(transaction?.createdAt).format('DD/MM/YYYY')}</td>
                                        </tr>
                                    ))
                                ) : ("Not Found Data")
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


export default Transactions