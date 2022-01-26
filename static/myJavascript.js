// import "./jquery-3.6.0";
const startRandom = function () {
    $.ajax({
        url: "/random",
        data: {},
        type: "GET",
        success: function (data) {
            if (data === "There is nothing in the SQL") {
                alert("There is nothing in the SQL");
            } else {
                console.log(data)
                document.getElementById("Result").innerHTML = data;
            }
        },
        error: function (xhr) {
            alert("Ajax request 發生錯誤");
        },
    });
};
let Insert = function (href) {
    const $checkMon = $('#mon').is(":checked");
    const $checkThes = $('#thes').is(":checked");
    const $checkWed = $('#wed').is(":checked");
    const $checkThr = $('#thr').is(":checked");
    const $checkFri = $('#fri').is(":checked");
    const $checkSat = $('#sat').is(":checked");
    const $checkSun = $('#sun').is(":checked");
    $.ajax({
        url: href,
        data: {
            'mon': $checkMon,
            'thes': $checkThes,
            'wed': $checkWed,
            'thr': $checkThr,
            'fri': $checkFri,
            'sat': $checkSat,
            'sun': $checkSun
        }, // 傳出data
        type: "POST",
        success: function (data) {
            console.log(data);
            const content = document.getElementById("Result");
            content.innerHTML = data;
            $('#inputBox').val(""); // 清空輸入欄
            $('#mon').prop("checked", false);
            $('#thes').prop("checked", false);
            $('#wed').prop("checked", false);
            $('#thr').prop("checked", false);
            $('#fri').prop("checked", false);
            $('#sat').prop("checked", false);
            $('#sun').prop("checked", false);
        },
        error: function (xhr) {
            alert("Ajax request 發生錯誤");
        },
    });
};
var queryPracticeResult = function (tableTitle) {
    var $tbResult = $("#Result");
    var tableTitle =
        "<tr>" +
        "<td>編號</td>" +
        "<td>名稱</td>" +
        "<td>星期一</td>" +
        "<td>星期二</td>" +
        "<td>星期三</td>" +
        "<td>星期四</td>" +
        "<td>星期五</td>" +
        "<td>星期六</td>" +
        "<td>星期日</td>" +
        "<td>" + "   " + "</td>" +
        "</tr>";
    $.ajax({
        url: "/listAll",
        data: {},
        type: "GET",
        success: function (data) {
            $tbResult.empty();
            $tbResult.append(tableTitle);
            $.each(data, function (idx, val) {
                view =
                    "<tr>" +
                    "<td>" + (idx + 1) + "</td>" +
                    "<td>" + val.Name + "</td>" +
                    "<td>" + val.Mon + "</td>" +
                    "<td>" + val.Thes + "</td>" +
                    "<td>" + val.Wed + "</td>" +
                    "<td>" + val.Thr + "</td>" +
                    "<td>" + val.Fri + "</td>" +
                    "<td>" + val.Sat + "</td>" +
                    "<td>" + val.Sun + "</td>" +
                    "<td>" +
                    "<button onclick='ChangeDinner(" + val.ID + ")'>" + "修改" + "</button>" +
                    "<button onclick='DeleteDinner(" + val.ID + ")'>" + "刪除" + "</button>" +
                    "</td>" +
                    "</tr>";
                $tbResult.append(view);
            });
        },
        error: function (xhr) {
            alert("Ajax request 發生錯誤");
        },
    });
};
var DeleteDinner = function (delete_id) {
    let href = "/changeData/" + delete_id;
    var tableTitle =
        "<tr>" +
        "<td>編號</td>" +
        "<td>名稱</td>" +
        "<td>星期一</td>" +
        "<td>星期二</td>" +
        "<td>星期三</td>" +
        "<td>星期四</td>" +
        "<td>星期五</td>" +
        "<td>星期六</td>" +
        "<td>星期日</td>" +
        "<td>" + "   " + "</td>" +
        "</tr>";
    $.ajax({
        url: href,
        data: {},
        type: "DELETE",
        success: function (data) {
            queryPracticeResult(tableTitle);
        },
        error: function (xhr) {
            alert("Ajax request 發生錯誤");
        },
    });
};
var ChangeDinner = function () {
    var $change = $('#Change_data');
    $change.empty();
    var view = "此功能尚未完成，請先以刪除再添加作為替代" + "<br/>" + "造成不便敬請見諒";
    $change.append(view);
};