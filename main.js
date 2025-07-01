
(function(){ 'use strict';

  function hasClass( elem, esmKelas ) {
    return new RegExp( ' ' + esmKelas + ' ' ).test( ' ' + elem.className + ' ' );
  };

  function addClass( elem, esmKelas ) {
    if( !hasClass(elem, esmKelas ) ) {
      elem.className += ' ' + esmKelas;
    }
  };

  function removeClass( elem, esmKelas ) {
    var kelasJadid = ' ' + elem.className.replace( /[\t\r\n]/g, ' ' ) + ' ';
    if( hasClass( elem, esmKelas ) ) {
      while( kelasJadid.indexOf(' ' + esmKelas + ' ' ) >= 0 ) {
        kelasJadid = kelasJadid.replace( ' ' + esmKelas + ' ', ' ' );
      }
      elem.className = kelasJadid.replace( /^\s+|\s+$/g, '' );
    }
  };

  function toggleClass( elem, esmKelas ) {
    var kelasJadid = ' ' + elem.className.replace( /[\t\r\n]/g, ' ' ) + ' ';
    if( hasClass(elem, esmKelas ) ) {
      while( kelasJadid.indexOf(' ' + esmKelas + ' ' ) >= 0 ) {
        kelasJadid = kelasJadid.replace( ' ' + esmKelas + ' ', ' ' );
      }
      elem.className = kelasJadid.replace( /^\s+|\s+$/g, '' );
    } else {
      elem.className += ' ' + esmKelas;
    }
  };

})();

(function(){ 'use strict';  
  var akharinVaght = 0;
  var forushandegan = [ 'webkit', 'moz' ];
  for( var x = 0; x < forushandegan.length && !window.requestAnimationFrame; ++x ) {
    window.requestAnimationFrame = window[ forushandegan[ x ] + 'RequestAnimationFrame' ];
    window.cancelAnimationFrame = window[ forushandegan[ x ] + 'CancelAnimationFrame' ] || window[ forushandegan[ x ] + 'CancelRequestAnimationFrame' ];
  }

  if( !window.requestAnimationFrame ) {
    window.requestAnimationFrame = function( callback, element ) {
      var vaghtKonuni = new Date().getTime();
      var vaghtBarayeCall = Math.max( 0, 16 - ( vaghtKonuni - akharinVaght ) );
      var shenase = window.setTimeout(
        function() { 
          callback( vaghtKonuni + vaghtBarayeCall ); 
        }, vaghtBarayeCall );
      akharinVaght = vaghtKonuni + vaghtBarayeCall;
      return shenase;
    }
  }

  if( !window.cancelAnimationFrame ) {
    window.cancelAnimationFrame = function( shenase ) {
      clearTimeout( shenase );
    }
  }

})();



bazi = {};

(function(){ 'use strict';


  bazi.m = Math;
  bazi.khasiatRiazi = 'E LN10 LN2 LOG2E LOG10E PI SQRT1_2 SQRT2 abs acos asin atan ceil cos exp floor log round sin sqrt tan atan2 pow max min'.split( ' ' );
  for ( var i = 0; i < bazi.khasiatRiazi.length; i++ ) {
    bazi[ bazi.khasiatRiazi[ i ] ] = bazi.m[ bazi.khasiatRiazi[ i ] ];
  }
  bazi.m.TWO_PI = bazi.m.PI * 2;
  bazi.isset = function( khasiat ) {
    return typeof khasiat != 'undefined';
  };

  bazi.log = function() {
    if( bazi.isset( bazi.piykerbandi ) && bazi.piykerbandi.debug && window.console ){
      console.log( Array.prototype.slice.call( arguments ) );
    }
  };

})();


(function(){ 'use strict';

  bazi.Group = function() {
    this.collection = [];
    this.length = 0;
  };

  bazi.Group.prototype.add = function( item ) {
    this.collection.push( item );
    this.length++;
  };

  bazi.Group.prototype.remove = function( index ) {
    if( index < this.length ) {
      this.collection.splice( index, 1 );
      this.length--;
    }
  };

  bazi.Group.prototype.empty = function() {
    this.collection.length = 0;
    this.length = 0;
  };

  bazi.Group.prototype.each = function( action, asc ) {
    var asc = asc || 0,
      i;
    if( asc ) {
      for( i = 0; i < this.length; i++ ) {
        this.collection[ i ][ action ]( i );
      }
    } else {
      i = this.length;
      while( i-- ) {
        this.collection[ i ][ action ]( i );
      }
    }
  };

})();


