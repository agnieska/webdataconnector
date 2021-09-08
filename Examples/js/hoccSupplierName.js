
window.addEventListener("DOMContentLoaded", function(){

    const mylist = ["Air France", "British Airways", "Bombay Catering", "Standford University", "Coca-Cola", "Microsoft Trainings", "Google Trainings", "Afghan Railways"];
    console.log(mylist)
    const value = mylist[Math.floor(Math.random() * mylist.length)];
    console.log(value)
    $("#SN").text(value.toString())
})


/*
async function call() {

    



    //const pathname = window.location.pathname.split("/");
    //const id = pathname[pathname.length -1]
    


    const params = new URLSearchParams(
        window.location.search
    );
    const uuid = params.get("uuid");
    console.log("uuid", uuid)

    
    const URL = "https://api-dev.tesco.com/financialaccount/v1/glTransaction/pii/" + uuid;
    const response = await fetch(URL, {headers: {"x-api-key": "vt5fnhwnvn"}})
    console.log("response", response)
   
    if (response.ok) {
        const dataset = await response.json();
        console.log("dataset", dataset)
        $("#SN").text(dataset.supplierName != null ? dataset.supplierName : "(blank)")
        //$("#SC").text("Supplier number: " + dataset.supplierNumber)
    } else if (response.status >= 400 && response.status < 500) {
        $("#SN").text("Result not found for uuid: ")
        $("#SC").text(uuid)
    } else {
        $("#SN").text(" error " + response.status + " " + response.statusText)
        $("#SC").text(await response.text())
    }

   
}

call().catch(e => console.log("call error", e)) 
 */
