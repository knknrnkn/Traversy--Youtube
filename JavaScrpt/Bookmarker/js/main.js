// Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

// funckija bookmark save bookmark
function saveBookmark(e) {
	// Get form value
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	

	 if(!validateForm(siteName, siteUrl)){
    return false;
  }


	
	// Putting siteName and siteUrl in new var
	var bookmark = {
		name: siteName,
		url: siteUrl
	}


	// Loccal storage, only store STRINGS
	  /*
    // Local Storage Test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */


// test if bookmark is null ( ne postoji u lokalnoj bazi)
  if (localStorage.getItem('bookmarks') === null) {
  	// Init array 
  	var bookmarks = [];

  	// Add to array ( guranje dobijenih podataka, odn var bookmark u array bookmarks sa push)
  	bookmarks.push(bookmark);
  	// Set to LocalStorage ( smestanje novog array u lokalnu bazu localstorage)
  	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }else {
  	// Get bookmarks from Local Storage
  	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  	// Add bookmark to an Array
  	bookmarks.push(bookmark);
  	// Re-set back to Local Storagae
  	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  // re-fetch bookmarks
  fetchBookmarks();

	//prevent form from submitting

	e.preventDefault();
}


	// Delete Bookmarks 
	function deleteBookmark(url) {
		// Get Bookmark from Local Storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Loop trought bookmarks
		for (var i=0; i<bookmarks.length;i++) {
			if (bookmarks[i].url == url) {
				// remove from array
				bookmarks.splice (i, 1);
			}
		}
			// re-set back to Local Storage
			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

			// re-fetch bookmarks
			fetchBookmarks();


	}


// Fetch bookmarks
function fetchBookmarks (){
	// Get bookmarks from Local Storage
  	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  
  	// Get output Id
  	var bookmarksResults = document.getElementById('bookmarksResults');

  	// Build output 
  	bookmarksResults.innerHTML ='';

  	for ( var i=0; i<bookmarks.length; i++) {
  		var name = bookmarks[i].name;
  		var url = bookmarks[i].url;
// bootstrap class well sa pozadinom i nekomim granicama
  		bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
  	}
}
// Validate Form
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}