(function(){ 'use strict';

  bazi.util = {};
  
  bazi.util.rand = function( min, max ) {
    return bazi.m.random() * ( max - min ) + min;
  };

  bazi.util.randInt = function( min, max ) {
    return bazi.m.floor( bazi.m.random() * ( max - min + 1) ) + min;
  };

}());



(function(){ 'use strict';

  bazi.vaziyatHa = {};

  bazi.addState = function( vaziat ) {
    bazi.vaziyatHa[ vaziat.name ] = vaziat;
  };

  bazi.setState = function( esm ) {
    if( bazi.state ) {
      bazi.vaziyatHa[ bazi.state ].exit();
    }
    bazi.state = esm;
    bazi.vaziyatHa[ bazi.state ].init();
  };

  bazi.currentState = function() {
    return bazi.vaziyatHa[ bazi.state ];
  };

}());


(function(){ 'use strict';

  bazi.Zaman = function() {
    this.reset();
  }

  bazi.Zaman.prototype.reset = function() {
    this.now = Date.now();
    this.last = Date.now();
    this.delta = 60;
    this.ndelta = 1;
    this.elapsed = 0;
    this.nelapsed = 0;
    this.tick = 0;
  };

  bazi.Zaman.prototype.update = function() {
    this.now = Date.now();
    this.delta = this.now - this.last;
    this.ndelta = Math.min( Math.max( this.delta / ( 1000 / 60 ), 0.0001 ), 10 );
    this.elapsed += this.delta;
    this.nelapsed += this.ndelta;
    this.last = this.now;
    this.tick++;
  };

})();


(function(){ 'use strict';

  bazi.Jadval = function( cols, rows ) {
    this.cols = cols;
    this.rows = rows;
    this.tiles = [];
    for( var x = 0; x < cols; x++ ) {
      this.tiles[ x ] = [];
      for( var y = 0; y < rows; y++ ) {
        this.tiles[ x ].push( 'empty' );
      }
    }
  };

  bazi.Jadval.prototype.get = function( x, y ) {
    return this.tiles[ x ][ y ];
  };

  bazi.Jadval.prototype.set = function( x, y, meghdar ) {
    this.tiles[ x ][ y ] = meghdar;
  };

})();


(function(){ 'use strict';

  bazi.BoardTile = function( entekhab ) {
    this.parentState = entekhab.parentState;
    this.parentGroup = entekhab.parentGroup;
    this.col = entekhab.col;
    this.row = entekhab.row;
    this.x = entekhab.x;
    this.y = entekhab.y;
    this.z = 0;
    this.w = entekhab.w;
    this.h = entekhab.h;
    this.elem = document.createElement( 'div' );
    this.elem.style.position = 'absolute';
    this.elem.className = 'tile';
    this.parentState.stageElem.appendChild( this.elem );
    this.classes = {
      pressed: 0,
      path: 0,
      up: 0,
      down: 0,
      left: 0,
      right: 0
    }
    this.updateDimensions();
  };

  bazi.BoardTile.prototype.update = function() {
    for( var k in this.classes ) {
      if( this.classes[ k ] ) {
        this.classes[ k ]--;
      }
    }

    if( this.parentState.ghaza.tile.col == this.col || this.parentState.ghaza.tile.row == this.row ) {
      this.classes.path = 1;
      if( this.col < this.parentState.ghaza.tile.col ) {
        this.classes.right = 1;
      } else {
        this.classes.right = 0;
      }
      if( this.col > this.parentState.ghaza.tile.col ) {
        this.classes.left = 1;
      } else {
        this.classes.left = 0;
      }
      if( this.row > this.parentState.ghaza.tile.row ) {
        this.classes.up = 1;
      } else {
        this.classes.up = 0;
      }
      if( this.row < this.parentState.ghaza.tile.row ) {
        this.classes.down = 1;
      } else {
        this.classes.down = 0;
      }
    } else {
      this.classes.path = 0;
    }

    if( this.parentState.ghaza.eaten ) {
      this.classes.path = 0;
    }
  };

  bazi.BoardTile.prototype.updateDimensions = function() {
    this.x = this.col * this.parentState.tileWidth;
    this.y = this.row * this.parentState.tileHeight;
    this.w = this.parentState.tileWidth - this.parentState.spacing;
    this.h = this.parentState.tileHeight - this.parentState.spacing;
    this.elem.style.left = this.x + 'px';
    this.elem.style.top = this.y + 'px';
    this.elem.style.width = this.w + 'px';
    this.elem.style.height = this.h + 'px';
  };

  bazi.BoardTile.prototype.render = function() {
    var reshteKelas = '';
    for( var k in this.classes ) {
      if( this.classes[ k ] ) {
        reshteKelas += k + ' ';
      }
    }
    this.elem.className = 'tile ' + reshteKelas;
  };

})();


