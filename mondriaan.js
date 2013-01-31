var nsh      =  require('node-syntaxhighlighter')
  , fs       =  require('fs')
  , exec     =  require('child_process').exec
  , code     =  fs.readFileSync(__filename).toString()
  , style    =  'default'
  , htmlFile =  './mondriaan.html'
  ;

var language        =  nsh.getLanguage('js')
  , highlightedCode =  nsh.highlight(refactor(code), language);


function refactor (data){
  data = data.
    replace(/\n/g,'').
    replace(/[ \t]{2,}/g,' ')
  rowlength = 1;
  rowloc = 1;

  output = "";

  for (i=0;i<data.length;i++) {
      if (rowloc == rowlength) {
          output += '\n';
          rowloc = 0;
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

var  html = [
        '<!DOCTYPE HTML>'
      , '<html>'
      , '<head>'
      , '   <meta http-equiv="content-type" content="text/html; charset=utf-8"/>'
      , '   <title>Page of Self</title>'
      , ' <link rel="stylesheet" href="./' + style + '.css" type="text/css" media="screen" charset="utf-8" />'
      , ' <style>body{letter-spacing: -1px;}</style>'
      , '</head>'
      , '<body>'
      , highlightedCode
      , '</body>'
      , '</html'
      ].join('\n');

nsh.copyStyle(style, '.');
fs.writeFileSync(htmlFile, html);

console.log('Opening highlighted page. Using style', style);
exec('open ' + htmlFile);
