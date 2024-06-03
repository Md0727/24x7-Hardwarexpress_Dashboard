import React, { useEffect, useState } from "react"
import { APIRequest, ApiUrl } from "../../../utils/api"
import { HiOutlineCurrencyDollar } from "react-icons/hi2"
import { BsChatLeftQuoteFill } from "react-icons/bs"
import { FaCartShopping } from "react-icons/fa6"
import { toast } from "react-toastify"

function DashboardStats() {

    const [count, setCount] = useState({})
    const [Isloading, setIsLoading] = useState(false)

    const get_All_Count = () => {
        setIsLoading(true)
        let config = {
            url: ApiUrl?.get_Count,
            method: "get",
        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    setCount(res)
                    setIsLoading(false)
                }
            },
            err => {
                if (err?.error) {
                    toast.error(err?.message)
                    setIsLoading(false)
                }
            }
        )
    }

    useEffect(() => {
        get_All_Count()
    }, [])

    return (
        <>
            <div className="stats shadow">
                <div className="stat">
                    <div className={`stat-figure dark:text-slate-300 text-`}><HiOutlineCurrencyDollar className='w-8 h-8' /></div>
                    <div className="stat-title dark:text-slate-300">Total Earning</div>
                    <div className={`stat-value dark:text-slate-300 text-`}>
                        {
                            !Isloading ? count?.earning : (
                                <div className='rounded-md bg-transparent h-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='' height={30} viewBox="0 0 200 200"><circle fill="#252460" stroke="#252460" strokeWidth={15} r={15} cx={40} cy={100}><animate attributeName="opacity" calcMode="spline" dur={2} values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4" /></circle><circle fill="#252460" stroke="#252460" strokeWidth={15} r={15} cx={100} cy={100}><animate attributeName="opacity" calcMode="spline" dur={2} values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2" /></circle><circle fill="#252460" stroke="#252460" strokeWidth={15} r={15} cx={160} cy={100}><animate attributeName="opacity" calcMode="spline" dur={2} values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin={0} /></circle></svg>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="stats shadow">
                <div className="stat">
                    <div className={`stat-figure dark:text-slate-300 text-`}><BsChatLeftQuoteFill className='w-8 h-8' /></div>
                    <div className="stat-title dark:text-slate-300">Transaction Count</div>
                    <div className={`stat-value dark:text-slate-300 text-`}>
                        {
                            !Isloading ? count?.transactionCount : (
                                <div className='rounded-md bg-transparent h-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='' height={30} viewBox="0 0 200 200"><circle fill="#252460" stroke="#252460" strokeWidth={15} r={15} cx={40} cy={100}><animate attributeName="opacity" calcMode="spline" dur={2} values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4" /></circle><circle fill="#252460" stroke="#252460" strokeWidth={15} r={15} cx={100} cy={100}><animate attributeName="opacity" calcMode="spline" dur={2} values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2" /></circle><circle fill="#252460" stroke="#252460" strokeWidth={15} r={15} cx={160} cy={100}><animate attributeName="opacity" calcMode="spline" dur={2} values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin={0} /></circle></svg>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="stats shadow">
                <div className="stat">
                    <div className={`stat-figure dark:text-slate-300 text-`}><FaCartShopping className='w-8 h-8' /></div>
                    <div className="stat-title dark:text-slate-300">Order Count</div>
                    <div className={`stat-value dark:text-slate-300 text-`}>
                        {
                            !Isloading ? count?.orderCount : (
                                <div className='rounded-md bg-transparent h-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='' height={30} viewBox="0 0 200 200"><circle fill="#252460" stroke="#252460" strokeWidth={15} r={15} cx={40} cy={100}><animate attributeName="opacity" calcMode="spline" dur={2} values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4" /></circle><circle fill="#252460" stroke="#252460" strokeWidth={15} r={15} cx={100} cy={100}><animate attributeName="opacity" calcMode="spline" dur={2} values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2" /></circle><circle fill="#252460" stroke="#252460" strokeWidth={15} r={15} cx={160} cy={100}><animate attributeName="opacity" calcMode="spline" dur={2} values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin={0} /></circle></svg>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardStats