import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration';
import React, { useCallback, useContext } from 'react'
import { GlobalContext, GlobalContextTypes, addlog, deleteLog, updatelog } from '../context/context';
import { useParams } from 'react-router-dom';
import { RiDeleteRow } from 'react-icons/ri';
import { FaStopCircle } from 'react-icons/fa';
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

    const {addLogs,updateLogs,deleteLogs,state} = useContext(GlobalContext) as GlobalContextTypes
    let {id} = useParams();
    
    const handleInputChange = (event:React.FormEvent) =>{
        event.preventDefault()
       const form = new FormData(event.currentTarget as HTMLFormElement)
       const name = form.get('taskName') as string;
        if(name){
         logMaker(name)    
        }else{
            alert('please enter a name 😉')
        }
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

    const handleDelete = useCallback((logId:number,log:Log)=>{ 
        if(log.state){
            const deleteLog:deleteLog = {
                mainLogId:Number(id),
                logId
            }
            deleteLogs(deleteLog)
        }else{
            return alert('click stop ✋ button first to delete')
        }      
    },[])

    return (
        <section>
          <div className='flex justify-center items-center my-3'>
            <form onSubmit={handleInputChange} autoComplete='on' className='flex flex-col md:flex-row  justify-evenly gap-8 items-center'>
              <label htmlFor='taskName' className='font-extrabold text-xl capitalize text-black'>enter task name</label>
              <input type='text' id='taskName' autoComplete='on' name='taskName' className='p-2 rounded-xl text-black' />
              <button type='submit' className='p-2 ml-2 bg-[#00000099] hover:bg-[#205f41] active:text-black text-xl rounded-xl font-bold'>
                Start log
              </button>
            </form>
          </div>
    
          <main className='flex-col justify-center items-center'>
            
                 
                    <table className='table-auto w-full md:w-[80%] border-4 mx-auto'>
                      <thead>
                        <tr>
                          <th className='p-2 md:text-lg text-sm text-[#09ffd2] bg-[#00000099] border-r-4 font-bold tracking-wide text-center'>Task Name</th>
                          <th className='p-2 md:text-lg text-sm text-[#09ffd2] bg-[#00000099] border-r-4 font-bold tracking-wide text-center'>Start</th>
                          <th className='p-2 md:text-lg text-sm text-[#09ffd2] bg-[#00000099] border-r-4 font-bold tracking-wide text-center'>End</th>
                          <th className='p-2 md:text-lg text-sm text-[#09ffd2] bg-[#00000099] border-r-4 font-bold tracking-wide text-center'>Duration</th>
                          <th className='p-2 md:text-lg text-sm text-[#09ffd2] bg-[#00000099] border-r-4 font-bold tracking-wide text-center'>stop</th>
                          <th className='p-2 md:text-lg text-sm text-[#09ffd2] bg-[#00000099] border-r-4 font-bold tracking-wide text-center'>delete</th>
                        </tr>
                      </thead>
                      <tbody>
                      {state.mainlogs.map((loggings) =>
                        loggings.id === Number(id) ? (
                            loggings.logs.map((log: Log) => (
                        <tr key={log.id} className={log.id %2===0?`bg-[#363434]`:`bg-[#000]`}>
                          <td className='border-2 p-2  text-center text- font-semibold text-sm'>{log.name}</td>
                          <td className='border-2 p-2 text-center text- font-semibold text-sm'>{log.start}</td>
                          <td className='border-2 p-2 text-center text- font-semibold text-sm'>{log.end}</td>
                          <td className='border-2 p-2 text-center text- font-semibold text-sm'>{log.duration}</td>
                          <td className='border-2 p-2 text-center text- font-semibold text-sm'><button onClick={() => handleStop(log)}><FaStopCircle color='#964B00' size={25}/></button></td>
                          <td className='border-2 p-2 text-center font-semibold text-sm'><button onClick={() => handleDelete(log.id, log)}><RiDeleteRow color='red' size={25} /></button></td>
                        </tr>
                           ))
                           ) : null
                         )}
                      </tbody>
                    </table>
                 
             
          </main>
        </section>
      );
    };