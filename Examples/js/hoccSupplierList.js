(function() {

    const params = new URLSearchParams(
        window.location.search
      );
      const period = params.get("period"); // value1
      const costCentre = params.get("costCetre"); // value1
    
      console.log("Got params");
    // Create the connector object
    const myConnector = tableau.makeConnector();
    

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
       // tableau.log("Coucou");
        var cols = [{
            id: "customerName",
            alias: "Customer_Name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "customerNumber",
            alias: "Customer_Number",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "supplierName",
            alias: "Supplier_Name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "supplierNumber",
            alias: "Supplier_Number",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "journalLineDescription",
            alias: "Journal_Line_Description",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "purchasingHeaderDescription",
            alias: "Purchasing_Header_Description",
            dataType: tableau.dataTypeEnum.string

        }, {
            id: "poLineDescription",
            alias: "Po_Line_Description",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "uuid",
            alias: "UUID",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "Suppliers_List_dev",
            alias: "Hocc Suppliers List by period and CC from API",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };
    
    const URL = "https://api-dev.tesco.com/financialaccount/v1/glTransaction/pii?costCentre=" + costCentre + "&period=" + period + "/";
    const oldURL = "http://10.118.66.119/v1/glTransaction/pii?period=" + period + costCentre != Null? "&costCentre=" + costCentre : ""+"/";
    
    // Download the data
    myConnector.getData = function(table, doneCallback) {
        //$.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", function(resp) {
        $.getJSON("https://api-dev.tesco.com/financialaccount/v1/glTransaction/pii?period=3-21&costCentre=8182000", function(response) {
            console.log ("response",response)
            
            const dataset = response;
            let tableData = [];

            // Iterate over the JSON object
            
            for (let i = 0, len = dataset.length ; i < len; i++) {
                tableData.push({
                    "customerName": dataset[i].customerName,
                    "customerNumber": dataset[i].customerNumber,
                    "supplierName": dataset[i].supplierName,
                    "supplierNumber": dataset[i].supplierNumber,
                    "journalLineDescription": dataset[i].journalLineDescription,
                    "purchasingHeaderDescription": dataset[i].purchasingHeaderDescription,
                    "poLineDescription": dataset[i].poLineDescription,
                    "uuid": dataset[i].uuid
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
       setTimeout(function () {
        tableau.connectionName = "Hocc DS List API dev"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
       }, 5000);
});
})();
