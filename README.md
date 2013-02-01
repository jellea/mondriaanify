# Victory Boogie Woogie
This little script is made for the 'Elegant Algorithms' contest by
Setup.nl. The goal is to make a beautiful piece of code which generates
a loosly interpreted version of Mondriaan's Victory Boogie Woogie.

When I was thinking about what to use as the input of the algorithm I
was reading the book 'On Intelligence' simultaniously. I was struck by
the fact that a script is never able to rewrite itself in an intelligent
way. This was the seed to make a script.

The script recompiles itself into the rectangular Mondriaan shape and launches 
itself into an syntax highlighted html version with the Mondriaan color
palette ofcourse! The result is a generated Victory Boogie Woogie based on it's
own source.

# How to run
1. Install node.js and node-syntaxhighlighter
  * http://nodejs.org/ and download installer
  * 'npm install node-syntaxhighlighter'
2. Run script with 'node mondriaan.js'

# Output
```javascript
                                      /* Mo
                                    ndriaanif
                                  y by Jelle Ak
                                kerman https://gi
                              thub.com/jellea/mondr
                            iaanify */var nsh = requi
                          re('node-syntaxhighlighter') 
                        , fs = require('fs') , exec = req
                      uire('child_process').exec , code = f
                    s.readFileSync(__filename).toString() , s
                  tyle = 'default' , htmlFile = './victory-boog
                ie-woogie.html' ;var language = nsh.getLanguage('
              js') , highlightedCode = nsh.highlight(refactor(code)
            , language);/* This is where the shapeing happens */ func
          tion refactor (data){ data = data. replace(/\n/g,''). replace
        (/[ \t]{2,}/g,' ') rowlength = 1; rowloc = 1; output = ""; /* Ite
      rate over every character */ for (i=0;i<data.length;i++) { if (rowloc
     == rowlength) { output += '\n'; rowloc = 0; /* if half way cut down rowl
  ength */ if (i > data.length/2){ rowlength -= 4; } else { rowlength += 4; } f
or (x=0;x<40-rowlength/2;x++){ output += ' '; } } output += data[i]; rowloc += 1;
 } return (output);};/* Todo: hover effect */ var html = [ '<!DOCTYPE HTML>' , '<html
>' , '<head>' , ' <meta http-equiv="content-type" content="text/html; charset=utf-8"/>' ,
 ' <title>Victory Boogie Woogie by Mondriaan & Akkerman</title>' , ' <link rel="style
sheet" href="./' + style + '.css" type="text/css" media="screen" charset="utf-8" 
  />' , ' <style>' ,' body{letter-spacing: -1px;}' , ' .gutter {display: none;}
    ' /* fancy mondriaan colors */ , ' .code .plain { color: #000 !important;
       background-color: #d1d1d3 !important;}' /* grey */ , ' .code .keywor
        d {color: #000 !important; background-color: #d50017 !important;}
          ' /* red */ , ' .code .string {color: #fff !important; backgr
            ound-color: #1b0091 !important;}' /* blue for strings */
              , ' .code .comments {color: #000 !important; backgrou
                nd-color: #feee4f !important;}' /* yellow for com
                  ments */ , ' </style>' , '</head>' , '<body>'
                     , highlightedCode , '</body>' , '</html'
                       ].join('\n');/* todo: write code to 
                        file */nsh.copyStyle(style, '.');
                          fs.writeFileSync(htmlFile, ht
                            ml);console.log('Opening 
                              highlighted page. Usi
                                ng style', style)
                                  ;exec('open '
                                     + htmlFi
                                      le);
```
