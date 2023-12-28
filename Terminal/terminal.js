import { FileSystem } from './sys/FileSystem.js';
import { Initdefaultfiles } from './sys/start.js';

const DEV_MODE = false;

//Refrences
const inputElement = document.getElementById('input');
const outputElement = document.getElementById('output');
const editor = document.getElementById("editor");
let editorOpen = false; // Variable to track if the editor is open
// Create a flag to track if the JavaScript PowerShell console is open
let jsConsoleOpen = false;
// Load file system data from local storage
let fileSystemData;
let fileSystem;
if(!DEV_MODE) {
   fileSystemData = localStorage.getItem('fileSystemData')
}

// Check if file system data exists in local storage
if (fileSystemData)  {
    fileSystem = new FileSystem(JSON.parse(fileSystemData));
}else  {
    fileSystem = new FileSystem();
    Initdefaultfiles(fileSystem);
}
GetCommand("cat readme.txt")
//Initially set up the  main prefix
document.getElementById("main-prefix").innerHTML = " " + fileSystem.where() + ">";

//Input Handleing
const commandHistory = [];
let commandHistoryIndex = 0;
function normalConsoleHandler(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const command = inputElement.value;
        commandHistory.push(command); // Store the command in history
        commandHistoryIndex = commandHistory.length; // Reset history index

        // Display the command with a prefix in the terminal.
        const outputText = `<span class="user-prefix"> ${fileSystem.where()}></span>${command}\n`;
        outputElement.innerHTML += outputText;
        GetCommand(command);

        inputElement.value = '';
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (commandHistoryIndex > 0) {
            commandHistoryIndex--;
            inputElement.value = commandHistory[commandHistoryIndex];
        }
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (commandHistoryIndex < commandHistory.length - 1) {
            commandHistoryIndex++;
            inputElement.value = commandHistory[commandHistoryIndex];
        }
    }
}
inputElement.addEventListener('keydown',normalConsoleHandler);



