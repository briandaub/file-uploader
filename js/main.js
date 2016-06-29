// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

var objArray = [];
var obj;

function parse(event) {
    //Get the file from HTML input tag
    var file = event.target.files[0];

    if(file) {
        
        //Create a new file reader
        var reader = new FileReader();
        //When the file reader loads
        reader.onload = function(evt) {
            //Add the contents of file to variable contents
            var contentsByLine = evt.target.result.split('\n'); 
            //Alert user the file upload has succeeded
            console.log('File ' + file.name + ' was successfully loaded.');

            for(var i in contentsByLine){
                if(contentsByLine[i][0] == '>'){
                    obj = {
                        id: contentsByLine[i],
                        sequenceArray: [],
                        lead_trim: 0,
                        trail_trim: 0
                    };
                    objArray.push(obj);
                }else{
                    obj.sequenceArray.push(contentsByLine[i]);
                }
               // console.log(objArray[i]['sequence']);
            }
            console.log(objArray)

            // Create the DataView.
            var dataView = new Slick.Data.DataView();

            // Pass it as a data provider to SlickGrid.
            var grid = new Slick.Grid("#table", dataView, columns, options);

            // Make the grid respond to DataView change events.
            dataView.onRowCountChanged.subscribe(function (e, args) {
              grid.updateRowCount();
              grid.render();
            });

            dataView.onRowsChanged.subscribe(function (e, args) {
              grid.invalidateRows(args.rows);
              grid.render();
            });
            
            var data = [];
            var result;
            
            for (var i = 0; i < objArray.length; i++) {
                objArray[i]['sequence'] = objArray[i]['id'] + '\n' + objArray[i]['sequenceArray'].join('');
                data.push(objArray[i]);
            }

            dataView.setItems(data);
            dataView.getItems();
            //console.log(data);
        }
        reader.readAsText(file);
    } else {
        alert('Failed to upload file!');
    }

}
    
document.getElementById('fileItem').addEventListener('change', parse, false);



 