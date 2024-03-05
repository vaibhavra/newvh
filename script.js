// JavaScript code for adding, deleting, saving, and calculating rows dynamically
const inputRows = document.getElementById('inputRows');
const rowDataArray = []; // Array to store data of each row
let obj1 = {};

// Global variables to store calculated values
let expectedPIDValue = 0;
let bendsTeesReducerValue = 0;
let totalEquipmentsPIDValue = 0;
let valvesPIDValue = 0;
let lineSegmentsValue = 0;

// Flag to track if all rows have been saved

let allRowsSaved = false;
// let projectDataSaved = false;

// Flag to track if rows have been added
let rowsAdded = false;


// Function to add rows dynamically
function addRow() {
    
    const rowCount = inputRows.children.length;
    const srNo = rowCount + 1;
    const row = `
        <tr>
            <td>${srNo}</td>
            <td><input type="text" name="siteName[]" required></td>
            <td><input type="number" name="lineCounts[]" required min="0" onchange="calculateRow(this)"></td>
            <td><input type="number" name="expectedPID[]" ></td>
            <td><input type="number" name="bendsTeesReducer[]" ></td>
            <td><input type="number" name="totalEquipmentsPID[]" ></td>
            <td><input type="number" name="valvesPID[]" ></td>
            <td><input type="number" name="lineSegments[]" ></td>
            <td>
                <button type="button" class="btn btn-danger" onclick="deleteRow(this)">Delete</button>
            </td>
        </tr>
        
    `;

    inputRows.insertAdjacentHTML('beforeend', row);
    rowsAdded = true;
}

// Function to delete row
function deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);

    // Rearrange Sr No
    const rows = inputRows.children;
    for (let i = 0; i < rows.length; i++) {
        rows[i].children[0].textContent = i + 1;
    }
}


// Function to save row
function saveRow(btn,e) {
    // Check if rows have been added
    var formData = new FormData(document.getElementById('pipingForm'));
    console.log(formData,'formData')
    var formDataJson = {};
    formData.forEach(function(value, key){
        formDataJson[key] = value;
    });

    console.log(formDataJson);
    console.log(e.target.value,'event')
    if (!rowsAdded) {
        alert("Add rows first!");
        return; // Exit the function if rows have not been added
    }

    const newData =[];
    let emptyFieldFound = false;
debugger
    // Iterate over input fields in the row
    // inputs.forEach(input => {
    //     const value = input.value.trim();
    //     if (!value) {
    //         input.classList.add('empty-field'); // Add class to empty fields
    //         emptyFieldFound = true; // Set flag if empty field is found
    //     } else {
    //         input.classList.remove('empty-field'); // Remove class from filled fields
    //     }
    // });

    // // Check if any field is empty
    // if (emptyFieldFound) {
    //     alert("Fill all fields in the row first!");
    //     return; // Exit the function if any field is empty
    // }

    // If all fields are filled, proceed to save row
    const row = btn.parentNode.parentNode;
    const inputs = row.querySelectorAll('input');
    const rowData = Array.from(inputs).map(input => input.value.trim());
    alert('Saved Row Data:\n' + rowData.join('\n'));

    // Mark row as saved
    row.dataset.saved = true;
    // const row = btn.parentNode.parentNode;
    // const inputs = row.querySelectorAll('input');
     // Push row data into the rowDataArray
     rowDataArray.push()
    rowDataArray.push(rowData);
    


    // Update global variables
    expectedPIDValue = rowDataArray.reduce((total, data) => total + parseInt(data[2]), 0);
    console.log(rowDataArray,'Array')
    console.log(expectedPIDValue,'expected');
    bendsTeesReducerValue = rowDataArray.reduce((total, data) => total + parseInt(data[3]), 0);
    totalEquipmentsPIDValue = rowDataArray.reduce((total, data) => total + parseInt(data[4]), 0);
    valvesPIDValue = rowDataArray.reduce((total, data) => total + parseInt(data[5]), 0);
    lineSegmentsValue = rowDataArray.reduce((total, data) => total + parseInt(data[6]), 0);

    // Calculate obj1 properties using global variables
    const obj1 = {
        effortsForVolumeCreation: bendsTeesReducerValue + totalEquipmentsPIDValue + valvesPIDValue + lineSegmentsValue,
        effortsForCentrelineCreation: lineSegmentsValue,
        creationOfLineList: lineSegmentsValue,
        effortsFor3DMarkups: lineSegmentsValue,
        effortsFor3DModelling: lineSegmentsValue + bendsTeesReducerValue,
        effortsForEquipmentDevelopment: totalEquipmentsPIDValue,
        adminSetupAndProposal: 60,
        plotPlan: lineCounts,
        equipmentLayouts: totalEquipmentsPIDValue,
        pAndID: totalEquipmentsPIDValue,
        pfd: 1,
        pipingIsometrics: lineCounts,
        bulkMTO: lineCounts,
        equipmentTagging: totalEquipmentsPIDValue,
        nozzleOrientations: totalEquipmentsPIDValue
    };

    // Use obj1 for further calculations or operations
    console.log(obj1);
    return obj1;
}



