import { FileSystem } from './sys/FileSystem.js'; // Adjust this import based on your project structure


let fileSystem;
let vistormode; //Is true if looking at someone elses files. Will prevent changes from saving
// Parse URL parameters
const urlParams = new URLSearchParams(window.location.search);
const filePathToOpen = urlParams.get('path');
const filesjsonurl = urlParams.get(`files`);
if(filesjsonurl === null) {
    // Load file system data from local storage
    let fileSystemData = localStorage.getItem('fileSystemData');
    // Check if file system data exists in local storage
    if (fileSystemData) {
    fileSystem = new FileSystem(JSON.parse(fileSystemData));
    console.log("Loaded custom");
    }else  {
    fileSystem = new FileSystem();
    Initdefaultfiles(fileSystem);
    console.log("Loaded default");
}
document.getElementById("logo").innerHTML += `Viewing Local Files`;
} else {
    fileSystem = new FileSystem(JSON.parse(filesjsonurl));
    vistormode = true;
    document.getElementById("logo").innerHTML += `<b id="red">(Viewing someone else's files)</b>`;
}


const backButton = document.getElementById("back-button");
const refreshButton = document.getElementById("refresh-button");
const currentDirectory = document.getElementById("current-directory");
const fileList = document.getElementById("file-list");
const fileDetails = document.getElementById("file-details");
const fileContent = document.getElementById("file-content");
const fileShare = document.getElementById("sharelink-button");

function updateFileList() {
    const content = fileSystem.ls();
    const items = content.split("\n");
    console.log(items);
    fileList.innerHTML = "";
    items.forEach(item => {
        let [itemName, itemType] = item.split(' ||');
        const listItem = document.createElement('li');
        itemType = itemType.replace("||","");
        console.log(`${itemName},${itemType}`);
        listItem.textContent = itemName;
        listItem.classList.add(itemType == "DIR" ? "DIR" : "FILE");
        listItem.addEventListener("click", () => {
            if (itemType == "DIR") {
                fileSystem.cd(itemName);
                updateFileList();
                currentDirectory.innerHTML = fileSystem.where();
                fileDetails.style.display = "none";
            } else {
                fileDetails.style.display = "block";
                fileContent.innerHTML = fileSystem.cat(itemName);
            }
        });
        fileList.appendChild(listItem);
    });
}

backButton.addEventListener("click", () => {
    fileSystem.back();
    updateFileList();
    currentDirectory.textContent = fileSystem.where();
    fileDetails.style.display = "none";
});

refreshButton.addEventListener("click", () => {
    updateFileList();
    currentDirectory.textContent = fileSystem.where();
    fileDetails.style.display = "none";
});

updateFileList();
currentDirectory.textContent = fileSystem.where();
fileDetails.style.display = "none";

// Automatically open the specified file path if 'path' parameter is present in the URL
if (filePathToOpen) {
    const pathComponents = filePathToOpen.split('/');
    let currentPath = '';
    pathComponents.forEach(component => {
        currentPath += component;
        const fileListItem = Array.from(fileList.children).find(item => item.textContent === currentPath);
        if (fileListItem) {
            fileListItem.click();
        }
        currentPath += '/';
    });
}