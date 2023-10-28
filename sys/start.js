import { FileSystem } from './FileSystem.js';

export function Initdefaultfiles(sys) {
    console.log(sys.mkdir('_mystuff'));
    sys.touch('readme.txt', `\nWELCOME TO BISHOP_OS 
    \nHey! this is a fun little project I whipped up in a weekend. I just started using Arch linux and thought it might be fun to simulate a linux-esc terminal in browser. \n Planned Feature's \n -Able to save your changes to files to local storage \n -Javascript interpretor built into the console \n -More easter eggs and fun things to play with
    \n Up and down arrow keys cycle through command history
    \n [You can edit this document using ed readme.txt] \n -BISH
    `);
    sys.cd(`_mystuff`);
    sys.touch(`myjoy.art`,`
                              |~~~~~~~|
                              |       |
                            |~~~~~~~~~~~| 
                            |  I N R I  |
                            |___________|
                              |       |
    |~.\\\\_~~~~~~~~~~~~~~xx~~         ~~~~~~~~~~~~~~~~~~~~~/_//;~|
    |  \\  o \\_         ,XXXXX),                         _..-~ o /  |
    |    ~~\\  ~-.     XXXXX\`)))),                 _.--~~   .-~~~   |
     ~~~~~~~\`\\   ~\\~~~XXX' _/ ');))     |~~~~~~..-~     _.-~ ~~~~~~~ 
              \`\\   ~~--\`_\\~\\, ;;;\\)__.---.~~~      _.-~
                ~-.       \`:;;/;; \\          _..-~~
                   ~-._      \`''        /-~-~ 
                       \`\\              /  /
                         |         ,   | |
                          |  '        /  |
                           \\/;          |
                            ;;          |
                            \`\\   .       |
                            |~~~-----.....|
                           | \\             \\
                          | /\\~~--...__    |
                          (|  \`\\       __-\\|
                          ||    \\_   /~    |
                          |)     \\~-'      |
                           |      | \\      '
                           |      |  \\    :
                            \\     |  |    |
                             |    )  (    ) 
                              \\  /;  /\\  |
                              |    |/   |
                              |    |   |
                               \\  .'  ||
                               |  |  | |
                               (  | |  |
                               |   \\ \\ |
                               || o \`.)|
                               |\`\\\\\\) |
                               |       |
                               |       |
                               |       |
    `)
    sys.back();
}