window.addEventListener("load",function(){

	$("#box-side-git").click(function(e){
		
		$("#content-tog-git").slideToggle("slow");
	})

	$("#box-tog-git").click(function(e){
		
		$("#x-boxnav-git").slideToggle("slow");
	})

	var boxSideGit=document.querySelector("#box-side-git")
	var gitB=document.querySelector("#git-main-boxH");
	var contentGit=document.querySelector("#content-tog-git")

	boxSideGit.addEventListener("click",function(e){
		if(contentGit.clientHeight>10){
			gitB.style.display="grid";
		}else{
			
			gitB.style.display="none";
		}
	})

	window.addEventListener("resize",function(e){
		 var width=screen.width;
		 var gitB=document.querySelector("#git-main-boxH");
		 if(width>992){
		 gitB.style.display="grid";
		 }
	})
})