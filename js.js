class Vechicle {
    constructor(name, vMax, accel, aero, texture) {
        this.name = name;
        this.vMax = vMax;
        this.accel - accel;
        this.aero = aero;
        this.texture = texture
    }
}

class Score {
    constructor(time, timescore) {
        this.time = time;
        this.timescore = timescore;
    }
}

const maluszek = new Vechicle('Maluch', 3, 3, 1, "img/cars/maluch.png")

let x = 0;
let y = 0;
let cx = 315;
let cy = 220;
let angle = 1;
let speed = 0;
let minus = -0.2;
let GamePadUp;
let GamePadDown;
let GamePadLeft;
let GamePadRight;
let HandBrake;
let concret;
let key = 254;
let cut;
let start;
let ms = 0;
let mss = 0;
let s = 0;
let min = 0;
let valid = false;
let score_valid;
let checked;
let highscore = 0;
let logged;


var ing = new Image();
var img = new Image();
var finish = new Image();




document.addEventListener('keydown', function(e) {
    if (e.key == 'ArrowUp') {
        GamePadUp = true;
    }
    if (e.key == 'ArrowDown') {
        GamePadDown = true;

    }
    if (e.key == 'ArrowLeft') {
        GamePadLeft = true;
    }
    if (e.key == 'ArrowRight') {
        GamePadRight = true;
    }
    if (e.key == ' ') {
        HandBrake = true;
    }

}, false);

document.addEventListener('keyup', function(d) {
    if (d.key == 'ArrowUp') {
        GamePadUp = false;
    }
    if (d.key == 'ArrowDown') {
        GamePadDown = false;
    }
    if (d.key == 'ArrowLeft') {
        GamePadLeft = false;
    }
    if (d.key == 'ArrowRight') {
        GamePadRight = false;
    }
    if (d.key == ' ') {
        HandBrake = false;
    }
}, false);

function preloader() {


    ing.src = "img/track.png";
    img.src = "img/cars/Maluch.png";
    finish.src = "img/finish.png";
    return img, ing, start
}
//FUNKCJA PRZEŁĄCZAJĄCA GRE Z MENU
function toogle_menu() {
    let showed_menu = document.getElementById("menu");
    let showed_game = document.getElementById('cava');
    let lead_button = document.getElementById('lead_button');
    let lap = document.getElementById('lap');
    showed_menu.style.display = "block"
    if (showed_menu.style.display === "block") {
        showed_menu.style.display = "none";
        showed_game.style.display = "block";
        lap.style.display = "block";
        lead_button.style.display = "block";

        preloader()
        gameLoop()
        resist()
        let highscore = new Score(localStorage.time, localStorage.score)
        return highscore
    } else {
        showed_menu.style.display = "block";
        showed_game.style.display = "none";
        lead_button.style.display = "none";

    }
}
//FUNKCJA PRZEŁĄCZAJĄCA GRE Z SCOREM/SCIAGA CZAS Z COOKIES
function highscores() {
    let showed_game = document.getElementById('cava');
    let showed_lead = document.getElementById('leaderboard');
    let down_button = document.getElementById('Download');
    if (highscore.time == undefined) {
        let stor = Number(localStorage.getItem("high_monza"))
        let stored_ms = stor % 1000
        let stored_s = ((stor % 3600) - stored_ms) / 100
        let stored_min = ((stored_s % 3600) - stored_s) / 60

        highscore = new Score(`${stored_min}:${stored_s}:${stored_ms}`, stor)
        console.log(highscore.time)
    }
    if (showed_lead.style.display === "none") {
        showed_game.style.display = "none";
        showed_lead.style.display = "block";
        down_button.style.display = "block";
        document.getElementById('leaderboard').innerHTML = 'NAJLEPSZY CZAS: ' + highscore.time;

    } else {
        showed_game.style.display = "block";
        showed_lead.style.display = "none";
        down_button.style.display = "none";
    }
    return highscore
}

