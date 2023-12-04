import { FileSystem } from './FileSystem.js';

export function Initdefaultfiles(sys) {
    // console.log(sys.mkdir('_mystuff'));
    sys.touch('readme.txt', `<p><h1>WELCOME TO BISHOP_OS</h1> Use the -help command to get started!
    Up and down arrow keys cycle through command history
    [You can edit this document using ed readme.txt]
    "clear" to clear this message \n -BISH
    </p>
    
    `);
    sys.mkdir("Portfolio-COSC-2436")
    sys.cd("Portfolio-COSC-2436")
    sys.touch("GradeCalculater.java", `<a href="sys/projects/GradeCalculator-1.java" target="_blank">View Source Code</a> <h1>Output</h1> <img src= sys/projects/gradecaloutput.png> `)
    sys.touch("GradesCal.java", `<a href="sys/projects/GradesProgram-1.java" target="_blank">View Source Code</a> <h1>Output</h1> <img src= sys/projects/grades.png> `)
    sys.touch("RepairCost.java", `<a href="sys/projects/InitialsRepairEstimate.java" target="_blank">View Source Code</a> <h1>Output</h1> <img src= sys/projects/repair.png> `)
    sys.touch("Butler_Prog#6.py", `<a href="sys/projects/Butler_Prog6.py" target="_blank">Download Project</a>`)
    sys.touch("Cafe.html", `<a href="sys/projects/Butler_MP_SLO3" target="_blank">Go to project</a> `)
    sys.touch("Grades.html", `<a href="sys/projects/Butler_MP_SLO2" target="_blank">Go to project</a> `)
    sys.back();
}