import React, { useImperativeHandle } from 'react'
import './MyWork.css';
import bac from '../../assets/bac.svg'
import soon from '../../assets/coming_soon.gif'
import port_react from '../../assets/projects/portfilo_react.png'
import myntra from '../../assets/projects/mytra.png'
import youtube from '../../assets/projects/yt.png'
import djano_port from '../../assets/projects/django_port.png'
import dpt from '../../assets/projects/dpt.png'



function MyWork() {

const mywork_data=[
 {
    w_no:1,
    w_name:'portfolio_React',
    w_img:port_react,
    link:'https://github.com/FARMAN9/portfolio_React'
 },
 {
    w_no:2,
    w_name:'mytra',
    w_img:myntra,
    link:'https://github.com/FARMAN9/myntra-clone-'
 },
 {
    w_no:3,
    w_name:'youtube',
    w_img:youtube,
    link:'https://github.com/FARMAN9/youtube-clone'
 },
 {
    w_no:4,
    w_name:'portfoilo_django',
    w_img:djano_port,
    link:'https://github.com/FARMAN9/portfoilo_django'
 },
 {
    w_no:5,
    w_name:'DPS',
    w_img:dpt,
    link:'https://github.com/FARMAN9/Diabetes-prediction'
 },
 
 {
   w_no:6,
   w_name:'soon',
   w_img:soon,
   link:''
}
 




]
  return (
    <div id='work' className='mywork'>
        <div className="mywork-title">
            <h1>My Latest work</h1>
            <img src={bac} alt="" />
        </div>
        
        <div className="mywork-container">
         {
            mywork_data.map((data,index)=>{

                return <div key={index} >
                <a href={data.link}>
                <img src={data.w_img} alt="" />
                </a>   
                

                </div>

            })
         }
        </div>

    </div>
  )
}

export default MyWork
