import React from "react";
import { v4 as uuid } from "uuid";
import { createContext, useContext, useEffect, useState } from "react";
import {
  addUserData,
  createData,
  getUserData,
} from "../Utils/firebaseFunctions";

const PlayContext = createContext();
export const languageMap = {
  cpp: {
    id: 54,
    defaultCode:
      "#include <iostream>\n" +
      "using namespace std;\n\n" +
      "int main() {\n" +
      '\tcout << "Hello World!";\n' +
      "\treturn 0;\n" +
      "}",
  },
  java: {
    id: 62,
    defaultCode: `public class Main {
            public static void main(String[] args) {
                System.out.println("Hello World!");
            }
    }`,
  },
  python: {
    id: 71,
    defaultCode: `print("Hello World!")`,
  },
  javascript: {
    id: 63,
    defaultCode: `console.log("Hello World!");`,
  },
};
const PlaygroundContext = ({ children }) => {
  const initialItems = {
    [uuid()]: {
      title: "DSA",
      playgrounds: {
        [uuid()]: {
          title: "Stack Implementation",
          language: "cpp",
          code: languageMap["cpp"].defaultCode,
        },
        [uuid()]: {
          name: "DP",
          language: "java",
          code: languageMap["java"].defaultCode,
        },
      },
    },
  };

  const [folders, setFolders] = useState(() => {
    let localData = localStorage.getItem("playgrounds-data");
    if (localData === null || localData === undefined) {
      return initialItems;
    }
    return JSON.parse(localData);
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    if (user.user) {
      return;
    }
    localStorage.setItem("playgrounds-data", JSON.stringify(folders));
  }, [folders]);

  const getData = () => {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    if (user.user) {
      getUserData(user.user.uid).then((userData) => {
        if (userData) {
          // Do something with the array
          console.log(userData);
          setFolders(userData);
        } else {
          console.log("No user data found or document doesn't exist.");
        }
      });
    }
  };
  const storeData = async (newState) => {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    if (user.user) {
      const res = await addUserData(newState, user.user);
      if (res.success) {
        getData();
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const addFolder = (folderName) => {
    setFolders(async (oldState) => {
      const newState = { ...oldState };

      newState[uuid()] = {
        title: folderName,
        created_at:new Date(),
        playgrounds: {},
      };
      storeData(newState);

      return newState;
    });
  };

  const addPlayground = (folderId, playgroundName, language) => {
    setFolders(async (oldState) => {
      const newState = { ...oldState };

      newState[folderId].playgrounds[uuid()] = {
        title: playgroundName,
        language: language,
        code: languageMap[language].defaultCode,
      };
      storeData(newState);
      return newState;
    });
  };

  const addPlaygroundAndFolder = (folderName, playgroundName, cardLanguage) => {
    setFolders((oldState) => {
      const newState = { ...oldState };

      newState[uuid()] = {
        title: folderName,
        created_at:new Date(),
        playgrounds: {
          [uuid()]: {
            title: playgroundName,
            language: cardLanguage,
            code: languageMap[cardLanguage].defaultCode,
          },
        },
      };
      storeData(newState);
      return newState;
    });
  };

  const deleteCard = (folderId, cardId) => {
    setFolders((oldState) => {
      const newState = { ...oldState };
      delete newState[folderId].playgrounds[cardId];
      return newState;
    });
  };

  const deleteFolder = (folderId) => {
    setFolders((oldState) => {
      const newState = { ...oldState };
      delete newState[folderId];
      return newState;
    });
  };

  const editFolderTitle = (folderId, folderName) => {
    setFolders((oldState) => {
      const newState = { ...oldState };
      newState[folderId].title = folderName;
      storeData(newState);
      return newState;
    });
  };

  const editPlaygroundTitle = (folderId, cardId, PlaygroundTitle) => {
    setFolders((oldState) => {
      const newState = { ...oldState };
      newState[folderId].playgrounds[cardId].title = PlaygroundTitle;
      storeData(newState);
      return newState;
    });
  };

  const savePlayground = (folderId, cardId, newCode, newLanguage) => {
    setFolders((oldState) => {
      const newState = { ...oldState };
      newState[folderId].playgrounds[cardId].code = newCode;
      newState[folderId].playgrounds[cardId].language = newLanguage;
      storeData(newState);
      return newState;
    });
  };

  const PlayGroundFeatures = {
    folders: folders,
    deleteCard: deleteCard,
    deleteFolder: deleteFolder,
    addFolder: addFolder,
    addPlayground: addPlayground,
    addPlaygroundAndFolder: addPlaygroundAndFolder,
    editFolderTitle: editFolderTitle,
    editPlaygroundTitle: editPlaygroundTitle,
    savePlayground: savePlayground,
  };
  return (
    <PlayContext.Provider value={PlayGroundFeatures}>
      {children}
    </PlayContext.Provider>
  );
};

export const GetPlayGroundContext = () => {
  return useContext(PlayContext);
};
export default PlaygroundContext;