(function(){ 'use strict';

  bazi.SnakeTile = function( entekhab ) {
    this.parentState = entekhab.parentState;
    this.parentGroup = entekhab.parentGroup;
    this.col = entekhab.col;
    this.row = entekhab.row;
    this.x = entekhab.x;
    this.y = entekhab.y;
    this.w = entekhab.w;
    this.h = entekhab.h;
    this.color = null;
    this.scale = 1;
    this.rotation = 0;
    this.blur = 0;
    this.alpha = 1;
    this.borderRadius = 0;
    this.borderRadiusAmount = 0;
    this.elem = document.createElement( 'div' );
    this.elem.style.position = 'absolute';
    this.parentState.stageElem.appendChild( this.elem );
  };

  bazi.SnakeTile.prototype.update = function( i ) {
    this.x = this.col * this.parentState.tileWidth;
    this.y = this.row * this.parentState.tileHeight;
    if( i == 0 ) {
      this.color = '#fff';
      this.blur = this.parentState.dimAvg * 0.03 + Math.sin( this.parentState.zaman.elapsed / 200 ) * this.parentState.dimAvg * 0.015;
      if( this.parentState.maar.dir == 'n' ) {
        this.borderRadius = this.borderRadiusAmount + '% ' + this.borderRadiusAmount + '% 0 0';
      } else if( this.parentState.maar.dir == 's' ) {
        this.borderRadius = '0 0 ' + this.borderRadiusAmount + '% ' + this.borderRadiusAmount + '%';
      } else if( this.parentState.maar.dir == 'e' ) {
        this.borderRadius = '0 ' + this.borderRadiusAmount + '% ' + this.borderRadiusAmount + '% 0';
      } else if( this.parentState.maar.dir == 'w' ) {
        this.borderRadius = this.borderRadiusAmount + '% 0 0 ' + this.borderRadiusAmount + '%';
      }
    } else {
      this.color = '#fff';
      this.blur = 0;
      this.borderRadius = '0';
    }
    this.alpha = 1 - ( i / this.parentState.maar.tiles.length ) * 0.6;
    this.rotation = ( this.parentState.maar.justAteTick / this.parentState.maar.justAteTickMax ) * 90;
    this.scale = 1 + ( this.parentState.maar.justAteTick / this.parentState.maar.justAteTickMax ) * 1;
  };

  bazi.SnakeTile.prototype.updateDimensions = function() {
    this.w = this.parentState.tileWidth - this.parentState.spacing;
    this.h = this.parentState.tileHeight - this.parentState.spacing;
  };

  bazi.SnakeTile.prototype.render = function( i ) {
     this.elem.style.left = this.x + 'px';
    this.elem.style.top = this.y + 'px';
    this.elem.style.width = this.w + 'px';
    this.elem.style.height = this.h + 'px';
    this.elem.style.borderRadius = '50%'; 
    this.elem.style.display = 'flex';
    this.elem.style.alignItems = 'center';
    this.elem.style.justifyContent = 'center';
    this.elem.style.fontSize = this.w * 0.8 + 'px'; 
    if( i == 0 ) {
      this.elem.innerHTML = '👾'; 
      this.elem.style.boxShadow = '0 0 ' + this.blur + 'px rgba(0, 255, 0, 0.8)'; 
    } else {
      this.elem.innerHTML = '👨‍💻';
      this.elem.style.boxShadow = 'none'; 
    }
  };

})();


