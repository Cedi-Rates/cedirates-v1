import React from 'react'
import { Button } from './button'

const Divider = () => {
    return (
        <div className="inline-flex items-center justify-center w-full">
            <hr className="w-full h-px my-4 bg-border-border-primary border-1 px-4" />
            <div className='px-spacing-8 py-spacing-4'>
                <Button
                    variant={'outline'}
                    size={'sm'}
                >
                    See More
                </Button>
            </div>
            <hr className="w-full h-px my-4 bg-border-border-primary border-1 px-4" />
        </div>
    )
}

export default Divider
