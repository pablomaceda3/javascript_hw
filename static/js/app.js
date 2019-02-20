// from data.js
var tableData = data;
var tbody = d3.select('tbody');

// Function that's called to convert a list of objects
// into an html table
function pushTableToSite(listOfData) {
    listOfData.forEach(item => {
        var row = tbody.append('tr');
        Object.entries(item).forEach(([key,value]) => {
            var cell = tbody.append('td');
            cell.text(value);
        });
    });
};


// Clears current table. Would have used .html = '', 
// but read somewhere that while loop is faster when 
// you have a lot of data. 
function clearTable() {
    var tableNode = document.getElementById("table");
    while (tableNode.firstChild) {
        tableNode.removeChild(tableNode.firstChild);
    }   
}   

// button variable for event handling
var button = d3.select('#filter-btn');

// Event that occurs when button is clicked.
// Should filter the data and return a list of 
// objects based on the dropdown value and 
// input value, and then push this data to 
// the site. Also clears current table before
// adding new table to site. 
button.on("click", function() {
    // prevent page from refreshing
    d3.event.preventDefault();

    // remove all table data
    clearTable();

    // Grab input value and dropdown value from 
    // html user interface.
    var inputValue = d3.select("#search-criteria").property('value');

    // Change inputValue to lowercase because
    // all data is in lowercase
    inputValue = inputValue.toLowerCase();
    var dropDownValue = d3.select('#dropdown').property('value');
    var filteredData = filterDropDownInput(dropDownValue, inputValue)

    // Pushes filtered data to website. 
    pushTableToSite(filteredData);
})
 

// function that takes the dropdown value and
// input value, and filters table data based on
// these values. Returns data, a list of objects.
function filterDropDownInput(dropDownValue, inputValue) {
    var newData = [];        

    // objIterator iterates through list
    // of objects named tableData
    for (var objIterator in tableData) {
            // obj variable contains current object
           var obj = tableData[objIterator];

           // for ever key in current object, 
           // checks current key and value under key
           // to see if matches selection.
           for (var key in obj) {
                  if(key === dropDownValue && obj[key] === inputValue)
                    newData.push(obj);
                }
            }
    
    // return used here because you're setting this function
    // equal to a variable.
    return newData
}
