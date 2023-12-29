import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import { useLocal } from '../store/auth_context';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Slider from '../components/Sidebar'
import '../css/pagecss/updateprofile.css'
const UpdateProfile = () => {
    const {Data} = useLocal();
    const {setUserProfile}= useLocal();
    const Navigate = useNavigate();

    const [file, setFile] = useState({
        first: "",
        second: ""
    })
    const [profile, setProfile] = useState({
        id: Data._id,
        headLine: "",
        discription: "",
        avatar: "",
        discription: "",
    });
    const HandleSubmit = async(e)=> {
        e.preventDefault();
        try {
            const respond = await fetch("http://localhost:3001/api/auth/profile",{
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)
              });
              console.log(respond.json());
              if(respond.ok){
                setUserProfile(profile);
                Navigate('/profile');
                setProfile( {
                    headLine: "",
                    discription: "",
                    avatar: "",
                    discription: ""})    
            }  
        } catch (error) {
            console.log(error);
        }
    }
    const convertToBase64 = (file,name) => {
        const fileReader =new FileReader();
        fileReader.readAsDataURL(file);
        if(name == 'avatar'){
            fileReader.onload = () => {
                setProfile({...profile, avatar: fileReader.result});
            };
        }else if(name == 'background'){
            fileReader.onload = () => {
                setProfile({...profile, background: fileReader.result});
            };
        }
        
  }
    const HandleImageUpload =  (e) => {
        const name = e.target.name;
        const file = e.target.files[0]; 
        convertToBase64(file,name);   
      }
  return (
    <>
         <Navbar/>
        <Slider />
        <br></br>
        <div className='updateprofile'>
            
        <div className="updateleft">
            {/* <h1>Profile</h1>     */}
            {/* <div style={{display: "flex"}}> */}
                <img src={(profile.background)?profile.background: ""} alt=""  className='bgrnd'/>
                <img src={(profile.avatar)?profile.avatar: ""} alt="" className='avtr'/>
            {/* </div> */}
            <div className='profiledetails'>
                <p style={{fontSize:"15px",fontWeight:"500"}}>{(profile.headLine)?profile.headLine: ""}</p>
                <p style={{fontSize:"12px"}}>{(profile.discription)?profile.discription: ""}</p>
            </div>
        </div>
        <div className="updateright">
            {/* <h1>Update Form</h1> */}
        <form onSubmit={(e)=>{HandleSubmit(e)}}>
            <input type="text" name="headLine" id="headline" placeholder='Enter your Headline' className='inputField' value={profile.headLine} onChange={(e)=> {setProfile({...profile, headLine: e.target.value})}}/><br/>
            <input type="text" name="discription" id="discription" placeholder='Enter your Bio' className='inputField' value={profile.discription} onChange={(e)=> {setProfile({...profile, discription: e.target.value})}}/><br/>
            
            
            <div className="photobox">
            <label htmlFor="avatar">😎  </label>
            <input type="file" name="avatar" id="avatar"accept='.jpeg, .png ,.jpg' label="Image" value={file.first} onChange={(e) => {HandleImageUpload(e);setFile({...file,first: e.target.value})}} />
           
            <label htmlFor="background" >📷  </label>
            <input type="file" name="background" id="background" accept='.jpeg, .png ,.jpg' label="Image" value={file.second}  onChange={(e) => {HandleImageUpload(e);setFile({...file,second: e.target.value})}} /><br/>
            </div>

            <br/>
            <br/>
            <button type="submit">Submit</button>
        </form>
        </div>
        </div>
    </>
  )
}

// const ProfileForm = styled.div`
// display: flex;
// padding: 10%;
// .flexChild{
//     width: 50%;
//     img{
//         width:200px;
//         max-height: 200px;
//     }
//     .Gridbox{
//         display: grid;
//         margin: 10px;
//         grid-template-columns: auto auto;
//         font-size: 20px;
//         input{
//             padding: 10px;
//         }
//     }
//     .inputField{
//         margin: 10px;
//         width:90%;
//         padding: 10px;
//         font-size: 15px;
//     }
// }
// `;

export default UpdateProfile