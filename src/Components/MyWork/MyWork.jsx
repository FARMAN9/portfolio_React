import React, { useImperativeHandle } from 'react'
import './MyWork.css';
import bac from '../../assets/bac.svg'



function MyWork() {

const mywork_data=[
 {
    w_no:1,
    w_name:'random',
    w_img:bac
 },
 {
    w_no:2,
    w_name:'random',
    w_img:bac
 },
 {
    w_no:3,
    w_name:'random',
    w_img:bac
 },
 {
    w_no:4,
    w_name:'random',
    w_img:bac
 },
 {
    w_no:4,
    w_name:'random',
    w_img:bac
 }
 




]
  return (
    <div className='mywork'>
        <div className="mywork-title">
            <h1>My Latest work</h1>
            <img src={bac} alt="" />
        </div>
        
        <div className="mywork-container">
         {
            mywork_data.map((data,index)=>{

                return <div>
                <a href='https://github.com/FARMAN9/portfoilo_django'>
                <img key={index} src={data.w_img} alt="" />
                </a>   
                

                </div>

            })
         }
        </div>

    </div>
  )
}

export default MyWork
