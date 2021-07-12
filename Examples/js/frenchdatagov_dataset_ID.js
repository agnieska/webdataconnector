(function() {

    const params = new URLSearchParams(
        window.location.search
      );
      const id = params.get("id"); // value1
    // console.log("Coucou");
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
       // tableau.log("Coucou");
        var cols = [{
            id: "id",
            alias: "dataset_id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "frequency",
            alias: "frequency",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "title",
            alias: "title",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "license",
            alias: "license",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "datagovFR_List",
            alias: "Liste datasets french open data",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {



        //$.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", function(resp) {
        $.getJSON("https://www.data.gouv.fr/api/1/datasets/" + id +"/", function(resp) {
            var dataset = resp,
                tableData = [];

            // Iterate over the JSON object
            //for (var i = 0, len = datasets.length ; i < len; i++) {
                tableData.push({
                    "id": dataset.id,
                    "frequency": dataset.frequency,
                    "title": dataset.title,
                    "license": dataset.license
                });
            //}

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "French open data List"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
