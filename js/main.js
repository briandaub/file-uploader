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
    
    //If file has been uploaded
    if(file) {
        //Create a new file reader
        var reader = new FileReader();
        //When the file reader loads
        reader.onload = function(evt) {
            //Add the contents of file to variable contents
            var contents = evt.target.result;
            //Alert user the file upload has succeeded
            alert('File ' + file.name + ' has been uploaded!');
            
            var array = [];
            for(var i = 0; i < contents.length; i++){
                if(contents.charAt(i) == ">" && contents.charAt(i) == )
                array.push(contents.charAt(i));
                console.log(array);
            }
        }
        //Parse the file as text
        reader.readAsText(file);
    } else {
        //If the file upload has failed, alert the user
        alert('Failed to upload file!');
    }
}
    
document.getElementById('fileItem').addEventListener('change', scanForSequences, false);
 