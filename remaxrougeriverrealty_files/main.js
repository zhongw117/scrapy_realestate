// ==============================================================================================================
// :: GLOBAL DECLERATIONS
// ==============================================================================================================
	$(document).ready(function() {
		var HTMLShowGlobalWhenLoadingNewListings = '<div style="position:absolute;top:50%;left:50%;"><b>Please wait... Loading listings</b></div>';
		
	});

$(function(){
								$(".popup").tipTip({defaultPosition: "top", edgeOffset: 3, delay: 100});
							});
							
var _agentLocator = _agentLocator || {};

// click / swipe counter

_agentLocator.actionCounter = function ($) {

    var defaultsSet = false;

    var defaults = {
        _el             : ['.tile', '.titles', '.sy-pager', '.sy-next', '.sy-prev', '#next', '#prev'],
        _current        : 0,
        _max            : 10,
        _rootDomain     : '/',
        _scriptName     : '/ajax.asp',
        _parm           : { 
            PageAction: 'IncreaseCount' 
        },
        _fancyOptions   : {}
    };

    return  {

        setDefaults: function(_defaults) {
            
            if (defaultsSet === false) {
                for (var property in _defaults) {
                    if (_defaults.hasOwnProperty(property) && typeof _defaults[property] !== 'undefined') {
                        defaults[property] = _defaults[property];
                    };
                };

                defaultsSet = true;
            };

            return this;
        },

        countClicks: function() {
            $(defaults._el.join(', ')).on('click', function() {
                _agentLocator.actionCounter.addClicks(defaults._current, defaults._max, defaults._action);
                _agentLocator.actionCounter.callAjaxTo();	//desc:  I am calling these here so that we can call the ajax to count up the click.
            });

            return this;
        },

        countSwipe: function() {

            _agentLocator.actionCounter.addClicks(defaults._current, defaults._max, defaults._action);

            return this;
        },

        addClicks: function() {

            if((defaults._current < defaults._max) && (userLogged == false)) {
                defaults._current ++;
            } else {
            	//Triggers the popup
                //$.fancybox.open(defaults._fancyOptions);
                if (userLogged == false)
	                $('#hideMainListingImage').css('display','block');
            };
            console.log("+1");
            return this;
        },

        callAjaxTo: function() {
			//url: here use to look for defaults but it was not using them for some reason so I have hard coded them.
            $.ajax({
                type: 'POST',
                url: '/index.asp?ajaxnoconnection=yes&cmd=CountUpClicks&Name=intHidePhotosListingViewsLimitCurrent',
                data: defaults.parm,
                complete : function(){
                    //alert(this.url+this.data)
                },
                success: function(){
                }
            });

            return this;
        }
    };

}(jQuery);

// search

