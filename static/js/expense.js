function submit_expense() {
    var date = document.getElementById("date").value;
    var amount = document.getElementById("amount").value;
    var category = document.getElementById("category").value;
    var comments = document.getElementById("comments").value;

    document.getElementById("loadingBar").style.display = "block";
    document.getElementById("expenseEnter").style.display = "none";

    var inputObject = {
        "date" : date,
        "amount" : amount,
        "category" : category,
        "comments" : comments
    };
    var inputString = JSON.stringify(inputObject);

    (() => {
        axios.post('/api/submitExpense',inputObject)
        .then(function(response) {
            if(response.data == "inserted") {
                document.getElementById("loadingBar").style.display = "none";
                document.getElementById("successAlert").style.display = "block";
            }
            document.getElementById("expenseEnter").style.display = "block";
        })
    })();
   
}