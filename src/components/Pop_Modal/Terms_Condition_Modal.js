import * as React from 'react';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Terms_Condition_Modal({ title, className, description, setChecked }) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOkay = () => {
        setOpen(false);
        setChecked(true)
    };

    return (
        <React.Fragment>
            <label className={className} id='' variant="outlined" onClick={handleClickOpen}>
                {title}
            </label>
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
                    <DialogContentText id="alert-dialog-description" className='max-w-7xl'>
                        <p className='text-black font-medium'>
                            We give you all the latest tool to communicate efficiently with member user everywhere to
                            Discuss your product. Discuss your service. And make reservations or appointment.
                            Our users love great service and products.
                            <br />
                            All member user can rate the service you provide. You cannot discriminate base or race. Sex. National origin. Lifestyle and the
                            color of a member skin. Or a person age.
                            <br />
                            You are prohibited from using false info and picture in your business reply to the member user request for a service quote.
                            Or within any communication between you and member users. Or about the product you're selling.
                            <br />
                            You are required to report any abusive behavior so we all can work together to keep the service clean of bad actors.
                            You. Your business. Operator are responsible for the following: 
                            <br />
                            You and only you are responsible for the content of the daily deals you post. And the job price and product price.
                            For the content and picture you use to describe and showcase your product.
                            <br />
                            There is a small transactions fee on services provided and product sold.
                            <br />
                            Vendors. All the deals your business post will show to users in and near your store location. You can post deals to new location.
                            You can post unlimited amount of deals. Its free. And its like receiving free advertisement for your business.
                            Service providers. When members post a job and request a price quote from your business. It's best to reply ASAP
                            to user request because cost is always forefront in their decision making.
                            <br />
                            To protect your business and member users. License and insurance is required to be a member of Cmemove.
                            If you are not satisfied with our service. Go to your account setting and deactivate your account.
                        </p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button className='flex items-center justify-center gap-1 text-xs bg-cyan w-20 text-white p-1 rounded-sm' onClick={handleClose}>Cancle</button>
                    <button className='flex items-center justify-center gap-1 text-xs bg-green-500 w-20 text-white p-1 rounded-sm' onClick={handleOkay} autoFocus>
                        OK
                    </button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}