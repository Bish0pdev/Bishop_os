
export class FileSystem {
    constructor(initialData = {}) {
        this.root = new Directory('root');
        this.currentDirectory = this.root;

        // If initial data is provided, use it to populate the userfiles folder
        if (initialData.name === 'root') {
            this.root = Directory.loadFromObject(initialData);
            this.currentDirectory = this.root;
        }


        this.cd = this.cd.bind(this);
        this.ls = this.ls.bind(this);
        this.mkdir = this.mkdir.bind(this);
        this.touch = this.touch.bind(this);
        this.where = this.where.bind(this);
        this.cat = this.cat.bind(this);
        this.back = this.back.bind(this);
    }
    // Save the file system to localStorage.
    saveFileSystem() {
        localStorage.setItem('fileSystemData', JSON.stringify(this.root.toObject()));
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
        this.saveFileSystem();
        return `Deleted directory "${targetName}".`;
    } else if (targetFile) {
        // Remove the file from the current directory.
        delete this.currentDirectory.files[targetName];
        this.saveFileSystem();
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
            this.saveFileSystem(); // Save changes to the file system.
            return `Changed directory to ${this.currentDirectory.getPath()}`;
        } else {
            return `Directory "${directoryName}" not found.`;
        }

    }
    back() {
        const parentDirectory = this.currentDirectory.getParent();

        if (parentDirectory) {
            this.currentDirectory = parentDirectory;
            this.saveFileSystem();
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
        this.saveFileSystem();
        return `Created directory "/${directoryName}"`;
        
    }

    // Create a new file in the current directory.
    touch(fileName, content) {
        const targetFile = this.currentDirectory.findFile(fileName);

        if (targetFile) {
            if (targetFile.isLocked()) {
                return `Cannot modify locked file "${fileName}".`;
            }

            this.currentDirectory.createFile(fileName, content);
            this.saveFileSystem();
            return `Modified file "${fileName}".`;
        } else {
            this.currentDirectory.createFile(fileName, content);
            this.saveFileSystem();
            return `Created file "${fileName}".`;
        }
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

    // Lock the specified file or directory in the current directory.
    lock(targetName) {
        const targetDirectory = this.currentDirectory.findDirectory(targetName);
        const targetFile = this.currentDirectory.findFile(targetName);

        if (targetDirectory) {
            targetDirectory.lock();
            this.saveFileSystem();
            return `Locked directory "${targetName}".`;
        } else if (targetFile) {
            targetFile.lock();
            this.saveFileSystem();
            return `Locked file "${targetName}".`;
        } else {
            return `File or directory "${targetName}" not found.`;
        }
    }

    // Unlock the specified file or directory in the current directory.
    unlock(targetName) {
        const targetDirectory = this.currentDirectory.findDirectory(targetName);
        const targetFile = this.currentDirectory.findFile(targetName);

        if (targetDirectory) {
            targetDirectory.unlock();
            this.saveFileSystem();
            return `Unlocked directory "${targetName}".`;
        } else if (targetFile) {
            targetFile.unlock();
            this.saveFileSystem();
            return `Unlocked file "${targetName}".`;
        } else {
            return `File or directory "${targetName}" not found.`;
        }
    }
}
class Directory {
    constructor(name, parent = null) {
        this.name = name;
        this.directories = {};
        this.files = {};
        this.parent = parent;
        this.locked = false;
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
    toObject() {
        const obj = {
            name: this.name,
            directories: {},
            files: {},
        };

        for (const dirName of Object.keys(this.directories)) {
            obj.directories[dirName] = this.directories[dirName].toObject();
        }

        for (const fileName of Object.keys(this.files)) {
            obj.files[fileName] = this.files[fileName].toObject();
        }

        return obj;
    }

    static loadFromObject(obj, parent = null) {
        const directory = new Directory(obj.name, parent);

        for (const dirName in obj.directories) {
            directory.directories[dirName] = Directory.loadFromObject(obj.directories[dirName], directory);
        }

        for (const fileName in obj.files) {
            directory.files[fileName] = File.loadFromObject(obj.files[fileName]);
        }

        return directory;
    }

    lock() {
        this.locked = true;
        for (const dirName in this.directories) {
            const subDir = this.directories[dirName];
            subDir.lock();
        }
        for (const fileName in this.files) {
            const file = this.files[fileName];
            file.lock();
        }
    }

    unlock() {
        this.locked = false;
        for (const dirName in this.directories) {
            const subDir = this.directories[dirName];
            subDir.unlock();
        }
        this.unlockFiles();
    }
}


class File {
    constructor(name, content) {
        this.name = name;
        this.content = content;
        this.locked = false;
    }

    getContent() {
        return this.content;
    }
    toObject() {
        return {
            name: this.name,
            content: this.content,
        };
    }

    static loadFromObject(obj) {
        return new File(obj.name, obj.content);
    }

    lock() {
        this.locked = true;
    }

    unlock() {
        this.locked = false;
    }
}