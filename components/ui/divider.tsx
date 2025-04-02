import React from 'react'
import { Button } from './button'
import Link from 'next/link'

interface DividerProps {
    link: string
}

const Divider: React.FC<DividerProps> = ({ link }) => {
    return (
        <div className="inline-flex items-center justify-center w-full">
            <hr className="w-full h-px my-4 bg-border-border-primary border-1 px-4" />
            <div className='px-spacing-8 py-spacing-4'>
                <Link href={link}>
                    <Button
                        variant={'outline'}
                        size={'sm'}
                    >
                        See More
                    </Button>
                </Link>
            </div>
            <hr className="w-full h-px my-4 bg-border-border-primary border-1 px-4" />
        </div>
    )
}

export default Divider
