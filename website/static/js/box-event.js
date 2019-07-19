var month=["January","February","March","April","May","June","July","August","September","October","November","December"];
var days=['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
window.addEventListener("load",function(e){

	var width=screen.width;
	var eDate=document.querySelectorAll(".e-date")
	var tdR=document.querySelector(".dD");
	var discCol=document.querySelector("#disc-col");

	if(width<700){
		for(var x=0;x<tdR.children.length;x++){
			tdR.children[x].innerHTML=tdR.children[x].innerHTML.substring(0,3);
			tdR.children[x].style.fontSize="0.8em";
		}
	}else{
		for(var x=0;x<tdR.children.length;x++){
				tdR.children[x].innerHTML=days[x];
				tdR.children[x].style.fontSize="0.9em";
			}
	}

	if(width<740){
		discCol.innerHTML=discCol.innerHTML.substring(0,4);
	}else{
		discCol.innerHTML="Discreption";
	}

	//FIX EDATE
	var fullArr=[]
		var midArr=[]
		var shortArr=[]
		for(var x=0;x<eDate.length;x++){
			var fullEdate=eDate[x].innerHTML.split(" ")[0]+" "+eDate[x].innerHTML.split(" ")[1]+" "+eDate[x].innerHTML.split(" ")[2]+" "+"2019"
			var midEdate=eDate[x].innerHTML.split(" ")[0]+" "+eDate[x].innerHTML.split(" ")[1]+" "+eDate[x].innerHTML.split(" ")[2]
			var shortEdate=eDate[x].innerHTML.split(" ")[1]+" "+eDate[x].innerHTML.split(" ")[2]
			midArr[x]=midEdate
			shortArr[x]=shortEdate
			fullArr[x]=fullEdate

			if(width<900){
				eDate[x].innerHTML=midArr[x]
			}else{
				eDate[x].innerHTML=fullArr[x]
			}

			
		}

	window.addEventListener("resize",function(e){
	
		var width=screen.width;
		var eDate=document.querySelectorAll(".e-date")
		


		var tdR=document.querySelector(".dD");
		var discCol=document.querySelector("#disc-col");

		if(width<700){
			for(var x=0;x<tdR.children.length;x++){
				tdR.children[x].innerHTML=tdR.children[x].innerHTML.substring(0,3);
			}
		}else{
				for(var x=0;x<tdR.children.length;x++){
					tdR.children[x].innerHTML=days[x];
				}
		}

		if(width<740){
			discCol.innerHTML=discCol.innerHTML.substring(0,4);
		}else{
			discCol.innerHTML="Discreption";
		}

		//FIX EDATE
		var fullArr=[]
		var midArr=[]
		var shortArr=[]
		for(var x=0;x<eDate.length;x++){
			var fullEdate=eDate[x].innerHTML.split(" ")[0]+" "+eDate[x].innerHTML.split(" ")[1]+" "+eDate[x].innerHTML.split(" ")[2]+" "+"2019"
			var midEdate=eDate[x].innerHTML.split(" ")[0]+" "+eDate[x].innerHTML.split(" ")[1]+" "+eDate[x].innerHTML.split(" ")[2]
			var shortEdate=eDate[x].innerHTML.split(" ")[1]+" "+eDate[x].innerHTML.split(" ")[2]
			midArr[x]=midEdate
			shortArr[x]=shortEdate
			fullArr[x]=fullEdate

			if(width<900){
				eDate[x].innerHTML=midArr[x]
			}else{
				eDate[x].innerHTML=fullArr[x]
			}

			
		}
		
	})

	$("#cal-tog").click(function(e){
		$(".hidden-cal").slideToggle("slow");
	})

	function calEvent(){

		var prevM=document.querySelector("#prev-m");
		var mName=document.querySelector(".m-name");
		var nextM=document.querySelector("#next-m");
		
		var c_m=new Date().getMonth();
		var c_y=new Date().getFullYear();
		var curr_m=month[c_m];
		mName.innerHTML=curr_m+" "+c_y;

		prevM.addEventListener("click",function(e){
			if(c_m===0){
				c_m=month.length;
			}
			c_m--;
			curr_m=month[c_m];
			mName.innerHTML=curr_m+" "+c_y;

			$(".m-td").remove()
			createTbl();
			

		})

		nextM.addEventListener("click",function(e){
			if(c_m===month.length-1){
				c_m=-1;
			}
			c_m++;
			curr_m=month[c_m];
			mName.innerHTML=curr_m+" "+c_y;

			$(".m-td").remove()
			createTbl();
		})

	}

	function createTbl(){

		var mName=document.querySelector(".m-name");
		var cTbl=document.querySelector("#m-tbl");
		var disM=mName.innerHTML.split(" ")[0];
		var disM=month.indexOf(disM);
		var y=new Date().getFullYear();
		var firstD=new Date(y,disM,1).getDay();
		var totalD=new Date(y,disM+1,0).getDate();
		
		for(var i=0;i<=5;i++){
			var tr=document.createElement("tr");
			for(var j=0;j<=6;j++){
				var td=document.createElement("td");
				td.setAttribute("class","m-td");
				//td.append(1);
				tr.appendChild(td)
			}
			cTbl.appendChild(tr);
		}

		var allMd=document.querySelectorAll(".m-td");
		var iH=null;

		for(var i=0;i<totalD;i++){
			var md=allMd[firstD];
			md.setAttribute("id","m-d");
			var dNum=document.createElement("div");
			dNum.setAttribute("class","m-td-num");
			dNum.append(i+1);
			md.appendChild(dNum);
			var iDiv=document.createElement("div");
			iDiv.setAttribute("class","plus-holder");
			iH=document.createElement("i");
			iH.setAttribute("class","fas fa-plus-circle");
			iH.setAttribute("data-toggle","modal");
			iH.setAttribute("data-target","#eventModal");
			iDiv.appendChild(iH);
			md.appendChild(iDiv);
			$(iH).click(function(e){

				var mFull=document.querySelector(".m-name").innerHTML;
				var mNum=month.indexOf(mFull.split(" ")[0])
				var plus=e.target;
				var td=plus.offsetParent;
				var date=td.childNodes[0].innerHTML;
				var day=new Date(mFull.split(" ")[1],mNum,date).getDay();
				var dayName=days[day];
				var fD=document.querySelector("#curr_date").innerHTML=dayName+" "+date+" "+mFull;
				document.querySelector("#event-date").value=fD;

			})
			
			firstD++;

		}

		if(disM===new Date().getMonth()){
			var toDay=new Date().getDate()
			var mTd=document.querySelectorAll(".m-td-num");
			mTd[toDay-1].style.width="25px";
			mTd[toDay-1].style.textAlign="center";
			mTd[toDay-1].style.border="1px solid white";
			mTd[toDay-1].style.borderRadius="50px";
			mTd[toDay-1].style.backgroundColor="#1C2A48";
		}


	}

	function googleSearch(){

		var gQuery=document.querySelector("#g-query");
		var gSubmit=document.querySelector("#g-submit");
		var hQuery=document.querySelector("#hidden-search");
		var hSubmit=document.querySelector("#hidden-submit");

		$("#g-submit").click(function(event){
  			event.preventDefault();
  			query=gQuery.value;
  			hQuery.value=query;
  			hSubmit.click()
		})

	}


	function delE(){
		//var x=document.querySelector();

		$('.e-trash').click(function(e){
			var span=e.target
			span.setAttribute("data-toggle","modal");
			span.setAttribute("data-target","#delModal");
			var pSpan=span.offsetParent;
			var tr=pSpan.parentNode;
			var event=tr.firstElementChild;
			event=event.innerHTML;
			document.querySelector("#curr_event").innerHTML=event;
			document.querySelector("#hidden-event").value=event;
		})
	}

	calEvent();
	createTbl();
	googleSearch();
	delE();
})