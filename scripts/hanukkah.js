Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

var fromTop = 132;
var fromLeft = 708;
var fromTopInitial = 132;
var fromLeftInitial = 708;
var day = 1;
var shiftLeft = 0;

var deg = 0;
var id = -1;
var timeoutId = -1;

var year = 2015;
var month = "November";
var dayOfMonth = 12;
var daysInHanukkah = 8;
var animationOn = true;
var date = new Date();
var nextHanukkah = new Date();
var entered = 0;

function credits() {
    entered++;
    document.getElementById("blame1").style.display = "block";
}

function removeCredits() {
    entered--;
    timeoutId = setTimeout(rem, 500);
    
    function rem() {
        if (entered <= 0) {
            document.getElementById("blame1").style.display = "none";
        }
    }

}

function formatDate(date) {
    var monthIndex = date.getMonth();
    var month = months[monthIndex];
    var day = date.getDate();
    var year = date.getFullYear();
    return month + " " + day + ", " + year;
}

function dayMsg() {
    document.getElementById("clickMsg").style.display = "block";
}

function removeDayMsg() {
    document.getElementById("clickMsg").style.display = "none";
}

function dateMsg() {
    document.getElementById("clickMsg2").style.display = "block";
}

function removeDateMsg() {
    document.getElementById("clickMsg2").style.display = "none";
}

var factor = 0.3;

var fontFactor = 0.75;

function makePx(x) {
    var px = Math.floor(x*factor);
    if (x > 0 && px == 0) {
        px = 1;
    }
    return px + "px";
}

function setPos(id,x,y) {
    var q = document.getElementById(id);
    var parent = q.parentElement.nodeName;
    if (parent == "SECTION") {
        q.style.left = makePx(y - shiftLeft);
    } else {
        q.style.left = makePx(y);
    }

    q.style.top = makePx(x);
    
}

function setSize(id, w, h) {
    var p = document.getElementById(id);
    if (w == undefined || w == null) {
        p.style.width = "auto";
    } else {
        p.style.width = makePx(w);
    }
    if (h == undefined || h == null) {
        p.style.height = "auto";
    } else {
        p.style.height = makePx(h);
    }
    p.style.height = makePx(h);
}

function setupPositions() {
    setPos("menorah", 10, 10);
    setPos("flame1",100, 880);
    setPos("flame2", 100, 835)
    setPos("flame3", 100, 788)
    setPos("flame4",100, 745);
    setPos("flame5", 100, 658);
    setPos("flame6", 100, 614);
    setPos("flame7", 100, 568);
    setPos("flame8", 100, 524);
    setPos("wholeCandle", 132, 708);
    setPos("candlestick", -20, 0);
    setPos("wick", -30, 4);
    setPos("flame0", -45, -7);
    setPos("flameProper", -10, -0);
    setPos("currentDate", 240, 200);
    setPos("day", 270, 200);
    setPos("clickMsg", 300, 200);
    setPos("clickMsg2", 300, 200);
    setPos("overMsg", 20, 270);
    setPos("credits", 300, 780);
    setPos("blame1", 100, 400);
    setPos("loading", 100, 400);

}

function makeOpaque(id) {
    document.getElementById(id).style.opacity = "1.0";
}

function makeTransparent(id) {
    document.getElementById(id).style.opacity = "0.5";
}

function makeBackgroundOpaque() {
    makeOpaque("menorah");
    makeOpaque("flame1");
    makeOpaque("flame2");
    makeOpaque("flame3");
    makeOpaque("flame4");
    makeOpaque("flame5");
    makeOpaque("flame6");
    makeOpaque("flame7");
    makeOpaque("flame8");
    makeOpaque("wholeCandle");
    makeOpaque("candlestick");
    makeOpaque("wick");
    makeOpaque("flame0");
    makeOpaque("flameProper");
}

function makeBackgroundTransparent() {
    makeTransparent("menorah");
    makeTransparent("flame1");
    makeTransparent("flame2");
    makeTransparent("flame3");
    makeTransparent("flame4");
    makeTransparent("flame5");
    makeTransparent("flame6");
    makeTransparent("flame7");
    makeTransparent("flame8");
    makeTransparent("wholeCandle");
    makeTransparent("candlestick");
    makeTransparent("wick");
    makeTransparent("flame0");
    makeTransparent("flameProper");
}

