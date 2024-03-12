import React, { useCallback, useContext } from 'react'
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
      

        <div className='mb-10 flex mt-5  justify-center items-center' >
            <form 
            className='flex flex-col md:flex-row justify-evenly gap-8 items-center'
             autoComplete='on'
             onSubmit={handleFormData} >
                <label htmlFor="name" className='text-white block text-xl font-serif text-[#09ffd2] capitalize'> 
                enter name of the task
                </label>
                <input type="text" name='name' id='name' className='text-[#000000] p-2 border-2 rounded-xl' autoComplete='on'/>
                <button type='submit' className='p-2 block
                text-[#00000099] font-bold
                capitalize
                bg-[#205f41] rounded-xl hover:bg-[#00000099]
                 hover:text-[#fff] active:bg-black'>
                    make task
                </button>
            </form>
        </div>

        <article className='flex-col justify-center items-center bg-[#53505089] text-white mt-10'>
           
            <main className=' p-5 flex-col justify-center items-center'>
                {state.mainlogs?.map((log, index)=>(
                     <article key={index} className='flex 
                     font-mono font-extrabold
                     justify-between my-2 bg-[#00000099] text-[#205f41] p-3 text-xl mx-auto max-w-[40rem] rounded-xl'>
                     <span className=''>{log.taskName}</span>
                     <Link to={`/${log.id}`} >open</Link>
                     <span onClick={()=>handleDelete(log.id)}>delete</span>
                   </article>
                ))}
            </main>
        </article>
    </section>
  )
}
