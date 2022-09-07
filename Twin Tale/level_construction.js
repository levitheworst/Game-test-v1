///level_construction\\\

//part of rendering levels and huds
//obs.: greatest part of the levels extend the "LvlSet" class
class Sunset extends LvlSet_SideScroll
{
    constructor({size, position, velocity, gravity, src, srcsize}) {
        super({
            size: size,
            position: position,
            velocity: velocity,
            gravity: gravity,
            src: src,
            srcsize: srcsize
        })

        this.bg = {
            0: {img: new Image()},
            1: {img: new Image(), pos1: {x: 0, y: 0}, pos2: {x: 800, y: 0}},
            2: {img: new Image(), pos1: {x: 0, y: 0}, pos2: {x: 800, y: 0}},
            3: {img: new Image()}
        }
        this.bg[0].img.src = 'sprites/bg/sunset_0.png'
        this.bg[1].img.src = 'sprites/bg/sunset_clouds_0.png'
        this.bg[2].img.src = 'sprites/bg/sunset_clouds_1.png'
        this.bg[3].img.src = 'sprites/bg/sunset_foreground.png'

        this.bgAnimate = 0
        this.bgSpan = 0
        this.fade = 1

        this.entities = {
        }

        this.unload = false
    }
    update() {
        ctx.drawImage(this.bg[0].img, 0, 0, 800, 600, 0, 0, 800, 600)
        ctx.drawImage(this.bg[1].img, 0, 0, 800, 600, this.bg[1].pos1.x, this.bg[1].pos1.y, 800, 600)
        ctx.drawImage(this.bg[1].img, 0, 0, 800, 600, this.bg[1].pos2.x, this.bg[1].pos2.y, 800, 600)
        ctx.drawImage(this.bg[2].img, 0, 0, 800, 600, this.bg[2].pos1.x, this.bg[2].pos1.y, 800, 600)
        ctx.drawImage(this.bg[2].img, 0, 0, 800, 600, this.bg[2].pos2.x, this.bg[2].pos2.y, 800, 600)
        this.player.update()
        ctx.drawImage(this.bg[3].img, 0, 0, 800, 600, 0, 0, 800, 600)

        ctx.fillStyle = 'rgba(0, 0, 0, '+this.fade+')'
        ctx.fillRect(0, 0, 800, 600)

        this.bg[0].src = 'sprites/bg/sunset_'+this.bgAnimate+'.png'

        this.bgSpan++
        if(this.bgSpan == 40) 
        {
            this.bgAnimate++
            this.bg[1].pos1.x-=5
            this.bg[1].pos2.x-=5
            this.bg[2].pos1.x-=10
            this.bg[2].pos2.x-=10
        }
        this.bg[1].pos1.x + 800 <= 0 ? this.bg[1].pos1.x = 800 : false
        this.bg[1].pos2.x + 800 <= 0 ? this.bg[1].pos2.x = 800 : false
        this.bg[2].pos1.x + 800 <= 0 ? this.bg[2].pos1.x = 800 : false
        this.bg[2].pos2.x + 800 <= 0 ? this.bg[2].pos2.x = 800 : false
        this.bgAnimate > 2 ? this.bgAnimate = 0 : false
        this.bgSpan > 40 ? this.bgSpan = 1 : false
        
        //collisions
        if(this.player.position.x >= 800)
        {
            this.player.velocity.x = 0
            this.player.velocity.y = 0
            this.unload = true
        }
        if(this.player.position.x + this.player.velocity.x <= 0)
        {
            this.player.velocity.x = 0
            this.player.position.x = 0
        }
        if(this.player.position.y + this.player.size.y + this.player.velocity.y >= 600)
        {
            this.player.velocity.y = 0
            this.player.position.y = 600-this.player.size.y
        }
        if(this.player.position.y + this.player.velocity.y <= 0)
        {
            this.player.velocity.y = 0
            this.player.position.y = 0
            this.player.isGrounded = true
        }
        
        this.player.position.y + this.player.size.y >= 600 ? this.player.isGrounded = true : false

        if(this.unload && this.fade < 1) 
        {
            this.fade += 0.05
            if(this.fade >= 1)
            lvlLoad = new Home_PlayerRoom({
                size: {x: 128, y: 160},
                position: {x: 300, y: 300},
                velocity: {x: 0, y: 0},
                src: 'sprites/entities/dan/dan_spritesheet.png',
                srcsize: {x: 128, y: 160}
            })
        }
        else if(this.fade > 0) this.fade -= 0.1
    }
}
class Home_PlayerRoom extends LvlSet_Isometric
{
    constructor({size, position, velocity, src, srcsize}) {
        super({
            size: size,
            position: position,
            velocity: velocity,
            src: src,
            srcsize: srcsize
        })

        this.bg = new Image()
        this.bg.src = 'sprites/levels/home_player_room.png'

        this.fade = 1

        this.entities = {
            //door
            0: new gameObject({
                size: {x: 104, y: 181},
                position: {x: 250, y: 70},
                velocity: {x: 0, y: 0},
                src: 'sprites/misc/door',
                srcsize: {x: 128, y: 250}
            })
        }
        this.unload = false
    }
    update() {
        ctx.drawImage(this.bg, 0, 0, 800, 600, 0, 0, 800, 600)
        this.entities[0].update()
        this.player.update()

        ctx.fillStyle = 'rgba(0, 0, 0, '+this.fade+')'
        ctx.fillRect(0, 0, 800, 600)

        //colisões
        if(this.player.position.x + this.player.size.x + this.player.velocity.x >= 650)
        {
            this.player.velocity.x = 0
            this.player.position.x = 650-this.player.size.x
        }
        if(this.player.position.x + this.player.velocity.x <= 150)
        {
            this.player.velocity.x = 0
            this.player.position.x = 150
        }
        if(this.player.position.y + this.player.size.y + this.player.velocity.y >= 595)
        {
            this.player.velocity.y = 0
            this.player.position.y = 595-this.player.size.y
        }
        if(this.player.position.y + this.player.velocity.y <= 105)
        {
            this.player.velocity.y = 0
            this.player.position.y = 105
        }

        if(this.unload && this.fade < 1) 
        {
            this.fade += 0.05
            if(this.fade >= 1)
            lvlLoad = new Home_PlayerRoom({
                size: {x: 128, y: 160},
                position: {x: 300, y: 300},
                velocity: {x: 0, y: 0},
                src: 'sprites/entities/dan/dan_spritesheet.png',
                srcsize: {x: 128, y: 160}
            })
        }
        else if(this.fade > 0) this.fade -= 0.1
    }
}

//level loading
let lvlLoad = new Sunset({
    size: { x: 97, y: 144 },
    position: { x: 275, y: 556 },
    velocity: { x: 0, y: 0 },
    gravity: 1,
    src: 'sprites/entities/dan/dan_side_spritesheet.png',
    srcsize: { x: 97, y: 144},
    faceright: true
});
gameGeneralFunction()
function gameGeneralFunction() {
    window.requestAnimationFrame(gameGeneralFunction)
    ctx.clearRect(0, 0, 800, 600)
    lvlLoad.update()
}