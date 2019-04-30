//Declare Vars
var crcookieidvalue
var crsessioncookieidvalue
var newcrcookieidvalue

var crcookieguidvalue
var crsessioncookieguidvalue
var newcrcookieguidvalue
var guidstr

var qswmctag
var qskeyword 
var keywordqs
var referer


function generateGuid()
{
       var result, i, j;
       result = '';
       for(j=0; j<32; j++)
       {
       if( j == 8 || j == 12|| j == 16|| j == 20)
                result = result + '-';
                i = Math.floor(Math.random()*16).toString(16).toUpperCase();
                result = result + i;
       }
       return result
}

function setclickreportcookie(name, crcookievalue)
{
	//Get A Expiry Date For The Cookie
	var expdate = new Date();
	expdate.setTime(expdate.getTime() + 90*24*60*60*1000);

	//Write The Cookie
	document.cookie = name + '=' + crcookievalue + '; expires=' + expdate.toGMTString() + '; path=/'
	
}

function setclickreportsessioncookie(name, crcookievalue)
{
	//Write The Cookie
	document.cookie = name + '=' + crcookievalue + '; path=/'
}

function readclickreportcookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function closecrpopin()
{
document.all.crcompopin.style.display = 'none';
}

function opencrpopin()
{
document.all.crcompopin.style.display = '';
}

function clickrptcom_addbookmark()
{
clickrptcom_bookmarkurl = '' + location.protocol + '//' + location.hostname + location.pathname
clickrptcom_bookmarktitle = '' + document.title
if (document.all)
window.external.AddFavorite(clickrptcom_bookmarkurl,clickrptcom_bookmarktitle)
}

function clickrptcom_SwapOut(rollimg){
  document.all(rollimg).src = clickrptcom_rollimage[1].src;
  return true;
}

function clickrptcom_SwapBack(rollimg){
  document.all(rollimg).src = clickrptcom_rollimage[0].src; 
  return true;
}

function setupclickrptcompopinwarnings(){}

function getPlainDomain(str)
{

    if (str.length == 0 )
    {
    return null
    } 


	str = str.toLowerCase();
	
	var i = str.indexOf("http://");
	
	if (i == 0)
	{
		str = str.substr(7);
	}

	i = str.indexOf("https://");
	
	if (i == 0)
	{
		str = str.substr(8);
	}
	
	i = str.indexOf("//");
	
	if (i == 0)
	{
		str = str.substr(2);
	}
				
	i = str.indexOf("/");
	if (i > -1)
	{
		str = str.substr(0,i);
	}
	
	i = str.indexOf("?");
	if (i > -1)
	{
		str = str.substr(0,i);
	}
	

	i = str.indexOf("www.");
	if (i == 0)
	{
		str = str.substr(4);
	}

	var parts = str.split('.');
        var lastpartdom = parts.length -1	
        var domstring

        if (parts.length > 2)
        {
           for (n = parts.length -1; n > -1; n--)
           {
             var currentdompart = parts[n]

             if (istld(currentdompart) == 1)
               {
                 lastpartdom = n;
                 break;
               }
             else
               {
               if (iscountrycode(currentdompart) == 1)
                 {
                   lastpartdom = n;
                 }
	       }
           }
	   domstring = parts[lastpartdom-1]
           return domstring;
        }
        else
        {
           return parts[0];
	}
}

function istld(str)
{
switch(str){
case "com" : return 1
case "edu" : return 1
case "gov" : return 1 
case "int" : return 1 
case "mil" : return 1 
case "net" : return 1 
case "org" : return 1 
case "biz" : return 1 
case "info" : return 1 
case "name" : return 1 
case "pro" : return 1 
case "aero" : return 1 
case "coop" : return 1 
case "museum" : return 1 
case "cat" : return 1 
case "jobs" : return 1 
case "travel" : return 1 
case "arpa" : return 1 
case "mobi" : return 1
default:return 0}
}


