import React,{useState} from 'react'
import { GetModalContext } from '../../context/ModalContext';
import { BiEditAlt, BiImport, BiExport, BiFullscreen } from 'react-icons/bi'
import Select from 'react-select';
import CodeEditor from './CodeEditor';
import { languageMap } from '../../context/PlaygroundContext';

const EditContainer = ({
    title,
    currentLanguage,
    setCurrentLanguage,
    currentCode,
    setCurrentCode,
    folderId,
    playgroundId,
    saveCode,
    runCode,
    getFile,
    isFullScreen,
    setIsFullScreen
}) => {
    const { openModal } = GetModalContext()

    const themeOptions = [
        { value: 'githuDark', label: 'Github Dark' },
        { value: 'githubLight', label: 'Github Light' },
        { value: 'bespin', label: 'Bespin' },
        { value: 'duaotoneDark', label: 'Duotone Dark' },
        { value: 'duaotoneLight', label: 'Duotone Light' },
        { value: "dracula", label: 'Dracula' },
        { value: "xcodeDark", label: 'Xcode Dark' },
        { value: "xcodeLight", label: 'Xcode Light' },
        { value: 'vscodeDark', label: 'Vscode Dark' },
        { value: 'vscodeLight', label: 'Vscode Light' },
        { value: 'okaidia', label: 'Okaidia' }
    ];

    const languageOptions = [
        { value: 'cpp', label: 'C++' },
        { value: 'javascript', label: 'Javascript' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
    ];
    const handleThemeChange = (selectedOption) => {
        setCurrentTheme(selectedOption)
    }
    const handleLanguageChange = (selectedOption) => {
        setLanguage(selectedOption)
        setCurrentLanguage(selectedOption.value)
        setCurrentCode(languageMap[selectedOption.value].defaultCode)
    }
    const [currentTheme, setCurrentTheme] = useState(themeOptions[0]);
    const [language, setLanguage] = useState(() => {
        for (let i = 0; i < languageOptions.length; i++) {
            if (languageOptions[i].value === currentLanguage) {
                return languageOptions[i];
            }
        }
        return languageOptions[0];
    });

  return (
    <div className={`flex flex-col  ${isFullScreen ? 'h-[100vh]' : 'h-[calc(100vh - 4.5rem)]'}`}>
            {
                !isFullScreen &&
                <div className='bg-white flex justify-between items-center flex-wrap p-4'>
                    <div className='flex gap-4 items-center'>
                        <h3 className='font-semibold'> {title}</h3>
                        <BiEditAlt style={{ fontSize: "1.5rem" }} className='cursor-pointer' onClick={() => openModal({
                            show: true,
                            modalType: 5,
                            identifiers: {
                                folderId: folderId,
                                cardId: playgroundId,
                            }
                        })} />
                        <button className=' font-normal  rounded-full p-2 bg-[#0097d7] '  onClick={saveCode}>
                            Save code
                        </button>
                    </div>
                    <div className='flex gap-4'>
                        <Select
                            options={languageOptions}
                            value={language}
                            onChange={handleLanguageChange}
                        />
                        <Select
                            options={themeOptions}
                            value={currentTheme}
                            onChange={handleThemeChange}
                        />
                    </div>

                </div>
            }
                <CodeEditor
                    currentLanguage={currentLanguage}
                    currentTheme={currentTheme.value}
                    currentCode={currentCode}
                    setCurrentCode={setCurrentCode}
                    isFullScreen={isFullScreen}
                    
                />

                <div className='bg-white flex w-full justify-between p-4  '>
                    <button className="flex gap-3 items-center" onClick={() => setIsFullScreen((isFullScreen) => !isFullScreen)}>
                        <BiFullscreen style={{ fontSize: "1.5rem" }} /> {isFullScreen ? 'Minimize Screen' : 'Full Screen'}
                    </button>

                    <label className="flex gap-3 items-center cursor-pointer" htmlFor="codefile">
                        <input className="hidden" type="file" accept="." id="codefile" 
                        onChange={(e) => getFile(e, setCurrentCode)} /> 
                        <BiImport style={{ fontSize: "1.5rem" }} /> Import Code
                    </label>

                    <a className="flex gap-3 items-center" href={`data:text/plain;charset=utf-8,${encodeURIComponent(currentCode)}`} download="code.txt">
                        <BiExport style={{ fontSize: "1.5rem" }} /> Export Code
                    </a>
                    <button onClick={runCode} className=' font-normal  rounded-full p-2 bg-[#0097d7]'>
                        Run code
                    </button>
                </div>

        </div>
  )
}

export default EditContainer