// new function by vaibhav
function saveRow1(buttonElement, event) {
    event.preventDefault(); // Prevent form submission
    const rows = inputRows.querySelectorAll('tr');
    rowDataArray.length = 0; // Clear the array before saving new data
    console.log(rows,'ss')
    rows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        const rowData = {
            siteName: inputs[0].value,
            lineCounts: parseInt(inputs[1].value),
            expectedPID: parseInt(inputs[2].value),
            bendsTeesReducer: parseInt(inputs[3].value),
            totalEquipmentsPID: parseInt(inputs[4].value),
            valvesPID: parseInt(inputs[5].value),
            lineSegments: parseInt(inputs[6].value)
        };
        rowDataArray.push(rowData);
    });

    // Optionally, you can log the saved data to verify
    console.log(rowDataArray,'Arrat');
    const form = document.getElementById('pipingForm');
    const formData = new FormData(form);

    // Convert FormData to JSON object
    const formDataJson = {};
    formData.forEach((value, key) => {
        formDataJson[key] = value;
    });

    console.log(formDataJson); // For demonstration, logs formDataJson to console

    // You can do further processing with the form data here

    const row = buttonElement.parentNode.parentNode;
    const inputs = row.querySelectorAll('input');
    var table = document.getElementById("inputRows");
    debugger
    var rowData = [];
    for (var i = 0; i < table.rows[0].cells.length - 1; i++) {
        var value = table.rows[table.rows.length - 1].cells[i].querySelectorAll("input").value;
        rowData.push(value);
    }
    console.log("Saved project data:", rowData);
    
    // console.log(data)
}
// End


// Function to check if all rows have been saved
// function checkAllRowsSaved() {
//     const allRows = document.querySelectorAll('#inputRows tr');
//     allRowsSaved = Array.from(allRows).every(row => row.dataset.saved === "true");
// }