//CANVAS
img.onload = function drawcar() {
    var canvas = document.getElementById('MyCanvas');
    var playerCtx = canvas.getContext('2d');
    playerCtx.save()
    playerCtx.clearRect(0, 0, 1440, 900)
    playerCtx.drawImage(ing, 0, 0)
    playerCtx.drawImage(finish, 222, 500);

    playerCtx.translate(cx, cy)
    playerCtx.rotate((angle + 90) * Math.PI / 180)
    playerCtx.drawImage(img, -60, -20);

    playerCtx.fillStyle = 'red'
    playerCtx.restore()
    playerCtx.beginPath()
    playerCtx.moveTo(214, 232)
    playerCtx.lineTo(214, 628)
    playerCtx.quadraticCurveTo(230, 820, 436, 838)
    playerCtx.lineTo(1062, 838)
    playerCtx.quadraticCurveTo(1250, 830, 1285, 629)
    playerCtx.lineTo(1285, 434)
    playerCtx.quadraticCurveTo(1250, 242, 1042, 252)
    playerCtx.quadraticCurveTo(1000, 25, 818, 25)
    playerCtx.lineTo(818, 25)
    playerCtx.lineTo(425, 25, )
    playerCtx.quadraticCurveTo(220, 35, 214, 232)
    concret = playerCtx.isPointInPath(cx, cy);
    playerCtx.fillStyle = "transparent"
    playerCtx.fill()

    playerCtx.beginPath()
    playerCtx.moveTo(405, 230)
    playerCtx.lineTo(405, 620)
    playerCtx.quadraticCurveTo(420, 650, 430, 645)
    playerCtx.lineTo(1060, 650)
    playerCtx.quadraticCurveTo(1080, 640, 1080, 615)
    playerCtx.lineTo(1085, 441)
    playerCtx.quadraticCurveTo(1080, 420, 1056, 421)
    playerCtx.quadraticCurveTo(860, 405, 845, 232)
    playerCtx.quadraticCurveTo(845, 210, 820, 210)
    playerCtx.lineTo(425, 210)
    playerCtx.quadraticCurveTo(405, 210, 405, 230)
    cut = playerCtx.isPointInPath(cx, cy);
    playerCtx.fillStyle = "transparent"
    playerCtx.fill()


    playerCtx.beginPath()
    playerCtx.moveTo(224, 502)
    playerCtx.lineTo(393, 502)
    playerCtx.lineTo(393, 532)
    playerCtx.lineTo(224, 532)
    playerCtx.lineTo(224, 502)
    start = playerCtx.isPointInPath(cx, cy);
    playerCtx.fillStyle = "transparent"
    playerCtx.fill()
    playerCtx.beginPath()
    playerCtx.moveTo(1090, 530)
    playerCtx.lineTo(1272, 530)
    playerCtx.lineTo(1272, 540)
    playerCtx.lineTo(1090, 540)
    playerCtx.lineTo(1090, 530)
    check = playerCtx.isPointInPath(cx, cy);
    playerCtx.fillStyle = "transparent"
    playerCtx.fill()





    //VALIDACJA LAPA I FIZYKA

    if (concret == true) {
        multi = 1

    } else if (concret == false) {
        multi = 2
        valid = false
    }

    if (check == true) {
        checked = true
    }


    if (cut == true) {
        console.log("CIĘCIE")
        valid = false
    }

    if (valid == false) {
        czas.style.color = "red"
    } else {
        czas.style.color = "black"
    }

    if (start == true && valid == true && checked == true && ms >= 5 && s != 0) {
        const lap = document.getElementById("czas").textContent;
        var paragraph = document.getElementById("lap");
        paragraph.textContent += lap + '\n';
        let newscore = new Score(`${min}:${s}:${ms}`, ms + s * 1000 + min * 3600)
        high(newscore)
        console.log("lap")
        checked = false
    }
    valid = true
    ms = 0
    s = 0
    min = 0



    if (angle >= 360) {
        angle -= 360
    }
    cx += speed * Math.sin(-angle * Math.PI / 180)
    cy += speed * Math.cos(-angle * Math.PI / 180)

    //STEROWANIE

    if (GamePadUp == true) {
        if (speed < maluszek.vMax) {
            speed += 0.15 / multi
        } else if (speed >= maluszek.vMax) {
            speed = maluszek.vMax
        }
    }

    if (GamePadDown == true) {
        if (speed < maluszek.vMax / multi && speed > 0) {
            speed -= (0.5 * maluszek.aero) / multi
            console.log("tył")

        } else if (speed > -maluszek.vMax && speed <= 0) {
            speed -= maluszek.aero / multi


        } else if (speed <= -maluszek.vMax / multi) {
            speed = -maluszek.vMax / multi

        }
    }

    if (GamePadRight == true && speed >= 0) {
        if (speed != 0) {
            angle += 0.3 * maluszek.aero
        } else if (speed == 0) {
            angle += 0.1 * maluszek.aero
        }
    }

    if (GamePadLeft == true && speed >= 0) {
        if (speed != 0) {
            angle -= 0.6 * maluszek.aero / multi
        } else if (speed == 0) {
            angle -= 0.1 * maluszek.aero / multi
        }
    }

    if (GamePadRight == true && speed < 0) {
        if (speed != 0) {
            angle -= 0.3 * maluszek.aero
        } else if (speed == 0) {
            angle -= 0.1 * maluszek.aero
        }
    }

    if (GamePadLeft == true && speed < 0) {
        if (speed != 0) {
            angle += 0.3 * maluszek.aero / multi
        } else if (speed == 0) {
            angle += 0.1 * maluszek.aero / multi
        }
    }

    if (HandBrake == true) {
        if (speed < 0) {
            speed += 0.1
        } else if (speed > 0) {
            speed -= 0.1
        }

    }

    if (cx > 1440) {
        cx = 315
        cy = 230
        speed = 0
        angle = 0
    } else if (cx < 0) {
        cx = 315
        cy = 230
        speed = 0
        angle = 0
    } else if (cy < 0) {
        cx = 315
        cy = 230
        speed = 0
        angle = 0
    } else if (cy > 900) {
        cx = 315
        cy = 230
        speed = 0
        angle = 0
    }





}