(function(){ 'use strict';

  bazi.FoodTile = function( entekhab ) {
    this.parentState = entekhab.parentState;
    this.parentGroup = entekhab.parentGroup;
    this.col = entekhab.col;
    this.row = entekhab.row;
    this.x = entekhab.x;
    this.y = entekhab.y;
    this.w = entekhab.w;
    this.h = entekhab.h;
    this.blur = 0;
    this.scale = 1;
    this.hue = 100;
    this.opacity = 0;
    this.elem = document.createElement( 'div' );
    this.elem.style.position = 'absolute';
    this.parentState.stageElem.appendChild( this.elem );
  };

  bazi.FoodTile.prototype.update = function() {
    this.x = this.col * this.parentState.tileWidth;
    this.y = this.row * this.parentState.tileHeight;
    this.blur = this.parentState.dimAvg * 0.03 + Math.sin( this.parentState.zaman.elapsed / 200 ) * this.parentState.dimAvg * 0.015;
    this.scale = 0.8 + Math.sin( this.parentState.zaman.elapsed / 200 ) * 0.2;

    if( this.parentState.ghaza.birthTick || this.parentState.ghaza.deathTick ) {
      if( this.parentState.ghaza.birthTick ) {
        this.opacity = 1 - ( this.parentState.ghaza.birthTick / 1 ) * 1;
      } else {
        this.opacity = ( this.parentState.ghaza.deathTick / 1 ) * 1;
      }
    } else {
      this.opacity = 1;
    }
  };

  bazi.FoodTile.prototype.updateDimensions = function() {
    this.w = this.parentState.tileWidth - this.parentState.spacing;
    this.h = this.parentState.tileHeight - this.parentState.spacing;
  };

  bazi.FoodTile.prototype.render = function() {
        this.elem.style.left = this.x + 'px';
    this.elem.style.top = this.y + 'px';
    this.elem.style.width = this.w + 'px';
    this.elem.style.height = this.h + 'px';
    this.elem.style.borderRadius = '50%'; 
    this.elem.style.display = 'flex';
    this.elem.style.alignItems = 'center';
    this.elem.style.justifyContent = 'center';
    this.elem.style.fontSize = this.w * 0.8 + 'px'; 
    this.elem.innerHTML = '💻'; 
    this.elem.style.boxShadow = '0 0 ' + this.blur + 'px rgba(255, 255, 255, 0.8)'; 
    this.elem.style[ 'transform' ] = 'translateZ(0) scale(' + this.scale + ')';
    this.elem.style.opacity = this.opacity;
  };

})();



