import React, { useCallback, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/context';
import { GlobalContextTypes } from '../context/context';
import { maintask } from '../context/context';

export const MainPage:React.FC = () => {
  const {state, addMainLogs, deleteMainLogs} = useContext(GlobalContext) as GlobalContextTypes


  const handleFormData = (event:React.FormEvent)=>{
    event.preventDefault()
    const form =new FormData(event.currentTarget as HTMLFormElement);
    const taskName = form.get('name') as string;
    if( taskName){
        mainTaskMaker(taskName)
    }else{
        window.alert('please enter a task-name')  
    }
  }

  const mainTaskMaker = useCallback((taskName:string)=>{
    const mainTask:maintask = {
        taskName:taskName,
        id:Math.floor(Math.random() *12021),
        logs:[]
    }
    addMainLogs(mainTask)   
  },[addMainLogs,state.mainlogs]) 

  const handleDelete = useCallback((id:number)=>{
    deleteMainLogs(id)
  },[deleteMainLogs,state.mainlogs])

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
            <form action="" className='flex-col justify-center items-center' autoComplete='on' onSubmit={handleFormData} >
                <label htmlFor="name" className='text-white block'> 
                enter name of the task
                </label>
                <input type="text" name='name' id='name' className='text-black' autoComplete='on'/>
                <button type='submit' className='p-2 block border-2 border-white mx-auto mt-2'>
                    make task
                </button>
            </form>
        </div>

        <article className='flex-col justify-center items-center bg-gray-900 text-white mt-10'>
            <h1 className='text-center'>The logs will be displayed here</h1>
            <main className=' p-5 flex-col justify-center items-center'>
                {state.mainlogs?.map((log, index)=>(
                     <article key={index} className='flex justify-between my-2 bg-gray-500 text-blue-600 p-3 text-xl mx-auto w-[50%]'>
                     <span>{log.taskName}</span>
                     <Link to={`/${log.id}`} >open</Link>
                     <span onClick={()=>handleDelete(log.id)}>delete</span>
                   </article>
                ))}
            </main>
        </article>
    </section>
  )
}
