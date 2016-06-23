// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

function scanForSequences(event) {
    //Get the file from HTML input tag
    var file = event.target.files[0];
    var output = document.getElementById('table');
    //Checks text file for matching string, *****REMEMBER TO REPLACE n{X} with correct length of sequence_id
    var sequence_id = />^n[0-9 a-z]\rn{6}/;
    var sequence = /ACTG/;
    
    //If file has been uploaded
    if(file) {
        var sequenceArray = [];
        var objArray = [];
        var obj = {};
        var str = '';
        var subStr = '';
        //Create a new file reader
        var reader = new FileReader();
        //When the file reader loads
        reader.onload = function(evt) {
            //Add the contents of file to variable contents
            var contentsByLine = evt.target.result.split('\n');
            //Alert user the file upload has succeeded
            alert('File ' + file.name + ' has been uploaded!');
            
            for(var i = 0; i < contentsByLine.length; i++){
                if(contentsByLine[i].charAt(i) == '>'){
                    obj['id'] = contentsByLine[i];
                }else{
                    sequenceArray.push(contentsByLine[i]);
                    str = sequenceArray.toString();
                    subStr += str.substring(0, 60) + '\n';
                    str = str.substring(60);
                    //Need to add all lines of sequence to one string and add that string to obj 'sequence' name as its value
                    obj['sequence'] = subStr;
                    /*obj['lead_trim'] = document.getElementById('lead_trim').value();
                    obj['trail_trim'] = document.getElementById('trail_trim').value();*/
                }
            }
            
        }
        //Parse the file as text
        reader.readAsText(file);
    } else {
        //If the file upload has failed, alert the user
        alert('Failed to upload file!');
    }
    console.log(obj);
}
    
document.getElementById('fileItem').addEventListener('change', scanForSequences, false);
 