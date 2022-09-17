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
    }
}

let lastKey = 'a'

animate = () => {

    window.requestAnimationFrame(animate);
    cxt.fillStyle = 'black'
    cxt.fillRect(0, 0, canvas.width, canvas.height)
    player.update();
    enemy.update();

    player.velocity.x = 0;
    if (keys.a.pressed && lastKey === 'a'){
        player.velocity.x = -1
    } else if (keys.d.pressed && lastKey === 'd'){
        player.velocity.x = 1
    } else if (keys.w.pressed === 'w' && lastKey === 'w'){
        player.velocity.y = -7
    }
}


animate();

window.addEventListener('keydown', (e) => {

    switch(e.key){
        case 'd':
            keys.d.pressed = true;
            lastKey = e.key
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = e.key
            break;
        case 'w':
            keys.w.pressed = true;
        case ' ':
            player.velocity.y = -7
            break;
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
    }
})


