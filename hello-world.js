const canvas = document.getElementById('gameCanvas');
const cxt = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

cxt.fillRect(0, 0, canvas.width, canvas.height);

    const gravity = .2;

    const myEvents = {
        ArrowRight: 25,
        ArrowLeft: 25,
        ArrowUp: 25,
        ArrowDown: 25
    }

class Sprite {

    constructor({ position, color, velocity }){
        this.position = position
        this.color = color
        this.velocity = velocity
        this.height = 150
        this.direction = 'down'
        this.lastKey
    }

    draw = () =>{
        cxt.fillStyle = this.color;
        cxt.fillRect(this.position['x'], this.position['y'], 50, 150);
    }

    update(){
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }

    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 213
    },
    color: 'blue',
    velocity: {
        x: 0,
        y: 0
    }
});

const enemy = new Sprite({
    position: {
    x: canvas.width - 50,
    y: 213
    },
    color: 'red',
    velocity: {
        x: 0,
        y: 0
    }
});

// player.draw();
// enemy.draw();

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

animate = () => {

    window.requestAnimationFrame(animate);
    cxt.fillStyle = 'black'
    cxt.fillRect(0, 0, canvas.width, canvas.height)
    player.update();
    enemy.update();

    //Player Movement
    player.velocity.x = 0;
    if (keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -1
    } else if (keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 1
    } else if (keys.w.pressed && player.lastKey === 'w'){
        player.velocity.y = -7
    }

    //Enemy Movement
    enemy.velocity.x = 0;
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -1
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 1
    }

    if (keys.ArrowUp.pressed){
        enemy.velocity.y = -7
    }
}


animate();

window.addEventListener('keydown', (e) => {

    switch(e.key){
        //Player Keys
        case 'd':
            keys.d.pressed = true;
            player.lastKey = e.key
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = e.key
            break;
        case 'w':
            keys.w.pressed = true;
        case ' ':
            player.velocity.y = -7
            break;

        //Enemy Keys
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = e.key
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = e.key
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            break
    }


})

window.addEventListener('keyup', (e) => {
    switch(e.key){
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
    }
})

const controllers = Joycon.controllers;

const buttons = Object.values(Joycon.buttonMap);

buttons.forEach( button => {

  controllers.on.press(button, (value) => {

    console.log(button + '! ' + value);

    if (value === 1){
        switch(button){
            case 'dpad-right':
                keys.d.pressed = true;
                player.lastKey = 'd'
                break;
            case 'dpad-left':
                keys.a.pressed = true;
                player.lastKey = 'a'
                break;
            case 'a':
                keys.w.pressed = true;
            case ' ':
                player.velocity.y = -7
                break;
        }
    }

    if (value === 0){
        switch(button){
            case 'dpad-right':
                keys.d.pressed = false;
                break;
            case 'dpad-left':
                keys.a.pressed = false;
                break;
            case 'a':
                keys.w.pressed = false;
            case ' ':
                player.velocity.y = -7
                break;
        }
    }

  });
})

// controllers.on.press('dpad-up', (value) => {

//     console.log('pressed up!', value); // value is 0 to 1
//   });

// controllers.on.press('dpad-left', (value) => {

//   console.log('pressed left!', value); // value is 0 to 1
// });

// controllers.on.press('dpad-right', (value) => {

//     console.log('pressed right!', value); // value is 0 to 1
//   });


// controllers.on.press('dpad-down', (value) => {

//     console.log('pressed down!', value); // value is 0 to 1
// });

// controllers.on.press('start', (value) => {

//     console.log('pressed start!', value); // value is 0 to 1
//   });

//   controllers.on.press('start', (value) => {

//     console.log('pressed start!', value); // value is 0 to 1
//   });

// controllers.on.press('start', (value) => {

//   console.log('pressed start!', value); // value is 0 to 1
// });

// controllers.on.press('a', (value) => {

//   console.log('pressed a!', value); // value is 0 to 1

// });

// controllers.on.press('b', (value) => {

//   console.log('pressed b!', value); // value is 0 to 1

// });

// controllers.on.press('x', (value) => {

//     console.log('pressed x!', value); // value is 0 to 1

//   });

// controllers.on.press('y', (value) => {

// console.log('pressed y!', value); // value is 0 to 1

// });


