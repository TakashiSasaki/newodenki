/**
 * Created with PyCharm.
 * User: sasaki
 * Date: 13/06/13
 * Time: 7:07
 * To change this template use File | Settings | File Templates.
 */

function redrawModule() {
    $("#productName").val(localStorage.getItem("productName"));
    $("#serialNumber").val(localStorage.getItem("serialNumber"));
    $("#moduleId").val(localStorage.getItem("moduleId"));
}
$(document).ready(redrawModule);

function registerModule() {
    var product_name = $("#productName").val();
    var serial_number = $("#serialNumber").val();
    var module_id = $("#moduleId").val();
    localStorage.setItem("productName", product_name);
    localStorage.setItem("serialNumber", serial_number);
    localStorage.setItem("moduleId", module_id);
    redrawModule();
}


function reloadRelays() {
    var product_name = $("#productName").val();
    var serial_number = $("#serialNumber").val();
    var module_id = $("#moduleId").val();
    var url = "/api/Relays/" + product_name + "/" + serial_number + "/" + module_id;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (response) {
            for (i = 0; i < response.length; ++i) {
                localStorage.setItem("relayId" + i, response[i].relayItem);
                localStorage.setItem("scheduledDateTime" + i, response[i].scheduledDateTime);
                localStorage.setItem("expectedState" + i, response[i].expectedState);
            }
            localStorage.setItem("nRelays", i);
        }
    })
}

function redrawRelays() {
    for (var i = 0; i < 2; ++i) {
        var relay_id = localStorage.getItem("relayId" + i);
        var scheduled_date_time = localStorage.getItem("scheduledDateTime" + i);
        var expected_state = localStorage.getItem("expectedState" + i);
        $("#relayId" + i).val(relay_id);
        $("#scheduledDateTime" + i).val(scheduled_date_time);
        if (expected_state == true) {
            $("#expectedState" + i + "True").attr("checked", true);
            $("#expectedState" + i + "False").attr("checked", false);
            $("#expectedState" + i + "Null").attr("checked", false);
        }
        if (expected_state == false) {
            $("#expectedState" + i + "True").attr("checked", false);
            $("#expectedState" + i + "False").attr("checked", true);
            $("#expectedState" + i + "Null").attr("checked", false);
        }
        if (expected_state == null) {
            $("#expectedState" + i + "True").attr("checked", false);
            $("#expectedState" + i + "False").attr("checked", false);
            $("#expectedState" + i + "Null").attr("checked", true);
        }
    }
}

function updateStorage(json_response) {
    localStorage.setItem("productName", json_response.productName);
    localStorage.setItem("serialNumber", json_response.serialNumber);
    localStorage.setItem("moduleId", json_response.moduleId);
}

function registerRelay(relay_element) {
    var product_name = localStorage.getItem("productName");
    if (!product_name) return;
    var serial_number = localStorage.getItem("serialNumber");
    if (!serial_number) return;
    var module_id = localStorage.getItem("moduleId");
    if (!module_id) return;
    var relay_id = relay_element.find(".relayId").val();
    var expected_state = relay_element.find(".expectedState").val();
    var scheduled_date_time = relay_element.find(".scheduledDateTime").val();
    var url = "/api/Relays/" + product_name + "/" + serial_number + "/" + module_id;
    var data = {
        relayId: relay_id,
        scheduledDateTime: scheduled_date_time,
        expectedState: expected_state
    };
    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: data,
        success: function (json_response) {
            for (var i = 0;
                 i < json_response.length; ++i
                ) {
                var relay = json_response[i];
                localStorage["relayId" + i] = relay.relayId;
                localStorage["scheduledDateTime" + i] = relay.scheduledDateTime;
                localStorage["expectedState" + i] = relay.expectedState;
            }
            redrawRelays();
        },
        error: function (json_response) {
        }
    });
}