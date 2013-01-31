/* Mondriaanify by Jelle Akkerman https://github.com/jellea/mondriaanify */
var nsh      =  require('node-syntaxhighlighter')
  , fs       =  require('fs')
  , exec     =  require('child_process').exec
  , code     =  fs.readFileSync(__filename).toString()
  , style    =  'default'
  , htmlFile =  './victory-boogie-woogie.html'
  ;

var language        =  nsh.getLanguage('js')
  , highlightedCode =  nsh.highlight(refactor(code), language);

/* This is where the shapeing happens */ 
function refactor (data){
  data = data.
    replace(/\n/g,'').
    replace(/[ \t]{2,}/g,' ')
  rowlength = 1;
  rowloc = 1;

  output = "";
  /* Iterate over every character */
  for (i=0;i<data.length;i++) {
      if (rowloc == rowlength) {
          output += '\n';
          rowloc = 0;
          /* if half way cut down rowlength */
          if (i > data.length/2){
              rowlength -= 4;
          } else {
              rowlength += 4;
          }
          for (x=0;x<40-rowlength/2;x++){
              output += ' ';
          }
      }
      output += data[i];

      rowloc += 1;
  }
  return (output);
};

/* Todo: hover effect */ 
var  html = [
        '<!DOCTYPE HTML>'
      , '<html>'
      , '<head>'
      , '  <meta http-equiv="content-type" content="text/html; charset=utf-8"/>'
      , '  <title>Victory Boogie Woogie by Mondriaan & Akkerman</title>'
      , ' <link rel="stylesheet" href="./' + style + '.css" type="text/css" media="screen" charset="utf-8" />'
      , ' <style>'
      ,'   body{letter-spacing: -1px;}'
      , '  .gutter {display: none;}' /* fancy mondriaan colors */
      , '  .code .plain { color: #000 !important; background-color: #d1d1d3 !important;}' /* grey */
      , '  .code .keyword {color: #000 !important; background-color: #d50017 !important;}' /* red */
      , '  .code .string {color: #fff !important; background-color: #1b0091 !important;}' /* blue for strings */
      , '  .code .comments {color: #000 !important; background-color: #feee4f !important;}' /* yellow for comments */
      , ' </style>'
      , '</head>'
      , '<body>'
      , highlightedCode
      , '</body>'
      , '</html'
      ].join('\n');

/* todo: write code to file */
nsh.copyStyle(style, '.');
fs.writeFileSync(htmlFile, html);

console.log('Opening highlighted page. Using style', style);
exec('open ' + htmlFile);
