namespace SpriteKind {
    export const fragment = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    music.thump.play()
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . c c c c c . . . . . . 
        . . . . c c b b b c c . . . . . 
        . . . c c b 3 3 3 b c c . . . . 
        . . . c b 3 d d d 3 b c . . . . 
        . . . c b 3 d d d 3 b c . . . . 
        . . . c b 3 d d d 3 b c . . . . 
        . . . c c b 3 3 3 b c c . . . . 
        . . . . c c b b b c c . . . . . 
        . . . . . c c c c c . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 150, 0)
    while (controller.A.isPressed()) {
        pause(200)
    }
})
sprites.onOverlap(SpriteKind.fragment, SpriteKind.Player, function (sprite, otherSprite) {
    fragmentsprite.destroy()
    music.knock.play()
    info.changeScoreBy(20)
})
info.onCountdownEnd(function () {
    game.setDialogTextColor(3)
    game.setDialogFrame(img`
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
        `)
    game.setDialogCursor(assets.image`myImage`)
    game.showLongText("YOU DID IT SKULLY! I'm so happy you're alive! Now get back here I need you for an experiment. ", DialogLayout.Full)
    game.over(true)
})
sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (sprite, otherSprite) {
    health.destroy()
    music.powerUp.play()
    info.changeLifeBy(1)
})
info.onLifeZero(function () {
    music.powerDown.play()
    game.setDialogTextColor(3)
    game.setDialogFrame(img`
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 f f f f f f f f f f f f f 3 
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
        `)
    game.setDialogCursor(assets.image`myImage`)
    game.showLongText("So you've gone and gotten yourself eaten. Well you're in luck! When someone is eaten by a spaceshark during a frenzy they are sent back to the beginning of the frenzy! So why don't you go and give it another try.", DialogLayout.Full)
    game.over(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    music.thump.play()
    otherSprite.destroy(effects.fire, 500)
    sprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.follow(sprite, 100)
    animation.runImageAnimation(
    otherSprite,
    [img`
        .................ccfff..............
        ................cdd55f..............
        ...............cdd55f...............
        ..............fcc55cf............ccc
        ........ffffffccccccff.........cc55c
        ......ff5555555555555cfff.....cd55c.
        ....ff555555555c5c5555cccff..cdd55f.
        ....f5c55555ff55c5c555cccccfffd55f..
        ....f5551111ff15c5c555ccccccc555cf..
        .....f511111111555555ccccccccc5ccf..
        ......fccc33cc115555ccccccccfff55cf.
        .......fc131c111555ccccc5d5c...f55f.
        ........f33c111c555fdddddcc.....f55f
        .........ff1111f5d55fddcc........fff
        ...........cccccf5d55fc.............
        .................fffff..............
        `,img`
        .................ccfff..............
        ................cdd55f..............
        ...............cdd55f...............
        .........ffffffcc55cf...............
        ......fff55555555cccff..............
        .....f555555555555555cfff......ccccc
        .....5c55555ff5c5c5555cccff...cd555c
        .....5551111ff55c5c555cccccffcdd55c.
        .....f5111111115c5c555ccccccc5d55f..
        ......fccc33c11555555ccccccccc55cf..
        .......fc131cc115555ccccccccff5ccf..
        ........f33c1111555ccccc5d5c..f55cf.
        .........ff1111c555fdddddcc....f55f.
        ...........ccc1f5d55fddcc.......f55f
        ..............ccf5d55fc..........fff
        .................fffff..............
        `,img`
        ..................ccfff.............
        .................cdd55f.............
        ........fffffffffdd55f..............
        .......f555555555fc5cf..............
        .......f55c1115ff55ccffff...........
        .......f5111111ff55555cccff....ccccc
        ........f1cc331155c5c55ccccf..cd555c
        ........fcc131c1555c5c5cccccfcdd55c.
        .........f111111555c5c5cccccc5d55f..
        .........f111111155555cccccccc55cf..
        ..........f1111115555cccccccff5ccf..
        ...........c1111c555ccccc5d5c.f55cf.
        ............cc11c555fddddddc...f55f.
        ..............cff5d55fdddcc.....f55f
        .................f5d55fcc........fff
        ..................fffff.............
        `,img`
        ....................ccfff...........
        ..........fffffffffc5555f...........
        .........f555555555fff5f............
        .........f551115ff5555ff............
        .........f511111ff55555cff..........
        .........f1cccc1155c5c5cccf.........
        ..........fc1c1c1555c5c5cccf...ccccc
        ............c3331555c5c5ccccfccdd55c
        ...........c333c15555555ccccc5dd5cc.
        ...........c331c1155555ccccccc55cc..
        ..........cc13c1115555ccccccff5ccf..
        ..........c111111c555ccccc55c.fccf..
        ...........cc1111c555fdddddc..f55cf.
        .............cccff5d55fdddc....f55f.
        ..................f5d55fcc......f55f
        ...................fffff.........fff
        `,img`
        ...........fffffff...ccfff..........
        ..........f5555555ffc5555f..........
        ..........f5511155555ff5f...........
        ..........f511111ff5555ff...........
        ..........f1cccc1ff55555cff.........
        ..........ffc1c1c155c5c5cccf........
        ...........fcc3331555c5c5cccf..ccccc
        ............c333c1555c5c5ccccfcdd55c
        ............c333c15555555cccccdd5cc.
        ............c333c1155555cccccc55cc..
        ...........cc331c115555ccccccf5ccf..
        ...........cc13c11c555ccccc55cfccf..
        ...........c111111c555fdddddc.f55cf.
        ............cc1111f5d55fdddc...f55f.
        ..............cccfff5d55fcc.....f55f
        ....................fffff........fff
        `,img`
        ....................................
        ....................................
        ....................................
        ...............ccffff...............
        ..............cdd555f...............
        .......ffffffcdd555f................
        .....ff5555555555555cfff.......ccccc
        ...ff55555555c5c55555cccff....cd555c
        ..f5555555555c55c5555cccccfffcdd55c.
        .f5c5555555555c5c5555cccccccc5d55f..
        .f5555555fff55c55555cccccccccc55cf..
        .ff551111fff55c5555ccccccc5cff5ccf..
        ..ff1111111115555cccccc555cc..f55cf.
        ....ccccccc1115d555fdd5ccc.....ff55f
        ........ccccccf5d555fcc..........fff
        ...............ffffff...............
        `],
    50,
    false
    )
    pause(500)
    music.smallCrash.play()
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
let enemySprite: Sprite = null
let health: Sprite = null
let fragmentsprite: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
game.setDialogTextColor(3)
game.setDialogFrame(img`
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 f f f f f f f f f f f f f 3 
    3 f f f f f f f f f f f f f 3 
    3 f f f f f f f f f f f f f 3 
    3 f f f f f f f f f f f f f 3 
    3 f f f f f f f f f f f f f 3 
    3 f f f f f f f f f f f f f 3 
    3 f f f f f f f f f f f f f 3 
    3 f f f f f f f f f f f f f 3 
    3 f f f f f f f f f f f f f 3 
    3 f f f f f f f f f f f f f 3 
    3 f f f f f f f f f f f f f 3 
    3 f f f f f f f f f f f f f 3 
    3 f f f f f f f f f f f f f 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    `)
game.setDialogCursor(assets.image`myImage`)
game.showLongText("Harry the Hermit Crab: Skully I have no idea how you got yourself into this one but, you are about to fly through a 2 minute spaceshark frenzy!! Use your fireballs to destroy them and hopefully you'll make it out alive. While you're at it collect as many fragments as you can since I need those for my research. Also I heard space pomegranates float through that area so eat those if you're feeling a bit hurt. Good luck and try not to get eaten you still owe me $5.                                 (use W A S D to move and SPACE to shoot)", DialogLayout.Full)
info.setLife(1)
info.setScore(0)
info.startCountdown(120)
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
game.onUpdateInterval(5000, function () {
    fragmentsprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . b c 3 b . . . . . . 
        . . . . b b c b f 3 b . . . . . 
        . . . . 3 f c c c 3 b . . . . . 
        . . . . 3 f f c 3 f b b . . . . 
        . . . . b c c 3 f f b . . . . . 
        . . . . . c c 3 f 3 . . . . . . 
        . . . . . . b c c . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.fragment)
    animation.runImageAnimation(
    fragmentsprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . b c 3 b . . . . . . 
        . . . . b b c b f 3 b . . . . . 
        . . . . 3 f c c c 3 b . . . . . 
        . . . . 3 f f c 3 f b b . . . . 
        . . . . b c c 3 f f b . . . . . 
        . . . . . c c 3 f 3 . . . . . . 
        . . . . . . b c c . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . b 3 3 b . . . . . 
        . . . . . . c c f f b . . . . . 
        . . . . . b c c f c c b . . . . 
        . . . . . c 3 3 c c b c . . . . 
        . . . . . c f f 3 c f 3 . . . . 
        . . . . . . 3 f f 3 3 b . . . . 
        . . . . . . . b b b b . . . . . 
        . . . . . . . . b . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . c c b . . . . . . 
        . . . . . . 3 f 3 c c . . . . . 
        . . . . . b f f 3 c c b . . . . 
        . . . . b b f 3 c f f 3 . . . . 
        . . . . . b 3 c c c f 3 . . . . 
        . . . . . b 3 f b c b b . . . . 
        . . . . . . b 3 c b . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . b . . . . . . . . 
        . . . . . b b b b . . . . . . . 
        . . . . b 3 3 f f 3 . . . . . . 
        . . . . 3 f c 3 f f c . . . . . 
        . . . . c b c c 3 3 c . . . . . 
        . . . . b c c f c c b . . . . . 
        . . . . . b f f c c . . . . . . 
        . . . . . b 3 3 b . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    100,
    true
    )
    fragmentsprite.x = scene.screenWidth()
    fragmentsprite.vx = -100
    fragmentsprite.y = randint(10, scene.screenHeight() - 10)
})
game.onUpdateInterval(15000, function () {
    health = sprites.create(img`
        . . . . . . . . . . c . . . . . 
        . . . . . . . . . c . . . . . . 
        . . . . . . b b c b . . . . . . 
        . . . . b b c c c c b b . . . . 
        . . . b c c c 3 3 c c c b . . . 
        . . . b c c 3 c c 3 c c b . . . 
        . . b c 3 3 c 3 3 c 3 3 c b . . 
        . . b 3 c c 3 c c 3 c c 3 b . . 
        . . b c 3 3 c c c c 3 3 c b . . 
        . . . b 3 c 3 c c 3 c 3 b . . . 
        . . . b c 3 c 3 3 c 3 c b . . . 
        . . . . b b 3 c c 3 b b . . . . 
        . . . . . . b b b b . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    health.x = scene.screenWidth()
    health.vx = -100
    health.y = randint(10, scene.screenHeight() - 10)
})
game.onUpdateInterval(900, function () {
    enemySprite = sprites.create(img`
        .............ccfff..............
        ............cdd55f..............
        ...........cdd55f...............
        ..........fcc55cf............ccc
        ....ffffffccccccff.........cc55c
        ..ff5555555555555cfff.....cd55c.
        ff555555555c5c5555cccff..cdd55f.
        f5c55555ff55c5c555cccccfffd55f..
        f5551111ff15c5c555ccccccc555cf..
        .f511111111555555ccccccccc5ccf..
        ..fccc33cc115555ccccccccfff55cf.
        ...fc131c111555ccccc5d5c...f55f.
        ....f33c111c555fdddddcc.....f55f
        .....ff1111f5d55fddcc........fff
        .......cccccf5d55fc.............
        .............fffff..............
        `, SpriteKind.Enemy)
    enemySprite.x = scene.screenWidth()
    enemySprite.vx = -75
    enemySprite.y = randint(10, scene.screenHeight() - 10)
    animation.runImageAnimation(
    enemySprite,
    [img`
        .............ccfff..............
        ...........ccdd5cf..............
        ..........ccdd55f...............
        ..........fcc55cf...............
        .....fffffccccccff.........ccc..
        ...ff5555555c5555cfff....cc55c..
        ..f55555555c5c5555cccff.cd55c...
        ff555555ff55c5c555cccccfcd55f...
        f5c55511ff15c55555cccccff55f....
        f5551111111155555ccccccc55cf....
        .f511133cc115555cccccccccccf....
        ..fccc31c111555ccccc5d5ff55cf...
        ...fc13c111c555fcddddcc..f55f...
        ....fccc111f5d55ccdcc.....f55f..
        ........ccccfcd55cc........fff..
        .............fffff..............
        `,img`
        .............ccfff..............
        ............cdd55f..............
        ...........cdd55f...............
        ..........fcc55cf............ccc
        ....ffffffccccccff.........cc55c
        ..ff5555555555555cfff.....cd55c.
        ff555555555c5c5555cccff..cdd55f.
        f5c55555ff55c5c555cccccfffd55f..
        f5551111ff15c5c555ccccccc555cf..
        .f511111111555555ccccccccc5ccf..
        ..fccc33cc115555ccccccccfff55cf.
        ...fc131c111555ccccc5d5c...f55f.
        ....f33c111c555fdddddcc.....f55f
        .....ff1111f5d55fddcc........fff
        .......cccccf5d55fc.............
        .............fffff..............
        `,img`
        ..............cfff..............
        ............ccdd5f..............
        ...........c5dd5ff.........ccc..
        ..........fcc55cf.........c55c..
        ...fffffffccccccff.......cd5c...
        .ffc5555555555555cfff....cd5f...
        fc555555555c555555cccff.cd5f....
        f5c5555ff555c5c555cccccffdcf....
        f551111ff555c5c555cccccc55cf....
        .f51111111155c555cccccccc55cf...
        ..fccc33c5115555cccccccfff55f...
        ...fc131c111555ccccc5d5c..f55f..
        ....f33c111c55ccddddd5c....fff..
        .....ff1111fd55ccdd5cc..........
        .......cccccfd555fcc............
        .............fffff..............
        `,img`
        .............ccfff..............
        ............cdd55f..............
        ...........cdd55f...............
        ..........fcc55cf............ccc
        ....ffffffccccccff.........cc55c
        ..ff5555555555555cfff.....cd55c.
        ff555555555c5c5555cccff..cdd55f.
        f5c55555ff55c5c555cccccfffd55f..
        f5551111ff15c5c555ccccccc555cf..
        .f511111111555555ccccccccc5ccf..
        ..fccc33cc115555ccccccccfff55cf.
        ...fc131c111555ccccc5d5c...f55f.
        ....f33c111c555fdddddcc.....f55f
        .....ff1111f5d55fddcc........fff
        .......cccccf5d55fc.............
        .............fffff..............
        `],
    500,
    true
    )
})