function calculateRow(input) {
    const row = input.parentNode.parentNode;
    const lineCounts = parseInt(input.value);
    if (!isNaN(lineCounts)) {
        const expectedPID = Math.ceil(lineCounts / 2);
        const bendsTeesReducer = lineCounts * 6;
        const totalEquipmentsPID = Math.ceil(lineCounts * 0.4);
        const valvesPID = lineCounts * 3;
        const lineSegments = lineCounts + (lineCounts * 6) + (lineCounts * 3) ;

        // Update input values
        row.querySelector('input[name="expectedPID[]"]').value = expectedPID;
        row.querySelector('input[name="bendsTeesReducer[]"]').value = bendsTeesReducer;
        row.querySelector('input[name="totalEquipmentsPID[]"]').value = totalEquipmentsPID;
        row.querySelector('input[name="valvesPID[]"]').value = valvesPID;
        row.querySelector('input[name="lineSegments[]"]').value = lineSegments;
       
        console.log(calculateRow);
        // Return calculated values

        // return obj1 = {
        //     effortsForVolumeCreation:bendsTeesReducer + totalEquipmentsPID + valvesPID + lineSegments,
        //     effortsForCentrelineCreation: lineSegments,
        //     creationOfLineList: lineSegments,
        //     effortsFor3DMarkups: lineSegments,
        //     effortsFor3DModelling: lineSegments + bendsTeesReducer,
        //     effortsForEquipmentDevelopment: totalEquipmentsPID,
        //     adminSetupAndProposal: 60,
        //     plotPlan: lineCounts,
        //     equipmentLayouts: totalEquipmentsPID,
        //     pAndID: totalEquipmentsPID,
        //     pfd: 1,
        //     pipingIsometrics: lineCounts,
        //     bulkMTO: lineCounts,
        //     equipmentTagging: totalEquipmentsPID,
        //     nozzleOrientations: totalEquipmentsPID
        // };
       
    }
}



// Updated CODE
function selectRequiredDeliverables() {
    console.log(rowDataArray);
// Check if all rows have been saved
if (!rowsAdded) {
    alert('Please Add and Save The Project First');
    return;
}



    const deliverables = [
        'Inspection Isometrics', 'Plot Plan', '3d Model (.dwg)', '3d Model (.nwd)', 'P&ID Updation', 
        'P&ID Markups', 'P&ID (New) Creation', 'PFD', 'Equipment / Component Tagging', 
        'Bill Of Material', 'Equipment Layout', 'Piping Layout'
    ];

    const container = document.getElementById('deliverablesContainer');
    container.innerHTML = '';

    // Create header for deliverables
    const deliverablesHeader = document.createElement('h1');
    deliverablesHeader.textContent = 'Select Deliverables';
    container.appendChild(deliverablesHeader);

    // Populate deliverables
    deliverables.forEach((deliverable, index) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `deliverable-${index + 1}`;

        const label = document.createElement('label');
        label.htmlFor = `deliverable-${index + 1}`;
        label.textContent = deliverable;

        const div = document.createElement('div');
        div.classList.add('checkbox-container');
        div.appendChild(checkbox);
        div.appendChild(label);

        container.appendChild(div);
    });

    // Create dropdowns container
    const dropdownContainer = document.getElementById('dropdownContainer');
    dropdownContainer.innerHTML = '';

    // Create header for dropdowns
    const dropdownsHeader = document.createElement('h1');
    dropdownsHeader.textContent = 'Modelling Confirmations';
    dropdownContainer.appendChild(dropdownsHeader);

    // Create dropdown elements
    const dropdowns = [
        { name: '1) LOD of Modelling', options: ['LOD 100', 'LOD 200', 'LOD 300', 'LOD 400', 'LOD 500'] },
        { name: '2) Pipe Support', options: ['Primary', 'Secondary', 'Primary + Secondary', 'Out of Scope'] },
        { name: '3) Equipment Modelling', options: ['Yes', 'No', '50%'] },
        { name: '4) Specification Sheet', options: ['Yes', 'No'] }
    ];

    dropdowns.forEach(dropdown => {
        const dropdownDiv = document.createElement('div');
        dropdownDiv.classList.add('input-row'); // Add class for styling

        const dropdownLabel = document.createElement('label');
        dropdownLabel.textContent = dropdown.name;

        const select = document.createElement('select');
        dropdown.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });

        dropdownDiv.appendChild(dropdownLabel);
        dropdownDiv.appendChild(select);

        dropdownContainer.appendChild(dropdownDiv);
    });

    // Create form for input boxes

    
    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');

    const inputFields = ['Expected Count of Scans', 'Expected Count of ISO', 'Expected Count of P&ID for Updation'];

  
