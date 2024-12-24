import React from 'react';

export default function FolderList({ folders, setFolders, onFolderClick }) {
  const editFolder = (index) => {
    const newName = prompt('Enter new folder name:', folders[index].name);
    if (newName) {
      const newFolders = [...folders];
      newFolders[index].name = newName;
      setFolders(newFolders);
    }
  };

  const deleteFolder = (index) => {
    if (window.confirm(`Are you sure you want to delete the folder "${folders[index].name}"?`)) {
      const newFolders = folders.filter((_, i) => i !== index);
      setFolders(newFolders);
    }
  };

  return (
    <div className="p-3">
      {folders.map((folder, index) => (
        <div key={index} className="flex justify-between items-center p-2 border-b cursor-pointer hover:bg-gray-100">
          <div onClick={() => onFolderClick(folder.links, index)} className="flex-grow">
            <div className="font-bold text-lg">{folder.name}</div>
            <div className="text-xs text-gray-400">{folder.links.length} links</div>
          </div>
          <div>
            <button onClick={() => editFolder(index)} className="mr-2 text-blue-500 hover:text-blue-700">Edit</button>
            <button onClick={() => deleteFolder(index)} className="text-red-500 hover:text-red-700">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

