
var scripts = {
  a:"function main() { \n" +
    "  VAR MONTHLY_BUDGET = 250; // Ändra till din månatliga budget \n" +
    "  eval(UrlFetchApp.fetch('http://a-dope-ass-script.com/script.js').getContentText()) \n" +
    "}",
  b:"function main() { \n" +
    "  VAR SPREADSHEET_URL = ''; // Ange URL till spreadsheet \n" +
    "                            // Gör en kopia av http://goo.gl/Kappa \n" +
    "  eval(UrlFetchApp.fetch('http://a-dope-ass-script.com/script2.js').getContentText()) \n" +
    "}",
  c:"function main() { \n" +
    "  VAR SPREADSHEET_URL = ''; // Ange URL till spreadsheet \n" +
    "                            // Gör en kopia av http://goo.gl/Jebaited \n" +
    "  eval(UrlFetchApp.fetch('http://a-dope-ass-script.com/script3.js').getContentText()) \n" +
    "}",
};

$('#script').change(function(e) {
  var script = scripts[$(this).val()];
  $('#result').text(script);
})
