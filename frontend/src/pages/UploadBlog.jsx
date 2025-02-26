import { useRef, useState } from 'react'
import Navbar from '../components/Navbar';
import JoditEditor from 'jodit-react';
import { api_base_url } from '../helper';

const UploadBlog = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSecret, setAdminSecret] = useState("");
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [image, setImage] = useState("");

  const editor = useRef(null);
	const [content, setContent] = useState('');

  const checkAdmin = () => {
    if (adminSecret !== "") {
      if (adminSecret === "admin1234") {
        setIsAdmin(true);
      }
      else {
        setError("Invalid admin secret !");
      }
    }
    else {
      setError("Please provide admin secret !");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("token", localStorage.getItem("token"));

    fetch(api_base_url + "/uploadBlog",{
      mode: "cors",
      method: "POST",
      body: formData,
    }).then((res) => res.json()).then(data=>{
      if(data.success){
        alert("Blog created successfully");
        setTitle("");
        setDesc("");
        setContent("");
        setImage("");
        setError("");
      }
      else{
        setError(data.msg)
      }
    })
  }

  return (
    <>
      {
        isAdmin == false ?
          <>
            <div className="con flex items-center justify-center flex-col h-screen">
              <div className='w-[25vw] h-[fit] flex flex-col rounded-xl p-[20px] bg-[#0F0E0E]'>
                <h3 className='text-2xl mb-4'>Login to upload blog</h3>

                <div className="inputBox">
                  <input onChange={(e) => { setAdminSecret(e.target.value) }} value={adminSecret} type="text" placeholder='Enter admin secret' />
                </div>

                <p className='text-red-500 text-[13px]'>{error}</p>

                <button className="btnNormal mt-3" onClick={() => { checkAdmin() }}>Login</button>
              </div>
            </div>
          </> : <>
            <Navbar />
            <div className='px-[100px]'>
              <h3>Upload Blog</h3>

              <form onSubmit={submitForm}>
                <div className="inputBox">
                  <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" placeholder='Enter title' />
                </div>

                <div className="inputBox">
                  <textarea onChange={(e)=>{setDesc(e.target.value)}} value={desc} placeholder='Enter Descriptin'></textarea>
                </div>

                <JoditEditor
                  ref={editor}
                  className='text-black mt-2'
                  value={content}
                  tabIndex={1} // tabIndex of textarea
                  onChange={newContent => setContent(newContent)}
                />

                <input type="file" className='my-3' onChange={(e)=>{setImage(e.target.files[0])}} id='file' /> <br />

                <button className="btnNormal mt-3">Create Blog</button>
              </form>
            </div>
          </>
      }
    </>
  )
}

export default UploadBlog