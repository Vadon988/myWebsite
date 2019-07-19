window.addEventListener("load",function(){


	var boxSideYt=document.querySelector("#box-side-yt");
	var contentSideYt=document.querySelector("#content-tog-yt");
	var contentBox=document.querySelectorAll(".box-content");
	var ytHolder=document.querySelector(".yt-holder")
	
	window.addEventListener("resize",function(e){

		var width=screen.width;
		if(width>992){
			ytHolder.style.display="grid";
		}
	})

	boxSideYt.addEventListener("click",function(e){
		$(contentSideYt).slideToggle('slow')
		var togHeight=contentSideYt.clientHeight;
		if(togHeight>10){
			ytHolder.style.display="grid";
		}else{
			ytHolder.style.display="none";
		}
		
	});
	

	var boxTogYt=document.querySelector("#box-tog-yt");
	var xboxNavYt=document.querySelector("#x-boxnav-yt");

	boxTogYt.addEventListener("click",function(e){
		$(xboxNavYt).slideToggle("slow");
	});

	function imdbSilder(){

		var imdbS=document.querySelector("#imdb-holder");
		var imdbSildes=imdbS.children;
		var prevImdb=document.querySelector("#prev-imdb");
		var nextImdb=document.querySelector("#next-imdb");
		var curr_imdb=0;

		function restImdb(){
			for(var i=0;i<imdbSildes.length;i++){
				imdbSildes[i].style.display="none";
			}
		}

		prevImdb.addEventListener("click",function(e){
			restImdb();
			if(curr_imdb===0){
				curr_imdb=imdbSildes.length;
			}
			curr_imdb--;
			imdbSildes[curr_imdb].style.display="flex";
			
		})

		nextImdb.addEventListener("click",function(e){
			restImdb();
			if(curr_imdb===imdbSildes.length-1){
				curr_imdb=-1;
			}
			curr_imdb++;
			imdbSildes[curr_imdb].style.display="flex";
			
		})
	}

	function xImdbSilder(){

		var imdbS=document.querySelector("#x-imdb-holder");
		var imdbSildes=imdbS.children;
		var prevImdb=document.querySelector("#x-prev-imdb");
		var nextImdb=document.querySelector("#x-next-imdb");
		var curr_imdb=0;

		function restImdb(){
			for(var i=0;i<imdbSildes.length;i++){
				imdbSildes[i].style.display="none";
			}
		}

		prevImdb.addEventListener("click",function(e){
			restImdb();
			if(curr_imdb===0){
				curr_imdb=imdbSildes.length;
			}
			curr_imdb--;
			imdbSildes[curr_imdb].style.display="flex";
			console.log("prev");
		})

		nextImdb.addEventListener("click",function(e){
			restImdb();
			if(curr_imdb===imdbSildes.length-1){
				curr_imdb=-1;
			}
			curr_imdb++;
			imdbSildes[curr_imdb].style.display="flex";
			console.log("next");
		})
	}

	function iFrame(){
		
		var i=document.querySelector("#yt-link");
		var bigFrame=document.querySelector("#bg-iframe");
		//var hidden=i.previousElementSibling.innerHTML;
		//bigFrame.setAttribute("src","https://www.youtube.com/embed/"+""+hidden)
		
		$(".yt-mod").click(function(e){

		var target=e.target;
			target.setAttribute("data-toggle","modal");
			target.setAttribute("data-target","#ytModal");
			var sibil=e.target.previousSibling;
			var yt_id=target.previousElementSibling.innerHTML;
			var bgIframe=document.querySelector("#bg-iframe");
			bgIframe.setAttribute("src","https://www.youtube.com/embed/"+yt_id);
		})
	}

	imdbSilder();
	xImdbSilder();
	iFrame();

	
});