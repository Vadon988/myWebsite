window.addEventListener("load",function(){

	$("#box-side-yt-tweet").click(function(e){
		
		$("#content-tog-tweet").slideToggle("slow");
	})

	$("#box-tog-tweet").click(function(e){
		
		$("#x-boxnav-tweet").slideToggle("slow");
	})

	var boxSideTweet=document.querySelector("#box-side-yt-tweet")
	var tweetContainer=document.querySelector("#tweet-tbl");
	var contentTogTweet=document.querySelector("#content-tog-tweet")

	boxSideTweet.addEventListener("click",function(e){
		if(contentTogTweet.clientHeight>10){
			tweetContainer.style.display="inline";
		}else{
			
			tweetContainer.style.display="none";
		}
	})

	window.addEventListener("resize",function(e){
		 var width=screen.width;
		 var tweetContainer=document.querySelector("#tweet-tbl");
		 if(width>992){
		 	tweetContainer.style.display="inline";
		 }
	})
})