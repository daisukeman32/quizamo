const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectFolder: () => ipcRenderer.invoke('select-folder'),
    readFolder: (folderPath) => ipcRenderer.invoke('read-folder', folderPath),
    saveImage: (imageData, outputPath) => ipcRenderer.invoke('save-image', imageData, outputPath),
    selectOutputFolder: () => ipcRenderer.invoke('select-output-folder')
});