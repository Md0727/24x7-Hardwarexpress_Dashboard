import React from 'react'

export const ImageTag = (props) => {
    const {
        className,
        src,
        alt,
        onChange
    } = props
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onChange={onChange}
        />
    )
}
