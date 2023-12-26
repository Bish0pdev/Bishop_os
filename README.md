# Bishop_os

A web-based terminal-like application with a boot-up page and basic file system operations, Fully built in frontend-JavaScript by hand. This is also where I host my portfolio.

[View the pages build here!](https://bishop-dev.com)
## Available commands
### Misc
- clear: Clear the terminal.
- -help: Display this help message.
- date: Show the current date and time.
- echo [text]: Display the provided text.
- goto [url]: Opens URL in new window. (Will not work if popups are disabled)
### Files
- cd [directory]: Change the current directory.
- ls: List files and directories in the current directory.
- mkdir [directory]: Create a new directory.
- touch [file] [content]: Create a new file with content.
- cat [file]: Read the contents of a file.
- back: Goes to parent directory
- delete [file/directory]: Will remove a directory/file
- format-disk: Will remove all custom user files from disc and local storage.
### Applications
- ed [-a || -s] (file): Bishop_os built in text editor. -a = Advanced| -s = Simple
- - save [file]: Can only be used when ed is open. Will save the edited file.
- - exit: exit's the editor without saving.
- js: (WIP EXPERIMENTAL) Js interpreter. Currently, variables do not work but anything you can do in one line should.
