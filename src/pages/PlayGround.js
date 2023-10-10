import React,{useEffect, useState} from 'react'
import Navbar from '../component/PlayGround/Navbar'
import EditContainer from '../component/PlayGround/EditContainer'
import Modal from '../component/Modal'
import OutputConsol from '../component/PlayGround/OutputConsole'
import InputConsol from '../component/PlayGround/InputConsol'
import axios from 'axios'
import { Buffer  } from 'buffer'
import { useParams } from 'react-router-dom'
import { GetModalContext } from '../context/ModalContext'
import { GetPlayGroundContext,languageMap } from '../context/PlaygroundContext'
import { toast } from 'react-toastify'

const PlayGround = () => {
  const {folderId,playgroundId} = useParams();
  const { folders, savePlayground } = GetPlayGroundContext()
  const { isOpenModal, openModal, closeModal,currentInput,setCurrentOutput } = GetModalContext()
  const { title, language, code } = folders[folderId].playgrounds[playgroundId]

  const [currentLanguage, setCurrentLanguage] = useState(language)
  const [currentCode, setCurrentCode] = useState(code)
  // const [currentInput, setCurrentInput] = useState('')
  
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const startLoading = ()=>{
    openModal({
      show: true,
      modalType: 6,
      identifiers: {

        folderId: "",
        cardId: "",
      }
    })
  };
  const stopLoading = ()=>{
    openModal({
      show: false,
      modalType: 6,
      identifiers: {

        folderId: "",
        cardId: "",
      }
    })
  }

  const encode = (str) => {
    return Buffer.from(str, "binary").toString("base64")
  }

  const decode = (str) => {
    return Buffer.from(str, 'base64').toString()
  }

  const saveCode = () => {
    savePlayground(folderId, playgroundId, currentCode, currentLanguage);
    toast.success('code saved ');
  }

  const postSubmission = async (language_id, source_code, stdin) => {
    const options = {
      method: 'POST',
      url: `${process.env.REACT_APP_JUDGEO_API}`,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
        'X-RapidAPI-Host': `${process.env.REACT_APP_JUDGEO_RAPID_HOST}`
      },
      data: JSON.stringify({
        language_id: language_id,
        source_code: source_code,
        stdin: stdin
      })
    };
      try{
        const res = await axios.request(options);
        return res?.data?.token
      }
      catch(e){
        console.log(e,' post submission error');
        stopLoading();
        throw new Error('fialed at get token');
      }
    
  }


  const getOutput = async (token) => {
    
    const options = {
      method: 'GET',
      url: `${process.env.REACT_APP_JUDGEO_API}/` + token,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
        'X-RapidAPI-Host': `${process.env.REACT_APP_JUDGEO_RAPID_HOST}`
      }
    };

    try{
      const res = await axios.request(options);
      if (res.data?.status_id <= 2) {
        const res2 = await getOutput(token);
        return res2;
      }
      return res.data;
    }
    catch(e){
      toast.error(e.message);
      stopLoading();
      console.log(e,'getoutput error');
    }
   
  }

  
  const runCode = async () => {
    startLoading();
    const language_id = languageMap[currentLanguage].id;
    const source_code = encode(currentCode);
    const stdin = encode(currentInput);

    try{
      const token = await postSubmission(language_id, source_code, stdin);
       
      const res = await getOutput(token);
      const status_name = res.status.description;
      const decoded_output = decode(res.stdout ? res.stdout : '');
      const decoded_compile_output = decode(res.compile_output ? res.compile_output : '');
      const decoded_error = decode(res.stderr ? res.stderr : '');
      let final_output = '';
      if (res.status_id !== 3) {
        
        if (decoded_compile_output === "") {
          final_output = decoded_error;
        }
        else {
          final_output = decoded_compile_output;
        }
      }
      else {
        final_output = decoded_output;
      }
      setCurrentOutput(status_name + "\n\n" + final_output);
      closeModal();
    }
    catch(e){
      toast.error(e.message);
      console.log(e,'error');
      stopLoading();
    }
   
  }
  const getFile = (e, setState) => {
    const input = e.target;
    if ("files" in input && input.files.length > 0) {
      placeFileContent(input.files[0], setState);
    }
  };

  const placeFileContent = (file, setState) => {
    readFileContent(file)
      .then((content) => {
        setState(content)
      })
      .catch((error) => console.log(error));
  };

  function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }
  return (
    <>
  
  <div>
      <Navbar isFullScreen={isFullScreen} />
      <div className='flex flex-col lg:flex-row h-full sm:w-screen'>
        <div className={`${isFullScreen ? "w-full" : "w-full lg:w-3/4 "}`}>
          <EditContainer
            title={title}
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
            currentCode={currentCode}
            setCurrentCode={setCurrentCode}
            folderId={folderId}
            playgroundId={playgroundId}
            saveCode={saveCode}
            runCode={runCode}
            getFile={getFile}
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
          />
        </div>
        {
          !isFullScreen &&
          <div className={`w-full lg:w-1/4`}>
            <InputConsol
              // currentInput={currentInput}
              // setCurrentInput={setCurrentInput}
              getFile={getFile}
            />
            <OutputConsol
              // currentOutput={currentOutput}
            />
          </div>
        }
        {isOpenModal.show && <Modal />}
      </div>
        

    </div>

    </>
  )
}

export default PlayGround