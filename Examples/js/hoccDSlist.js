(function () {
    //async function call() {
    const params = new URLSearchParams(
        window.location.search
    );
    const limit = params.get("limit"); // value1

    console.log("Coucou params");
    // Create the connector object
    const myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function (schemaCallback) {
        tableau.log("Coucou get schema");
        let cols = [{
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
        }, {
            id: "uuid",
            alias: "UUID",
            dataType: tableau.dataTypeEnum.string
        }];

        let tableSchema = {
            id: "DS_List_dev",
            alias: "Hocc Distribution file from API",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };
    const URL = "https://api-dev.tesco.com/financialaccount/v1/distributionList"
    const oldURL = "http://10.118.66.119/v1/dataDistribution/distributionList/"

    // Download the data
    myConnector.getData = function (table, doneCallback) {
        console.log("Coucou get data");
        //$.getJSON("http://10.118.66.119/v1/dataDistribution/distributionList/", function(resp) {
        //$.getJSON("https://api-dev.tesco.com/financialaccount/v1/distributionList", function(response) {

        $.ajax({
            beforeSend: function (request) {
                request.setRequestHeader("x-api-key", "TODO");
                //request.setRequestHeader("x-api-key", "TODO");
            },
            dataType: "json",
            url: URL,
            success: function (response) {
                //const response = await fetch(URL, {headers: {"x-api-key": "TODO"}})
                console.log("response", response)


                const dataset = response;
                let tableData = [];

                // Fix the limit if not take all
                let len = limit != "" ? limit : dataset.length;

                // Iterate over the JSON object
                for (let i = 0; i < len; i++) {
                    tableData.push({
                        "function": dataset[i].function,
                        "subFunction": dataset[i].subfunction,
                        "reportView": dataset[i].reportView,
                        "costCentre": dataset[i].costCentre,
                        "day": dataset[i].day,
                        "recipient": dataset[i].recipient,
                        "email": dataset[i].email,
                        "uuid": dataset[i].uuid
                    });
                }

                table.appendRows(tableData);
                doneCallback();
                /*
                } else if (response.status >= 400 && response.status < 500) {
                    //$("#SN").text("Result not found for uuid: ")
                    console.log ("DS file not found")
        
                } else {
                    //$("#SN").text(" error " + response.status + " " + response.statusText)
                    //$("#SC").text(await response.text())
                    console.log ("error " + response.status + " " + response.statusText)
                    console.log(response.text())
                }*/
            }
        });
    }

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function () {
        console.log("Coucou avant set time out");
        setTimeout(function () {
            tableau.connectionName = "Hocc DS List API dev"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        }, 5000);
    });
})()