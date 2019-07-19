window.addEventListener("load",function(){


	var boxSideNews=document.querySelector("#box-side-news");
	var contentSideTog=document.querySelector("#content-tog-news");
	
	boxSideNews.addEventListener("click",function(e){
		$(contentSideTog).slideToggle('slow')
	});

	var boxTogNews=document.querySelector("#box-tog-news");
	var xboxNavNews=document.querySelector("#x-boxnav-news");

	boxTogNews.addEventListener("click",function(e){
		$(xboxNavNews).slideToggle("slow");
	});

	
	/**********NEWS-SLIDER*********/

	function newsSlider(){
		var newsHolder=document.querySelector("#news-holder");
		var prevNews=document.querySelector("#prev-news");
		var nextNews=document.querySelector("#next-news");
		var curr_news=0;
		newsSlides=newsHolder.children;

		function restNews(){
			for(var i=0;i<newsSlides.length;i++){
				newsSlides[i].style.display="none";
			}
		}

		prevNews.addEventListener("click",function(){
			restNews();
			if(curr_news===newsSlides.length-1){
				curr_news=-1;
			}
			curr_news++;
			newsSlides[curr_news].style.display="grid";
		});

		nextNews.addEventListener("click",function(){
			restNews();
			if(curr_news===0){
				curr_news=newsSlides.length;
			}
			curr_news--;
			newsSlides[curr_news].style.display="grid";
		})


	};

	newsSlider();
});