///global_classes\\\

class Player_Isometric
{
    constructor({size, position, velocity, src, srcsize})
    {
        this.size = size
        this.position = position
        this.velocity = velocity
        
        this.img = new Image()
        this.img.src = src
        this.srcsize = srcsize

        this.frame = 1
        this.frameState = 0
        this.framePerState = 3
        this.frameSpan = 10
        this.frameSpanLimit = 10
        this.frameCountIsProgressive = true

        this.interact = {
            size: {x: 2*this.size.x/3, y: 2*this.size.y/3}, 
            position: {x: this.position.x + 1*this.size.x/6, y: this.position.y + 1*this.size.y/6},
            toggle: false
        }
    }
    render()
    {
        if(userInput.e)ctx.fillRect(this.interact.position.x, this.interact.position.y, this.interact.size.x, this.interact.size.y)

        ctx.drawImage(this.img,
                (this.frame+(this.framePerState*this.frameState))*this.srcsize.x, 0,
                this.srcsize.x, this.srcsize.y,
                this.position.x, this.position.y,
                this.size.x, this.size.y
            )
    }
    update()
    {
        this.render()

        //física\\
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.interact.position.x = this.position.x + 1*this.size.x/6
        this.interact.position.y = this.position.y + 1*this.size.y/6
        //física\\

        //controles\\
        if(!userInput.up && !userInput.down)
        {
            this.velocity.y = 0;
        }
        else
        {
            if(userInput.up)
            {
                this.velocity.y = -8
            }
            if(userInput.down)
            {
                this.velocity.y = 8
            }
        }
        if(!userInput.left && !userInput.right)
        {
            this.velocity.x = 0;
        }
        else
        {
            if(userInput.left)
            {
                this.velocity.x = -8
            }
            if(userInput.right)
            {
                this.velocity.x = 8
            }
        }
        if(userInput.e)
        {
            this.interact.toggle = true
        }
        else this.interact.toggle = false

        //animation\\
            //frame control
        if(this.frame >= 2)
        {
            this.frameCountIsProgressive = false
        }
        else if(this.frame == 0)
        {
            this.frameCountIsProgressive = true
        }
            //sprite direction control
        this.velocity.y < 0 ? this.frameState = 3 : false
        this.velocity.y > 0 ? this.frameState = 0 : false
        this.velocity.x < 0 ? this.frameState = 1 : false
        this.velocity.x > 0 ? this.frameState = 2 : false
            //frame increase/decrease (on moving)
        if(this.velocity.x != 0 | this.velocity.y != 0)
        {
            if (this.frameCountIsProgressive && this.frameSpan % this.frameSpanLimit == 0) {
                this.frame++
            }
            else if (this.frameSpan % this.frameSpanLimit == 0) {
                this.frame--
            }
            this.frameSpan++
            if(this.frameSpan > 100)
            this.frameSpan = 0
        }
        else
        {
            this.frameSpan = 10
            this.frame = 1
        }
    }
}
class Player_SideScroll
{
    constructor({size, position, velocity, gravity, src, srcsize, faceright})
    {
        this.size = size
        this.position = position
        this.velocity = velocity
        this.gravity = gravity
        this.faceright = faceright
        this.isGrounded = true

        this.img = new Image()
        this.img.src = src
        this.srcsize = srcsize

        this.frame = 1
        this.frameState = 0
        this.framePerState = 4
        this.frameSpan = 10
        this.frameSpanLimit = 10
        this.frameCountIsProgressive = true

        this.interact = {
            size: {x: 2*this.size.x/3, y: 2*this.size.y/3}, 
            position: {x: this.position.x + 1*this.size.x/6, y: this.position.y + 1*this.size.y/6},
            toggle: false
        }
    }
    render()
    {
        if(userInput.e)ctx.fillRect(this.interact.position.x, this.interact.position.y, this.interact.size.x, this.interact.size.y)

        ctx.drawImage(this.img,
                (this.frame+(this.framePerState*this.frameState))*this.srcsize.x, 0,
                this.srcsize.x, this.srcsize.y,
                this.position.x, this.position.y,
                this.size.x, this.size.y
            )
    }
    update()
    {
        if(this.faceright) 
        {
            this.faceright = false
            this.frameState = 1
        }
        this.render()

        //física\\
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.y += this.gravity

        this.interact.position.x = this.position.x + 1*this.size.x/6
        this.interact.position.y = this.position.y + 1*this.size.y/6
        //física\\

        //controles\\
        if(userInput.up && this.isGrounded)
        {
            this.velocity.y = -16
            this.isGrounded = false
        }
        if(!userInput.left && !userInput.right)
        {
            this.velocity.x > 0 ? this.velocity.x -= 0.5 : false
            this.velocity.x < 0 ? this.velocity.x += 0.5 : false
        }
        else
        {
            if(userInput.left && this.velocity.x > -8)
            {
                this.velocity.x -= 2
            }
            if(userInput.right && this.velocity.x < 8)
            {
                this.velocity.x += 2
            }
        }
        if(userInput.e)
        {
            this.interact.toggle = true
        }
        else this.interact.toggle = false

        //animation\\
            //frame control
        if(this.frame >= 2)
        {
            this.frameCountIsProgressive = false
        }
        else if(this.frame == 0)
        {
            this.frameCountIsProgressive = true
        }
            //sprite direction control
        this.velocity.x < 0 ? this.frameState = 0 : false
        this.velocity.x > 0 ? this.frameState = 1 : false
            //frame increase/decrease (on moving)
        if(this.velocity.x != 0)
        {
            if (this.frameCountIsProgressive && this.frameSpan % this.frameSpanLimit == 0) {
                this.frame++
            }
            else if (this.frameSpan % this.frameSpanLimit == 0) {
                this.frame--
            }
            this.frameSpan++
            if(this.frameSpan > 100)
            this.frameSpan = 0
        }
        else
        {
            this.frameSpan = 10
            this.frame = 1
        }
        if(!this.isGrounded) 
        {
            this.frame = 3
        }
    }
}
class TitleScreen
{
    constructor()
    {
        this.selection = 0

        this.playButton = new Image()
        this.playButton.src = 'sprites/misc/play_button.png'
        this.playButtonSpritestate = 'selec'
    }
    render()
    {
        ctx.drawImage(this.playButton, 0, 0, 128, 64, canvas.width/4, canvas.height/4, canvas.width/2, 16*canvas.width/2/32)
    }
    update()
    {
        this.render()
        this.playButton.src = 'sprites/misc/play_button_'+this.playButtonSpritestate+'.png'
        
        if(userInput.up) {
            userInput.up = false
            this.selection--
        }
        else if(userInput.down) {
            userInput.down = false
            this.selection++
        }

        if(this.selection > 1) {
            this.selection = 0
        }
        if(this.selection < 0) {
            this.selection = 1
        }

        switch(this.selection)
        {
            case 0:
                this.playButtonSpritestate = 'selec'
                break;
            case 1:
                this.playButtonSpritestate = 'unselec'
                break;
        }
    }
}

