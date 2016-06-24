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
            
            for(var i in contentsByLine){
                sequenceArray.push(contentsByLine[i]);
                for(var j in sequenceArray){
                    if(sequenceArray[j].charAt(0) == '>'){
                        obj.id = sequenceArray[j];
                    }else{
                        obj.sequence = sequenceArray[j];
                        obj.lead_trim = 0;
                        obj.trail_trim = 0;
                    }
                    objArray.push(obj);
                }
            } 
            console.log(objArray);
        }
        reader.readAsText(file);
    } else {
        alert('Failed to upload file!');
    }
}
    
document.getElementById('fileItem').addEventListener('change', scanForSequences, false);
 