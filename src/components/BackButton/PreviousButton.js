import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'

const PreviousButton = ({ setIscomponentId, isComponentId }) => {
    let navigate = useNavigate()
    isComponentId === 1 && navigate("/app/dashboard")


    const Back = () => {
        if (isComponentId === 8) {
            setIscomponentId(1)
        } else {
            setIscomponentId(isComponentId === 0 ? 1 : isComponentId - 1)
        }
    }

    return (
        <div className='go-to-back mt-4' onClick={() => Back()}>
            <Link><IoMdArrowRoundBack className='text-3xl'/></Link>
        </div>
    )
}

export default PreviousButton