inputFields.forEach(input => {
    const inputDiv = document.createElement('div');
    inputDiv.classList.add('input-row'); // Add class for styling

    const label = document.createElement('label');
    label.textContent = input;

    const inputBox = document.createElement('input');
    inputBox.type = 'number';
    inputBox.classList.add('small-input'); // Add class for styling

    inputDiv.appendChild(label);
    inputDiv.appendChild(inputBox);

    formContainer.appendChild(inputDiv);
});

dropdownContainer.appendChild(formContainer);

const deliverableSection = document.getElementById('deliverableSection');
    deliverableSection.scrollIntoView({ behavior: 'smooth' });

}

//********************

// Flag to track if "Select Required Deliverables" button is clicked
let deliverablesButtonClicked = false;
let totalHoursCalculated = false;

// Floating Form for input to the calculate total hours button

// Function to generate the floating form table
function generateFloatingFormTable() {
        
    // Check if "Select Required Deliverables" button is clicked
    if (!deliverablesButtonClicked) {
        alert('Please click the "Select Required Deliverables" button first.');
        return;
    }



    const floatingFormContainer = document.createElement('div');
    floatingFormContainer.classList.add('floating-form-container');

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const tfoot = document.createElement('tfoot');

     // Table headers
     
     thead.innerHTML = `
     
     <tr>
         <th rowspan="2" style="text-align: center;">Sr No</th>
         <th rowspan="2" style="text-align: center;">Item Name</th>
         <th rowspan="2" style="text-align: center;">Category of Item name</th>
         <th colspan="2" style="text-align: center;">Time required for single item</th>
     </tr>
     <tr>
         <th style="text-align: center;">Value</th>
         <th style="text-align: center;">Unit</th>
     </tr>
 `;

 // Predefined names and default values for each row
 const itemData = [
     { name: 'Efforts for Volume Creation', category: 'Pipe Modelling Section', defaultTime: 10 },
     { name: 'Efforts for Centreline Creation', category: 'Pipe Modelling Section', defaultTime: 10 },
     { name: 'Creation of Line List', category: 'Pipe Modelling Section', defaultTime: 15 },
     { name: 'Efforts for 3D Markups', category: 'Pipe Modelling Section', defaultTime: 10 },
     { name: 'Efforts for 3d modelling', category: 'Pipe Modelling Section', defaultTime: 20 },
     { name: 'Efforts for Equipment Development', category: 'Equipment Modelling', defaultTime: 120 },
     { name: 'Admin Setup & Proposal', category: 'Admin Setup & Proposal', defaultTime: 30 },
     { name: 'Plot Plan', category: 'Deliverables Section', defaultTime: 180 },
     { name: 'Equipment Layouts', category: 'Deliverables Section', defaultTime: 60 },
     { name: 'P&ID', category: 'Deliverables Section', defaultTime: 180 },
     { name: 'PFD', category: 'Deliverables Section', defaultTime: 45 },
     { name: 'Piping Isometrics', category: 'Deliverables Section', defaultTime: 180 },
     { name: 'Bulk MTO', category: 'Deliverables Section', defaultTime: 20 },
     { name: 'EquipmentTagging', category: 'Deliverables Section', defaultTime: 10 },
     { name: 'Nozzle Orientations', category: 'Deliverables Section', defaultTime: 10 },
     // Add more rows as needed with their respective default values
 ];
     



 // Table rows with predefined names, categories, and default values
 itemData.forEach((item, index) => {
     const row = `
         <tr>
             <td style="text-align: center;">${index + 1}</td>
             <td>${item.name}</td>
             <td>${item.category}</td>
             <td><input type="text" value="${item.defaultTime}" data-default-time="${item.defaultTime}"></td>
             <td style="text-align: center;">min</td>
         </tr>
     `;
     tbody.innerHTML += row;
 });


    // Submit button
    tfoot.innerHTML = `
        <tr>
            <td colspan="5"><button type="button" onclick="submitFloatingForm()">Submit</button></td>
        </tr>
    `;

    table.appendChild(thead);
    table.appendChild(tbody);
    table.appendChild(tfoot);

    floatingFormContainer.appendChild(table);

    document.body.appendChild(floatingFormContainer);

    // Adjust the position and dimensions of the floating form container
    floatingFormContainer.style.position = 'fixed';
    floatingFormContainer.style.top = '20%';
    floatingFormContainer.style.left = '30%';
    floatingFormContainer.style.width = '40%';
    floatingFormContainer.style.height = '70%';
    floatingFormContainer.style.backgroundColor = '#f2f2f2';
    floatingFormContainer.style.border = '1px solid black';
    floatingFormContainer.style.padding = '10px';
    floatingFormContainer.style.zIndex = '999';
    floatingFormContainer.style.overflow = 'auto';

    return newData = itemData;
}

