import * as React from 'react';
import { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import { APIRequest, ApiUrl } from '../../utils/api';
import { GiWeightScale } from "react-icons/gi";
import { FaCalendarAlt } from 'react-icons/fa';
import { Dialog } from '@mui/material';

export default function Product_Details_Modal({ title, className, description, items }) {
    const [open, setOpen] = useState(false);
    const [getServiceData, setGetServiceData] = useState({})
    const handleClickOpen = () => {
        setOpen(true);
        getServiceDataFun()
    };

    console.log(getServiceData, "getServiceData===============")


    const handleClose = () => {
        setOpen(false);
    };

    const getServiceDataFun = () => {
        let config = {
            url: ApiUrl?.viewDetails,
            method: "post",
            body: {
                "orderId": items
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

    return (
        <React.Fragment>
            <button className={className} variant="outlined" onClick={handleClickOpen}>
                {title}
            </button>
            <Dialog
                open={open}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {description}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className='w-96'>

                        <div className="mx-auto flex max-w-3xl flex-col space-y-4 px-2 sm:px-2">
                            <ul className="flex flex-col divide-y divide-gray-200">
                                {
                                    getServiceData[0]?.productDetails?.map((element, index) => (
                                        <li key={index} className="flex flex-col py-6 sm:flex-row sm:justify-between">
                                            <div className="flex w-full space-x-2 sm:space-x-4">
                                                <img className="h-16 w-16 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-16 sm:w-16" src={element.details.images[0]} alt="Nike Air Force 1 07 LV8" />
                                                <div className="flex w-full flex-col justify-between pb-4">
                                                    <div className="flex w-full justify-between space-x-2 pb-2">
                                                        <div className="space-y-1">
                                                            <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                                                                {element.details.name}, {element.details.brand}
                                                            </h3>
                                                            <p className="text-sm">Quantity {element.product.quantity}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            {/* <p className="text-lg font-semibold">₹47,199</p> */}
                                                            <p className="text-lg font-semibold">₹ {element.product.price}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex divide-x text-sm">
                                                        <div type="button" className="flex items-center space-x-2 px-2 py-1 pl-0">
                                                            <GiWeightScale />
                                                            <span>{element.details.weight}</span>
                                                        </div>
                                                        <div type="button" className="flex items-center space-x-2 px-2 py-1">
                                                            <FaCalendarAlt />
                                                            <span>{element.details.warranty}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            {/* <div className="space-y-1 text-right">
                                <p>
                                    Total amount:<span className="font-semibold"> $ {element.product.total}</span>
                                </p>
                            </div> */}
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button className='flex items-center justify-center gap-1 text-xs bg-cyan w-20 text-white p-1 rounded-sm' onClick={handleClose}>Cancle</button>
                    <button className='flex items-center justify-center gap-1 text-xs bg-green-500 w-20 text-white p-1 rounded-sm' onClick={handleClose} autoFocus>
                        OK
                    </button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}