(function() {
    console.log("Coucou");
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
       // tableau.log("Coucou");
        var cols = [{
            id: "costCentre",
            alias: "CC_code",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "function",
            alias: "function",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "subFunction",
            alias: "sub_function",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "reportView",
            alias: "report_view",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "day",
            alias: "publish_day",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "recipient",
            alias: "recipient_name",
            dataType: tableau.dataTypeEnum.string

        }, {
            id: "email",
            alias: "email",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "DS_List_dev",
            alias: "Hocc Distribution file from API",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        //$.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", function(resp) {
        $.getJSON("http://10.118.66.119/v1/dataDistribution/distributionList/", function(response) {
            console.log ("response",response)
            
            var dataset = response,
                tableData = [];

            // Iterate over the JSON object
            
            for (var i = 0, len = dataset.length ; i < len; i++) {
                tableData.push({
                    "function": dataset[i].function,
                    "subFunction": dataset[i].subfunction,
                    "reportView": dataset[i].reportView,
                    "costCentre": dataset[i].costCentre,
                    "day": dataset[i].day,
                    "recipient": dataset[i].recipient,
                    "email": dataset[i].email
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
       $("#submitButton").click(function() {
            tableau.connectionName = "Hocc DS List API dev"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
       });
       setTimeout(function () {
        tableau.connectionName = "Hocc DS List API dev"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
       }, 10000);
});
})();