(function(){ 'use strict';

  bazi.Maar = function( entekhab ) {
    this.parentState = entekhab.parentState;
    this.dir = 'e';
    this.currDir = this.dir;
    this.tiles = [];
    for( var i = 0; i < 5; i++ ) {
      this.tiles.push( new bazi.SnakeTile({
        parentState: this.parentState,
        parentGroup: this.tiles,
        col: 8 - i,
        row: 3,
        x: ( 8 - i ) * entekhab.parentState.tileWidth,
        y: 3 * entekhab.parentState.tileHeight,
        w: entekhab.parentState.tileWidth - entekhab.parentState.spacing,
        h: entekhab.parentState.tileHeight - entekhab.parentState.spacing
      }));
    }
    this.last = 0;
    this.updateTick = 10;
    this.updateTickMax = this.updateTick;
    this.updateTickLimit = 3;
    this.updateTickChange = 0.2;
    this.deathFlag = 0;
    this.justAteTick = 0;
    this.justAteTickMax = 1;
    this.justAteTickChange = 0.05;

    var i = this.tiles.length;

    while( i-- ) {
      this.parentState.jadval.set( this.tiles[ i ].col, this.tiles[ i ].row, 'snake' );
    }
  };

  bazi.Maar.prototype.updateDimensions = function() {
    var i = this.tiles.length;
    while( i-- ) {
      this.tiles[ i ].updateDimensions();
    }
  };

  bazi.Maar.prototype.update = function() {
    if( this.parentState.keys.up ) {
      if( this.dir != 's' && this.dir != 'n' && this.currDir != 's' && this.currDir != 'n' ) {
        this.dir = 'n';
      }
    } else if( this.parentState.keys.down) {
      if( this.dir != 'n' && this.dir != 's' && this.currDir != 'n' && this.currDir != 's' ) {
        this.dir = 's';
      }
    } else if( this.parentState.keys.right ) {
      if( this.dir != 'w' && this.dir != 'e' && this.currDir != 'w' && this.currDir != 'e' ) {
        this.dir = 'e';
      }
    } else if( this.parentState.keys.left ) {
      if( this.dir != 'e' && this.dir != 'w' && this.currDir != 'e' && this.currDir != 'w' ) {
        this.dir = 'w';
      }
    }

    this.parentState.keys.up = 0;
    this.parentState.keys.down = 0;
    this.parentState.keys.right = 0;
    this.parentState.keys.left = 0;

    this.updateTick += this.parentState.zaman.ndelta;
    if( this.updateTick >= this.updateTickMax ) {
      this.updateTick = ( this.updateTick - this.updateTickMax );

      this.tiles.unshift( new bazi.SnakeTile({
        parentState: this.parentState,
        parentGroup: this.tiles,
        col: this.tiles[ 0 ].col,
        row: this.tiles[ 0 ].row,
        x: this.tiles[ 0 ].col * this.parentState.tileWidth,
        y: this.tiles[ 0 ].row * this.parentState.tileHeight,
        w: this.parentState.tileWidth - this.parentState.spacing,
        h: this.parentState.tileHeight - this.parentState.spacing
      }));
      this.last = this.tiles.pop();
      this.parentState.stageElem.removeChild( this.last.elem );

      this.parentState.boardTiles.collection[ this.last.col + ( this.last.row * this.parentState.cols ) ].classes.pressed = 2;

      var i = this.tiles.length;

      while( i-- ) {
        this.parentState.jadval.set( this.tiles[ i ].col, this.tiles[ i ].row, 'snake' );
      }
      this.parentState.jadval.set( this.last.col, this.last.row, 'empty' );

      if ( this.dir == 'n' ) {
        this.currDir = 'n';
        this.tiles[ 0 ].row -= 1;
      } else if( this.dir == 's' ) {
        this.currDir = 's';
        this.tiles[ 0 ].row += 1;
      } else if( this.dir == 'w' ) {
        this.currDir = 'w';
        this.tiles[ 0 ].col -= 1;
      } else if( this.dir == 'e' ) {
        this.currDir = 'e';
        this.tiles[ 0 ].col += 1;
      }

      this.wallFlag = false;
      if( this.tiles[ 0 ].col >= this.parentState.cols ) {
        this.tiles[ 0 ].col = 0;
        this.wallFlag = true;
      }
      if( this.tiles[ 0 ].col < 0 ) {
        this.tiles[ 0 ].col = this.parentState.cols - 1;
        this.wallFlag = true;
      }
      if( this.tiles[ 0 ].row >= this.parentState.rows ) {
        this.tiles[ 0 ].row = 0;
        this.wallFlag = true;
      }
      if( this.tiles[ 0 ].row < 0 ) {
        this.tiles[ 0 ].row = this.parentState.rows - 1;
        this.wallFlag = true;
      }

      if( this.parentState.jadval.get( this.tiles[ 0 ].col, this.tiles[ 0 ].row ) == 'snake' ) {
        this.deathFlag = 1;
        clearTimeout( this.foodCreateTimeout );
      }

      if( this.parentState.jadval.get( this.tiles[ 0 ].col, this.tiles[ 0 ].row ) == 'food' ) {
        this.tiles.push( new bazi.SnakeTile({
          parentState: this.parentState,
          parentGroup: this.tiles,
          col: this.last.col,
          row: this.last.row,
          x: this.last.col * this.parentState.tileWidth,
          y: this.last.row * this.parentState.tileHeight,
          w: this.parentState.tileWidth - this.parentState.spacing,
          h: this.parentState.tileHeight - this.parentState.spacing
        }));
        if( this.updateTickMax - this.updateTickChange > this.updateTickLimit ) {
          this.updateTickMax -= this.updateTickChange;
        }
        this.parentState.emtiaz++;
        this.parentState.scoreElem.innerHTML = this.parentState.emtiaz;
        this.justAteTick = this.justAteTickMax;

        this.parentState.ghaza.eaten = 1;
        this.parentState.stageElem.removeChild( this.parentState.ghaza.tile.elem );

        var khod = this;
        
        this.foodCreateTimeout = setTimeout( function() {
          khod.parentState.ghaza = new bazi.Ghaza({
            parentState: khod.parentState
          });
        }, 300);
      }

      if( this.deathFlag ) {
        bazi.setState( 'play' );
      }
    }

    var i = this.tiles.length;
    while( i-- ) {
      this.tiles[ i ].update( i );
    }

    if( this.justAteTick > 0 ) {
      this.justAteTick -= this.justAteTickChange;
    } else if( this.justAteTick < 0 ) {
      this.justAteTick = 0;
    }
  };

  bazi.Maar.prototype.render = function() {
    var i = this.tiles.length;
    while( i-- ) {
      this.tiles[ i ].render( i );
    }
  };

})();


