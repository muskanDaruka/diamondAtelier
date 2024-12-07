import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast';

function FileUpload() {

    const [file,setFile] = useState<File|null>(null);
    const [filName, setFileName] = useState("");
    const [fileSize,setFileSize] = useState("");

    const getFileSize = (file_size:number) =>
        {
            let fileSize:string;
            if ( (file_size/1024) >= 1024 )
            {
                fileSize= ((file_size/1024)/1024).toFixed(2) + ' MB';
            }
            else{
                fileSize= (file_size/1024).toFixed(2) + ' KB';
            }
            return fileSize;
        }

    const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
            if(e?.target?.files){
                 setFile(e.target.files[0])
                 setFileName(e.target.files[0].name);
                 setFileSize(getFileSize(e.target.files[0].size));
            }
    }

    const handleFileUpload= () =>{
        if(!file){
            alert("Please select a file!");
            return;
        }
        
        const formData = new FormData();
        formData.append("docs",file);

        const config = { headers:{
            'content-type':'multipart/form-data'
        }}

        axios.post("http://localhost:4000/fileUpload",formData,config).then((res)=>{
            toast.success("uploaded successfully!!")
        })
        
    }
    


  return (
    <div className='mt-3'>
        <input
         name='docs'
         type='file'
         onChange={handleFileChange}
         className='me-4'
         required={true}
        />
        <button className="rounded-xl px-3 py-1 bg-blue-600 text-white font-serif text-xs m-4" onClick={handleFileUpload}>Upload</button>
        <br/>
        <label htmlFor='docs' className='py-2'>{fileSize}</label>
    </div>
  )
}

export default FileUpload


// {handleSubmit}:{handleSubmit:(arg:File) => void}