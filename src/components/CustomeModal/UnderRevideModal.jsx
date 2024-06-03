import { useState } from "react"
import { image } from "../../constent/image"
import { ButtonCustome } from "../Button/CustomeButton"
import { ImageTag } from "../ImageTag/ImageTag"

export const UnderRevideModal = ({modal, setModal}) => {
    
    return (
        <div className={`w-full ${modal ? 'block' : 'hidden'} fixed top-0 left-0 h-screen flex justify-center items-start flex-col`} style={{backgroundColor: 'rgb(0 0 0 / 40%)'}}>
            <div className='sd shadow-md max-w-2xl m-auto bg-white'>
                <div>
                    <ImageTag
                        src={image?.searchIcon}
                        className="text-center m-auto"
                    />
                    <p className='text-center font-poppins text-blue font-500'>Your Application is under review</p>

                    <div className='text-center mb-4'>
                        <ButtonCustome
                            className="text-md mt-10 w-md font-bold hover:bg-white hover:text-blue transition-all duration-500 text-white bg-blue border border-blue rounded-full px-10 m-auto p-2"
                            buttonTitle="Close"
                            type="text"
                            onClick={()=> setModal(false)}
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}