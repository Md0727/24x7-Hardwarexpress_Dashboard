import { useState } from "react"
import { useDispatch } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import SearchBar from "../../components/Input/SearchBar"

const TopSideButtons = () => {

    return (
        <div className="inline-block float-right">
            <SearchBar styleClass="mr-4" />
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

    const dispatch = useDispatch()


    return (
        <>
            <TitleCard title="Uploaded Product" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr className="">
                                <th className="text-blue bg-cyan600 rounded-l-xl font-poppins text-md font-bold">Id</th>
                                <th className="text-blue font-poppins bg-cyan600 not-italic font-md">Client Name</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">Brand</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">Address</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">Quantity</th>
                                <th className="text-center bg-cyan600 text-blue font-poppins not-italic font-md">Amount</th>
                                <th className="text-blue bg-cyan600 rounded-r-xl font-poppins text-md font-bold text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-blue font-poppins not-italic font-md dark:text-white">#1</td>
                                <td className="text-blue font-poppins not-italic font-md dark:text-white">Peter Parker</td>
                                <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">300</td>
                                <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">!94, XYZ road, NY</td>
                                <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">1</td>
                                <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">$6500</td>
                                <td><button className="bg-orange-300 w-full text-blue font-poppins not-italic font-md dark:text-white text-xs px-2 py-1 rounded-md block">Canceled</button></td>
                            </tr>
                            <tr>
                                <td className="text-blue font-poppins not-italic font-md dark:text-white">#2</td>
                                <td className="text-blue font-poppins not-italic font-md dark:text-white">Peter Parker</td>
                                <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">300</td>
                                <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">!94, XYZ road, NY</td>
                                <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">1</td>
                                <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">$6500</td>
                                <td><button className=" bg-green-600 w-full text-blue font-poppins not-italic font-md dark:text-white text-xs px-2 py-1 rounded-md block">Processing...</button></td>
                            </tr>
                            <tr>
                                <td className="text-blue font-poppins not-italic font-md dark:text-white">#3</td>
                                <td className="text-blue font-poppins not-italic font-md dark:text-white">Peter Parker</td>
                                <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">300</td>
                                <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">!94, XYZ road, NY</td>
                                <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">1</td>
                                <td className="text-center text-blue font-poppins not-italic font-md dark:text-white">$6500</td>
                                <td><button className="bg-sky-600 w-full text-blue font-poppins not-italic font-md dark:text-white text-xs px-2 py-1 rounded-md block">Completed</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}

export default Integration