// Function to update default time values
function updateDefaultTime(input, index) {
    const newValue = parseInt(input.value);
    if (!isNaN(newValue)) {
        itemData[index].defaultTime = newValue;
    }
}
// Event listener for the "Select Required Deliverables" button
document.addEventListener('DOMContentLoaded', function() {
    const selectDeliverablesButton = document.querySelector('.btn-select');
    selectDeliverablesButton.addEventListener('click', function() {
        deliverablesButtonClicked = true;
    });
});




// // Event listener for the "Select Required Deliverables" button
// const selectDeliverablesButton = document.querySelector('.btn-select-deliverables');
// selectDeliverablesButton.addEventListener('click', function() {
//     deliverablesButtonClicked = true;
// });


// Function to submit the floating form
function submitFloatingForm() {


    console.log(obj1,'obj');
    

    // console.log(pipeModelling, 'pipeM');
    // Logic to handle form submission
    // This is where you can further execute the logic for "Efforts for Overall Project Execution"
    // Once the submission is complete, you can remove or hide the floating form container
    const floatingFormContainer = document.querySelector('.floating-form-container');
    floatingFormContainer.remove();

    // Call the function to populate the "Efforts for Overall Project Execution" table
    populateEffortsTable();

    
}



// Function to populate the "Efforts for Overall Project Execution" table
function populateEffortsTable() {

    
      // Get data from the first table (pipingForm)
    const pipingFormRows = document.querySelectorAll('#pipingForm tbody tr');
  

    // Create table HTML with headers
    let tableHTML = `
        <table>
            <caption><h2> Efforts for Overall Project Execution </h2></caption>
            <thead>
                <tr>
                    <th>Sr No</th>
                    <th>Site Name</th>
                    <th>Efforts for Pipe Modeling</th>
                    <th>Efforts for Equipment Modelling</th>
                    <th>Efforts for Admin Setup & Proposal</th>
                    <th>Efforts for Deliverables</th>
                    <th>Total efforts in Hours</th>
                </tr>
            </thead>
            <tbody>
    `;

    

    // Iterate over rows in the first table and populate the new table
        pipingFormRows.forEach((row, index) => {
        const siteName = row.querySelector('input[name="siteName[]"]').value;
        const lineCounts = parseInt(row.querySelector('input[name="lineCounts[]"]').value);
        const calculatedValues = calculateRow(row.querySelector('input[name="lineCounts[]"]'));



        const inputValues = [];
        console.log(newData,'itemData');
         const pipeModelling = ((obj1.effortsForVolumeCreation)*newData[0].defaultTime  + (obj1.effortsForCentrelineCreation)*newData[1].defaultTime + (obj1.creationOfLineList)*newData[2].defaultTime + (obj1.effortsFor3DMarkups)*newData[3].defaultTime + (obj1.effortsFor3DModelling)*newData[4].defaultTime)/60;
         const equipmentModelling = (obj1.effortsForEquipmentDevelopment*newData[5].defaultTime)/60;
         const adminSetupAndProposalTotal = (obj1.adminSetupAndProposal*newData[6].defaultTime)/60;
         const deliverables = ((obj1.plotPlan)*newData[7].defaultTime + (obj1.equipmentLayouts)*newData[8].defaultTime + (obj1.pAndID)*newData[9].defaultTime + (obj1.pfd)*newData[10].defaultTime + (obj1.pipingIsometrics)*newData[11].defaultTime + (obj1.bulkMTO)*newData[12].defaultTime + (obj1.equipmentTagging)*newData[13].defaultTime  + (obj1.nozzleOrientations)*newData[14].defaultTime)/60 ;
         const totalEfforts = pipeModelling + equipmentModelling +adminSetupAndProposalTotal + deliverables;
     
       
     

        tableHTML += `
        <tr>
        <td>${index + 1}</td>
        <td>${siteName}</td>
        <td>${pipeModelling.toFixed(2)}</td>
        <td>${equipmentModelling.toFixed(2)}</td>
        <td>${adminSetupAndProposalTotal.toFixed(2)}</td>
        <td>${deliverables.toFixed(2)}</td>
        <td>${totalEfforts.toFixed(2)} hours</td>
    </tr>
        `;
    });
       
   

    // Close table HTML
    tableHTML += `
            </tbody>
        </table>
    `;

    
    // Append the table to the section with ID "totalHoursSection"
    const totalHoursSection = document.getElementById('totalHoursSection');
    totalHoursSection.innerHTML = tableHTML;

    // Scroll to the section with ID "totalHoursSection"
    totalHoursSection.scrollIntoView({ behavior: 'smooth' });

    totalHoursCalculated= true;
}