function setupSizes() {
    setSize("menorah", 1000, 333);
    setSize("flameProper", 30, 30);
    setSize("flame1", 30, 30);
    setSize("flame2", 30, 30);
    setSize("flame3", 30, 30);
    setSize("flame4", 30, 30);
    setSize("flame5", 30, 30);
    setSize("flame6", 30, 30);
    setSize("flame7", 30, 30);
    setSize("flame8", 30, 30);
    setSize("wick",3, 10);
    setSize("candlestick", 11, 60);
    setSize("overMsg", 650);
    setSize("blame1", 500);
    setSize("loading", 500);

}

function setFontSize(id, em) {
    var sz = em * fontFactor;
    var txt = sz + "em";
    document.getElementById(id).style.fontSize = txt;
}


function setupFontSizes() {
    setFontSize("currentDate", 1.0);
    setFontSize("day", 1.0);
    setFontSize("clickMsg", 1.0);
    setFontSize("clickMsg2", 1.0);
    setFontSize("overMsg", 1.5);
    setFontSize("explain", 0.9);
    setFontSize("credits", 0.8);
    setFontSize("blame1", 1.0);
    setFontSize("url", 0.7);
    setFontSize("loading", 4.0);
}

function setupDates() {
    date = new Date();
    //date = makeDate(1, "January", 2017),
    year = date.getFullYear();
    var yearIndex = getYearIndex();
    var startHanukkah = hanukkahDates[yearIndex];
    day = 1;
    var date1 = startHanukkah;
    var found = false;
    for (var i=1; i<=daysInHanukkah; i++) {
        date1 = startHanukkah.addDays(i-1);
                
        if (date1.getMonth() != date.getMonth()) {
            continue;
        }
        if (date1.getFullYear() != date.getFullYear()) {
            continue;
        }
        if (date1.getDate() != date.getDate()) {
            continue;
        }
        found = true;
        day = i;
        break;
    }
    if (! found) {
        animationOn = false; 
        if (date > startHanukkah) {
            yearIndex++;
            if (yearIndex >= hanukkahDates.length) {
                alert("Whoops! I don't know when the next Hanukkah will be. Let's revisit a past Hanukkah.");
                nextHanukkah = hanukkahDates[0];
            } else {
                nextHanukkah = hanukkahDates[yearIndex];
            }
        } else {
            nextHanukkah = startHanukkah;
        }
        day = 1;
    }
    var mnth = date.getMonth();
    month = months[mnth];
    dayOfMonth = date.getDate();
    year = date.getFullYear();
}

function setup() {
    setupFactor();
    setupDates();
    setupPositions();
    setupSizes();
    setupFontSizes();
}

function setupFactor() {
    if (window.innerWidth > 1000) {
        factor = 1.0;
        fontFactor = 1.0;
        shiftLeft = 0;
        return;
    }
    
    if (window.innerWidth > 750) {
        factor = 0.75;
        fontFactor = 1.0;
        shiftLeft = 0;
        return;
    }
    
    if (window.innerWidth > 500) {
        factor = 0.5
        fontFactor = 0.75;
        shiftLeft = 0;
        return;
    }
    shiftLeft = 100;
    factor = 0.4;
    fontFactor = 0.6;
}

var addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

addEvent(window, "resize", function(event) {
    setup();
});

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function makeDate(day, month, year) {
    var monthIndex = -1;
    for (var i=0; i<months.length; i++) {
        if (month == months[i]) {
            monthIndex = i;
            break;
        }
    }
    return new Date(year, monthIndex, day);
}

hanukkahDates = [
    makeDate(27, "November", 2013),
    makeDate(16, "December", 2014),
    makeDate(6, "December", 2015),
    makeDate(24, "December", 2016),
    makeDate(12, "December", 2017),
    makeDate(2, "December", 2018),
    makeDate(22, "December", 2019),
    makeDate(10, "December", 2020)        
]

