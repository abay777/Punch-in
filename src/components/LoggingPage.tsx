import React from 'react'

export const LoggingPage:React.FC = () => {
  return (
    <section>
        <h2 className='text-center'>Enter the detail and start the log</h2>

        <div className='flex justify-center items-center my-3'>
            <form action="">
                <input type="text" className='p-2' />
                <button type='submit' className='p-2 ml-2 bg-gray-600 text-xl'>Start log</button>
            </form>
        </div>


        <main className='flex-col justify-center items-center bg-gray-600 py-3'>
            <article className='bg-gray-900 text-blue-600 flex justify-between items-center w-[50%] mx-auto p-3 '>
                <h2>start:</h2>
                <h2>end:</h2>
                <h2>Duration</h2>
                <h3>delete</h3>
                <button>Stop</button>

            </article>
        </main>
    </section>
  )
}
