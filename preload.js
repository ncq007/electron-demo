window.stopLoading = function () {
    ipcRenderer.send('stop-loading-main')
}