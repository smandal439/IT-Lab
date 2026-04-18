
function clearAndAlart1() {
    document.getElementById("button").value = "";
    alert("The input field has been cleared.");
}
function clearAndAlart2() {
    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("result1").value = "";
    // alert("The input field has been cleared.");
}
function clearAndAlart3() {
    document.getElementById("num3").value = "";
    document.getElementById("num4").value = "";
    document.getElementById("result2").value = "";
    // alert("The input field has been cleared.");
}
function clearAndAlart4() {
    document.getElementById("num5").value = "";
    document.getElementById("num6").value = "";
    document.getElementById("result3").value = "";
    // alert("The input field has been cleared.");
}
function clearAndAlart5() {
    document.getElementById("num7").value = "";
    document.getElementById("num8").value = "";
    document.getElementById("result4").value = "";
    // alert("The input field has been cleared.");
}

function addNumbers() {
    // Get values from the first two boxes
    let val1 = document.getElementById("num1").value;
    let val2 = document.getElementById("num2").value;
    // Convert strings to numbers (using parseFloat for decimals)
    let sum = parseFloat(val1) + parseFloat(val2);
    //  Display the result in the third box
    // Use || 0 to display 0 if inputs are empty
    document.getElementById("result1").value = sum || 0;
}

function subNumbers() {
    // Get values from the first two boxes
    let val1 = document.getElementById("num3").value;
    let val2 = document.getElementById("num4").value;
    // Convert strings to numbers (using parseFloat for decimals)
    let difference = parseFloat(val1) - parseFloat(val2);
    //  Display the result in the third box
    // Use || 0 to display 0 if inputs are empty
    document.getElementById("result2").value = difference || 0;
}
function mulNumbers() {
    // Get values from the first two boxes
    let val1 = document.getElementById("num5").value;
    let val2 = document.getElementById("num6").value;
    // Convert strings to numbers (using parseFloat for decimals)
    let product = parseFloat(val1) * parseFloat(val2);
    //  Display the result in the third box
    // Use || 0 to display 0 if inputs are empty
    document.getElementById("result3").value = product || 0;
}
function divNumbers() {
    // Get values from the first two boxes
    let val1 = document.getElementById("num7").value;
    let val2 = document.getElementById("num8").value;
    // Convert strings to numbers (using parseFloat for decimals)
    let division = parseFloat(val1) / parseFloat(val2);
    //  Display the result in the third box
    // Use || 0 to display 0 if inputs are empty
    document.getElementById("result4").value = division || 0;
}
