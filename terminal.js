import { FileSystem } from './sys/FileSystem.js';
import { Initdefaultfiles } from './sys/start.js';
//Refrences
const inputElement = document.getElementById('input');
const outputElement = document.getElementById('output');
const editor = document.getElementById("editor");
// Usage example
const fileSystem = new FileSystem();
let editorOpen = false; // Variable to track if the editor is open

GetCommand("-help")

//Initilize my built in files
Initdefaultfiles(fileSystem);

//Initially set up the  main prefix
document.getElementById("main-prefix").innerHTML = " " + fileSystem.where() + ">";

//Input Handleing
const commandHistory = [];
let commandHistoryIndex = 0;

inputElement.addEventListener('keydown', (event) => {
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
});

function GetCommand(cmd) {
    const args = cmd.split(' '); // Split the command into an array of arguments.
    const command = args[0]; // The first element is the command itself.
    switch(command)  {
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
            Available commands:
            --Misc--
            - clear: Clear the terminal.
            - -help: Display this help message.
            - date: Show the current date and time.
            - echo [text]: Display the provided text.

            --Files--
            - cd [directory]: Change the current directory.
            - ls: List files and directories in the current directory.
            - mkdir [directory]: Create a new directory.
            - touch [file] [content]: Create a new file with content.
            - cat [file]: Read the contents of a file.
            - back: Goes to parent directory
            - ed [file]: Bishop_os built in text editor.
            - - save [file]: Can only be used when ed is open. Will save the edited file.
            -delete [file/directory]: Will remove a directory/file
            \n`;
            outputElement.innerHTML += helpText;
            break;
        case "date":
            const currentDate = new Date().toLocaleString();
            outputElement.innerHTML += currentDate + '\n';
            break;
        case "cd":
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
            outputElement.innerHTML += '(Read Only)'+'\n'+`<pre id="page" contenteditable="false">${catResult}</pre>` + '\n';
            break;
        case "ed":
            if (args.length > 1) {
                const fileName = args[1];
                const fileContent = fileSystem.cat(fileName);
    
                if (fileContent) {
                    outputElement.innerHTML += `(${fileName}: Use "save ${fileName}" in the console to save once you are done)` + '\n' + `<div id="editor-container">
                        <div id="editor" contenteditable="true">${fileContent}</div>
                    </div>`;
    
                    editorOpen = true; // Editor is open
                } else {
                    outputElement.innerHTML += `File "${fileName}" not found.\n`;
                }
            } else {
                outputElement.innerHTML += 'ed: Missing file name\n';
            }
            break;
    
        case "save":
            if (editorOpen) {
                const editedContent = document.getElementById("editor").textContent;
                const fileName = args[1];
    
                if (fileName) {
                    fileSystem.touch(fileName, editedContent);
                    outputElement.innerHTML += `File "${fileName}" saved.\n`;
                } else {
                    outputElement.innerHTML += 'save: Missing file name\n';
                }
            } else {
                outputElement.innerHTML += 'save: No active editor. Open an editor using "ed" first.\n';
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
        default:
            const outputText = `"${cmd}" command not found`;
            outputElement.innerHTML += outputText + '\n';
    }

}