function iscountrycode(str)
{
switch(str){
case "ac" : return 1
case "ad" : return 1
case "ae" : return 1
case "af" : return 1
case "ag" : return 1
case "ai" : return 1
case "al" : return 1
case "am" : return 1
case "an" : return 1
case "ao" : return 1
case "aq" : return 1
case "ar" : return 1
case "as" : return 1
case "at" : return 1
case "au" : return 1
case "aw" : return 1
case "az" : return 1
case "ax" : return 1
case "ba" : return 1
case "bb" : return 1
case "bd" : return 1
case "be" : return 1
case "bf" : return 1
case "bg" : return 1
case "bh" : return 1
case "bi" : return 1
case "bj" : return 1
case "bm" : return 1
case "bn" : return 1
case "bo" : return 1
case "br" : return 1
case "bs" : return 1
case "bt" : return 1
case "bv" : return 1
case "bw" : return 1
case "by" : return 1
case "bz" : return 1
case "ca" : return 1
case "cc" : return 1
case "cd" : return 1
case "cf" : return 1
case "cg" : return 1
case "ch" : return 1
case "ci" : return 1
case "ck" : return 1
case "cm" : return 1
case "cn" : return 1
case "co" : return 1
case "cr" : return 1
case "cs" : return 1
case "cu" : return 1
case "cv" : return 1
case "cx" : return 1
case "cy" : return 1
case "cz" : return 1
case "de" : return 1
case "dj" : return 1
case "dk" : return 1
case "dm" : return 1
case "do" : return 1
case "dz" : return 1
case "ec" : return 1
case "ee" : return 1
case "eg" : return 1
case "eh" : return 1
case "er" : return 1
case "es" : return 1
case "et" : return 1
case "eu" : return 1
case "fi" : return 1
case "fj" : return 1
case "fk" : return 1
case "fm" : return 1
case "fo" : return 1
case "fr" : return 1
case "ga" : return 1
case "gb" : return 1
case "gd" : return 1
case "ge" : return 1
case "gf" : return 1
case "gg" : return 1
case "gh" : return 1
case "gi" : return 1
case "gl" : return 1
case "gm" : return 1
case "gn" : return 1
case "gp" : return 1
case "gq" : return 1
case "gr" : return 1
case "gs" : return 1
case "gt" : return 1
case "gu" : return 1
case "gw" : return 1
case "gy" : return 1
case "hk" : return 1
case "hm" : return 1
case "hn" : return 1
case "hr" : return 1
case "ht" : return 1
case "hu" : return 1
case "id" : return 1
case "ie" : return 1
case "il" : return 1
case "im" : return 1
case "in" : return 1
case "io" : return 1
case "iq" : return 1
case "ir" : return 1
case "is" : return 1
case "it" : return 1
case "je" : return 1
case "jm" : return 1
case "jo" : return 1
case "jp" : return 1
case "ke" : return 1
case "kg" : return 1
case "kh" : return 1
case "ki" : return 1
case "km" : return 1
case "kn" : return 1
case "kp" : return 1
case "kr" : return 1
case "kw" : return 1
case "ky" : return 1
case "kz" : return 1
case "la" : return 1
case "lb" : return 1
case "lc" : return 1
case "li" : return 1
case "lk" : return 1
case "lr" : return 1
case "ls" : return 1
case "lt" : return 1
case "lu" : return 1
case "lv" : return 1
case "ly" : return 1
case "ma" : return 1
case "mc" : return 1
case "md" : return 1
case "mg" : return 1
case "mh" : return 1
case "mk" : return 1
case "ml" : return 1
case "mm" : return 1
case "mn" : return 1
case "mo" : return 1
case "mp" : return 1
case "mq" : return 1
case "mr" : return 1
case "ms" : return 1
case "mt" : return 1
case "mu" : return 1
case "mv" : return 1
case "mw" : return 1
case "mx" : return 1
case "my" : return 1
case "mz" : return 1
case "na" : return 1
case "nc" : return 1
case "ne" : return 1
case "nf" : return 1
case "ng" : return 1
case "ni" : return 1
case "nl" : return 1
case "no" : return 1
case "np" : return 1
case "nr" : return 1
case "nu" : return 1
case "nz" : return 1
case "om" : return 1
case "pa" : return 1
case "pe" : return 1
case "pf" : return 1
case "pg" : return 1
case "ph" : return 1
case "pk" : return 1
case "pl" : return 1
case "pm" : return 1
case "pn" : return 1
case "pr" : return 1
case "ps" : return 1
case "pt" : return 1
case "pw" : return 1
case "py" : return 1
case "qa" : return 1
case "re" : return 1
case "ro" : return 1
case "ru" : return 1
case "rw" : return 1
case "sa" : return 1
case "sb" : return 1
case "sc" : return 1
case "sd" : return 1
case "se" : return 1
case "sg" : return 1
case "sh" : return 1
case "si" : return 1
case "sj" : return 1
case "sk" : return 1
case "sl" : return 1
case "sm" : return 1
case "sn" : return 1
case "so" : return 1
case "sr" : return 1
case "st" : return 1
case "sv" : return 1
case "sy" : return 1
case "sz" : return 1
case "tc" : return 1
case "td" : return 1
case "tf" : return 1
case "tg" : return 1
case "th" : return 1
case "tj" : return 1
case "tk" : return 1
case "tl" : return 1
case "tm" : return 1
case "tn" : return 1
case "to" : return 1
case "tp" : return 1
case "tr" : return 1
case "tt" : return 1
case "tv" : return 1
case "tw" : return 1
case "tz" : return 1
case "ua" : return 1
case "ug" : return 1
case "uk" : return 1
case "um" : return 1
case "us" : return 1
case "uy" : return 1
case "uz" : return 1
case "va" : return 1
case "vc" : return 1
case "ve" : return 1
case "vg" : return 1
case "vi" : return 1
case "vn" : return 1
case "vu" : return 1
case "wf" : return 1
case "ws" : return 1
case "ye" : return 1
case "yt" : return 1
case "yu" : return 1
case "za" : return 1
case "zm" : return 1
case "zw" : return 1
default: return 0}
}

