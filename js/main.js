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
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    
    if(file) {
        var sequenceArray = [];
        var objArray = [];
        var obj = {};
        
        
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
                    obj.id = contentsByLine[i];
                }else{
                    sequenceArray.push(contentsByLine[i]);
                    obj.sequence = sequenceArray;
                    obj.lead_trim = 0;
                    obj.trail_trim = 0;
                }
                objArray.push({obj});
                console.log(objArray);
                //console.log(sequenceArray[i].length);
            }
            
        }
        reader.readAsText(file);
    } else {
        alert('Failed to upload file!');
    }
}
    
document.getElementById('fileItem').addEventListener('change', scanForSequences, false);
 