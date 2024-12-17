const canvas = /** @type {CanvasRenderingContext2D} */ document.getElementById("draw");
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.strokeStyle = '#BADA55';
context.lineJoin = 'round';
context.lineCap = 'round';


let isDrawing = false;
/* let lastX = 0,  lastY = 0; */
let initialHue = 0;

function currentPoints() {
    let lastPoints = {
        x: 0,
        y: 0,
    };

    return {
        getPoints: function () {
            return lastPoints;
        },
        setPoints: function(x,y) {
            lastPoints = {
                x: x,
                y: y,
            }
        }
    };
};

const points = currentPoints();

function draw(e) {
    if (!isDrawing) {
        return
    }
    context.strokeStyle = `hsl(${initialHue}, 100%, 50%)`;
    context.lineWidth = initialHue;
    context.beginPath();
    context.moveTo(points.getPoints().x, points.getPoints().y);
    // context.moveTo(lastX, lastY);
    context.lineTo(e.x, e.y);
    context.stroke();
    points.setPoints(e.x, e.y);
    // [lastX, lastY] = [e.x, e.y]
    initialHue = (initialHue + 1) % 360;
    console.log(initialHue);
    // points.setPoints(e.x, e.y);
}

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    console.log(e);
    points.setPoints(e.x, e.y);
    //[lastX, lastY] = [e.x, e.y]
});


canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);

