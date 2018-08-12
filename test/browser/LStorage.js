function log( msg ) {
      console.log(msg);
      alert(msg);
  }

  var limit;

  var half = '1'; //这里会换成中文再跑一遍
  var str = half;
  var sstr;

  while ( 1 ) {
      try {
          sessionStorage.clear();
          str += half;
          sessionStorage.setItem( 'cache', str );
          half = str;
      } catch ( ex ) {
          break;
      }
  }

  var base = str.length;
  var off = base / 2;
  var isLeft = 1;

  while ( off ) {
      if ( isLeft ) {
          end = base - (off / 2);
      } else {
          end = base + (off / 2);
      }

      sstr = str.slice( 0, end );
      sessionStorage.clear();
      try {
          sessionStorage.setItem( 'cache', sstr );
          limit = sstr.length;
          isLeft = 0;
      } catch ( e ) {
          isLeft = 1;
      }

      base = end;
      off = Math.floor( off / 2 );
  }

  log( 'limit: ' + limit );