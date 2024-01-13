'use client'
import {useEffect} from 'react'

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {

        console.error(error)
    }, [error])

    return (
        <div className='text-center mt-10'>
            <h2>Something went wrong!</h2>
            <button className='hover:text-amber:600'
                    onClick={

                        () => reset()
                    }
            >
                Try again
            </button>
        </div>
    )
}