(function(){ 'use strict';

  bazi.Ghaza = function( entekhab ) {
    this.parentState = entekhab.parentState;
    this.tile = new bazi.FoodTile({
      parentState: this.parentState,
      col: 0,
      row: 0,
      x: 0,
      y: 0,
      w: entekhab.parentState.tileWidth - entekhab.parentState.spacing,
      h: entekhab.parentState.tileHeight - entekhab.parentState.spacing
    });
    this.reset();
    this.eaten = 0;
    this.birthTick = 1;
    this.deathTick = 0;
    this.birthTickChange = 0.025;
    this.deathTickChange = 0.05;
  };

  bazi.Ghaza.prototype.reset = function() {
    var khali = [];
    for( var x = 0; x < this.parentState.cols; x++) {
      for( var y = 0; y < this.parentState.rows; y++) {
        var tile = this.parentState.jadval.get( x, y );
        if( tile == 'empty' ) {
          khali.push( { x: x, y: y } );
        }
      }
    }
    var kashiJadid = khali[ bazi.util.randInt( 0, khali.length - 1 ) ];
    this.tile.col = kashiJadid.x;
    this.tile.row = kashiJadid.y;
  };

  bazi.Ghaza.prototype.updateDimensions = function() {
    this.tile.updateDimensions();
  };

  bazi.Ghaza.prototype.update = function() {
    this.tile.update();

    if( this.birthTick > 0 ) {
      this.birthTick -= this.birthTickChange;
    } else if( this.birthTick < 0 ) {
      this.birthTick = 0;
    }

    this.parentState.jadval.set( this.tile.col, this.tile.row, 'food' );
  };

  bazi.Ghaza.prototype.render = function() {
    this.tile.render();
  };

})();



