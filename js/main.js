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
                        sequence: [],
                        lead_trim: 0,
                        trail_trim: 0
                    };
                    objArray.push(obj);
                }else{
                    obj.sequence.push(contentsByLine[i]);
                }
               // console.log(objArray[i]['sequence']);
            }
            

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
            
            for (var i in objArray){;
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



 