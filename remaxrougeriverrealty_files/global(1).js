
  
//Check Includes/RealEstate/MapFiles/DrawMapLinkRedirect.asp for more info.
function goToMap() {
	var win = window.open('/map-search/?MLSNum='+$('.modalLoad').attr('rel')+'&zoomLevel=15', '_blank');
	win.focus();
}
               			
  

               	
function prePopulateSelectBoxPriceRange(strType,strID){
				        					
	select = document.getElementById(strID);
	
	//First Remove all existing values
		var length = select.options.length;
		for (i = 0; i < length; i++) {
		  select.options[i] = null;
		}
		
	//Next populate based on strType
		if(strType=='Sale'){
			var options = ["100000", "125000", "150000", "175000", "200000"];
			var optionsNames = ["$100,000", "$125,000", "$150,000", "$175,000", "$200,000"];
			
		}
		else if(strType=='Lease'){
			var options = ["500", "600", "700", "800", "900"];
			var optionsNames = ["$500", "$600", "$700", "$800", "$900"];
		}
		
		for(var i = 0; i < options.length; i++) {
		    var opt = options[i];
		    var optname = optionsNames[i];
		    var el = document.createElement("option");
		    el.textContent = optname;
		    el.value = opt;
		    select.appendChild(el);
		}
}

function loopForm(form) {
    var cbResults = 'Checkboxes: ';
    var radioResults = 'Radio buttons: ';
    for (var i = 0; i < form.elements.length; i++ ) {
        if (form.elements[i].type == 'checkbox') {
            if (form.elements[i].checked == true) {
                cbResults += form.elements[i].value + ' ';
            }
        }
        if (form.elements[i].type == 'radio') {
            if (form.elements[i].checked == true) {
                radioResults += form.elements[i].value + ' ';
            }
        }
    }
    alert(cbResults);
    alert(radioResults);
}

function check_email(e) {
							ok = "1234567890+qwertyuiop[]asdfghjklzxcvbnm.@-_QWERTYUIOPASDFGHJKLZXCVBNM";
							for(i=0; i < e.length ;i++){
							if(ok.indexOf(e.charAt(i))<0){ 
							return (false);
							}	
							} 
							if (document.images) {
							re = /(@.*@)|(\.\.)|(^\.)|(^@)|(@$)|(\.$)|(@\.)/;
							re_two = /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
							if (!e.match(re) && e.match(re_two)) {
							return (-1);		
							} 
							}
						}						

function assignTracker()
{
	
	var strE = '<iframe src="http://www.boostedroi.com/NTrack/track.asp?a=U&R=R" height="0px" width="0px"></iframe>';
	document.write(strE);
}

function WebsiteCTASubmitForm(frmName) {
	$.post("/images/WebsiteCTAForms.asp?Action=WebsiteCTAFormSubmit", $("#"+frmName).serialize(),
		function(data){
			document.getElementById('errMSG').innerHTML = data;
			document.getElementById('tblButtonsDef').style.display='none';
			return false;
		});								
	}
	
function pausecomp(millis)
{
var date = new Date();
var curDate = null;

do { curDate = new Date(); }
while(curDate-date < millis);
}

function slideDiv(strID)
{

	//alert(strID);
	var objO = document.getElementById(strID)
	
	if (objO.style.display=='none')
	{
		objO.style.display='block';
		//alert(objO.style.display);
		//new Effect.SlideDown(strID);
		//objO.style.display='block';
		//new Effect.BlindDown(strID);
		}
	else
		{
		objO.style.display='none';
		//new Effect.BlindUp(strID,5);
		//objO.style.display='none';
		}
	
}

function getCheckedValue(radioObj) {
	if(!radioObj)
		return "";
	var radioLength = radioObj.length;
	if(radioLength == undefined)
		if(radioObj.checked)
			return radioObj.value;
		else
			return "";
	for(var i = 0; i < radioLength; i++) {
		if(radioObj[i].checked) {
			return radioObj[i].value;
		}
	}
	return "";
}

function IsNumeric(sText)

{
   var ValidChars = "0123456789.";
   var IsNumber=true;
   var Char;

 
   for (i = 0; i < sText.length && IsNumber == true; i++) 
      { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
         {
         IsNumber = false;
         }
      }
   return IsNumber;
   
}

function echeck(str) {

		var at="@"
		var dot="."
		var lat=str.indexOf(at)
		var lstr=str.length
		var ldot=str.indexOf(dot)
		if (str.indexOf(at)==-1){
		   alert("Invalid E-mail Address.")
		   return false
		}

		if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
		   alert("Invalid E-mail Address.")
		   return false
		}

		if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
		    alert("Invalid E-mail Address.")
		    return false
		}

		 if (str.indexOf(at,(lat+1))!=-1){
		    alert("Invalid E-mail Address.")
		    return false
		 }

		 if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
		    alert("Invalid E-mail Address.")
		    return false
		 }

		 if (str.indexOf(dot,(lat+2))==-1){
		    alert("Invalid E-mail Address.")
		    return false
		 }
		
		 if (str.indexOf(" ")!=-1){
		    alert("Invalid E-mail Address.")
		    return false
		 }

 		 return true					
	}

function empty_favorites(){
	var r=confirm("You need to be logged in to be able to save favourite listings. Would you like to create your free account now?")
	if (r==true){
  	window.location = "/register.html";
  }else{
  	
  }
}


function switchPicsExclusiveListings(imgID, thumbNum) {
	for (var i=1; i <= totalNumberOfThumbs; i++){
		document.getElementById('MainPicThumb'+i).className='normalThumb';				
	}
	document.getElementById('MainPic').src = '/imgs/exclusive-listings/'+imgID+'-450.jpg'; 
	document.getElementById('MainPicThumb'+thumbNum).className='activeThumb';
}

function close_facebox() { jQuery(document).trigger('close.facebox'); }