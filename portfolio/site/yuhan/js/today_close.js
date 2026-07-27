/* 오늘 그만보기 */
	function setCookie( name, value, expirehours ) { 
		var todayDate = new Date(); 
		todayDate.setHours( todayDate.getHours() + expirehours ); 
		document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
	} 
	function closeWin() { 
		document.getElementById('popup').style.display = "none";
	}
	function todaycloseWin() { 
		setCookie( "ncookie", "done" , 24 ); 
		document.getElementById('popup').style.display = "none";
	}
