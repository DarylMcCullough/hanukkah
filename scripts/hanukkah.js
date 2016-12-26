var fromTop = 132;
var fromLeft = 708;
var fromTopInitial = 132;
var fromLeftInitial = 708;

var deg = 0;

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


window.onload = function() {
    var oldJ = 0;
    var newJ = 1;
    var i = 0;
    //var id = setInterval(doIt, 10);
    var object = new Initial();
    
    var id = setInterval(execute, 10);
    
    var tasks = [ new Initial(), new GoTo(863), new DropDown(document.getElementById("flame1")), new RiseUp(), new GoTo(fromLeftInitial), new Final()];
    
    var pointer = 0;
    var currentName = "none";
    
    function execute() {
        if (pointer >= tasks.length) {
            clearInterval(id);
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
    
    //var id = setInterval(execute, 10);
    
    
    function doIt() {
        i++;
        rotate();
        newJ = Math.floor(i*60.0/121.0);
        if (newJ > oldJ) {
            oldJ = newJ;
            raise();
        }
        if (i > 121) {
            clearInterval(id);
            i = 0;
            id = setInterval(doit2, 10);
        }
    }
    
    function doit2() {
        i++;
        goRight();
        if (i > 155) {
            clearInterval(id);
            i = 0;
            id = setInterval(doit3, 10);
        }
    }
    
    function doit3() {
        i++;
        lower();
        if (i > 15) {
            document.getElementById("flame1").style.zIndex = 2;
            clearInterval(id);
            i = 0;
            id = setInterval(doit4, 10);
        }
    }
    
    function doit4() {
        i++;
        raise();
        if (i > 15) {
            clearInterval(id);
            i = 0;
            id = setInterval(doit5, 10);
        }
    }
    
    function doit5() {
        i++;
        goLeft();
        if (i > 155) {
            clearInterval(id);
            i = 0;
            oldJ = 0;
            id = setInterval(doit6, 10);
        }
    }
    
    function doit6() {
        i++;
        unrotate();
        newJ = Math.floor(i*60.0/121.0);

        if (newJ > oldJ) {
            oldJ = newJ;
            lower();
        }
        if (i > 121) {
            clearInterval(id);
            i = 0;
        }
    }
    
};