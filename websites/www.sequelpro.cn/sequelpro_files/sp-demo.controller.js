
var SPDemoController = {
  demoEl: false,
  watchSprite: false,
  watchEl: false,
  wrapEl: false,
  shadowEl: false,
  demoClickedFunction: false,
  preloadImgs: false,
  sprites: false,
  srpitesEl: false,
  currentTimeoutDelay: 0,
  
  init: function()
  {
    this.wrapEl = document.getElementById('sp-demo-wrap');
    this.demoEl = document.getElementById('sp-demo');
    this.watchSprite = document.getElementById('sp-demo-prompt-overlay')
    this.watchEl = document.getElementById('sp-demo-watch');
    this.shadowEl = document.getElementById('sp-demo-shadow');
    this.spritesEl = document.getElementById('sp-demo-sprites')
    
    this.demoClickedFunction = this.demoClicked.bind(this)
    this.demoEl.addEventListener('click', this.demoClickedFunction)
    this.watchEl.addEventListener('click', this.demoClickedFunction)
    
    if (typeof(spDemoClicked) != 'undefined' && spDemoClicked) {
      setTimeout(function() {
        this.demoEl.style.opacity = 1
        
        this.startDemo()
      }.bind(this), 0)
    }
    
    this.demoEl.setAttribute('onclick', '')
    this.watchEl.setAttribute('href', 'javascript:void(0)')
    
//     this.startDemo()
  },
  
  demoClicked: function(cickEvent)
  {
    this.startDemo()
  },
  
  startDemo: function()
  {
    this.wrapEl.style.height = 'auto';
    
    
    if (this.shadowEl) {
      this.shadowEl.parentNode.removeChild(this.shadowEl)
      this.shadowEl = false
    }
    if (this.watchSprite) {
      this.watchSprite.parentNode.removeChild(this.watchSprite)
      this.watchSprite = false
      this.watchEl = false
    }
    
    
    this.demoEl.style.marginBottom = 0;
    
    
    
    this.demoEl.removeEventListener('click', this.demoClickedFunction)
    
    
    
    
    // create sprites (first one is a special case, it already exists in the DOM)
    if (this.sprites == false) {
      this.sprites = {
        'connect': {el: document.getElementById('connect-sprite-el'), xEl: 0, yEl: 0}
      }
      
      
      
      this.addSprite('browse', 'browse.png', 1072, 695, 0, 0, 1072, 695)
      var playAgain = this.addSprite('playAgain', 'play-again.png', 1072, 695, 0, 0, 1072, 695)
  
      this.addSprite('connectClick', 'sprites.png', 965, 532, 605, 57, 139, 24)
      this.addSprite('browseSelectRow', 'sprites.png', 965, 532, 0, 0, 759, 28)
      
      this.addSprite('browseEditCell1', 'sprites.png', 965, 532, 201, 29, 200, 27)
      this.addSprite('browseEditCell2', 'sprites.png', 965, 532, 402, 29, 200, 27)
      this.addSprite('browseEditCell3', 'sprites.png', 965, 532, 603, 29, 200, 27)
      this.addSprite('browseEditCell4', 'sprites.png', 965, 532, 0, 57, 200, 27)
      this.addSprite('browseEditCell5', 'sprites.png', 965, 532, 201, 57, 200, 27)
      this.addSprite('browseEditCell6', 'sprites.png', 965, 532, 402, 57, 200, 27)
      
      this.addSprite('queryToolbarItem', 'sprites.png', 965, 532, 807, 15, 34, 44)
      this.addSprite('query', 'query.png', 1072, 695, 0, 0, 1072, 695)
      
      this.addSprite('sqlCode', 'sprites.png', 965, 532, 0, 119, 18, 21)
      this.addSprite('sqlTypingCursor', 'sprites.png', 965, 532, 842, 15, 1, 14)
      
      this.addSprite('trafficHover', 'sprites.png', 965, 532, 768, 0, 54, 14)
      this.addSprite('trafficClick', 'sprites.png', 965, 532, 823, 0, 54, 14)
      
      this.addSprite('cursor', 'cursor.png', 20, 24, 0, 0, 20, 24)
    }
    
    // swap play again for connect
    this.currentTimeoutDelay = 0
    this.hideSprite('playAgain')
    this.showSprite('connect')
    
    // show cursor
    this.wait(0.5)
    this.moveSprite('cursor', 380, 350, 0, true)
    this.showSprite('cursor', 3)
    
    // move cursor to connect button
    this.wait(0.5)
    this.moveSprite('cursor', 768, 495, 2)
    
    // click connect
    this.wait(2.5)
    this.moveSprite('connectClick', 712, 489)
    this.wait(0.2)
    this.hideSprite('connectClick')
    
    // switch to browse view
    this.wait(0.3)
    this.hideSprite('connect')
    this.showSprite('browse')
    
    // move mouse to typo
    this.wait(0.5)
    this.moveSprite('cursor', 587, 163, 1)
    
    // click on row
    this.wait(1.5)
    this.moveSprite('browseSelectRow', 257, 154, 0)
    
    // double click on row, fix typo
    this.wait(0.5)
    this.moveSprite('browseEditCell1', 542, 155, 0)
    this.wait(0.5)
    this.hideSprite('cursor', 0)
    this.moveSprite('browseEditCell2', 542, 155, 0)
    this.wait(0.2)
    this.moveSprite('browseEditCell3', 542, 155, 0)
    this.wait(0.3)
    this.moveSprite('browseEditCell4', 542, 155, 0)
    this.wait(0.2)
    this.moveSprite('browseEditCell5', 542, 155, 0)
    
    // move mouse away from row
    this.wait(0.5)
    this.moveSprite('cursor', 600, 180, 0.5)
    
    // click to remove focus from text field & save changes
    this.wait(0.8)
    this.hideSprite('browseSelectRow')
    this.moveSprite('browseEditCell6', 542, 155, 0)

    // do nothing for a bit
    this.wait(2)

    
    // move mouse to query toolbar item
    this.moveSprite('cursor', 550, 80, 1.0)
    this.wait(1.2)
    this.moveSprite('queryToolbarItem', 535, 60, 0)
    this.showSprite('queryToolbarItem')


    
    // show custom query sprite
    this.wait(0.2)
    this.hideSprite('queryToolbarItem')
    this.hideSprite('browse')
    this.showSprite('query')
    
    // start typing
    var cursorX = 0;
    this.moveSprite('sqlTypingCursor', 282, 110, 0, false)
    this.wait(0.5)
    this.hideSprite('sqlTypingCursor')
    this.wait(0.5)
    this.showSprite('sqlTypingCursor')
    this.wait(0.5)
    this.hideSprite('sqlTypingCursor')
    this.wait(0.5)
    this.showSprite('sqlTypingCursor')
    this.wait(0.2)
    this.moveSprite('sqlTypingCursor', cursorX + 282, 126, 0, false)
    this.moveSprite('sqlCode', 267, 122, 0, false)
    
    this.wait(0.2)
    for (var cursorIndex = 0; cursorIndex < 57; cursorIndex++) {
      cursorX += 8;
      this.wait(0.08)
      this.moveSprite('sqlTypingCursor', cursorX + 282, 126, 0, false)
      this.resizeSprite('sqlCode', cursorX + 17, 21)
    }
    
    
    // do nothing for a bit
    this.wait(5)
    
    // move mouse to close button
    this.moveSprite('cursor', 66, 38, 1.5)
    this.wait(1.45)
    this.moveSprite('trafficHover', 63, 36, 0)
    
    // click close
    this.wait(0.6)
    this.moveSprite('trafficClick', 63, 36, 0)
    
    // hide everything and show "play again"
    this.wait(0.1)
    this.hideAllSprites()
    this.showSprite('playAgain')
    
    // setup click handler to start over
    setTimeout(function() {
      this.demoEl.addEventListener('click', this.demoClickedFunction)
    }.bind(this), this.currentTimeoutDelay)
  },
  
  wait: function(seconds)
  {
    this.currentTimeoutDelay += (seconds * 1000)
  },
  
  showSprite:function(name, seconds)
  {
    var sprite = this.sprites[name]
    
    setTimeout(function() {
      sprite.el.style.transition = 'opacity ' + seconds + 's ease'
      
      setTimeout(function() {
        sprite.el.style.opacity = 1
      }, 0)
    }, this.currentTimeoutDelay)
  },
  
  hideSprite:function(name, seconds)
  {
    var sprite = this.sprites[name]
    
    setTimeout(function() {
      sprite.el.style.transition = 'opacity ' + seconds + 's ease'
      
      setTimeout(function() {
        sprite.el.style.opacity = 0
      }, 0)
    }, this.currentTimeoutDelay)
  },
  
  addSprite: function(name, image, imageW, imageH, x, y, w, h)
  {
    var spriteEl = document.createElement('span')
    
    var spriteElX = document.createElement('span', {class: 'sp-demo-x'});
    spriteEl.appendChild(spriteElX);
    
    var spriteElY = document.createElement('span', {class: 'sp-demo-y'});
    spriteElX.appendChild(spriteElY);
    
    var spriteElBg = document.createElement('span', {class: 'sp-demo-bg'})
    spriteElBg.style.backgroundImage = 'url(images/' + image + ')'
    spriteElBg.style.backgroundPosition = '-' + x + 'px -' + y + 'px'
    spriteElBg.style.backgroundSize = imageW + 'px ' + imageH + 'px'
    spriteElBg.style.width = w + 'px'
    spriteElBg.style.height = h + 'px'
    spriteElY.appendChild(spriteElBg)
    
    var sprite = {el: spriteEl, xEl: spriteElX, yEl: spriteElY, bgEl: spriteElBg}
    
    this.sprites[name] = sprite
    this.spritesEl.appendChild(spriteEl)
    
    return sprite
  },
  
  moveSprite:function(name, x, y, seconds, leaveHidden)
  {
    var sprite = this.sprites[name]
    
    setTimeout(function() {
      sprite.xEl.style.transition = 'transform ' + seconds + 's ease-out'
      sprite.yEl.style.transition = 'transform ' + seconds + 's ease-in-out'
      
      
      setTimeout(function() {
        sprite.xEl.style.transform = 'translateX( ' + x + 'px)'
        sprite.yEl.style.transform = 'translateY( ' + y + 'px)'
        if (!leaveHidden) {
          sprite.el.style.opacity = 1
        }
      }, 0)
      
      if (typeof(completion) != 'undefined') {
        setTimeout(completion.bind(this), seconds * 1000)
      }
    }, this.currentTimeoutDelay)
  },
  
  resizeSprite:function(name, width, height)
  {
    var sprite = this.sprites[name]
    
    setTimeout(function() {
      sprite.bgEl.style.width = width + 'px'
      sprite.bgEl.style.height = height + 'px'
    }, this.currentTimeoutDelay)
  },
  
  hideAllSprites:function()
  {
    for (var name in this.sprites) {
      this.hideSprite(name, 0)
    }
  }
}

SPDemoController.init()
