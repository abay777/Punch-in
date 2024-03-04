import React, { useCallback, useEffect, useState } from 'react'
import { FaRegMoneyBill1 } from 'react-icons/fa6'
import { LuGoal } from 'react-icons/lu';
import { Link } from 'react-router-dom'

 interface maintask {
    name:string;
    id:number;
 }

export const MainPage:React.FC = () => {
  const [samplearray,setsmaplearray] = useState<maintask[]>([])

  const handleFormData = (event:React.FormEvent)=>{
    event.preventDefault()
    const form =new FormData(event.currentTarget as HTMLFormElement);
    const taskName = form.get('name') as string;
    console.log(taskName);
    if(taskName){
        mainTaskMaker(taskName)
    }else{
        console.log('error taskName not read');
        
    }
    

  }

 

  const mainTaskMaker = useCallback((taskName:string)=>{
    const mainTask:maintask = {
        name:taskName,
        id:Math.floor(Math.random() *12021),
    }

    setsmaplearray((prev )=> (
         [...prev, mainTask]
    ))
  },[]) 

  useEffect(()=>{
    console.log(samplearray)
  })
   



  return (
    <section className='flex-col justify-center'>
      
        <div className=''> 
            <h1 className='text-3xl font-bold mx-auto text-center '>
                here you can create the list for your logs 
            </h1>
            <p className='text-center mx-auto mt-10' >
                this list will be holding all your logging data
            </p>
        </div>

        <div className='mb-10 flex mt-5  justify-center items-center' >
            <form action="" className='flex-col justify-center items-center' onSubmit={handleFormData} >
                <label htmlFor="name" className='text-white block'> 
                enter name of the task
                </label>
                <input type="text" name='name' className='text-black' />
                <button type='submit' className='p-2 block border-2 border-white mx-auto mt-2'>
                    make task
                </button>
            </form>

        </div>

        <article className='flex-col justify-center items-center bg-gray-900 text-white mt-10'>
            <h1 className='text-center'>The logs will be displayed here</h1>
            <main className=' p-5 flex-col justify-center items-center'>
                <article className='flex justify-between bg-gray-500 text-blue-600 p-3 text-xl mx-auto w-[50%]'>
                    <span>task1</span>
                    <Link to={'/123'} >open</Link>
                    <span>delete</span>

                </article>
            </main>
        </article>
    </section>
  )
}
