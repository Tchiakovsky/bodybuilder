/*
diet,
stress(one week away)
fame,
more fame more stress
happiness(goes down if not in bed by 8: 30) or energy is low < 0

*/
var daysLeft = 30;
var isDay = true;
var newDay = false;
var player;
var buttons = [];
var screenWidth = 600, screenHeight = 400, player;
var colorsUnlocked = [true, true, true, false, false, false, false, false, false, false, false, false, false, false];
var daTime = "8:00 AM";
var keys = {};
var img;
keyPressed = function () {
    keys[keyCode] = keys[key.toString().toLowerCase()] = true;
};
keyReleased = function () {
    keys[keyCode] = keys[key.toString().toLowerCase()] = false;
};



function time(data) {
    var minutes = floor(data / 3600);
    var seconds = ((data / 60) % 60).toFixed(2);
    if (seconds < 10) { seconds = "0" + seconds; }
    if (minutes < 10) { minutes = "0" + minutes; }
    return minutes + ":" + seconds;
}

function setup() {
    createCanvas(screenWidth, screenHeight);
    player.colors = [
        color(255, 0, 0)
    ];
    buttons = [
        new Button(100, 200, false, function () { console.log(":P"); }, "BUTTON", color(20), color(255))
    ];
    img = createGraphics(screenWidth, screenHeight, P2D);
    
} 

var mouse = {
    get x() { return mouseX / screenWidth; },
    get y () { return mouseY / screenHeight; },
};

function dist() {
    var s = Math.sqrt;
    return function (x1, x2, x2, y2) {
        var dx = x2 - x1, dy = y2 - y1;
        return s(dx * dx + dy * dy);
    }
}

function Button(x, y, isRect, onClick, text, color, textColor) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.isRect = isRect;
    this.minR = 50;
    this.r = this.minR;
    this.maxR = 60;
    this.onClick = onClick || function () {};
    this.w = 60;
    this.h = 60;
    this.color = color;
    this.textColor = textColor;
};

Button.prototype.over = function () {
        if (!this.isRect) {
             return dist(mouse.x, mouse.y, this.x, this.y) <= this.r;
        } else {
            return mouse.x >= this.x && mouse.x <= this.x + this.w &&
               mouse.y >= this.y && mouse.y <= this.y + this.h;
        }  
};

Button.prototype.draw = function() {
    this.w = this.text.length * 5;
    if (!this.isRect && this.over()) {
        this.r = this.maxR;
    }
    fill(this.color);
    if (this.isRect) {
        rect(this.x, this.y, this.w, this.h);
    } else {
        ellipse(this.x, this.y, this.r, this.r);
    }
    if (this.over() && mouseIsPressed) {
        this.onClick();
    }
    fill(this.textColor);
    text(this.text, this.x - 20, this.y);
};

var achs = {
    begin: {
        name: "Getting Started",
        description: "Do your first workout"
    }
};
    
var drawLock = function(x, y, scaleSize) {
    scale(scaleSize, scaleSize);
    text('🔒', x, y)
};

    
var AchievementGet = function (index) {
    this.x = -200;
    this.life = 1000;

    this.draw = function () {
        fill(196, 196, 196, this.life);
        stroke(64, 64, 64, this.life);
        strokeWeight(5);
        rect(this.x, 450, 200, 80, 5);
        fill(64, 64, 64, this.life);
        textFont(createFont('Trebuchet MS Bold'), 20);
        textAlign(LEFT, TOP);
        text(achs[index].name + '🏆', this.x + 5, 455);
        textFont(createFont('Trebuchet MS'), 15);
        text(achs[index].description, this.x + 5, 475, 190, Infinity);
        this.life -= 5;
        this.x = constrain(this.x + 10, -Infinity, 50);
    };
};

var Food = function (x, y, onClick, text, type) {
    this.x = x;
    this.y = y;
    this.onClick = onClick || function() {};
    this.text = text;
    this.type = type;
    this.stats = {
        protein: 0,
        carbs: 0,
        sugar: 0,
        fats: 0
    };
    this.over = function () {
        return mouse.x >= this.x && mouse.x <= this.x + this.w &&
               mouse.y >= this.y && mouse.y <= this.y + this.h;
    };
};

Food.prototype.draw = function() {
    rect(this.x, this.y, 50, 50);
    pushMatrix();
    scale(50);
    popMatrix();
    switch(this.type) {
        case "Pizza":
        text("🍕 ", this.x, this.y);
        this.stats = {};
        break;
        case "HamBurger":
        text("🍔", this.x, this.y);
        this.stats = {};
        break;
        case "StrawBerry":
        text("🍓", this.x, this.y);
        this.stats = {
            protein: 0,
            fats: 0,
            carbs: 3
        };
        break;
        case "Grape":
        text("🍇", this.x, this.y);
        this.stats = {
            protein: 0,
            fats: 0,
            carbs: 9
        };
        break;
        case "Apple":
        text("🍎", this.x, this.y);
        this.stats = {
            protein: 0,
            fats: 0,
            carbs: 5
        };
        break;
        case "WaterMelon":
        text("🍉", this.x, this.y);
        this.stats = {
            protein: 0,
            fats: 0,
            carbs: 4
        };
        break;
        case "Egg":
        text("🍳", this.x, this.y);
        this.stats = {
            protein: 10,
            fats: 0,
            carbs: 0
        };
        break;
        case "Sushi": 
        text('🍣', this.x, this.y);
        this.stats = {
            protein: 0,
            fats: 6,
            carbs: 0
        };
        case "IceCream":
        text("🍦", this.x, this.y);
        this.stats = {};
        break;
        case "Cake":
        text("🍰", this.x, this.y);
        this.stats = {};
        break;
        case "FrenchFry":
        text("🍟", this.x, this.y);
        this.stats = {};
        break;
    }
};

var EnergyDrinks = function () {};

var BodyBuilder = function (x, y, stats) {
    this.x = x;
    this.y = y;
    this.stats = stats || {
        arms: 5, 
        back: 5, 
        legs: 5,
        speed: 4
    };
    this.diet = {
        protein: 0,
        fats: 0,
        carbs: 0,
        sugar: 0
    };
    this.bux = 31;
    this.colors = [];
    this.currColor = 0;
    this.color = this.colors[this.currColor];
    this.level = 1;
    this.exp = 0;
    this.maxExp = this.level * 5;
   
    this.expGained = this.level * 10;
    this.energy = this.level * 100;
    this.hunger = this.level;
    this.fame = 0;
    //for next day
    this.tiredness = 0;
    if (this.energy < 0) {
        this.tiredness = abs(this.energy);
    }
    if (newDay) {
        this.energy - (this.tiredness * 10);
    }
};

BodyBuilder.prototype.draw = function () {
    fill(255, 0, 0);
    ellipse(200, 200, 60, 60); 
    strokeWeight(3);
    line(170, 210, 230, 210);
};
player = new BodyBuilder({});

draw = function () {
   // player.draw();
    buttons[0].draw();
};