_agentLocator.mainSearch = function ($) {

    var form_name = form_name || $('#form-test');
    var submit_btn = submit_btn  || $('#form-test-btn1');
    var submit_script = submit_script || 'search-test.aspx';
    var defaultsSet = false;
    var hiddenFields = {};
    var currentSearch = {};
    var searchQuery = {};

    return  {

        setDefaults: function(_form_name, _submit_btn, _submit_script) {
            
            if (defaultsSet === false) {

                form_name = _form_name;
                submit_btn = _submit_btn;
                submit_script = _submit_script;
                defaultsSet = true;

            };

            return this;
        },

        setElements: function () {
            
            form_name.find('select').change(function() {

                var elName = $(this).attr('name');
                var selectValue = $(this).find('option:selected').val();
                var text = $(this).find('option:selected').text();
                var label = $(this).parent().find('span.label-name strong').text();
                   
                _agentLocator.mainSearch.updateFormData( elName, selectValue, label, text );
                _agentLocator.mainSearch.renderTags();
                _agentLocator.mainSearch.ajaxCount();

            });

            form_name.find('input:not(.term), textarea').blur(function() {

                var elName = $(this).attr('name');
                var inputValue = $(this).val();
                var label = $(this).parent().find('span.label-name strong').text();

                _agentLocator.mainSearch.updateFormData( elName, inputValue, label, inputValue );
                _agentLocator.mainSearch.renderTags();
                _agentLocator.mainSearch.ajaxCount();

            });

            submit_btn.click(function(event) {
                
                event.preventDefault();
                _agentLocator.mainSearch.ajaxSubmit();

            });

            form_name.find('input, textarea').focus(function() {

                if ($(this).val() == '' || $(this).val() == 'any' || $(this).val() == 'Any') {

                    $(this).val('');

                }

            });

            return this;
        },

        updateFormData: function(key, val, label, text) { 
            
            if (currentSearch.hasOwnProperty(key)) {
               
                currentSearch[key].labelName = text;
                currentSearch[key].labelValue = label;
                currentSearch[key].elValue = val;
            
            } else {
                
                currentSearch[key] = currentSearch[key] || {};
                currentSearch[key]['labelName'] = text;
                currentSearch[key]['labelValue'] = label;
                currentSearch[key]['elValue'] = val;

            };

            return this;

        },
 
        getFormData: function() {

            form_name.find('select').each(function() {

                _agentLocator.mainSearch.updateFormData( $(this).attr('name'), $(this).find('option:selected').val(), $(this).parent().find('span.label-name strong').text(), $(this).find('option:selected').text() );
            
            });

            form_name.find('input:not(.term):not([type="hidden"]), textarea').each(function() {
                
                _agentLocator.mainSearch.updateFormData( $(this).attr('name'), $(this).val(), $(this).parent().find('span.label-name strong').text(), $(this).val() );

            });

            form_name.find('input[type=hidden]').each(function() {
                
                hiddenFields[$(this).attr('name')] = $(this).val();

            });

            this.renderTags();
            

            return this;
        },

        renderTags: function() {
            
            if ($('.search-par').is(':empty')) {
               
               $.each(currentSearch, function (key, val) {
                    
                    if (val.elValue != '' && val.elValue != 'any' && val.elValue != 'Any' && val.elValue != 0) {
                        $('.search-par').append('<a id=' + key + ' href="#"><i class="fa fa-times"></i> ' + val.labelValue + ': <span>' + val.labelName + '</span></a>');
                    };

                });
            
            } else {
                
                $('.search-par').empty();
                
                $.each(currentSearch, function (key, val) {
                    
                    if (val.elValue != '' && val.elValue != 'any' && val.elValue != 'Any' && val.elValue != 0) {
                        $('.search-par').append('<a id=' + key.toLowerCase() + ' href="#"><i class="fa fa-times"></i> ' + val.labelValue + ': <span>' + val.labelName + '</span></a>');
                    };

                });
            }

            this.deleteTags();

            return this;
        },

        deleteTags: function() {
            
            $('.search-par a').on('click', function (event) {
                
                event.preventDefault();
                
                var _el = $(event.target).closest('a');
                var _elId = _el.attr('id');
                var _elLoc = form_name.find('.' + _elId + ' *[name="' + _elId + '"]');

                $(_el).animate({opacity: 0} , function() {
                    
                    $( this ).remove();
                    
                    if ( _elLoc.is('select') ) {
                        
                        _elLoc.find('option:selected').prop('selected', false).prop('disabled', false);

                    } else {
                        
                        _elLoc.val('');

                    };
                    
                    delete currentSearch[_elId];
                    delete searchQuery[_elId];
                    _agentLocator.mainSearch.ajaxCount();

                });

            });

            return this;

        },

        ajaxCount: function() {

            $.get('/images/Ajax.asp?acmd=TotalMatches&searchDetails=' + _agentLocator.mainSearch.generateVars(), function(data) {
                submit_btn.html('Show ' + data + ' results!');
            });

            return this;

        },

        generateVars: function (){
            var vars;
            
            $.each(currentSearch, function (key, val) {
                
                searchQuery[key] = val.elValue;

            });

            vars = $('.term').val() + '&' + $.param(searchQuery);
            
            return this, vars;
        },

        ajaxSubmit: function() {
            window.location.href = submit_script + '?searchDetails=' + _agentLocator.mainSearch.generateVars() + '&' + $.param(hiddenFields);
            return this;

        }

    }

}(jQuery);

// search

