export class FileSystem {
    constructor() {
        this.root = new Directory('root');
        this.currentDirectory = this.root;

        this.cd = this.cd.bind(this);
        this.ls = this.ls.bind(this);
        this.mkdir = this.mkdir.bind(this);
        this.touch = this.touch.bind(this);
        this.where = this.where.bind(this);
        this.cat = this.cat.bind(this);
        this.back = this.back.bind(this);
    }
    // Recursive function to delete a file or directory and its contents.
    deleteItem(targetName) {
    const targetDirectory = this.currentDirectory.findDirectory(targetName);
    const targetFile = this.currentDirectory.findFile(targetName);

    if (targetDirectory) {
        if (targetDirectory === this.root) {
            return `Cannot delete the root directory.`;
        }
        
        // Recursive deletion of subdirectories and files.
        for (const subDirName in targetDirectory.directories) {
            this.deleteItem(subDirName);
        }

        for (const fileName in targetDirectory.files) {
            this.deleteItem(fileName);
        }

        // After all subdirectories and files have been deleted, remove the directory itself.
        const parentDirectory = targetDirectory.getParent();
        delete parentDirectory.directories[targetName];
        return `Deleted directory "${targetName}".`;
    } else if (targetFile) {
        // Remove the file from the current directory.
        delete this.currentDirectory.files[targetName];
        return `Deleted file "${targetName}".`;
    } else {
        return `File or directory "${targetName}" not found.`;
    }
    }
    // Change the current directory.
    cd(directoryName) {
        const targetDirectory = this.currentDirectory.findDirectory(directoryName);

        if (targetDirectory) {
            this.currentDirectory = targetDirectory;
            return `Changed directory to ${this.currentDirectory.getPath()}`;
        } else {
            return `Directory "${directoryName}" not found.`;
        }

    }
    back() {
        const parentDirectory = this.currentDirectory.getParent();

        if (parentDirectory) {
            this.currentDirectory = parentDirectory;
            return `Changed directory to ${this.currentDirectory.getPath()}`;
        } else {
            return `Already at the root directory.`;
        }
    }
    
    // List files and directories in the current directory.
    ls() {
        const content = this.currentDirectory.list();
        return content.join('\n');
    }

    // Create a new directory in the current directory.
    mkdir(directoryName) {
        this.currentDirectory.createDirectory(directoryName);
        return `Created directory "/${directoryName}"`;
    }

    // Create a new file in the current directory.
    touch(fileName, content) {
        this.currentDirectory.createFile(fileName, content);
        return `Created file "${fileName}"`;
    }
    //Gets the path to the current directory
    where() {
        return this.currentDirectory.getPath()
    }
    // Read the contents of a file in the current directory.
    cat(fileName) {
        const file = this.currentDirectory.findFile(fileName);

        if (file) {
            return file.getContent();
        } else {
            return `File "${fileName}" not found.`;
        }
    }
}
class Directory {
    constructor(name, parent = null) {
        this.name = name;
        this.directories = {};
        this.files = {};
        this.parent = parent;
    }

    getPath() {
        return this.name;
    }

    findDirectory(name) {
        return this.directories[name];
    }

    createDirectory(name) {
        this.directories[name] = new Directory(`${this.name}/${name}`, this);
    }

    list() {
        const content = [];
    
    for (const dirName of Object.keys(this.directories)) {
        content.push(`${dirName} ||DIR||`);
    }

    for (const fileName of Object.keys(this.files)) {
        content.push(`${fileName} ||FILE||`);
    }

    return content;
    }

    findFile(name) {
        return this.files[name];
    }

    createFile(name, content) {
        this.files[name] = new File(`${this.name}/${name}`, content);
    }

    getParent() {
        return this.parent;
    }
}


class File {
    constructor(name, content) {
        this.name = name;
        this.content = content;
    }

    getContent() {
        return this.content;
    }
}