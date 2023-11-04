import { FileSystem } from './sys/FileSystem.js'; // Adjust this import based on your project structure

// Load file system data from local storage
let fileSystemData = localStorage.getItem('fileSystemData');
let fileSystem;


// Check if file system data exists in local storage
if (fileSystemData) {
    fileSystem = new FileSystem(JSON.parse(fileSystemData));
    console.log("Loaded custom");
}else  {
    fileSystem = new FileSystem();
    Initdefaultfiles(fileSystem);
    console.log("Loaded default");
}
const backButton = document.getElementById("back-button");
const refreshButton = document.getElementById("refresh-button");
const currentDirectory = document.getElementById("current-directory");
const fileList = document.getElementById("file-list");
const fileDetails = document.getElementById("file-details");
const fileContent = document.getElementById("file-content");

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
