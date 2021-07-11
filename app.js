
var IsMouseLeftDown = false;
var IsMouseRightDown = false;
var selectedColor = '#c0392b';
var palette = new Array();
var canvas = document.getElementById("myCanvas");
var divCanvasBackground = document.getElementById("divCanvasBackground");

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

    if (e.shiftKey)
    {
        console.log("Shift was pressed");
    }
    
    if (e.altKey)
    {
        console.log("Alt was pressed");
    }


    // Esc
    if (e.keyCode == 27)
    {
        // There seems to be a bug in chrome where you need to reclick
        // inside the window after exiting fullscreen preview
        if (document.hasFocus && !document.fullscreenElement)
        {       
            openFullscreen();
        }
    }

    // [
    if (e.keyCode == 219)
    {
        decBrushIndex();
    }

    // ]
    if (e.keyCode == 221)
    {
        incBrushIndex();
    }

    // m
    if (e.keyCode == 77)
    {
        ToggleDitherMode();
    }

   console.log("KeyUp:" + e.keyCode);
}

document.addEventListener('keyup', globalKeys);

var ctx = canvas.getContext("2d");
w = canvas.width;
h = canvas.height;

var img1 = new Image();
img1.src = 'test.png';
// img1.onload = function () {
//     ctx.drawImage(img1, 0, 0, 320,200);
// };

var scale = 2;

// Hook up the palette clicks
var selectedPalIndexA = 0;
var selectedPalIndexB = 15;

var palSelectedA = document.getElementById("palSelectedA");
var palSelectedB = document.getElementById("palSelectedB"); 

function selectIndexA(index)
{
    selectedPalIndexA = index;
    var r = palette[index].data[0];
    var g = palette[index].data[1];
    var b = palette[index].data[2];
    
    col = "rgb(" + r + "," + g +"," + b + ")";
    palSelectedA.style.backgroundColor  = col;
}
function selectIndexB(index)
{
    selectedPalIndexB = index;
    var r = palette[index].data[0];
    var g = palette[index].data[1];
    var b = palette[index].data[2];
    
    col = "rgb(" + r + "," + g +"," + b + ")";
    palSelectedB.style.backgroundColor  = col;
}

{
    var item0 = document.getElementById("p0a"); 
    item0.onclick = function(e) { selectIndexA(0); }
    item0.oncontextmenu = function() { selectIndexB(0); return false; }

    var item1 = document.getElementById("p1a"); 
    item1.onclick = function() { selectIndexA(1); }
    item1.oncontextmenu= function() { selectIndexB(1); return false; }

    var item2 = document.getElementById("p2a"); 
    item2.onclick = function() { selectIndexA(2); }
    item2.oncontextmenu= function() { selectIndexB(2); return false; }

    var item3 = document.getElementById("p3a"); 
    item3.onclick = function() { selectIndexA(3); }
    item3.oncontextmenu= function() { selectIndexB(3); return false; }

    var item4 = document.getElementById("p4a"); 
    item4.onclick = function() { selectIndexA(4); }
    item4.oncontextmenu= function() { selectIndexB(4); return false; }

    var item5 = document.getElementById("p5a"); 
    item5.onclick = function() { selectIndexA(5); }
    item5.oncontextmenu= function() { selectIndexB(5); return false; }

    var item6 = document.getElementById("p6a"); 
    item6.onclick = function() { selectIndexA(6); }
    item6.oncontextmenu= function() { selectIndexB(6); return false; }

    var item7 = document.getElementById("p7a"); 
    item7.onclick = function() { selectIndexA(7); }
    item7.oncontextmenu= function() { selectIndexB(7); return false; }

    var item8 = document.getElementById("p8a"); 
    item8.onclick = function() { selectIndexA(8); }
    item8.oncontextmenu= function() { selectIndexB(8); return false; }

    var item9 = document.getElementById("p9a"); 
    item9.onclick = function() { selectIndexA(9); }
    item9.oncontextmenu= function() { selectIndexB(9); return false; }
    
    var item10 = document.getElementById("p10a"); 
    item10.onclick = function() { selectIndexA(10); }
    item10.oncontextmenu= function() { selectIndexB(10); return false; }

    var item11 = document.getElementById("p11a"); 
    item11.onclick = function() { selectIndexA(11); }
    item11.oncontextmenu= function() { selectIndexB(11); return false; }

    var item12 = document.getElementById("p12a"); 
    item12.onclick = function() { selectIndexA(12); }
    item12.oncontextmenu= function() { selectIndexB(12); return false; }

    var item13 = document.getElementById("p13a"); 
    item13.onclick = function() { selectIndexA(13); }
    item13.oncontextmenu= function() { selectIndexB(13); return false; }
    
    var item14 = document.getElementById("p14a"); 
    item14.onclick = function() { selectIndexA(14); }
    item14.oncontextmenu= function() { selectIndexB(14); return false; }

    var item15 = document.getElementById("p15a"); 
    item15.onclick = function() { selectIndexA(15); }
    item15.oncontextmenu= function() { selectIndexB(15); return false; }
}

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

