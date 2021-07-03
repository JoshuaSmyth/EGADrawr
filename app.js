
var IsLeftMouseDown = false;
var selectedColor = '#c0392b';
var palette = new Array();
var canvas = document.getElementById("myCanvas");
canvas.oncontextmenu = function(e) { e.preventDefault(); e.stopPropagation(); }

function openFullscreen() {

    console.log("AttemptFullscreen");
    var elem = document.getElementById('myCanvas');

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
}

function globalKeys(e)
{
    // Escape
    if (e.keyCode == 27)
    {
        // There seems to be a bug in chrome where you need to reclick
        // inside the window after exiting fullscreen preview
        if (document.hasFocus && !document.fullscreenElement)
        {       
            openFullscreen();
        }
    }

   console.log("KeyUp:" + e.keyCode);
}

document.addEventListener('keyup', globalKeys);

var ctx = canvas.getContext("2d");
w = canvas.width;
h = canvas.height;

var img1 = new Image();
img1.src = 'test.png';
img1.onload = function () {
    ctx.drawImage(img1, 0, 0, 320,200);
};

var scale = 2;

// Hook up the palette clicks
var selectedPalIndexA = 0;
var selectedPalIndexB = 15;

document.getElementById("p0a").onclick = function() { selectedPalIndexA = 0; }
document.getElementById("p1a").onclick = function() { selectedPalIndexA = 1; }
document.getElementById("p2a").onclick = function() { selectedPalIndexA = 2; }
document.getElementById("p3a").onclick = function() { selectedPalIndexA = 3; }
document.getElementById("p4a").onclick = function() { selectedPalIndexA = 4; }
document.getElementById("p5a").onclick = function() { selectedPalIndexA = 5; }
document.getElementById("p6a").onclick = function() { selectedPalIndexA = 6; }
document.getElementById("p7a").onclick = function() { selectedPalIndexA = 7; }
document.getElementById("p8a").onclick = function() { selectedPalIndexA = 8; }
document.getElementById("p9a").onclick = function() { selectedPalIndexA = 9; }
document.getElementById("p10a").onclick = function() { selectedPalIndexA = 10; }
document.getElementById("p11a").onclick = function() { selectedPalIndexA = 11; }
document.getElementById("p12a").onclick = function() { selectedPalIndexA = 12; }
document.getElementById("p13a").onclick = function() { selectedPalIndexA = 13; }
document.getElementById("p14a").onclick = function() { selectedPalIndexA = 14; }
document.getElementById("p15a").onclick = function() { selectedPalIndexA = 15; }

function CreateColor(r, g, b)
{
    var c1 = ctx.createImageData(1,1);
    var c1d  = c1.data;
    c1d[0] = r;
    c1d[1] = g;
    c1d[2] = b;
    c1d[3] = 255;

    return c1;
}

palette[0] = CreateColor(0, 0, 0);
palette[1] = CreateColor(0, 0, 170);
palette[2] = CreateColor(0, 170, 170);
palette[3] = CreateColor(0, 170, 0);
palette[4] = CreateColor(170, 0, 0);
palette[5] = CreateColor(170, 0, 170);
palette[6] = CreateColor(170, 85, 0);
palette[7] = CreateColor(170, 170, 170);
palette[8] = CreateColor(85, 85, 85);
palette[9] = CreateColor(85, 85, 255);
palette[10] = CreateColor(85, 255, 85);
palette[11] = CreateColor(85, 255, 255);
palette[12] = CreateColor(255, 85, 85);
palette[13] = CreateColor(255, 85, 255);
palette[14] = CreateColor(255, 255, 85);
palette[15] = CreateColor(255, 255, 255);


function drawPixel(e)
{
    if (document.fullscreenElement)
    {
        // No draw when fullscreen
        
        IsLeftMouseDown = false; 
        /*
        // TODO Show tools when fullscreen?
        var rect = canvas.getBoundingClientRect();
              
        var scaleX = screen.width / 320;
        var scaleY = screen.height / 200;

        var actualHeight = 200 * scaleX;
        var offsetY = (screen.height - actualHeight) / 2;

        console.log("offsetY" + offsetY);
        var clientY = (e.clientY) - offsetY;

        var x = e.clientX/scaleX;
        var y = clientY/scaleX;

        if (x<0) {
            x = 0;
        }
        if (y<0) {
            y = 0;
        }

        ctx.putImageData(palette[selectedPalIndexA], x, y );  
         IsLeftMouseDown = true;
        */
    }
    else
    {
        var rect = canvas.getBoundingClientRect();
        var scaleX = rect.width / canvas.offsetWidth;
        var scaleY = rect.height / canvas.offsetHeight;

        var x = (e.clientX - rect.left) / scaleX;
        var y = (e.clientY - rect.top) / scaleY;
        x-=1;
        y-=1;
        if (x<0) {
            x = 0;
        }
        if (y<0) {
            y = 0;
        }
        ctx.putImageData(palette[selectedPalIndexA], x, y );  
        IsLeftMouseDown = true; 
    }
}

canvas.addEventListener("mousemove", function (e) {

    if (IsLeftMouseDown)
    {
        drawPixel(e);
    }

}, false);

canvas.addEventListener("mousedown", function (e) 
{ 
    // Probably a faster way of doing this but it will do
    if (e.button == 0)
    {
        drawPixel(e);
    }
}, false);
canvas.addEventListener("mouseup", function (e) { IsLeftMouseDown = false; }, false);
canvas.addEventListener("mouseout", function (e) { IsLeftMouseDown = false; }, false);


// TODO Work out zoom
var pointX = 0;
var pointY = 0;

canvas.addEventListener("mousewheel", function (e) {
    e.preventDefault();
    
    if( e.wheelDelta  > 0)
    {
        scale *= 1.12;
    }
    if( e.wheelDelta  < 0)
    {
        scale *= 0.88;
    }
    if (scale < 1.0)
    {
        scale = 1.0;
    }
    if (scale > 20)
    {
        scale = 20;
    }
    canvas.style.transform = "scale(" + scale + ")";
}, false);