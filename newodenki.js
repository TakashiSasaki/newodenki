/**
 * Created with PyCharm.
 * User: sasaki
 * Date: 13/06/13
 * Time: 7:07
 * To change this template use File | Settings | File Templates.
 */

function registerModule() {
    var product_name = $("#productName").val();
    var serial_number = $("#serialNumber").val();
    var module_id = $("#moduleId").val();
    sessionStorage.setItem("productName", product_name);
    sessionStorage.setItem("serialNumber", serial_number);
    sessionStorage.setItem("moduleId", module_id);
}

function redrawModule() {
    $("#productName").val(sessionStorage.getItem("productName"));
    $("#serialNumber").val(sessionStorage.getItem("serialNumber"));
    $("#moduleId").val(sessionStorage.getItem("moduleId"));
}
$(document).ready(redrawModule);

function registerRelays() {
    var product_name = $("#productName");
    var serial_number = $("#serialNumber");
    var module_id = $("$moduleId");
    var url = "/api/Relays/" + product_name + "/" + serial_number + "/" + module_id;

    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: [],
        success: function () {
        },
        error: function () {
        }
    });
}