(function(){ 'use strict';

  function StatePlay() {
    this.name = 'play';
  }

  StatePlay.prototype.init = function() {
    this.scoreElem = document.querySelector( '.score' );
    this.stageElem = document.querySelector( '.stage' );
    this.dimLong = 28;
    this.dimShort = 16;
    this.padding = 0.25;
    this.boardTiles = new bazi.Group();
    this.keys = {};
    this.foodCreateTimeout = null;
    this.emtiaz = 0;
    this.scoreElem.innerHTML = this.emtiaz;
    this.zaman = new bazi.Zaman();
    this.getDimensions();
    if( this.winWidth < this.winHeight ) {
      this.rows = this.dimLong;
      this.cols = this.dimShort;
    } else {
      this.rows = this.dimShort;
      this.cols = this.dimLong;
    }
    this.spacing = 1;
    this.jadval = new bazi.Jadval( this.cols, this.rows );
    this.resize();
    this.createBoardTiles();
    this.bindEvents();
    this.maar = new bazi.Maar({
      parentState: this
    });
    this.ghaza = new bazi.Ghaza({
      parentState: this
    });
  };

  StatePlay.prototype.getDimensions = function() {
    this.winWidth = window.innerWidth;
    this.winHeight = window.innerHeight;
    this.activeWidth = this.winWidth - ( this.winWidth * this.padding );
    this.activeHeight = this.winHeight - ( this.winHeight * this.padding );
  };

  StatePlay.prototype.resize = function() {
    var khod = bazi.currentState();

    khod.getDimensions();

    khod.stageRatio = khod.rows / khod.cols;

    if( khod.activeWidth > khod.activeHeight / khod.stageRatio ) {
      khod.stageHeight = khod.activeHeight;
      khod.stageElem.style.height = khod.stageHeight + 'px';
      khod.stageWidth = Math.floor( khod.stageHeight / khod.stageRatio );
      khod.stageElem.style.width = khod.stageWidth + 'px';
    } else {
      khod.stageWidth = khod.activeWidth;
      khod.stageElem.style.width = khod.stageWidth + 'px';
      khod.stageHeight = Math.floor( khod.stageWidth * khod.stageRatio );
      khod.stageElem.style.height = khod.stageHeight + 'px';
    }

    khod.tileWidth = ~~( khod.stageWidth / khod.cols );
    khod.tileHeight = ~~( khod.stageHeight / khod.rows );
    khod.dimAvg = ( khod.activeWidth + khod.activeHeight ) / 2;
    khod.spacing = Math.max( 1, ~~( khod.dimAvg * 0.0025 ) );

    khod.stageElem.style.marginTop = ( -khod.stageElem.offsetHeight / 2 ) + khod.headerHeight / 2 + 'px';

    khod.boardTiles.each( 'updateDimensions' );
    khod.maar !== undefined && khod.maar.updateDimensions();
    khod.ghaza !== undefined && khod.ghaza.updateDimensions();
  };

  StatePlay.prototype.createBoardTiles = function() {
    for( var y = 0; y < this.rows; y++ ) {
      for( var x = 0; x < this.cols; x++ ) {
        this.boardTiles.add( new bazi.BoardTile({
          parentState: this,
          parentGroup: this.boardTiles,
          col: x,
          row: y,
          x: x * this.tileWidth,
          y: y * this.tileHeight,
          w: this.tileWidth - this.spacing,
          h: this.tileHeight - this.spacing
        }));
      }
    }
  };

  StatePlay.prototype.upOn = function() { bazi.currentState().keys.up = 1; }
  StatePlay.prototype.downOn = function() { bazi.currentState().keys.down = 1; }
  StatePlay.prototype.rightOn = function() { bazi.currentState().keys.right = 1; }
  StatePlay.prototype.leftOn = function() { bazi.currentState().keys.left = 1; }
  StatePlay.prototype.upOff = function() { bazi.currentState().keys.up = 0; }
  StatePlay.prototype.downOff = function() { bazi.currentState().keys.down = 0; }
  StatePlay.prototype.rightOff = function() { bazi.currentState().keys.right = 0; }
  StatePlay.prototype.leftOff = function() { bazi.currentState().keys.left = 0; }

  StatePlay.prototype.keydown = function( e ) {
    e.preventDefault();
    var e = ( e.keyCode ? e.keyCode : e.which ),
      khod = bazi.currentState();
    if( e === 38 || e === 87 ) { khod.upOn(); }
    if( e === 39 || e === 68 ) { khod.rightOn(); }
    if( e === 40 || e === 83 ) { khod.downOn(); }
    if( e === 37 || e === 65 ) { khod.leftOn(); }
  };

  StatePlay.prototype.bindEvents = function() {
    var khod = bazi.currentState();
    window.addEventListener( 'keydown', khod.keydown, false );
    window.addEventListener( 'resize', khod.resize, false );
  };

  StatePlay.prototype.step = function() {
    this.boardTiles.each( 'update' );
    this.boardTiles.each( 'render' );
    this.maar.update();
    this.maar.render();
    this.ghaza.update();
    this.ghaza.render();
    this.zaman.update();
  };

  StatePlay.prototype.exit = function() {
    window.removeEventListener( 'keydown', this.keydown, false );
    window.removeEventListener( 'resize', this.resize, false );
    this.stageElem.innerHTML = '';
    this.jadval.tiles = null;
    this.zaman = null;
  };

  bazi.addState( new StatePlay() );

})();


(function(){ 'use strict';

  bazi.piykerbandi = {
    title: 'Snakely',
    debug: window.location.hash == '#debug' ? 1 : 0,
    state: 'play'
  };

  bazi.setState( bazi.piykerbandi.state );

  bazi.vaght = new bazi.Zaman();

  bazi.step = function() {
    requestAnimationFrame( bazi.step );
    bazi.vaziyatHa[ bazi.state ].step();
    bazi.vaght.update();
  };

  window.addEventListener( 'load', bazi.step, false );

})();