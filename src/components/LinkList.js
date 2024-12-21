/* global chrome */
import React from 'react';

export default function LinkList({ links, folderIndex, folders, setFolders, onBack }) {
  const editLink = (index) => {
    const newLink = prompt('Enter new link:', links[index]);
    if (newLink) {
      const newLinks = [...links];
      newLinks[index] = newLink;
      saveLinks(newLinks);
    }
  };

  const deleteLink = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    saveLinks(newLinks);
  };

  const saveLinks = (newLinks) => {
    if (folderIndex === -1) {
      const folderName = prompt('Enter folder name:');
      if (folderName && folderName.trim() !== '') {
        const newFolders = [...folders, { name: folderName, links: newLinks }];
        setFolders(newFolders);
        onBack();
      }
    } else {
      const newFolders = [...folders];
      newFolders[folderIndex].links = newLinks;
      setFolders(newFolders);
    }
  };

  const openAllLinks = () => {
    links.forEach(link => chrome.tabs.create({ url: link }));
  };

  return (
    <div className="p-3">
      {links.map((link, index) => (
        <div key={index} className="flex justify-between items-center p-2 border-b">
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate flex-grow">{link}</a>
          <div>
            <button onClick={() => editLink(index)} className="mr-2 text-blue-500 hover:text-blue-700">Edit</button>
            <button onClick={() => deleteLink(index)} className="text-red-500 hover:text-red-700">Delete</button>
          </div>
        </div>
      ))}
      <div className="mt-4 flex justify-between">
        <button onClick={onBack} className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded transition-colors duration-200">Back</button>
        <button onClick={openAllLinks} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors duration-200">Open All Links</button>
      </div>
      {folderIndex === -1 && (
        <button onClick={() => saveLinks(links)} className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors duration-200">
          Save Links
        </button>
      )}
    </div>
  );
}