function GetCommand(cmd) {
    
    const args = cmd.split(' '); // Split the command into an array of arguments.
    const command = args[0]; // The first element is the command itself.
    if(args[1] == "="){
        //Set variable command
        switch(command) {
            


        }

    } else {
    switch(command)  {
        //Normal
        case "clear":
            outputElement.innerHTML = '';
            editorOpen = false;
            break;
        case "":
            break
        case "echo":
            if (args.length > 1) {
                const text = args.slice(1).join(' '); // Reconstruct the text after "echo".
                outputElement.innerHTML += text + '\n';
            } else {
                outputElement.innerHTML += 'echo: Missing text argument\n';
            }
            break;
        case "-help":
            const helpText = `
            (optional) [required]
            Available commands:
            --Misc--
            - clear: Clear the terminal.
            - -help: Display this help message.
            - date: Show the current date and time.
            - echo [text]: Display the provided text.
            - goto [url]: Opens URL in new window. (Will not work if popups are disabled)

            --Files--
            - cd [directory]: Change the current directory.
            - ls: List files and directories in the current directory.
            - mkdir [directory]: Create a new directory.
            - touch [file] [content]: Create a new file with content.
            - cat [file]: Read the contents of a file.
            - back: Goes to parent directory
            -delete [file/directory]: Will remove a directory/file
            -format-disk: Will remove all custom user files from disc and local storage.
            
            --Applications--
            - ed [-a || -s] (file): Bishop_os built in text editor. -a = Advanced| -s = Simple
            - - save [file]: Can only be used when ed is open. Will save the edited file.
            - - exit: exit's the editor without saving.
            -js: (WIP EXPERIMENTAL) Js interpretor built into Bishop_os. Currently variables do not work but anything you can do in one line should.
            \n`;
            outputElement.innerHTML += helpText;
            break;
        case "date":
            const currentDate = new Date().toLocaleString();
            outputElement.innerHTML += currentDate + '\n';
            break;
        case "cd":
            if(args[1] ===  `..`){
                GetCommand("back");
                break
            }
            const result = fileSystem.cd(args[1]);
            outputElement.innerHTML += result + '\n';
            document.getElementById("main-prefix").innerHTML = " " + fileSystem.where() + ">";
            break;
        case "back":
            const r = fileSystem.back();
            outputElement.innerHTML += r + '\n';
            document.getElementById("main-prefix").innerHTML = " " + fileSystem.where() + ">";
            break;
        case "ls":
            const content = fileSystem.ls();
            outputElement.innerHTML += `---${fileSystem.where()}---` + `\n` + content + '\n';
            break;
        case "mkdir":
            const mkdirResult = fileSystem.mkdir(args[1]);
            outputElement.innerHTML += mkdirResult + '\n';
            break;
        case "touch":
            const fileName = args[1];
            const con = args.slice(2).join(' ');
            const touchResult = fileSystem.touch(fileName, con);
            outputElement.innerHTML += touchResult + '\n';
            break;
        case "cat":
            const catResult = fileSystem.cat(args[1]);
            outputElement.innerHTML +='\n'+`<pre id="page" contenteditable="false">${catResult}</pre>` + '\n';
            break;
        case "ed":
            if(editorOpen) {outputElement.innerHTML += "ed: Can only have one editor open at a time. Please save other editor first using save [filename] \n"; break;}
            if (args.length > 1) {
                const fileName = args[2];
                const mode = args[1];
                const fileContent = fileSystem.cat(fileName);
                if(mode.toLowerCase() !== "-a" && mode.toLowerCase() !== "-s") {
                    outputElement.innerHTML += `Please use either -a (advanced) or -s (simple) as the second argument. The filename should be third \n ("ed -s readme.txt") \n`;
                    break
                }


                let formattedContent = ''; // Initialize the variable for formatted content

            if (fileContent != `File "${fileName}" not found.`) {
                // Check the mode and format the content accordingly
                if (mode === "-s") {
                    formattedContent = fileContent; // You need to define this function
                } else if (mode === "-a") {
                    formattedContent = escapeHtml(fileContent);
                }

                outputElement.innerHTML += `(${fileName}: Use "save ${fileName}" in the console to save once you are done)` + '\n' + `<div id="editor-container">
                    <div id="editor" contenteditable="true">${formattedContent}</div>
                </div>`;

                editorOpen = true; // Editor is open
            } else {
                outputElement.innerHTML += `File "${fileName}" not found. Opening a new file. Use "save [desired file name]" to save the new file`;
                outputElement.innerHTML += `<div id="editor-container">
                    <div id="editor" contenteditable="true"></div></div>`
                editorOpen = true; // Editor is open
            }
            } else {
                outputElement.innerHTML += `Opening a new file. Use "save [desired file name]" to save the new file`;
                outputElement.innerHTML += `<div id="editor-container">
                    <div id="editor" contenteditable="true"></div></div>`
                editorOpen = true; // Editor is open
            }
    break;
        case "format-disk":
                if (confirm("Are you sure you want to format the disk? This will delete all files and directories, Execpt the default ones.")) {
                    localStorage.clear();
                    location.reload();
                } else {
                    outputElement.innerHTML += 'Disk format aborted.\n';
                }
                break;
            
        case "save":
            if (editorOpen) {
                const editedContent = document.getElementById("editor").textContent;
                const fileName = args[1];
    
                if (fileName) {
                    if(fileSystem.ls().includes(fileName)){
                    fileSystem.touch(fileName, editedContent);
                    outputElement.innerHTML += `File "${fileName}" overwritten\n`;
                    document.getElementById("editor").id = "page";
                    }else{
                        fileSystem.touch(fileName, editedContent);
                        outputElement.innerHTML += `New file "${fileName}" saved.\n`;
                        document.getElementById("editor").innerHTML = includeHtml(document.getElementById("editor").innerHTML);
                        document.getElementById("editor").id = "page";
                    }
                    editorOpen = false;
                } else {
                    outputElement.innerHTML += 'save: Missing file name\n';
                }
            } else {
                outputElement.innerHTML += 'save: No active editor. Open an editor using "ed" first.\n';
            }
            break;
        case "exit":
            if (editorOpen) {
                document.getElementById("editor").id = "page";
                editorOpen = false;
            } else {
                outputElement.innerHTML += 'exit: No active application.\n';
            }
            break;
        case "delete":
                const targetName = args[1];
    
                if (targetName) {
                    const deleteResult = fileSystem.deleteItem(targetName);
    
                    if (deleteResult) {
                        outputElement.innerHTML += `Deleted: "${targetName}"\n`;
                    } else {
                        outputElement.innerHTML += `File or directory "${targetName}" not found.\n`;
                    }
                } else {
                    outputElement.innerHTML += 'delete: Missing target name\n';
                }
                break;
            case "js":
                if (jsConsoleOpen) {
                    outputElement.innerHTML += "JavaScript PowerShell console is already open.\n";
                } else {
                    jsConsoleOpen = true;
                    outputElement.innerHTML += "JavaScript PowerShell console opened. Type Ctrl+C to exit.\n";
                    inputElement.removeEventListener(`keydown`,normalConsoleHandler)
                    inputElement.addEventListener('keydown', jsConsoleHandler);

                    document.getElementById("main-prefix").innerHTML = " (js)>";

                    inputElement.value = "";
                }
                break;
            case "goto":
                if (args.length > 1) {
                    const url = args[1];
                    window.open(url, '_blank');
                    outputElement.innerHTML += `Opening ${url} in a new tab or window.\n`;
                } else {
                    outputElement.innerHTML += "Usage: goto [website URL]\n";
                }
                break;
        default:
            const outputText = `"${cmd}" command not found`;
            outputElement.innerHTML += outputText + '\n';
    }
    }
// Function to handle JavaScript commands in the console
function jsConsoleHandler(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const command = inputElement.value;
        if (command.startsWith("let ")) {
            // Variable assignment
            const assignmentCommand = command.slice(4); // Remove "let " from the beginning
            try {
                eval(assignmentCommand);
                outputElement.innerHTML += `<span class="user-prefix"> (js)></span> ${command}\n`;
            } catch (error) {
                outputElement.innerHTML += `<span class="user-prefix"> (js)></span> ${command}\n`;
                outputElement.innerHTML += `<pre class="error">${error}</pre>\n`;
            }
        } else {
            try {
                // Evaluate the expression using the stored variables
                const result = eval(command);
                outputElement.innerHTML += `<span class="user-prefix"> (js)></span> ${command}\n`;
                if (result !== undefined) {
                    outputElement.innerHTML += `<pre>${result}</pre>\n`;
                }
            } catch (error) {
                outputElement.innerHTML += `<span class="user-prefix"> (js)></span> ${command}\n`;
                outputElement.innerHTML += `<pre class="error">${error}</pre>\n`;
            }
        }
        inputElement.value = '';
    } else if (event.key === 'c' && event.ctrlKey) {
        // Handle Ctrl+C to exit the console
        outputElement.innerHTML += "JavaScript PowerShell console closed by Ctrl+C.\n";
        document.getElementById("main-prefix").innerHTML = " " + fileSystem.where() + ">";
        jsConsoleOpen = false;
        inputElement.value = '';
        inputElement.removeEventListener('keydown', jsConsoleHandler);
        inputElement.addEventListener('keydown', normalConsoleHandler);
    }
}

}
function escapeHtml(str) {
    const htmlEntities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };

    return str.replace(/[&<>"']/g, char => htmlEntities[char]);
}

function includeHtml(str) {
    const htmlEntities = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'"
    };

    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, entity => htmlEntities[entity]);
}