// Brushes are 7x7
const brush1 = [
0,0,0,0,0,0,0,
0,0,0,0,0,0,0,    
0,0,0,0,0,0,0,
0,0,0,1,0,0,0,
0,0,0,0,0,0,0,
0,0,0,0,0,0,0,
0,0,0,0,0,0,0     
]

const brush2 = [
    0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,    
    0,0,0,1,0,0,0,
    0,0,1,1,1,0,0,
    0,0,0,1,0,0,0,
    0,0,0,0,0,0,0,
    0,0,0,0,0,0,0]

const brush3 = [
        0,0,0,0,0,0,0,
        0,0,0,1,0,0,0,    
        0,0,1,1,1,0,0,
        0,1,1,1,1,1,0,
        0,0,1,1,1,0,0,
        0,0,0,1,0,0,0,
        0,0,0,0,0,0,0]
        
const brush4 = [
        0,0,0,0,0,0,0,
        0,0,1,1,1,0,0,    
        0,1,1,1,1,1,0,
        0,1,1,1,1,1,0,
        0,1,1,1,1,1,0,
        0,0,1,1,1,0,0,
        0,0,0,0,0,0,0]

const brush5 = [
            0,0,1,1,1,0,0,
            0,1,1,1,1,1,0,    
            1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,
            0,1,1,1,1,1,0,
            0,0,1,1,1,0,0]


var brushes = [brush1, brush2, brush3, brush4, brush5]

var dithermode = false; // 1 or two
var currentbrushIndex = 0;

function ToggleDitherMode()
{
    dithermode = !dithermode;
}

function incBrushIndex()
{
    currentbrushIndex++;
    if (currentbrushIndex >= 4)
    {
        currentbrushIndex = 4;
    }
}

function decBrushIndex()
{
    currentbrushIndex--;
    if (currentbrushIndex < 0)
    {
        currentbrushIndex = 0;
    }
}


function drawPixel(e)
{
    var color = palette[selectedPalIndexA];
 
    if (IsMouseRightDown)
    {
        color = palette[selectedPalIndexB]
    }

    if (document.fullscreenElement)
    {
        // No draw when fullscreen
        IsMouseLeftDown = false; 
        IsMouseRightDown = false;
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

        var currentBrush = brushes[currentbrushIndex];

        if (dithermode)
        {
            colora = palette[selectedPalIndexA]
            colorb = palette[selectedPalIndexB]
            
            var i=0;
            for(var a=0;a<7;a++)
            {
                for(var b=0;b<7;b++)
                {
                    if (currentBrush[i] == 1)
                    {
                        var ycoord = Math.round(y+b-4);
                        var xcoord = Math.round(x+a-4);

                        if (ycoord%2 == 0)
                        {
                            if (xcoord%2==1)
                            {
                                ctx.putImageData(colora, xcoord, ycoord);  
                            }
                            else
                            {
                                ctx.putImageData(colorb, xcoord, ycoord);  
                            }
                        }
                        else
                        {
                            
                            if (xcoord%2==0)
                            {
                                ctx.putImageData(colora, xcoord, ycoord);  
                            }
                            else
                            {
                                ctx.putImageData(colorb, xcoord, ycoord);  
                            }
                        }
                    }

                    i++;
                }
            }
        }
        else
        {
            var i=0;
            for(var a=0;a<7;a++)
            {
                for(var b=0;b<7;b++)
                {
                    if (currentBrush[i] == 1)
                    {
                        ctx.putImageData(color, x+a-4, y+b-4);  
                    }
                    i++;
                }
            }
        }
    }
}

canvas.addEventListener("mousemove", function (e) {

    if (IsMouseLeftDown || IsMouseRightDown)
    {
        drawPixel(e);
    }

}, false);

canvas.addEventListener("mousedown", function (e) 
{ 
    if (e.button == 0)
    {
        IsMouseLeftDown = true;
    }
    if (e.button == 2)
    {
        IsMouseRightDown = true;
    }
    if (e.button == 0 || e.button == 2)
    {
        drawPixel(e);
    }
}, false);

canvas.addEventListener("mouseup", function (e) 
{ 
    if (e.button == 0)
    {
        IsMouseLeftDown = false;
    }
    if (e.button == 2)
    {
        IsMouseRightDown = false;
    }
}
, false);


var WasMouseLeftDown = false;
var WasMouseRightDown = false;

canvas.addEventListener("mouseout", function (e) 
{ 
    WasMouseLeftDown = IsMouseLeftDown;
    WasMouseRightDown = IsMouseRightDown;

    IsMouseLeftDown = false; 
    IsMouseRightDown = false;
}, false);


canvas.addEventListener("mouseover", function (e) 
{ 
    IsMouseLeftDown = WasMouseLeftDown; 
    IsMouseRightDown = WasMouseRightDown;
}, false);


var pointX = 0;
var pointY = 0;

canvas.addEventListener("mousewheel", function (e) {
    e.preventDefault();
    
    IsMouseLeftDown = false; 
    IsMouseRightDown = false;

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
    var transformString = "scale(" + scale + ")";
    canvas.style.transform = transformString;
    divCanvasBackground.style.transform = transformString;

}, false);