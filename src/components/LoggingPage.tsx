import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { GlobalContext, GlobalContextTypes, addlog, updatelog } from '../context/context';
import { useParams } from 'react-router-dom';

dayjs.extend(duration);



export interface Log {
        name:string;
        start:string;
        startDate:any;
        endDate:any;
        end:string;
        duration:string;
        state:boolean;
        id:number;
    }


export const LoggingPage:React.FC = () => {

    const {addLogs,updateLogs,state} = useContext(GlobalContext) as GlobalContextTypes
    let {id} = useParams();
    
    const handleInputChange = (event:React.FormEvent) =>{
        event.preventDefault()
       const form = new FormData(event.currentTarget as HTMLFormElement)
       const name = form.get('taskName') as string;
        console.log(name)
        logMaker(name)  
    }

    const logMaker = useCallback((name:string)=>{
            const date = dayjs()
            const log:Log = {
                name:name,
                start:date.format('hh:mm a'),
                startDate:date,
                endDate:'',
                end:'',
                duration:'',
                state:false,
                id:Math.floor(Math.random()*102002)
            }
            const addlog:addlog = {
                id:Number(id),
                log,
            }
            addLogs(addlog)
    },[])

    const handleStop = useCallback((log: Log) => {
        console.log('the handlestop is executed')
        const endDate = dayjs();
        const duration = endDate.diff(log.startDate);
        const durationObject = dayjs.duration(duration);
        log.endDate =endDate
        log.end = endDate.format('hh:mm a');
        log.duration = `${durationObject.hours()}h ${durationObject.minutes()}m`;    
        log.state=true;
       
        const updateLog:updatelog = {
            mainId:Number(id),
            updatedLog:log
        }

        updateLogs(updateLog)
         
    }, []);

   

   useEffect(()=>{
    console.log(state.mainlogs)
   },[state.mainlogs]);


  return (
    <section>
        <h2 className='text-center'>Enter the detail and start the log</h2>

        <div className='flex justify-center items-center my-3'>
                <form onSubmit={handleInputChange} autoComplete='on'>
                    <label htmlFor="taskName"  >enter task name</label>
                    <input type="text" id='taskName' autoComplete='on' name='taskName' className='p-2 text-black'  />
                    <button type='submit' className='p-2 ml-2 bg-gray-600 text-xl'>Start log</button>
                </form>
                
        </div>


        <main className='flex-col justify-center items-center bg-gray-600 py-3'>
            {state.mainlogs.map(loggings=>
                loggings.logs.map((log:Log)=>
                    <article key={log.id} className='bg-gray-900 text-blue-600 flex justify-between items-center w-[50%] mx-auto p-3 '>
                    <h2>taskName:{log.name}</h2>
                    <h2>Start: {log.start}</h2>
                    <h2>end: {log.end}</h2>
                    <h2>Duration: {log.duration}</h2>
                    <h3>delete</h3>
                    <button onClick={()=>handleStop(log)}>Stop</button>
                </article>)
                
                )}
           
        </main>
    </section>
  )
}