function WMCAudit(domid,sType,outpage,tgID,uaaid,gone,gtwo,gthree,gfour,gfive,gsix)
{

  crcookieidvalue = ''
  crsessioncookieidvalue = ''

  //Create a new ID Value
  newcrcookieidvalue = (Math.round((Math.random()*999999999)+1))

  //Read Click Report Cookie
  crcookieidvalue = readclickreportcookie('clickreportcookie')
  if (crcookieidvalue)
  {
    //Cookie is present reset expiry date on it
    setclickreportcookie('clickreportcookie', crcookieidvalue)
    //alert('cookie already present')
  }
  else
  {
    //Cookie is not present create it
    
    setclickreportcookie('clickreportcookie', newcrcookieidvalue)
    //alert('create cookie')

    crcookieidvalue = readclickreportcookie('clickreportcookie')
    if (crcookieidvalue)
      {
        //Cookie Accepted
        //alert('cookie accepted')
      }
    else
      {
        //alert('cookie blocked - attempt session cookie')
        crcookieidvalue = ''

        //Cookie Blocked - Attempt Session Cookie
        crsessioncookieidvalue = readclickreportcookie('clickreportsessioncookie')
    	if (crsessioncookieidvalue)
    	  {
    	    //Session Cookie Present
            //alert('session cookie already present')
    	  }
    	else
	  {
            //Session Cookie Not Present - Create It
            setclickreportsessioncookie('clickreportsessioncookie', newcrcookieidvalue)
            //alert('create session cookie')
            crsessioncookieidvalue = readclickreportcookie('clickreportsessioncookie')
            if (crsessioncookieidvalue)
    	      {
    	        //Session Cookie Allowed
		//alert('session cookie allowed')
    	      }
    	    else
	      {
    	        //Session Cookie Blocked
		//alert('session cookie blocked')
		crsessioncookieidvalue = ''
              }
          }
      }
  }


  //

  crcookieguidvalue = ''

  //Create a new guid Value
  newcrcookieguidvalue = '' + generateGuid()


    //Create GUID Cookie Regardless of if it is set or not
    
    setclickreportcookie('clickreportGUIDcookie', newcrcookieguidvalue)
    //alert('create cookie')

    crcookieguidvalue = readclickreportcookie('clickreportGUIDcookie')
    if (crcookieguidvalue)
      {
        //Cookie Accepted
        //alert('cookie accepted')
      }
    else
      {
        //alert('cookie blocked - attempt session cookie')
        crcookieguidvalue = ''

        //Cookie Blocked - Attempt Session Cookie
        crcookieguidvalue = readclickreportcookie('clickreportGUIDsessioncookie')
    	if (crcookieguidvalue)
    	  {
    	    //Session Cookie Present
            //alert('session cookie already present')
    	  }
    	else
	  {
            //Session Cookie Not Present - Create It
            setclickreportsessioncookie('clickreportGUIDsessioncookie', newcrcookieguidvalue)
            //alert('create session cookie')
            crcookieguidvalue = readclickreportcookie('clickreportGUIDsessioncookie')
            if (crcookieguidvalue)
    	      {
    	        //Session Cookie Allowed
		//alert('session cookie allowed')
    	      }
    	    else
	      {
    	        //Session Cookie Blocked
		//alert('session cookie blocked')
		crcookieguidvalue = ''
              }
          }
      }

  guidstr = crcookieguidvalue



  // Set-up Popins
  //setupclickrptcompopinwarnings();

  // Detect cmpgn querystring
  
  // If tyoepf(cmpgn) is different then undefined then qswmctag will be set to cmpgn
  
  
  
  qswmctag = '' + location.search
	  
	  
  if (qswmctag.indexOf("?cmpgn=") > -1 || qswmctag.indexOf("&cmpgn=") > -1)
    {
      if (qswmctag.indexOf("&cmpgn=") > 0) qswmctag = qswmctag.substring(qswmctag.indexOf("&cmpgn="),qswmctag.length);
      if (qswmctag.indexOf("?cmpgn=") > 0) qswmctag = qswmctag.substring(qswmctag.indexOf("?cmpgn="),qswmctag.length);
      qswmctag = qswmctag.substring(7, qswmctag.length);
      if (qswmctag.indexOf("&") > 0) qswmctag = qswmctag.substring(0,qswmctag.indexOf("&"));
    }
  else 
    {
    if(typeof(cmpgn) != 'undefined'){
    	qswmctag = cmpgn;
    }
    else{
    	qswmctag = '';
        }
    }
 
    if(typeof(cmpgn) != 'undefined'){
    	qswmctag = cmpgn;
    }

 
 

  var dompath = document.location.hostname + document.location.pathname

  // Detect document referer & derive referersource
  var refererstr = '';
  refererstr = '' + document.referrer;

  referer = ''
  referer = getPlainDomain(refererstr)
  
  // Parse Keywords Depending on the format of the Referer

	var keywordarr = new Object();	
	keywordarr["google"]="q";
	keywordarr["googlesyndication"]="q";
	keywordarr["groups.google"]="q";	
	keywordarr["yahoo"]="p";
	keywordarr["search.yahoo"]="p";
	keywordarr["overture"]="Keywords";
	keywordarr["msn"]="q";
	keywordarr["aol"]="query";
	keywordarr["aolsearch.aol"]="query";
	keywordarr["lycos"]="query";
	keywordarr["ask"]="q";
	keywordarr["altavista"]="q";
	keywordarr["search"]="q";
	keywordarr["netscape"]="query";
	keywordarr["earthlink"]="q";
	keywordarr["cnn"]="query";
	keywordarr["msn"]="q";
	keywordarr["looksmart"]="key";
	keywordarr["about"]="terms";
	keywordarr["excite"]="qkw";
	keywordarr["mamma"]="query";
	keywordarr["alltheweb"]="q";
	keywordarr["gigablast"]="q";
	keywordarr["voila"]="kw";
	keywordarr["virgilio"]="qs";
	keywordarr["teoma"]="q";
	keywordarr["findwhat"]="mt";
	keywordarr["miva"]="mt";
	keywordarr["7search"]="qu";
	keywordarr["dealtime"] = "KW";
	keywordarr["goclick"] = "SEARCH";
	keywordarr["blowsearch"] = "keywords";
	keywordarr["ah-ha"] = "Q";
	keywordarr["enhance"] = "Q";
	keywordarr["exactseek"] = "term";
	keywordarr["shopping"] = "KW";
	keywordarr["mysearch"] = "searchfor";
	keywordarr["test"] = "k";
	keywordarr["searchscout"] = "k";
	keywordarr["cyberelephant"] = "keywords";
	keywordarr["information"] = "keywords";
	keywordarr["nextag"] = "q";
	keywordarr["tiscali"] = "query";
	keywordarr["ehow"] = "term";
	keywordarr["myway"] = "searchfor";
	keywordarr["ufindus"] = "searched_on_google";
	keywordarr["mortgagecalculator"] = "t";	
	keywordarr["googlesyndication"] = "ref|";
	keywordarr["doityourself"] = "query";
	keywordarr["myway"] = "searchfor";
	keywordarr["mywebsearch"] = "searchfor";
    keywordarr["avantfind"] = "keywords";
    keywordarr["ewoss"] = "k";
    keywordarr["myfrauddetection"] = "k";
    keywordarr["ntlworld"] = "q";
    keywordarr["healthline"] = "q1";
    keywordarr["optusnet"] = "p";
    keywordarr["orange"] = "q";
    keywordarr["gawwk"] = "qry";
    keywordarr["comcast"] = "q";
    keywordarr["canada"] = "q";
    keywordarr["adelphia"] = "q";
    keywordarr["lindr"] = "q";
    keywordarr["happytofind"] = "Keywords";
    keywordarr["seekmap"] = "Keywords";
    keywordarr["lhysearch"] = "terms";
	keywordarr["zingfeed"] = "keywords";
	keywordarr["bestseeker"] = "keywords";
	keywordarr["ahseek"] = "query";
	keywordarr["searchyond"] = "terms";
    keywordarr["seek55"] = "terms";
    keywordarr["friendsearchs"] = "terms";
    keywordarr["123feed"] = "keywords";
    keywordarr["homelow"] = "terms";
    keywordarr["starware"] = "qry";
	keywordarr["cooffe"] = "keywords";
    keywordarr["zdnet"] = "q";
    keywordarr["reference"] = "q";
    keywordarr["boostedroi"] = "q";
    keywordarr["fastbrowsersearch"] = "q";
    keywordarr["conduit"] = "q";
    keywordarr["pch"] = "q";
    keywordarr["charter"] = "q";
    keywordarr["alot"] = "q";
    keywordarr["peoplepc"] = "q";
    keywordarr["webmd"] = "query";
    keywordarr["live"] = "q";
    keywordarr["thehomieinc"] = "q";
    keywordarr["armysurplusbunker"] = "acu-d5";
    keywordarr["bing"] = "q";

  // Get Relevant keyword from refererstr 
  keywordqs = '' + keywordarr[referer]
  qskeyword = '' + refererstr

  if (qskeyword.indexOf("?" + keywordqs + "=") > -1 || qskeyword.indexOf("&" + keywordqs + "=") > -1)
    {
      if (qskeyword.indexOf("&" + keywordqs + "=") > 0) qskeyword = qskeyword.substring(qskeyword.indexOf("&" + keywordqs + "="),qskeyword.length);
      if (qskeyword.indexOf("?" + keywordqs + "=") > 0) qskeyword = qskeyword.substring(qskeyword.indexOf("?" + keywordqs + "="),qskeyword.length);
      qskeyword = qskeyword.substring(keywordqs.length + 2, qskeyword.length);
      if (qskeyword.indexOf("&") > 0) qskeyword = qskeyword.substring(0,qskeyword.indexOf("&"));
    }
  else 
    {
    qskeyword = '';
    }
	
	
	if (sType=='out'){
		pageTracker._trackPageview('outgoing/'+escape(dompath)+'/'+outpage);
		document.getElementById('outpage').innerHTML='<div style="display:none;"><iframe id="boostedtrackframe" height="0" width="0" src="http://www.boostedroi.com/boost/index.asp?action=out&outpage='+outpage+'&crcookie=' + crcookieidvalue + '&crsession=' + crsessioncookieidvalue + '&cmpgn=' + escape(qswmctag) + '&crkeywords=' + escape(qskeyword) + '&source=' + escape(referer) + '&cridomain=' + escape(domid) + '&landingpage=' + escape(dompath) + '&fullrefering=' + escape(refererstr) + '&guid=' + escape(guidstr) + '"></iframe></div>';		
	}
	else{
		//var strHold='\x3Cscript type="text/javascript">/* \x3C![CDATA[ */var google_conversion_id ='+gone+';var google_conversion_language ="'+gtwo+'";var google_conversion_format = "'+gthree+'";var google_conversion_color = "'+gfour+'";var google_conversion_label = "'+gfive+'";var google_conversion_value ='+gsix+';/* ]]> */\x3C/script>\x3Cscript type="text/javascript" src="http://www.googleadservices.com/pagead/conversion.js">\x3C/script>\x3Cnoscript>\x3Cdiv style="display:inline;">\x3Cimg height="1" width="1" style="border-style:none;" alt="" src="http://www.googleadservices.com/pagead/conversion/'+gone+'/?value=0&label='+gfive+'&guid=ON&script=0"/>\x3C/div>\x3C/noscript>';
		var strHold = '\x3Cscript type="text/javascript">/* \x3C![CDATA[ */var google_conversion_id = '+gone+';var google_conversion_label = "'+gfive+'";var google_custom_params = window.google_tag_params;var google_conversion_format = 3;var google_remarketing_only = true;/* ]]> */\x3C/script>\x3Cscript type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">\x3C/script>\x3Cnoscript>\x3Cdiv style="display:inline;">\x3Cimg height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/'+gone+'/?value=0&label='+gsix+'&guid=ON&script=0"/>\x3C/div>\x3C/noscript>';
		document.writeln(strHold);
		
		//Call boosted to Tag the visitor
		//document.writeln('<div id="outpage" style="display:none;"></div><div style="display:none;"><iframe id="boostedtrackframe" height="0" width="0" src="http://www.boostedroi.com/boost/index.asp?crcookie=' + crcookieidvalue + '&crsession=' + crsessioncookieidvalue + '&cmpgn=' + escape(qswmctag) + '&crkeywords=' + escape(qskeyword) + '&source=' + escape(referer) + '&cridomain=' + escape(domid) + '&landingpage=' + escape(dompath) + '&fullrefering=' + escape(refererstr) + '&guid=' + escape(guidstr) + '"></iframe></div>');
	}
}

