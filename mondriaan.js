var fs = require('fs')
var sys = require('sys')
var http = require('http');
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

var output = ""

fs.readFile('mondriaan.js','utf-8', function (err,data){
  data = data.
    replace(/\n/g,'').
    replace(/ /g,'').
    replace(/</g, '&lt;').
    replace(/'/g, '&#039;').
    replace(/"/g, '&quot;')

  rowlength = 1;
  rowloc = 1;

  for (i=0;i<data.length;i++) {
      output += data[i];

      if (rowloc == rowlength) {
          output += '</br>\n';
          rowloc = 0;
          if (i > data.length/2){
              rowlength -= 4;
          } else {
              rowlength += 4;
          }
          for (x=0;x<40-rowlength/2;x++){
              output += '&nbsp;';
          }
      }
      rowloc += 1;
  }
  sys.print(output);

  var server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("<html><head><style>body{font-family:monospace;}</style></head><body>"+output+"</body></html>");
  });
  server.listen(8666);
  exec("open http://localhost:8666", puts);
});



