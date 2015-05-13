//scripts.js

var spotsArray = new Array();
var drawArray = new Array();
var myDrawInterval;
var pos;
var match = 0;

$(document).ready(function () {
    $("#TBSpots").val("");
    BuildBoard();
    $("#TBSpots").focus();
});
$("#BtnGetSpots").click(function () {
    if (CheckTB() == false) {
        $("#DialogBadInput").dialog("open");
    } else {
        spotsArray = GetNumbers($("#TBSpots").val(), true);
        $("#DivNumbers").html("<br /><span class='white'>Your numbers are: </span>");
        for (var i = 0; i < spotsArray.length; i++)
            $("#DivNumbers").append(spotsArray[i] + ", ");
    }
});
$("#BtnStart").click(function () {
    if ((CheckTB() == false) || (spotsArray.length == 0)) {
        $("#DialogStart").dialog("open");
    }
    else {
        PlayGame();
    }
});
$("#BtnClear").click(function () {
    clearInterval(myDrawInterval);
    $("#TBSpots").val("");
    $("#DivNumbers").html("");
    $("#DivPick").html("");
    BuildBoard();
    $("#TBSpots").focus();
})
$("#AnchorHowTo").click(function () {
    $("#DialogHowTo").dialog("open");
});
$(function () {
    $("#DialogHowTo").dialog({
        autoOpen: false,
        width: 550,
        height: 290,
        modal: true
    });
});
$("#AnchorOdds").click(function () {
    $("#DialogOdds").dialog("open");
});
$(function () {
    $("#DialogOdds").dialog({
        autoOpen: false,
        width: 600,
        height: 600,
        modal: true
    });
});
$(function () {
    $("#DialogStart").dialog({
        autoOpen: false,
        width: 800,
        height: 300,
        modal: true
    });
});
$(function () {
    $("#DialogBadInput").dialog({
        autoOpen: false,
        width: 800,
        height: 300,
        modal: true
    });
});
function BuildBoard() {
    $("#DivBoard").html("");
    $("#DivBoard").append("<table border='1'>");
    $("#DivBoard").append("<tr><td colspan='10' class='center'><h3 class='pink'>Current Drawing</h3></td></tr>");
    for (var i = 0; i < 8; i++) {
        $("#DivBoard").append("<tr>");
        for (var x = 1; x <= 10; x++) {
            $("#DivBoard").append("<td><input id='TBSquare" + ((10 * i) + x) + "' class='boardTB' readonly='readonly' value='" + ((10 * i) + x) + "' type='text' /></td>");
        }
        $("#DivBoard").append("</tr>");
    }
    $("#DivBoard").append("</table>");
}
function GetNumbers(spots, inOrder) {
    var numArray = new Array();
    var spotArray = new Array();
    var pickArray = new Array();
    for (var i = 0; i <= 80; i++)
        numArray.push(i);
    for (var i = 1; i <= spots; i++) {
        var num = GetRandom();
        while (numArray[num] == "picked")
            num = GetRandom();
        numArray[num] = "picked"
        pickArray.push(num);
    }
    for (var i = 1; i <= 80; i++)
        if (numArray[i] == "picked")
            spotArray.push(i);
    if (inOrder)
        return (spotArray);
    else
        return (pickArray);
}
function GetRandom() {
    return (Math.floor((Math.random() * 80) + 1));
}
function CheckTB() {
    var num = $("#TBSpots").val();
    if ((num == "") || (isNaN(num)))
        return false;
    else if ((num < 1) || (num > 10))
        return false;
    else
        return true;
}
function PlayGame() {
    BuildBoard();
    pos = 0;
    drawArray = GetNumbers(20, false);
    $("#DivPick").html("Preparing to draw.... Good Luck!!!");
    myDrawInterval = setInterval(function () { DisplayPick() }, 2000);
}
function DisplayPick() {
    if (pos < 20) {
        var pick = pos + 1;
        var found=false;
        $("#DivPick").html("Draw number " + pick + " pick is: <span class='red'>" + drawArray[pos] + "</span>");
        for (var i = 0; i < spotsArray.length; i++)
            if (drawArray[pos] == spotsArray[i]) {
                found = true;
                match++;
            }
        if (found) {
            $("#TBSquare" + drawArray[pos]).css("color", "red");
            $("#TBSquare" + drawArray[pos]).css("background-color", "black");
        }
        else {
            $("#TBSquare" + drawArray[pos]).css("color", "white");
            $("#TBSquare" + drawArray[pos]).css("background-color", "darkgray");
        }
    }
    pos++;
    if (pos == 21) {
        clearInterval(myDrawInterval);
        CheckAndReset()
    }
}
function CheckAndReset() {
    $("#DivPick").html("Results: You matched <span class='red'>" + match + "</span>.");
    match = 0;
}