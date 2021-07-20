import React, { useState, useEffect } from 'react';
import style from './qrCode.module.css';
import QRCode from 'qrcode';
import axios from 'axios';
import ProgressBar from "@ramonak/react-progress-bar";

function dataURLtoFile(dataurl, filename) {
 
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, {type:mime});
}




const QRcode = () => {

  const [text, setText] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [imageId, setImageId] = useState('');
  const [videoSrc, setVideoSrc] = useState('');
  const [QrURL, setQrURL] = useState('');
  let [progress, setProgress] = useState('');

  const defaultBtnActive = () => {
    const defaultBtn = document.getElementById("defaultBtn");
    defaultBtn.click();
  }

  const getVideoSrc = () => {

    const videoEl = document.getElementById("video");
    const file = document.getElementById("defaultBtn").files[0];
    

    if (file) {
      const reader = new FileReader();
      reader.onload =  ()=> {
        const result = reader.result;
        videoEl.src = result;
      }
      reader.readAsDataURL(file);   
    }
  }

  const cancelBtn = () => {
    const video = document.getElementById("video");
    video.src = "";
  }

  const uploadVideo = () => {

    const form = new FormData()
    form.append('title',text)
    form.append('video', videoSrc)
    
    axios.post(`/add-video-qr`, form, {
      onUploadProgress: progressEvent => {
        // console.log(`upload progress: ${Math.round(progressEvent.loaded / progressEvent.total * 100)}`)
        setProgress(Math.round(progressEvent.loaded / progressEvent.total * 100))
      }
    })
      .then((res) => {
        console.log(res.data.video);
        setQrURL(res.data.video)
        setImageId(res.data.id)
      }).catch((err) => {
        console.error(err);
      })
    
  }

  const generateQRCode = async ()=> {
    try {
      
      const response = await QRCode.toDataURL(QrURL);
      setImageSrc(response);
      console.log(imageSrc)

      var file = dataURLtoFile(imageSrc,'hello.png');
      console.log(file);

      const _form = new FormData()
      _form.append('image', file)
      
      axios.post(`/add-photo-qr?id=${imageId}`, _form)
        .then((res) => {
          console.log(res);
        }).catch((err) => {
          console.error(err);
        })

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className={style.qrCode}>
          <div className={style.qr__left}>

            <h2 className={style.qr__title}>Create QR-Code</h2>
            
            <input
              type="text"
              placeholder="video name"
              className={style.qr__inputName}
              onChange={(e) => setText(e.target.value)}
            />

            <input
              type="text"
              placeholder="description"
              className={style.qr__inputDescription}
            />

            <input
              type="file"
              id="defaultBtn"
              onClick={() => getVideoSrc()}
              onChange={(e) => setVideoSrc(e.target.files[0])}
              hidden
            />
            
            <button
              id="customBtn"
              className={style.qr__btn}
              onClick={() => defaultBtnActive()}
            > Add Video
            </button>
            
            <div className={style.qr__videoWrapper}>
              <span
                className={style.qr__cancelBtn}
                onClick={() => cancelBtn()}
              >
                &times;
              </span>
              
              <video id="video" src="" controls></video>
            </div>

            <button
              className={style.uploadBtn}
              onClick={() => uploadVideo()}
            > Upload Video
            </button>
            
            <div className={style.progress}>
              <ProgressBar
                width="50%"
                bgColor="#D9A404"
                labelColor="#000"
                completed={progress}
              />
            </div>
            
          </div>

          <div className={style.qr__right}>

            <div className={style.qr__imageWrapper}>
              {imageSrc ?
                (<img id="img" src={imageSrc} alt="QR-img" />) :
                (<p className={style.qr__noImg}> NO QR Yet!</p>)
              }
            </div>


              <button
                className={style.qr__print}
                onClick={() => generateQRCode()}
              >
                Create
              </button>

              <button
                className={style.qr__print}
                onClick={() => window.print()}
              >
                Print
              </button>


          </div>
          

        </div>
      </div>
    </React.Fragment>
  )
}

export default QRcode;
