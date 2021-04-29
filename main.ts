controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . c c c c c c c c . . . . 
        . . c c c c c c c c c c c c . . 
        . c c c b b b b b b b b c c c . 
        . c c b b b 3 3 3 3 b b b c c . 
        c c b b b 3 3 3 3 3 3 b b b c c 
        c c b b 3 3 3 3 3 3 3 3 b b c c 
        c c b 3 3 3 3 d d 3 3 3 3 b c c 
        c c b 3 3 3 d d d d 3 3 3 b c c 
        c c b 3 3 3 d d d d 3 3 3 b c c 
        c c b 3 3 3 3 d d 3 3 3 3 b c c 
        c c b b 3 3 3 3 3 3 3 3 b b c c 
        c c b b b 3 3 3 3 3 3 b b b c c 
        . c c b b b 3 3 3 3 b b b c c . 
        . c c c b b b b b b b b c c c . 
        . . c c c c c c c c c c c c . . 
        . . . . c c c c c c c c . . . . 
        `, mySprite, 150, 0)
})
let projectile: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    ........................
    ........................
    ........................
    ........................
    ..........3333..........
    ........33111133........
    .......3b111111b3.......
    .......3d11111113.......
    ......3dd1111111d3......
    ......3ddd111111d3......
    ......3dddddd111d3......
    ......3bddddbcd1d3......
    ......3cbbbdccddb3......
    .......3cbb111113.......
    ........333331b13.......
    ........3b111c3b3.......
    ........33b1b133........
    ......3.333b3b3.........
    ......33333333..........
    .......33333............
    ........................
    ........................
    ........................
    ........................
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
