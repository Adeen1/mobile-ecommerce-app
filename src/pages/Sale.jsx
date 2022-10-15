import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import {storage} from "../firebase"
import {ref,uploadBytes, getDownloadURL} from "firebase/storage"
import "../sale.css"

const Sale = () => {
  
// States
  const [filearr,setFilearr]=useState([]);
  const [noImages,setNoImages]=useState(1);
  const [imageName,setImgName]=useState("");
  const [link,setlink]=useState("")
  const inputFileRef=useRef(null);
  const imgRef=useRef(null);
  const imgRef2=useRef(null);
  const imgRef3=useRef(null);
  const imgRef4=useRef(null);

  
  
  // Upload Function


  const upload=(name,image,no)=>{
    const imageRef=ref(storage,`image/${name}`);
    uploadBytes(imageRef,image)
    // .then(()=>{
    //   getDownloadURL(imageRef).then((url)=>{
    //     if(no==1){
    //       imgRef.current.src=url
    //     }
    //     if(no==2){
    //       imgRef2.current.src=url
    //     }
    //     if(no==3){
    //       imgRef3.current.src=url
    //     }
    //     if(no==4){
    //       imgRef4.current.src=url
    //     }
      // })
      // .catch((err)=>{
      //   console.log(err.message,"error while getting the image url");
      // })
    // })
    .catch((err)=>{
      console.log(err.message,"error while getting the image url");
    })

  }


// Submit Function
const Submit=()=>{
  filearr.map(single_file=>{
    upload(single_file.image.name,single_file.image,single_file.id);
  })
}



// File Details
  const fileDetails=(e)=>{
   setNoImages(noImages+1);
    
    var file=e.target.files[0];
   var link=URL.createObjectURL(file);
   setlink(link);
   if(e.target.id==="1"){
    var array=[];
    imgRef.current.src=link;
    if(filearr.length>=1){
      array=filearr.filter((single_file)=>{
        return single_file.id!==1;
      })
      
    }
    setFilearr([...array,{id:1,image:file}])
    // upload(file.name,file,1);
   }
   if(e.target.id==="2"){
    imgRef2.current.src=link;
    var array=filearr.filter((single_file)=>{
         return single_file.id!==2;
       })
       setFilearr([...array,{id:2,image:file}])
    }
        
    // upload(file.name,file,2);
   
   if(e.target.id==="3"){
    imgRef3.current.src=link;
    var array=filearr.filter((single_file)=>{
        return single_file.id!==3;
      })
      
    setFilearr([...array,{id:3,image:file}])
      }
    // upload(file.name,file,3);
   
   if(e.target.id==="4"){
    imgRef4.current.src=link;
    var array=filearr.filter((single_file)=>{
        return single_file.id!==4;
      })
      
      setFilearr([...array,{id:4,image:file}])
    }
  } 
  
    // upload(file.name,file,3);
   
   
   
    
    
  


  return (
    <div className='sale'>
    <Navbar/>
      <h2 className='sale-header'>Account Info</h2>
    <div className="wrapper">
    <div className="container">
    <h3 className='sale-input-label'>Product-Name:</h3>
    <input className='sale-input' placeholder='E.g Poco-M3'></input>

    {/* checkbox */}
    <h3 className='sale-input-label'>Product-Type:</h3>
    <input type="checkbox" id="mobile" name="mobile" value="mobile"/>
  <label htmlfor="mobile"> mobile</label><br/>
  <input type="checkbox" id="laptop" name="laptop" value="laptop"/>
  <label htmlfor="laptop"> Laptop</label><br/>
  <input type="checkbox" id="tablet" name="tablet" value="tablet"/>
  <label htmlfor="tablet"> Tablet</label>
    <h3 className='sale-input-label'>Price-Range(Rs):</h3>
    <input className='sale-input price' placeholder='maximum'></input>
    <input className='sale-input price' placeholder='minimum'></input>
    <h3 className='sale-input-label'>Images :</h3>
    {
    noImages>=1&&  
    <div>
    <input type="file" id='1' accept='Image/*' ref={inputFileRef} onChange={(e)=>{fileDetails(e)}
    } />
    <br/>
    <img ref={imgRef} className="sale-image" alt={imageName} />
    </div>
    }
{
    noImages>=2&&  
    <div>
    <input type="file" id='2' accept='Image/*' ref={inputFileRef} onChange={(e)=>{fileDetails(e)}
    } />
    <br/>
    <img ref={imgRef2} className="sale-image" alt={imageName} />
    </div>
    }
    {
    noImages>=3&&  
    <div>
    <input type="file" id='3' accept='Image/*' ref={inputFileRef} onChange={(e)=>{fileDetails(e)}
    } />
    <br/>
    <img ref={imgRef3} className="sale-image" alt={imageName} />
    </div>
    }
    {
    noImages>=4&&  
    <div>
    <input type="file" id='4' accept='Image/*' ref={inputFileRef} onChange={(e)=>{fileDetails(e)}
    } />
    <br/>
    <img ref={imgRef4} className="sale-image" alt={imageName} />
    </div>
    }
<button type="button" onClick={()=>{
      Submit();  
}} class="btn btn-outline-success">Submit</button>  </div>
    </div>
    </div>
  )
  }

export default Sale