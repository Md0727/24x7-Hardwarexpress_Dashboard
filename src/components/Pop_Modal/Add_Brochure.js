import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputCustome2 } from '../InputCustome/InputCustome2';
import { APIRequestWithFile, ApiUrl } from "../../utils/api"
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Add_Brochure({ title, className, description, items }) {
    const [open, setOpen] = React.useState(false);
    const [filePath, setFilePath] = useState(null)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const handleFileChange = (event) => {
    //     setFilePath(event.target.files[0])
    // };

    console.log('filePath', filePath)

    let formData = new FormData();
    formData.append('pdf', filePath); // Assuming filePath is a File object

    const uploadPDFFile = () => {
        let config = {
            url: ApiUrl?.uploadBrochure, // Assuming ApiUrl is defined elsewhere
            method: "post",
            body: formData
        };
        APIRequestWithFile(
            config,
            res => {
                console.log('Response:', res);
                if (!res?.error) {
                    toast.success(res?.message)
                    setOpen(false);
                }
            },
            err => {
                console.log('Error: ==============', err?.data);
                if (err?.data?.error) {
                    toast.error(err?.data?.message)
                }
                // Handle error
            }
        );
    };

    const handleUpload = () => {
        if (isPDFFile(filePath)) {
            console.log('filePath', filePath)
            uploadPDFFile();
        } else {
            alert('Please upload a PDF file.');
            // You can show an error message or handle it in any way you want
        }
    }

    const isPDFFile = (filePath) => {
        return filePath && filePath.type === 'application/pdf';
    };


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
                        {/* <div>
                            <h2>Upload CSV File</h2>
                            <input type="file" onChange={handleFileChange} accept=".csv" />
                        </div> */}
                        <div className='mb-3 text-black text-2xl'>Upload Brochure PDF File.</div>
                        <div className="w-full">
                            <InputCustome2
                                type="file"
                                onChange={(e) => setFilePath(e.target.files[0])} // Pass the selected file to handleFileChange
                                accept=".pdf"
                                icon={false}
                                name="file"
                                className="outline-none w-full text-left rounded-lg px-3 py-2 placeholder:text-black bg-cyan600 text-black"
                            />
                        </div>
                        <div className="px-5">
                            <p className="text-xs mt-3 mb-1 text-black">Max File Size: 5 MB</p>
                            <p className="text-xs text-black">Allowed File: PDF</p>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button className='flex items-center justify-center gap-1 text-xs bg-cyan w-20 text-white p-1 rounded-sm' onClick={handleClose}>Cancle</button>
                    <button className='flex items-center justify-center gap-1 text-xs bg-green-500 w-20 text-white p-1 rounded-sm' onClick={handleUpload} autoFocus>
                        UPLOAD
                    </button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}