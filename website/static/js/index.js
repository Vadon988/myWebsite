window.addEventListener("load",function(e){

	var width=screen.width;
	var navBrand=document.querySelectorAll(".nav-brand");

		for(var x=0;x<navBrand.length;x++){

			if(width<992){
				navBrand[x].style.position="absolute";
				navBrand[x].style.right="0";
				navBrand[x].style.marginRight="40px";
			}
			if(width>992){
				console.log("y")
				navBrand[x].style.position="static";
			}
		}	
	

	window.addEventListener("resize",function(e){
		
		var width=screen.width;
		//nav-brand
		var navBrand=document.querySelectorAll(".nav-brand");

		for(var x=0;x<navBrand.length;x++){

			if(width<992){
				navBrand[x].style.position="absolute";
				navBrand[x].style.right="0";
				navBrand[x].style.marginRight="40px";
			}
			if(width>992){
				console.log("y")
				navBrand[x].style.position="static";
			}
		}

		var contentTog=document.querySelectorAll(".content-tog");
		var xBoxNav=document.querySelectorAll(".x-boxnav");

		for(var x=0;x<contentTog.length;x++){

			if(width>992){
				contentTog[x].style.display="none";
				xBoxNav[x].style.display="none";	
			}
			
		}

	})
});