function setDate() {
    document.getElementById("year").textContent = year;
    document.getElementById("month").textContent = month;
    document.getElementById("day-of-month").textContent = dayOfMonth;
}

function setDay() {
    document.getElementById("day").textContent = "Day " + day;
}

function reset() {
    animationOn = true;
    if (timeoutId > 0) {
        clearTimeout(timeoutId);
    }

    initialize();
    timeoutId = setTimeout(doLighting, 500);
}

function advanceDay() {
    if (animationOn) {
        
        if (day == 8) {
            day = 1;
        } else {
            day = day + 1;
        }
    }
    else {
        animationOn = true;
    }
    var dateIndex = getYearIndex();
    date = hanukkahDates[dateIndex];
    date = date.addDays(day-1);

    var monthIndex = date.getMonth();
    month = months[monthIndex];
    year = date.getFullYear();
    dayOfMonth = date.getDate();
    
    reset();
}

function getYearIndex() {
    for (var i=0; i<hanukkahDates.length; i++) {
        var date = hanukkahDates[i];
        if (date.getFullYear() == year) {
            return i;
        }
    }
    return 0;    
}

function advanceYear() {
    var dateIndex = getYearIndex();
    if (animationOn) {
        dateIndex++;
    }
    else {
        animationOn = true;
    }
    if (dateIndex >= hanukkahDates.length) {
        dateIndex = 0;
    }
        
    date = hanukkahDates[dateIndex];
    year = date.getFullYear();
    var monthIndex = date.getMonth();
    month = months[monthIndex];
    day = 1;
    dayOfMonth = date.getDate();
    
    reset();
}


function raise() {
    fromTop--;    
    setPos("wholeCandle", fromTop, fromLeft);
}

function lower() {
    fromTop++;
    setPos("wholeCandle", fromTop, fromLeft);
}

function rotate() {
    deg++;
    
    document.getElementById("wholeCandle").style.transform = 'rotate('+deg+'deg)';
    document.getElementById("flame0").style.transform = 'rotate(-' + deg + 'deg)';
    if (deg > 90) {
        document.getElementById("wick").style.backgroundColor = "rgba(255,255,255,0.1)";
    } else {
        document.getElementById("wick").style.backgroundColor = "black";
    }
}

function unrotate() {
    deg--;
    
    document.getElementById("wholeCandle").style.transform = 'rotate('+deg+'deg)';
    document.getElementById("flame0").style.transform = 'rotate(-' + deg + 'deg)';
    if (deg > 90) {
        document.getElementById("wick").style.backgroundColor = "rgba(255,255,255,0.1)";
    } else {
        document.getElementById("wick").style.backgroundColor = "black";
    }
}

function goRight(amt) {
    if (amt == undefined) {
        amt = 1;
    }
    fromLeft += amt;
    setPos("wholeCandle", fromTop, fromLeft);    
}

function goLeft(amt) {
    if (amt == undefined) {
        amt = 1;
    }
    fromLeft -= amt;
    setPos("wholeCandle", fromTop, fromLeft);    
}

function Initial() {
    this.name = "initial";
    this.index = 0;
    this.oldJ = 0;
    this.maxIndex = 121;
    this.maxHeight = 60;
    this.doit = function() {
        this.index++;
        rotate();
        if (this.index > this.maxIndex) {
            return false;
        }
        var newJ = Math.floor(1.0 * this.index * this.maxHeight/this.maxIndex);
        if (newJ > this.oldJ) {
            this.oldJ = newJ;
            raise();
        }
        return true;
    };
}

function GoTo(leftIndex) {
    this.name = "GoTo";
    this.leftIndex = leftIndex;
    this.doit = function() {
        if (fromLeft < this.leftIndex) {
            goRight();
            return true;
        }
        if (fromLeft > this.leftIndex) {
            goLeft();
            return true;
        }
        return false;
    };
}

function DropDown(flameObject) {
    this.name = "DropDown";
    this.index = 0;
    this.maxIndex = 15;
    this.doit = function() {
        this.index++;
        lower();
        if (this.index > this.maxIndex) {
            flameObject.style.zIndex = 2;
            return false;
        }
        return true;        
    }
}