//MAIN LOOP

function gameLoop() {
    timer()
    img.onload()
    setTimeout(gameLoop, 16);
}

function resist() {
    if (GamePadUp != true || GamePadDown != true) {
        if (speed > 0) {
            speed -= 0.2 / maluszek.aero
        } else if (speed < 0) {
            speed += 0.2 / maluszek.aero
        } else if (speed > -0.1 && speed < 0.2) {
            speed = 0
        }
    }
    setTimeout(resist, 100)
}
//DEBUG TOOL
function handler(e) {
    e = e || window.event;

    var pageX = e.pageX;
    var pageY = e.pageY;
    console.log(pageX, pageY);
}
//TIMER
function timer() {
    ms += 16
    if (ms >= 1000) {
        ms -= 1000
        s += 1
    }
    if (s >= 60) {
        s -= 60
        min += 1
    }

    (document.getElementById("czas").innerHTML = `${min}:${s}:${ms}`);




}

//POBIERA I WYSYLA HIGSCORE Z LOCALSTORA + POROWNUJE CZY CZAS BYL NAJSZYBSZY

function high(d) {
    let score_high = highscore.timescore
    let score_valid = typeof score_high === 'number' && score_high !== null
    console.log(score_valid)
    if (score_valid == true) {
        if (d.timescore < highscore.timescore) {
            highscore = d
            localStorage.clear()
            console.log('HIGHSCORE!  = ' + highscore.time)
            stored_score = String(highscore.timescore)
            localStorage.setItem("high_monza", stored_score)
            var stored = Number(localStorage.getItem("high_monza"))
            console.log(stored)

        } else if (d.timescore > highscore.timescore) {

            console.log('Byłes lepszy  = ' + highscore.time)
        }
    } else if (score_valid == false) {
        highscore = d
        stored_score = String(highscore.timescore)
        localStorage.setItem("high_monza", stored_score)
        var stored = Number(localStorage.getItem("high_monza"))
        console.log(stored)

    }
    return localStorage

}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function download_validation() {
    let inside = key * Number(localStorage.getItem("high_monza"));
    download("vaild.mys", inside)
}


function acc() {
    if (localStorage.getItem("logged_id") == undefined) {
        logged = false
    } else {
        logged = true
    }
}





if (document.attachEvent) document.attachEvent('onclick', handler);
else document.addEventListener('click', handler);