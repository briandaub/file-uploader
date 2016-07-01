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
            }
            
            
            // John Resig - http://ejohn.org/ - MIT Licensed
            (function () {
                var cache = {};
                this.tmpl = function tmpl(str, data) {
                  // Figure out if we're getting a template, or if we need to
                  // load the template - and be sure to cache the result.
                  // RegExp - Match any non word character in a str ('%' in '50%')
                  var fn = !/\W/.test(str) ?
                      cache[str] = cache[str] ||
                      tmpl(document.getElementById(str).innerHTML) :
                    // Generate a reusable function that will serve as a template
                    // generator (and which will be cached).
                    new Function("obj",
                        "var p=[],print=function(){p.push.apply(p,arguments);};" +
                        // Introduce the data as local variables using with(){}
                        "with(obj){p.push('" +
                        // Convert the template into pure JavaScript
                          str
                              .replace(/[\r\t\n]/g, " ")
                              .split("<%").join("\t")
                              .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                              .replace(/\t=(.*?)%>/g, "',$1,'")
                              .split("\t").join("');")
                              .split("%>").join("p.push('")
                              .split("\r").join("\\'") + "');}return p.join('');");
                  // Provide some basic currying to the user
                  return data ? fn(data) : fn;
                };
            })();
            
            var columns = [
              /*{id: "id", name: "ID", field: "id", behavior: "select", cssClass: "cell-selection", width: 100, cannotTriggerInsert: true, resizable: false, selectable: false },*/
              {id: "sequence", name: "Sequence", field: "sequence", width: 1124, minWidth: 680, cssClass: "cell-title", formatter: renderCell, /*validator: requiredFieldValidator,*/ sortable: false},
              {id: "lead_trim", name: "Leading Trim", field: "Leading Trim", width: 150, minWidth: 150, editor: Slick.Editors.Text, sortable: false},
              {id: "trail_trim", name: "Trailing Trim", field: "Trailing Trim", width: 150, minWidth: 150, editor: Slick.Editors.Text, sortable: false}``
            ];

            var options = {
              editable: true,
              enableAddRow: false,
              enableCellNavigation: true,
              asyncEditorLoading: true,
              forceFitColumns: false,
              topPanelHeight: 45
            }; 

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
            
            var compiled_template = tmpl("cell_template");
            
            function renderCell(row, cell, value, columnDef, dataContext) {
                return compiled_template(dataContext);
            }
            
            for (var i = 0; i < objArray.length; i++) {
                var d = (data[i] = {});
                objArray[i]['sequence'] = objArray[i]['id'] + '\n' + objArray[i]['sequenceArray'].join('\n');
                
                d['id'] = objArray[i]['id'];
                d['sequence'] = '<textarea>' + objArray[i]['sequence'] + '</textarea>';
                d['lead_trim'] = '<input type="text" id="lead_trim" value="0">';
                d['trail_trim'] = '<input type="text" id="trail_trim" value="0">'; 
            }

            dataView.setItems(data);
            dataView.getItems();
        }
        reader.readAsText(file);
    } else {
        alert('Failed to upload file!');
    }

}
    
document.getElementById('fileItem').addEventListener('change', parse, false);



 