// // Event listener for the "Calculate Total Hours" button
// const calculateTotalHoursButton = document.querySelector('.btn-calculate');
// calculateTotalHoursButton.addEventListener('click', generateFloatingFormTable);
document.addEventListener('DOMContentLoaded', function() {
    const calculateTotalHoursButton = document.querySelector('.btn-calculate');
    calculateTotalHoursButton.addEventListener('click', generateFloatingFormTable);
});






// *********TO DISPLAY PDF DOCUMENT*********

// function generateEstimate(){
//     if (!totalHoursCalculated) {
//         alert("First calculate total hours of the project .");
//         return;
//     }

//     const element = document.getElementById('pdfPreview');
     
//     // Options for pdf generation
//     const options = {
//       margin: 0.5,
//       filename: 'converted_document.pdf',
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//     };
   
//     // Generate PDF
//     html2pdf().from(element).set(options).save()


// }
function generateEstimate() {
    if (!totalHoursCalculated) {
        alert("First calculate total hours of the project.");
        return;
    }

    // Get data for PDF content
    const siteData = []; // Array to store site-specific data

    // Iterate over site data to populate siteData array with required information
    // For example:
    // siteData.push({ siteName: 'Site A', lineCounts: 100, totalHours: 50, hourlyRate: 10 });

    // Company and client names
    const companyName = "Your Company Name";
    const clientName = "Client Company Name";

    // Generate HTML content for PDF
    const htmlContent = `
        <html>
        <head>
            <title>Estimation Report</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                }
                header, footer {
                    padding: 10px;
                    background-color: #f0f0f0;
                    text-align: center;
                }
                footer {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                }
                main {
                    padding: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                }
                th {
                    background-color: #f2f2f2;
                }
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <header>
                <div>${companyName}</div>
                <div>${clientName}</div>
            </header>
            <main>
                <h1>Estimation Report</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Site Name</th>
                            <th>Line Counts</th>
                            <th>Total Hours</th>
                            <th>Hourly Rate</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${siteData.map(data => `
                            <tr>
                                <td>${data.siteName}</td>
                                <td>${data.lineCounts}</td>
                                <td>${data.totalHours}</td>
                                <td>${data.hourlyRate}</td>
                                <td>${data.totalHours * data.hourlyRate}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </main>
            <footer>
                <div>Footer content goes here</div>
            </footer>
        </body>
        </html>
    `;

    // Convert HTML content to PDF
    html2pdf().from(htmlContent).set({
        margin: 1,
        filename: 'Estimation_Report.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).save();
}