class LvlSet_Isometric
{
    constructor({size, position, velocity, src, srcsize}) {
        this.player = new Player_Isometric({
            size: size,
            position: position,
            velocity: velocity,
            src: src,
            srcsize: srcsize
        })
    }
}
class LvlSet_SideScroll
{
    constructor({size, position, velocity, gravity, src, srcsize}) {
        this.player = new Player_SideScroll({
            size: size,
            position: position,
            velocity: velocity,
            gravity: gravity,
            src: src,
            srcsize: srcsize
        })
    }
}

class gameObject
{
    constructor({size, position, velocity, src, srcsize})
    {
        this.size = size
        this.position = position
        this.velocity = velocity
        
        this.img = new Image()
        this.frame = ''
        this.spritestate = ''
        this.frameSpan = 10
        this.frameSpanLimit = 10
        this.frameCountIsProgressive = true

        this.imgBaseSrc = src
        this.srcsize = srcsize
        this.img.src = this.imgBaseSrc+this.spritestate+this.frame+'.png'
    }
    render()
    {
        ctx.drawImage(this.img, 0, 0, this.srcsize.x, this.srcsize.y, this.position.x, this.position.y, this.size.x*m, this.size.y*m)
    }
    update()
    {
        this.render()
        this.img.src = this.imgBaseSrc+this.spritestate+this.frame+'.png'
    }
    setSpritestate(state)
    {
        this.spritestate = state
    }
    delSpritestate()
    {
        this.spritestate = ''
    }
    setFrame(num)
    {
        this.frame = num
    }
    delFrame()
    {
        this.frame = ''
    }
}