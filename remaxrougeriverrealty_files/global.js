

// ==============================================================================================================
// :: REGISTER, LOGIN, FORGOT PASSWORD
// ==============================================================================================================
			/*-- Registration Form Submission --*/
			$("#RegisterSubmit").click(function() {
			
			    if ($("#RegisterFirstName").val() == '') {
			        alert('Please enter your first & last name.');
			        $("#RegisterFirstName").focus();
			        return false;
			    }
			
			    if (!check_email($("#RegisterEmail").val())) {
			        alert('Your email address is invalid. Please try again.');
			        $("#RegisterEmail").focus();
			        return false;
			    }
			
			    if ($("#RegisterPhone").val() == '') {
				if($("form .password").css('display')=='none')
					$("form .password").css('display','block');
			        alert('Please enter your cell phone number.');
			        $("#RegisterPhone").focus();
			        return false;
			    }
			
			    //Disable Regiser button & change text
			    $('#RegisterSubmit').html('Please wait...');
			    $('#RegisterSubmit').attr('disabled', 'disabled');
			
			    $.ajax({
			        type: "POST",
			        url: "/index.asp?PageAction=ResponsiveThemeAjax&AjaxCMD=RegistrationForm",
			        data: {
			            Email: $("#RegisterEmail").val(),
			            firstName: $("#RegisterFirstName").val(),
			            lastName: $("#RegisterLastName").val(),
			            phoneNumber: $("#RegisterPhone").val()
			        }
			    }).done(function(msg) {
			
			        if (msg.indexOf("Error") >= 0) {
			            alert(msg);
			            $('#RegisterSubmit').removeAttr('disabled', 'disabled');
			            $('#RegisterSubmit').html('Create FREE Account');
			        } else {
			        			        	
			            if ( jQuery($(window.parent.document)).width() < 786 ) {
							window.history.back();
						}
						else
						{
				            parent.jQuery.fancybox.close();
				            parent.location.reload();
						}
			        }	
			
			
			    });
			
			    return false;
			
			});
			
			
			/*-- Login Form Submission --*/
			$( "#LoginSubmit" ).click(function() {
				
				if (!check_email($( "#LoginEmail" ).val())){
					alert('Your email address is invalid. Please try again.');
					return false;
				}
				
				if ($( "#LoginPassword" ).val() == ''){
					alert('Please enter your password.');
					return false;
				}
				
				$.ajax({
				  type: "POST",
				  url: "/index.asp?PageAction=ResponsiveThemeAjax&AjaxCMD=LoginForm",
					  data: {
					  	Email: $( "#LoginEmail" ).val(),
					  	Password : $( "#LoginPassword" ).val()
					  }
					}).done(function( msg ) {
							//if successfull then close the popup, otherwise display message
							if (msg == "success"){
								if ( jQuery($(window.parent.document)).width() < 786 ) {
									window.history.back();
								}
								else
								{
									parent.jQuery.fancybox.close();
									parent.location.reload(true);
								}
							}else{
								$( "#login_area_error" ).html(msg);
								$('#LoginSubmit').val('Try Login Again');
							}
							
							return false;
					});
				
				return false;
				
			});
			
			/*-- Forgot PW Submission --*/
			$( "#ForgotPWSubmit" ).click(function() {
				
				if (!check_email($( "#ForgotPWEmail" ).val())){
					alert('Your email address is invalid. Please try again.');
					return false;
				}
				
				$.ajax({
				  type: "POST",
				  url: "/index.asp?PageAction=ResponsiveThemeAjax&AjaxCMD=ForgotPWForm",
					  data: {
					  	Email: $( "#ForgotPWEmail" ).val()
					  }
					}).done(function( msg ) {
							$( "#forgotpw_area" ).html(msg);
							return false;
					});
				
				return false;
				
			});

// ==============================================================================================================


function check_email(e) {
    ok = "1234567890qwertyuiop[]asdfghjklzxcvbnm.@-_QWERTYUIOPASDFGHJKLZXCVBNM";
    for (i = 0; i < e.length; i++) {
        if (ok.indexOf(e.charAt(i)) < 0) {
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


$('.open-menu').on('click', function () {
	$('.navbar-collapse').css('right', 0);
});
$('.close-menu').on('click', function () {
	$('.navbar-collapse').css('right', '-330px');
});