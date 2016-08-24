for(var i = 0; i < str.length; i++) {
			var second = str[i].duration % 60;
			secound = secound >= 10 ? secound : ('0' + secound);
			temp += '<li>'
			temp += '<span class="music-name">' + str[i].title + '</span>'
			temp += '<span class="music-time">' +  secound + '</span>'
			temp += '<>';
		}