var bday = new Date(2004, 12, 29, 18, 30).getTime();

// Update the count up every 1 second
var x = setInterval(function() {

    var bday = new Date(2004, 12, 29, 18, 30).getTime();
    var now = new Date();
    
    var diff = now-bday;
    
    var years = diff/(365 * 24 * 60 * 60 * 1000);
    var days = (years - Math.floor(years)) * 365;
    var hours = (days - Math.floor(days)) * 24;
    var mins = (hours - Math.floor(hours)) * 60;
    var secs = (mins - Math.floor(mins)) * 60;
    
    // console.log(years + "y " + days + "d " + hours + "h " + mins + "m " + secs + "s");
    
    document.getElementById("timer").innerHTML = "<span>" + Math.floor(years) + "</span> years <br /> <span>" + Math.floor(days) + "</span> days <br /> <span>" + Math.floor(hours) + " </span> hours <br /> <span>" + Math.floor(mins) + "</span> mins <br /> <span>" + Math.floor(secs) + "</span> secs";

}, 1000); // 1000 ms = 1 sec