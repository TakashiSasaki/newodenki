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
    for (var i = 1; i <= 2; ++i) {
        var relay_id = localStorage.getItem("relayId" + i);
        var scheduled_date = localStorage.getItem("scheduledDate" + i);
        var scheduled_time = localStorage.getItem("scheduledTime" + i);
        var scheduled_date_time = localStorage.getItem("scheduledDateTime" + i);
        var expected_state = localStorage.getItem("expectedState" + i);
        $("#relayId" + i).val(relay_id);
        $("#scheduledDate" + i).val(scheduled_date);
        $("#scheduledTime" + i).val(scheduled_time);
        alert(expected_state);
        setRadioButton($("#relayId" + i), expected_state);
//        if (expected_state == true) {
//            $("#expectedState" + i + "True").attr("checked", true);
//            $("#expectedState" + i + "False").attr("checked", false);
//            $("#expectedState" + i + "Null").attr("checked", false);
//        }
//        if (expected_state == false) {
//            $("#expectedState" + i + "True").attr("checked", false);
//            $("#expectedState" + i + "False").attr("checked", true);
//            $("#expectedState" + i + "Null").attr("checked", false);
//        }
//        if (expected_state == null) {
//            $("#expectedState" + i + "True").attr("checked", false);
//            $("#expectedState" + i + "False").attr("checked", false);
//            $("#expectedState" + i + "Null").attr("checked", true);
//        }
    }
}

$(document).ready(redrawRelays);

function updateStorage(json_response) {
    localStorage.setItem("productName", json_response.productName);
    localStorage.setItem("serialNumber", json_response.serialNumber);
    localStorage.setItem("moduleId", json_response.moduleId);
}

function getRadioButton(element) {
    if (element.find(".radioTrue").is(":checked")) return true;
    if (element.find(".radioFalse").is(":checked")) return false;
    if (element.find(".radioNull").is(":checked")) return null;
}

$(document).ready(function () {
    setRadioButton($("#relay1"), true);
});

function setRadioButton(element, state) {
    var radio_true = element.find(".radioTrue");
    var radio_false = element.find(".radioFalse");
    var radio_null = element.find(".radioNull");
    if (state == true) {
        radio_true.attr('checked', true);
        return;
    } else {
        radio_true.attr('checked', false);
    }
    if (state == false) {
        radio_false.attr('checked', true);
        return;
    } else {
        radio_false.attr("checked", false);
    }
    if (state == null) {
        radio_null.attr("checked", true);
        return;
    } else {
        radio_null.attr("checked", false);
    }
}

function registerRelay(relay_element, relay_index) {
    var product_name = localStorage.getItem("productName");
    if (!product_name) return;
    var serial_number = localStorage.getItem("serialNumber");
    if (!serial_number) return;
    var module_id = localStorage.getItem("moduleId");
    if (!module_id) return;
    var relay_id = relay_element.find(".relayId").val();
    localStorage.setItem("relayId" + relay_index, relay_id);
    var expected_state = getRadioButton(relay_element);
    localStorage.setItem("expectedState" + relay_index, expected_state);
    var scheduled_date = relay_element.find(".scheduledDate").val();
    localStorage.setItem("scheduledDate" + relay_index, scheduled_date);
    var scheduled_time = relay_element.find(".scheduledTime").val();
    localStorage.setItem("scheduledTime" + relay_index, scheduled_time);
    var scheduled_date_time = scheduled_date + "T" + scheduled_time + ":00+09:00";
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
        //contentType: "application/json",
        data: data,
        success: function (json_response) {
            alert("予約しました");
        },
        error: function (json_response) {
        }
    });
}