_agentLocator.autoComplete = function ($) {

    var form_name = form_name || $('.form');
    var form_submit = form_submit || $('.form button');
    var form_el = form_el  || $('.term');
    var scriptName  = scriptName || 'autoComplete.aspx';
    var auto_complete_list = auto_complete_list  || $('.auto-complete-list');
    var userInput = '';
    var searchURL = '';
    var defaultsSet = false;

    return  {

        setDefaults: function(_form_name, _form_submit, _form_el, _scriptName, _auto_complete_list) {
            
            if (defaultsSet === false) {

                form_name = _form_name;
                form_submit = _form_submit;
                form_el = _form_el;
                auto_complete_list = _auto_complete_list;
                scriptName = _scriptName;
                defaultsSet = true;

            };
            return this;
        },

        setElements: function () { 

            form_el.click(function() {
            	
                auto_complete_list.slideToggle();
                //userInput = $.trim( $(this).val() );
            	$(auto_complete_list).find('a').on('click', function(){
                    form_el.val($(this).text());
	     	    $('#SearchType').val($(this).attr('class'));
                    if(scriptName.indexOf('?') > 0)
                    	searchURL = scriptName + '&searchDetails=' + userInput + '&SearchType=' + $(this).attr('class');
                    else
                    	searchURL = scriptName + '?searchDetails=' + userInput + '&SearchType=' + $(this).attr('class');
                    
                    $('#ALBlankDIV').css({'background-color':'#eaeaea','position':'absolute','top':'0%','width':'100%','height':'100%','z-index':'1200'});
                    $('#ALBlankDIV').html('<div style="font-size:26px;padding-top:300px;"><div style="width:400px;margin:0 auto;text-align:center;"><b>Please wait... Loading listings</b></div></div>');
                    form_name.submit();
                    
                    auto_complete_list.slideToggle();
                    });
            });

            form_el.blur(function() {
            
                auto_complete_list.slideToggle();
                
            });
			
            form_submit.click(function(event){
                //This is if we watn to do something when the form submits after a click on the Submit button
            });

            form_el.keyup(function(){
                
                userInput = $.trim( $(this).val() );
                
                if(scriptName.indexOf('?') > 0)
                	searchURL = scriptName + '&searchDetails=' + userInput;
                else
	                searchURL = scriptName + '?searchDetails=' + userInput;
	               

                $.ajax({
                    type: "GET",
                    url: searchURL,
                }).done(function(msg){
                    auto_complete_list.empty().html(msg);
                    $(auto_complete_list).find('a').on('click', function(){
                        form_el.val($(this).text());
			$('#SearchType').val($(this).attr('class'));
                        if(scriptName.indexOf('?') > 0)
                        	searchURL = scriptName + '&searchDetails=' + userInput + '&SearchType=' + $(this).attr('class');
                        else
                        	searchURL = scriptName + '?searchDetails=' + userInput + '&SearchType=' + $(this).attr('class');
                        
                        $('#ALBlankDIV').css({'background-color':'#eaeaea','position':'absolute','top':'0%','width':'100%','height':'100%','z-index':'1200'});
                        $('#ALBlankDIV').html('<div style="font-size:26px;padding-top:300px;"><div style="width:400px;margin:0 auto;text-align:center;"><b>Please wait... Loading listings</b></div></div>');
                        form_name.submit();
                        
                        auto_complete_list.slideToggle();
                    });

                });
            });

            return this;
        }

    }

}(jQuery);



$(document).ready(function(){
	
	if ( $(window).width() < 786 ) {
		 
		$("#MainLoginButton").click(function(event){
		 	event.preventDefault();
		 	window.location.href='/index.asp?PageAction=Login';
		 });

		 $("#MainRegisterButton").click(function(event){
		 	event.preventDefault();
		 	window.location.href='/index.asp?PageAction=Register';
		 });
		 
		$("#MainForgotPasswordButton").click(function(event){
		 	event.preventDefault();
		 	window.location.href='/index.asp?PageAction=ForgotPW';
		 });

		}
	else
		{
		
		$(".user-action").fancybox({
	        minWidth    : 300,
	        maxWidth    : 450, 
	        //minHeight   : 600,
	        //maxHeight   : 430,
	        type        : 'iframe', 
	        fitToView   : true,
	        width       : '100%',
	        height      : '100%',
	        autoSize    : true,
	        autoHeight  : true,
	        autoWidth   : true,
	        autoResize   : true,
	        //autoCenter   : true,
	        padding     : 10,
	        margin      : 0,
	        modal       : false,
	        topRatio    : 0.3,
	        onUpdate    : function(){
	            //$.fancybox.update();
	        }
		 });
		
	}
	
});

