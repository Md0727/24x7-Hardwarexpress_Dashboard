import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputCustome } from '../InputCustome/InputCustome';
import { toast } from 'react-toastify';
import { APIRequest, ApiUrl } from '../../utils/api';
import { GiWeightScale } from "react-icons/gi";
import { FaCalendarAlt } from 'react-icons/fa';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function Change_Status_Modal({ title, className, description, productId, getServiceDataFun, VendorStatus }) {
    var token = JSON.parse(sessionStorage.getItem("data"))
    const decodedToken = jwtDecode(token);

    const [open, setOpen] = useState(false);
    const [statusChanger, setStatusChanger] = useState('')
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSuccess = () => {
        statusChangerFun()
    };

    const statusChangerFun = () => {
        let body;
        if (decodedToken.role === "Admin") {
            body = {
                "userId": productId,
                "status": statusChanger
            }
        } else {
            body = {
                "orderId": productId,
                "status": statusChanger
            }
        }
        let config = {
            url: decodedToken.role === "Admin" ? ApiUrl?.admin_changeStatus : ApiUrl?.changeStatus,
            method: "post",
            body: body
        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    setOpen(false);
                    getServiceDataFun()
                    toast.success(res?.message)
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
                        {
                            decodedToken.role === "Admin" ? (
                                <div className="">
                                    <div className="w-full">
                                        {
                                            (VendorStatus === "Pending" || VendorStatus === "All") && (
                                                <select name="seatCap" onChange={(e) => setStatusChanger(e.target.value)} id="seatCap" className="outline-none sm:h-10 text-md w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black">
                                                    <option value="">Selected</option>
                                                    <option value="Approved">Approved</option>
                                                    <option value="Rejected">Rejected</option>
                                                </select>
                                            )
                                        }
                                        {
                                            (VendorStatus === "Approved") && (
                                                <select name="seatCap" onChange={(e) => setStatusChanger(e.target.value)} id="seatCap" className="outline-none sm:h-10 text-md w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black">
                                                    <option value="">Selected</option>
                                                    <option value="Disable">Disable</option>
                                                </select>
                                            )
                                        }
                                        {
                                            (VendorStatus === "Disable") && (
                                                <select name="seatCap" onChange={(e) => setStatusChanger(e.target.value)} id="seatCap" className="outline-none sm:h-10 text-md w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black">
                                                    <option value="">Selected</option>
                                                    <option value="Approved">Enable</option>
                                                    <option value="Rejected">Rejected</option>
                                                </select>
                                            )
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div className="">
                                    <div className="w-full">
                                        <select name="seatCap" onChange={(e) => setStatusChanger(e.target.value)} id="seatCap" className="outline-none sm:h-10 text-md w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black">
                                            <option value="">Selected</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Packed">Packed</option>
                                            <option value="Out for Delivery">Out for Delivery</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>
                                </div>
                            )
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button className='flex items-center justify-center gap-1 text-xs bg-cyan w-20 text-white p-1 rounded-sm' onClick={handleClose}>Cancle</button>
                    <button className='flex items-center justify-center gap-1 text-xs bg-green-500 w-20 text-white p-1 rounded-sm' onClick={handleSuccess} autoFocus>
                        OK
                    </button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}