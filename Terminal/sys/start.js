import { FileSystem } from './FileSystem.js';

export function Initdefaultfiles(sys) {
    // console.log(sys.mkdir('_mystuff'));
    sys.touch('readme.txt', `<p><h1>WELCOME TO BISHOP_OS</h1> Use the -help command to get started!
    Up and down arrow keys cycle through command history
    [You can edit this document using ed readme.txt]
    "clear" to clear this message \n -BISH
    </p>
    `);


    sys.mkdir("Portfolio");
    sys.cd("Portfolio");

    sys.mkdir("School Projects");
    sys.cd("School Projects");
    sys.touch("GradeCalculater.java", `<a href="sys/projects/GradeCalculator-1.java" target="_blank">View Source Code</a> <h1>Output</h1> <img src= sys/projects/gradecaloutput.png> `);
    sys.touch("GradesCal.java", `<a href="sys/projects/GradesProgram-1.java" target="_blank">View Source Code</a> <h1>Output</h1> <img src= sys/projects/grades.png> `);
    sys.touch("RepairCost.java", `<a href="sys/projects/InitialsRepairEstimate.java" target="_blank">View Source Code</a> <h1>Output</h1> <img src= sys/projects/repair.png> `);
    sys.touch("Butler_Prog#6.py", `<a href="sys/projects/Butler_Prog6.py" target="_blank">Download Project</a>`);
    sys.touch("Cafe.html", `<a href="sys/projects/Butler_MP_SLO3" target="_blank">Go to project</a> `);
    sys.touch("Grades.html", `<a href="sys/projects/Butler_MP_SLO2" target="_blank">Go to project</a> `);
    
    let username = "Bish0pdev";
    getReadme(username,"BParticles")
        .then(readmeContent => {
            sys.cd("Portfolio");
            sys.touch("Bparticles.github", `<a href="https://github.com/Bish0pdev/BParticles" target="_blank">View On Github</a>` + readmeContent)
            sys.back();
        })
        .catch(error => console.error(error));
    getReadme(username,"Bishop_os")
        .then(readmeContent => {
            sys.cd("Portfolio");
            sys.touch("Bishop_OS.github", `<a href="https://github.com/Bish0pdev/Bishop_os" target="_blank">View On Github</a> <img src="https://github.com/Bish0pdev/Bishop_os/blob/main/logo.png">` + readmeContent)
            sys.back();
        })
    sys.back();
}
async function getReadme(username, repository) {
    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repository}/readme`);
        const data = await response.json();

        if (response.ok) {
            // Decode the content of the README file from base64
            const readmeContent = atob(data.content);
            return `<div id="markdown-content">`+markdownToHtml(readmeContent)+`</div>`;
        } else {
            // If the request was not successful, throw an error
            throw new Error(`Error fetching README: ${data.message}`);
        }
    } catch (error) {
        throw new Error(`Error fetching README: ${error.message}`);
    }
}
function markdownToHtml(markdown) {
    // Headers
    markdown = markdown.replace(/^(#)\s(.+)$/gm, '<h2>$2</h2>');
    markdown = markdown.replace(/^(##)\s(.+)$/gm, '<h3>$2</h3>');
    markdown = markdown.replace(/^(###)\s(.+)$/gm, '<h4>$2</h4>');

    // Bold and italic
    markdown = markdown.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    markdown = markdown.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Lists
    markdown = markdown.replace(/^\*\s(.+)$/gm, '<li>$1</li>');
    markdown = markdown.replace(/^(\d+)\.\s(.+)$/gm, '<li>$2</li>');

    // Links
    markdown = markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Convert newlines to <br>
    markdown = markdown.replace(/\n/g, '<br>');

    return markdown;
}
