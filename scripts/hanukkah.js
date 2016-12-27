var fromTop = 132;
var fromLeft = 708;
var fromTopInitial = 132;
var fromLeftInitial = 708;
var day = 1;

var deg = 0;
var id = -1;
var flag = true;

function advanceDay() {
    if (flag == false) {
        return;
    }
        
    if (day == 8) {
        day = 1;
    }
    day += 1;
    document.getElementById("day").textContent = "Day " + day;
    document.getElementById("clickMsg").style.color = "#253572";
    doLighting();
}

function raise() {
    fromTop--;

    var txt = fromTop + "px";
    document.getElementById("wholeCandle").style.top = txt;
    
    document.getElementById("raise").textContent = txt;
}

function lower() {
    fromTop++;

    var txt = fromTop + "px";
    document.getElementById("wholeCandle").style.top = txt;
    
    document.getElementById("raise").textContent = txt;
}

function rotate() {
    deg++;
    
    document.getElementById("wholeCandle").style.transform = 'rotate('+deg+'deg)';
    document.getElementById("flame0").style.transform = 'rotate(-' + deg + 'deg)';
    document.getElementById("rotate").textContent = deg;
    
}

function unrotate() {
    deg--;
    
    document.getElementById("wholeCandle").style.transform = 'rotate('+deg+'deg)';
    document.getElementById("flame0").style.transform = 'rotate(-' + deg + 'deg)';
    document.getElementById("rotate").textContent = deg;
    
}

function goRight(amt) {
    if (amt == undefined) {
        amt = 1;
    }
    fromLeft += amt;
    var txt = fromLeft + "px";
    document.getElementById("wholeCandle").style.left = txt;   
    
}

function goLeft(amt) {
    if (amt == undefined) {
        amt = 1;
    }
    fromLeft -= amt;
    var txt = fromLeft + "px";
    document.getElementById("wholeCandle").style.left = txt;   
    
}

function Initial() {
    this.name = "initial";
    this.index = 0;
    this.oldJ = 0;
    this.maxIndex = 121;
    this.maxHeight = 60;
    this.doit = function() {
        document.getElementById("clickMsg").style.zindex = -1;
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
            document.getElementById("clickMsg").style.zindex = -1;
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


window.onload = doLighting;
//window.onload = foo;

function initialize() {
    if (id > 0) {
        clearInterval(id);
    }
    
    document.getElementById("clickMsg").style.zindex = -1;

    var element = document.getElementById("wholeCandle");
    
    element.style.zindex = -1;

    element.style.left = fromLeftInitial;

    fromLeft = fromLeftInitial;
    element.style.top = fromTopInitial;
    fromTop = fromTopInitial;
    for (var i = 0; i< flames.length; i++) {
        flames[i].style.zIndex = -1;
    }

        
    for (; deg > 0;) {        
        unrotate();
    }

    element.zindex = 3;
    tasks = [];
}

    
function doLighting() {
    document.getElementById("clickMsg").style.color = "#253572";
    flag = false;
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
    
    
    tasks = makeTasks(day);
    
    var pointer = 0;
    var currentName = "none";
    
    function execute() {

        if (pointer >= tasks.length) {
            clearInterval(id);
            flag = true;
            document.getElementById("clickMsg").style.color = "white";
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