function RiseUp() {
    this.name = "RiseUp";
    this.index = 0;
    this.maxIndex = 15;
    this.doit = function() {
        this.index++;
        raise();
        if (this.index > this.maxIndex) {
            return false;
        }
        return true;        
    }
}

function Final() {
    this.name = "Final";
    this.index = 0;
    this.oldJ = 0;
    this.maxIndex = 121;
    this.maxHeight = 60;
    this.doit = function() {
        this.index++;
        unrotate();
        if (this.index > this.maxIndex) {
            return false;
        }
        var newJ = Math.floor(1.0 * this.index * this.maxHeight/this.maxIndex);
        if (newJ > this.oldJ) {
            this.oldJ = newJ;
            lower();
        }
        return true;
    };
}

var locations = [ 870 ];
    var flames = [document.getElementById("flame1")];
    
    locations.push(825);
    flames.push(document.getElementById("flame2"));
    
    locations.push(778);
    flames.push(document.getElementById("flame3"));
    
    locations.push(735);
    flames.push(document.getElementById("flame4"));

    locations.push(648);
    flames.push(document.getElementById("flame5"));
    
    locations.push(604);
    flames.push(document.getElementById("flame6"));
    
    locations.push(558);
    flames.push(document.getElementById("flame7"));
    
    locations.push(514);
    flames.push(document.getElementById("flame8"));

var tasks = [];


window.onload = doHanukkah;
//window.onload = foo;

function doHanukkah() {
    setup();
    document.getElementById("loading").style.display = "none";
    if (!animationOn) {
        document.getElementById("overMsg").style.zIndex = 3;
        document.getElementById("overMsg").style.display = "block";
        document.getElementById("nextHanukkah").textContent = formatDate(nextHanukkah);
        document.getElementById("overMsg").style.backgroundColor = "rgba(37, 53, 114, 0.8)";
        document.getElementById("overMsg").style.border = "thick solid rgba(187, 199, 238, 0.8)";
        document.getElementById("overMsg").style.padding = "4px";
        setDay();
        setDate();
        //makeBackgroundTransparent();
        document.getElementById("menorah").src = "assets/menorah-lit.png";
        document.getElementById("wholeCandle").style.zIndex = -2;
        
    } else {
        doLighting();
    }
}

function initialize() {
    var element = document.getElementById("overMsg");
    element.style.zIndex = -2;
    document.getElementById("menorah").src = "assets/menorah.png";
     document.getElementById("wholeCandle").style.zIndex = 3;
    setDay();
    setDate();

    if (id > 0) {
        clearInterval(id);
    }
    
    fromLeft = fromLeftInitial;
    fromTop = fromTopInitial;
    
    setPos("wholeCandle", fromTop, fromLeft);
    
    for (var i = 0; i< flames.length; i++) {
        flames[i].style.zIndex = -1;
    }

        
    for (; deg > 0;) {        
        unrotate();
    }

    tasks = [];
}

    
function doLighting() {
    initialize();
    
    var oldJ = 0;
    var newJ = 1;
    var i = 0;
    
    function makeTasks(day) {
        var tasks = [];
        tasks.push(new Initial());
        for (i=0; i<day; i++) {
            var j = day - i;
            j = j-1;
            tasks.push(new GoTo(locations[j]));
            tasks.push(new DropDown(flames[j]));
            tasks.push(new RiseUp());
            flames[j].style.zindex = 1;
            
        }
        tasks.push(new GoTo(fromLeftInitial));
        tasks.push(new Final());
        return tasks;
    }
    
    var day1 = day;
    
    
    tasks = makeTasks(day1);
    
    var pointer = 0;
    var currentName = "none";
    
    function execute() {

        if (pointer >= tasks.length) {
            clearInterval(id);
            timeoutId = setTimeout(doLighting, 500);
            return;
        }
        var object = tasks[pointer];
        if (currentName != object.name) {
            currentName = object.name;
        }

        currentName = object.name;
        result = object.doit();
        if (result == false) {
            pointer++;
            return;
        }
    }
    
        
    id = setInterval(execute, 10);
    
};