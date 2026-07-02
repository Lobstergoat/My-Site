let heightMap = [];
let res = 8;
let thresh = 5;

let bgCanvas;
let resizeTimer;

let darkBGColour = "#0e2431";
let darkLineColour = "#9aa6b2";
let lightBGColour = "#e3e3e3";
let lightLineColour = "#333333";

let bgColour = darkBGColour;
let lineColour = darkLineColour;
let currentTheme = 0;

let noiseSeedValue = Math.floor(Math.random() * 1000000);

function setup() {
    bgCanvas = createCanvas(window.innerWidth, window.innerHeight);

    bgCanvas.id("p5-background");
    bgCanvas.position(0, 0);
    bgCanvas.style("position", "fixed");
    bgCanvas.style("top", "0");
    bgCanvas.style("left", "0");
    bgCanvas.style("width", "100vw");
    bgCanvas.style("height", "100vh");
    bgCanvas.style("z-index", "0");
    bgCanvas.style("pointer-events", "none");

    noLoop();

    noiseSeed(noiseSeedValue);
    genHMap();
    draw();
}

function genHMap() {
    heightMap = [];

    let rand = Math.floor(Math.random() * 51) + 50;

    for (let i = 0; i < 1 + width / res; i++) {
        heightMap[i] = [];

        for (let j = 0; j < 1 + height / res; j++) {
            heightMap[i][j] = noise(i / rand, j / rand) * rand;
        }
    }
}

function draw() {
    background(bgColour);
    stroke(lineColour);
    strokeWeight(1);

    for (let i = 0; i < 1 + width / res; i++) {
        for (let j = 0; j < 1 + height / res; j++) {
            if (i < width / res && j < height / res) {
                let a = floor(heightMap[i][j] / thresh);
                let b = floor(heightMap[i + 1][j] / thresh);
                let c = floor(heightMap[i][j + 1] / thresh);
                let d = floor(heightMap[i + 1][j + 1] / thresh);

                let ab = 0;
                let ac = 0;
                let bcx = 0;
                let bcy = 0;
                let bd = 0;
                let cd = 0;

                if (a !== b) {
                    let contourValue = thresh * max(a, b);
                    let diff = abs(heightMap[i][j] - heightMap[i + 1][j]);
                    let add = abs(heightMap[i][j] - contourValue);

                    if (diff !== 0) {
                        ab = i * res + res * add / diff;
                    }
                }

                if (a !== c) {
                    let contourValue = thresh * max(a, c);
                    let diff = abs(heightMap[i][j] - heightMap[i][j + 1]);
                    let add = abs(heightMap[i][j] - contourValue);

                    if (diff !== 0) {
                        ac = j * res + res * add / diff;
                    }
                }

                if (c !== d) {
                    let contourValue = thresh * max(c, d);
                    let diff = abs(heightMap[i][j + 1] - heightMap[i + 1][j + 1]);
                    let add = abs(heightMap[i][j + 1] - contourValue);

                    if (diff !== 0) {
                        cd = i * res + res * add / diff;
                    }
                }

                if (b !== c) {
                    let contourValue = thresh * max(b, c);
                    let diff = abs(heightMap[i + 1][j] - heightMap[i][j + 1]);
                    let add = abs(heightMap[i + 1][j] - contourValue);

                    if (diff !== 0) {
                        bcx = (i + 1) * res - res * add / diff;
                        bcy = j * res + res * add / diff;
                    }
                }

                if (b !== d) {
                    let contourValue = thresh * max(b, d);
                    let diff = abs(heightMap[i + 1][j] - heightMap[i + 1][j + 1]);
                    let add = abs(heightMap[i + 1][j] - contourValue);

                    if (diff !== 0) {
                        bd = j * res + res * add / diff;
                    }
                }

                if (ab) {
                    if (ac) {
                        line(ab, j * res, i * res, ac);
                    }

                    if (bcx || bcy) {
                        line(ab, j * res, bcx, bcy);
                    }
                } else if (ac) {
                    if (bcx || bcy) {
                        line(i * res, ac, bcx, bcy);
                    }
                }

                if (cd) {
                    if (bd) {
                        line(cd, (j + 1) * res, (i + 1) * res, bd);
                    }

                    if (bcx || bcy) {
                        line(cd, (j + 1) * res, bcx, bcy);
                    }
                } else if (bd) {
                    if (bcx || bcy) {
                        line((i + 1) * res, bd, bcx, bcy);
                    }
                }
            }
        }
    }
}
function refreshBackground() {
    resizeCanvas(window.innerWidth, window.innerHeight);

    noiseSeed(noiseSeedValue);
    genHMap();
    draw();
}

function regenerateBackground() {
    noiseSeedValue = Math.floor(Math.random() * 1000000);

    noiseSeed(noiseSeedValue);
    genHMap();
    draw();
}

function resizeAndRegenerateBackground() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    regenerateBackground();
}

function queueBackgroundResize() {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function () {
        resizeAndRegenerateBackground();
    }, 250);

    // Extra delayed redraw for browser zoom settling
    setTimeout(function () {
        resizeAndRegenerateBackground();
    }, 700);
}

function windowResized() {
    queueBackgroundResize();
}

function changeTheme() {
    if (currentTheme === 0) {
        bgColour = lightBGColour;
        lineColour = lightLineColour;
        currentTheme = 1;
    } else {
        bgColour = darkBGColour;
        lineColour = darkLineColour;
        currentTheme = 0;
    }

    document.body.style.backgroundColor = bgColour;
    draw();
}

document.addEventListener("DOMContentLoaded", function () {
    const bgBtn = document.querySelector(".bg-btn");

    if (bgBtn) {
        bgBtn.addEventListener("click", regenerateBackground);
    }

    window.addEventListener("resize", queueBackgroundResize);

    if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", queueBackgroundResize);
    }

    window.addEventListener("wheel", function (event) {
        if (event.ctrlKey) {
            queueBackgroundResize();
        }
    }, { passive: true });

    setTimeout(refreshBackground, 300);
});