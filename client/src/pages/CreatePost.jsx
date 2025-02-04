import { Button, FileInput, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Alert } from "flowbite-react";
import { Select } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate()
  const [publishError,setPublishError] = useState(null)
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
console.log(formData);
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file); // Corrected function name

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
const handleSubmit = async(e)=>{
e.preventDefault()
try{
const res = await fetch('/api/post/create',{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify(formData),
});
const data = await res.json();
if(!res.ok){
  setPublishError(data.message)
  return
}

if(res.ok){
  setPublishError(null)
  navigate(`/post/${data.slug}`)
}
}catch(error){
setPublishError('something went wrong')
}
}
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">create a post</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="title"
            required
            id="title"
            className="flex-1"
            onChange={(e)=>{
              setFormData({...formData,title:e.target.value})
            }}
          />
          <Select onChange={(e)=>
            setFormData({...formData,category:e.target.value})
          }>
            <option value="uncategorized">select aa category</option>
            <option value="javascript">javascript</option>
            <option value="reactjs">react js</option>
            <option value="nextjs">react js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
              </div>
            ) : (
              "upload image"
            )}
          </Button>
        </div>
        {imageUploadError && (
          <Alert color="failure">{imageUploadError}</Alert>
        )}
        {formData.image && (
          <img src={formData.image} alt="upload" className="w-full h-72 object-cover" />
        )}
        <ReactQuill
          theme="snow"
          placeholder="write here"
          className="h-72 mb-12"
          required
          onChange={(value)=>{
            setFormData({...formData,content:value})
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          publish
        </Button>{
          publishError && <Alert className="mt-5" color='failure'>{publishError}</Alert>
        }
      </form>
    </div>
  );
};

export default CreatePost;
