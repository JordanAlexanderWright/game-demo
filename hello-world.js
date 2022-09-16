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
}

keys['a']['pressed'] = true
console.log(keys)

animate = () => {

    window.requestAnimationFrame(animate);
    cxt.fillStyle = 'black'
    cxt.fillRect(0, 0, canvas.width, canvas.height)
    player.update();
    enemy.update();

    // if (keys.a.pressed){
    //     player.velocity.x = -1
    // } else if (key.d.pressed){
    //     player.velocity.x = 1
    // }
}


animate();

window.addEventListener('keydown', (e) => {

    switch(e.key){
        case 'd':
            player.velocity.x = 1;
            console.log(player.velocity.x);
            break;
        case 'a':
            player.velocity.x = -1;
            console.log(player.velocity.x);
            break;
        case ' ':
            console.log('hello')
            player.velocity.y = -7
    }

})

window.addEventListener('keyup', (e) => {
    switch(e.key){
        case 'd':
            player.velocity.x = 0;
        case 'a':
            player.velocity.x = 0;
    }
})


