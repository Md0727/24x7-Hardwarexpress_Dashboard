import React from 'react'

export const InputCustome2 = (props) => {
    const {
        className,
        placeholder,
        icon,
        onChange,
        searchValue,
        name,
        type,
        accept,
        disabled
    } = props
    return (
        <>
            <input
                type={type ? type : ''}
                className={className ? className : ''}
                placeholder={placeholder ? placeholder : ''}
                value={searchValue}
                onChange={onChange}
                name={name}
                disabled={disabled ? disabled : ''}
                accept={accept ? accept : ''}
            />
            {
                (icon) && <div className='absolute top-3 left-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                        <path d="M13.7445 12.7753C14.8605 11.4244 15.5653 9.69163 15.5653 7.78267C15.5653 3.49486 12.0705 0 7.78267 0C3.49486 0 0 3.49486 0 7.78267C0 12.0705 3.49486 15.5653 7.78267 15.5653C9.66226 15.5653 11.4244 14.8899 12.7753 13.7445L18.8253 19.7944C18.9721 19.9413 19.1483 20 19.3245 20C19.5007 20 19.6769 19.9413 19.8238 19.7944C20.0881 19.5301 20.0881 19.0602 19.8238 18.7959L13.7445 12.7753ZM7.7533 14.1557C4.22908 14.1557 1.38032 11.3069 1.38032 7.78267C1.38032 4.25844 4.22908 1.40969 7.7533 1.40969C11.2775 1.40969 14.1263 4.25844 14.1263 7.78267C14.1263 11.3069 11.2775 14.1557 7.7533 14.1557Z" fill="#B0B0B0" />
                    </svg>
                </div>
            }

        </>
    )
}
