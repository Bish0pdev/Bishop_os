import { FileSystem } from './FileSystem.js';

export function Initdefaultfiles(sys) {
    console.log(sys.mkdir('_mystuff'));
    sys.touch('readme.txt', `<p><h1>WELCOME TO BISHOP_OS</h1> Use the -help command to get started!
    Up and down arrow keys cycle through command history
    [You can edit this document using ed readme.txt]
    "clear" to clear this message \n -BISH
</p>

<h4>Changelog v0.2 "We're getting places"</h4>
<b>Features</b>
-File changes are now persistant across sessions!!!
-New "File explorer" to browse and read you're files.
-Ed now has the ability to show raw inner html, so you can more deeply customize you're files.

<b>Command Changes</b>
-Added "format-disk" cmd: resets the file system to default and deletes local storage.
-Added "exit" cmd: exit's ed without saving.
-Added "goto" cmd: Opens a url in a new window.
-Modified cd: cd .. now has the same functionality of the "back" command. (Your welcome Flippy)
-Changed ed command: -a for advanced view, -s for simple view. Advanced view allows you to edit the html directly, allowing for more control over files.
    `);
    sys.cd(`_mystuff`);
    //#region Mystuff
    sys.touch(`[nohandsbutyours].txt`,`
                              |~~~~~~~|
                              |       |
                            |~~~~~~~~~~~| 
                            |  I N R I  |
                            |___________|
                              |       |
    |~~~~~~~~~~~~~~~~~~~~~xx~~         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    |    No hands      ,XXXXX),                                    |
    |    ~~\\  ~-.     XXXXX\`)))),                 _.--~~ No hands|
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

                               Christ has no hands now but yours
                               Reaching down deep in the dirt
                               Covered in the soil, aching from the work
                               Christ has no hands now but yours

                               Christ has no feet now but yours
                               Marching for those who can't speak
                               Callused and worn, weary and weak
                               Christ has no feet now but yours
                               
                               Christ has no mouth now but yours
                               Speaking for those with no voice
                               Even in the silence, it's cutting through the noise
                               Christ has no mouth now but yours

                               Christ has no eyes now but yours
                               Weeping with all those who weep
                               Bloodshot and strained for those who cant see
                               Christ has no eyes now but yours
    `)
    sys.touch("[projectiontube_blues].txt", `
    <style>#blues{color:lightblue;}</style>
    <pre id="blues">
    W̸ͨe͎’r͢e̊̕ a̓̆ļl͓̐ b̥ͤlͪu̫e̻͈͢ frͥo̱m͗ͬͅ p̵̒̚r̓oj̦̽̕ẹ͂ctio̶̳n͈̥ t̡͉ͯu̵͑ͦb͡es̻̝ͨ.̫ /̯̫ We͈’̯͡r̽̄e̱͐ âl̾͝l͐ b̃͜l͑̍u͕͜ḙ̢ fr̅͘om̧͙͉ p͖r͖̆oj͕̓e͙c̱tiͭ̒ǒ͠n̯̝̆ t͋͊uͬͫbe̢͂ͨs͉̜.̵ /͐͑ T͗h̵̴́ḯ̵̸s̻ i̪s̖̋͝ th̭e̻ s̔ͫt̺ͨͮa͒ṫi_ċ̜ ḁ̋͆g̕e̿ ẇ͍̺e̳̊̀ lͫ̚i̘͒͗vȩ̳̯ i̶n̹͉. /͕̖͆ O̵͔u̫r̨̬ e͛y̚e̺s̨ͨ͢ c̨̧r͘ĩs̟s͒̽͝cȑ̥̹o͡ss,̗ h̡̀o̻ͫl̚d̤̰͖,̜͘ an̊͞d̓ g̾aze̻̲.̟͚W̨̙e’͈̎reͮ alͨl̊̆͒ b̺̌́l͎̽͆u̾̓e̗ f̲r̨o̖̽m͚ p̦̅r͐̽o͓ͪj̥e͂ct͍̰ͪi̬͌oͣn̻̲ͫ t̬͚̀ub̒̑ĕ̝̋s.̰̊ / Wē̜͘’ȑ͈̉e̾ͨ aḷ̆̊l̫ blùe̕ fṛ͓o_͓m̹̑ pr̗̿oͣj́ec̃t̴̨͗iö̸́̊n t̻ub̲́ȩ͎͕s̛.ͧ /̞̼̋ T̖̐h̲̮͂ỉ͈̼s̲̼ iͬsͪ ť͚͝h̗ͦ͝e̥͕̍ ș̤t̍ͫͪa̞͂̈́ti̔̃c̨̝͇ age weͭ l̊̐ͧį̗̚v͂e̍ iͪͯn̴.̄͡ /̋̕ Ò̫̑u̽_r e͔̼̍y̹e̓s̞̲̞ cr̆i͟s̹s͍̫c̍r͌o̩̰͠s͛ͯ̿s,̶͓ͫ ḩ͈óld,̡̣͡ a͐n̿͟͟d̃̆͝ gaz̚ͅe̻͝.We̸̡’̛rë̷͚ a̅͂͜l̠ͭl b̶l̼ue f̜͛r͚̈o͗m͙͟ p͙̍ͮr͂ồ̕j̤ĕ͈ͅç̪ͤṭi͐o̭ͩn ţub͖ͫeͯsͩ́.̡͉ /ͮ̽ W̰͆e̿_̗’r̵̴͢e all̡̓ b̵l̵̖ue̠̬ f_̸r̀̋ͅom p͓r̮ͣ͠ò̓͌jec̃̕tĭ̦̑o̹͍n͡ tͨû̸̠b͖͐̅e̠͜͞s̝ͦ̌.̓ /͟ Ṫ͔hi̙͋s̐ is̸ͮͅ t̗̳͌he s̱͙̃ta̼ͩ͋tĩ̸̕c̶̝ a̷͇͞g͕̲̅ê͎̞ w̩͓̮e̒̕ l̷̒ͨive i͛n.̇ /̗̃́ Ǫ̖̈u͎͛̕r̜̱ ėyͮͅes͚̊͡ c̩̓̒r͍i͑̍s̬̀s͔̼̒croͨ̃s̏͟͝sͫ̇,̘ h͠ȏ̫l̽̄d̢͢͝, and ḡ̜ͬâzé̳._W̆e͑’̪ͅr͔͠e̸͛ a͚l͝l̙̆̀ bl̺̃u̥͝_e͇̫ͭ f̴̖rͨo̍͢m͝ proͥj͎͇ͩeͫct̗̝͘io͕̳̳n̅͊͝ tu̎̄b̪e_̭̀ş̽.͙͌͜ /̗ W̪̳e̵͌’̱͂rͯeͥ ȁ͇l̈́ͅḽ͇ͮ b̋l̏u̕e f̥ͅr̠̐om pr̬͗oj̱̪̬e̿c̦͒̈t̜̂ịͨon t͍ü͇b́̏e̞̒s̹͌ͅ. /͓ͅ Tͭhis i̮s͈̝ thȩ s͉͉̈ťa͓͍tͯi̬ͧ͢c͇͋̊ ḁ̳͙gͣͬȩͥ wè̚ l̩i̐ve iň.̈͒ /͚͘ O̅̂͡u̬͆r͛ ey̋͠ẻ̦s̷ͬ̕ c̫͒͛riss̡c͗̕͟r͚͊͘o̺̱s̵̼̬s̳͑̚,̒ hold, ả̴͔n͙̿ͣd g̢̹̃aẕ̨ͥe͗.̞W̢̧͕è͖’͛r̦eͥ͡ a̗ll̔ b̺l͆u̷ĕ̂ f͜r̝̫o̸͎̓m pr_̅o̻j̭ͤe̓ͅctiͫo̭ͮn̰ tṵͬ͌b͖̩͆e͛s.̕ /̢ͬͭ W̶ḛ̡’̢re̥͇_ á͎͕lͬ̿ͭl̈́ bl̃ͪu̬e f̡͚̥r͈ͬͣọm p̓r̪͢oͭje͉c̦̔̋t͗ͭ̚i̦on̄ͅ t̳͘u͑͘b̡ͥḙs.̫ͯͪ /͡ T̅his i̚ś̝ thȇͅ s̈t̹̀͘a̱̫͑ť̖̒i͉̩͋c̏̔͜ a̧̔͗g̘e wēͯ l̹̊i̶̷̟v͘͠eͩ̃̚ in.ͭ̽ / Őͮü̊r̦͛̊ e͇͛y͛̌esͨ c͑r͐́ͮi̅s̠̋scŕ͖o̩s̷s,͉ͦ_ h̴̬̝o̷̧l̺d̼̐,͝ ȧ_͍n͓̓͜d̰̽ g͌͐a͇͗̅z͖̚e̓.ͩͭW̳e̬̚’͚̎̚re̽͛ a̠l̛̖̤l b̕l̦u͈͉e̚ f͉̰ͧr̺ͧ̑o̡̓͠m pr͎o̝̐ͅj̠e̫̙͂c̨̏́ţ̈́ion̔̆ͤ t͉u̟b͖e̘ș̆. /͑ Wẹ̊̕’̩r̤̻e̱ͪͪ aĺl b͛ͤl̞ͣͪue͕ f̍r̭ͭ̾oͤm̻ͫ p̣ro͙̔j͞ë̦́ct̯i̶̗̍o̡̎͑n̶̤ 
                                        </pre>                                                                                  `);
    
    sys.touch("[01101100_01101111_01101100].txt", `01101100 01101111 01101100 00100000 01111001 01101111 01110101 00100000 01100001 01100011 01110100 01110101 01100001 01101100 01101100 01111001 00100000 01110100 01101111 01101111 01101011 00100000 01110100 01101001 01101101 01100101 00100000 01110100 01101111 00100000 01100011 01101111 01101110 01110110 01100101 01110010 01110100 00100000 01110100 01101000 01101001 01110011 00111111 00100001 00111111 00100000 01100011 01110010 01100001 01111010 01111001 01111001 01111001 01111001 01111001 00101110 `);

    sys.touch("[FREE-PSP!!!].gif", `<img src="sys/jhesus.gif">`);

    sys.touch("[showbiz].gif",`<img src="sys/showbis.gif">`);

    sys.touch("[crookedteeth].gif",`<img src="sys/crookedteeth.gif">`);

  //#endregion
  //sys.mkdir("חטאה");
    sys.back();
}