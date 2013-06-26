function updateCurrentOdenkiId() {
    current_odenki_id = localStorage.get("currentOdenkiId");
    if (!current_odenki_id)return;
    $("#currentOdenkiId").val(current_odenki_id);
}

function setCurrentOdenkiId() {
    var current_odenki_id = $("#currentOdenkiId").val();
    if (current_odenki_id) {
        localStorage.setItem("currentOdenkiId", current_odenki_id);
    }

    $.ajax({
        url: API_HOST + "/api/OdenkiUser/CurrentOdenkiId",
        type: "POST",
        dataType: "json",
        //contentType: "application/json",
        data: {
            "currentOdenkiId": current_odenki_id
        },
        success: function (json_response) {
            alert("currentOdenkiId was set");
            current_odenki_id = json_response["result"]["odenkiId"];
            if (current_odenki_id) {
                localStorage.set("currentOdenkiId", current_odenki_id);
            }
            updateCurrentOdenkiId();
        },
        error: function (json_response) {
        }
    });
}