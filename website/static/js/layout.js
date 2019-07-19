window.addEventListener("load",function(e){

	$(".main-tog").click(function(e){
		$(".x-nav").slideToggle("slow");
		
	})

	$(".main-rate-tog").click(function(e){
		var mainSidebar=document.querySelector(".main-sidebar");
		if(mainSidebar.style.display==="none"){
			mainSidebar.style.display="inline";
		}else{
			mainSidebar.style.display="none";
		}
	})

	$(".rate-tog").click(function(e){
		$(".x-rate-row").slideToggle("slow");
	})

	window.addEventListener("resize",function(e){

		var width=screen.width;

		if(width>768){
			document.querySelector(".x-nav").style.display="none";
			document.querySelector(".x-rate-row").style.display="none";
		}
	})

	function logout(){
		var user=document.querySelector("#user-name")
		var hiddenUser=document.querySelector("#hidden-user");
		hiddenUser.value=user.innerHTML;
	}

	function rate(){
		var exRate=document.querySelectorAll(".rate-ex");
		var exArrow=document.querySelectorAll(".rate-arrow")
		for(var x=0;x<exRate.length;x++){
			if(exRate[x].innerHTML[0]==="-"){
				exRate[x].style.color="red";
				exArrow[x].innerHTML="&#x25BC;";
				exArrow[x].style.color="red";
			}else{
				exRate[x].style.color="green";
				exArrow[x].innerHTML="&#x25B2;";
				exArrow[x].style.color="green";
			}
		}
	}

	function isoFormat(){
		date=new Date()
		var timeSpan=document.querySelector("#upload-time");
		timeSpan.innerHTML=date.toISOString();
	}
	
	logout();
	rate();
	isoFormat();

})