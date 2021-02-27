// Add an active class to the navigation menu
$(document).ready(function(){
	var element = $('meta[name="active-menu"]').attr('content');
    $('#' + element).addClass('active');
});

// Display the Google Map
$(function () {
    function initMap() {
		// Set the longitude and latitude
        var location = new google.maps.LatLng(41.1675332, -89.3057313);
        var mapCanvas = document.getElementById('map');
		// Set the zoom to 7
        var mapOptions = {
            center: location,
            zoom: 7,
            panControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);	
		var markerImage = '/img/marker.png';
		// Set the position of the marker
        var marker = new google.maps.Marker({position: location, map: map, icon: markerImage
        });
		var contentString = '<div class="info-window">' +
            '<h3>Putnam County Conservation Area</h3>' +
            '<div class="info-content">' +
            '<p> 4526 E 1000th St, Hennepin, IL 61327, USA</p>' +
            '</div>' +
            '</div>';
        var infoWindow = new google.maps.InfoWindow({
            content: contentString
        });
        marker.addListener('click', function () {
            infoWindow.open(map, marker);
        });
    }
    google.maps.event.addDomListener(window, 'load', initMap);
});

$(document).ready(function(){
	// Initialize Tooltip
	$('[data-toggle="tooltip"]').tooltip(); 
});

// Load MDB Lightbox on the Gallery page displaying images from different years of the festival
$(function () {
	$("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
});


// Display images on the Gallery page according to the filter
$(function() {
	var selectedClass = "";
	$(".filter").click(function(){
		selectedClass = $(this).attr("data-rel");
		$("#gallery_img").fadeTo(100, 0.1);
		$("#gallery_img div").not("."+selectedClass).fadeOut().removeClass('animation');
		setTimeout(function() {
			$("."+selectedClass).fadeIn().addClass('animation');
			$("#gallery_img").fadeTo(300, 1);
			}, 300);
	});
});

// Get the modal for the login option
var modal = document.getElementById('login_modal');

// Close the modal for the login option when the user clicks outside of the modal
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};

// Tickets price calculations
/** global variables: 
*   vNumber is the number of selected VIP tickets, 
*   bNumber is the number of selected Basic tickets 
*	pNumber is the number of selected Pro tickets, 
*/
var vNumber=0;
var bNumber=0;
var pNumber=0;

/** Global variables: 
*   postNumber is the number of selected posters, stickNumber is the number of selected stickers 
*	badgNumber is the number of selected button badges, var tsNumber is the number of all selected t-shirts,
* 	ttNumber is the number of tank tops and wbNumber is the number of wristbands, 
*	all_merch_no is the number of all selected merchandise items
*/
var postNumber = 0;
var stickNumber = 0;
var badgNumber = 0;
var tsNumber = 0;
var ttNumber = 0;
var wbNumber = 0;
var all_merch_no = 0;

// Get the selected number of VIP passes, the label and price
function vip_total() {
	var vip_no = document.getElementById("vip_pass").value;
	vNumber = parseInt(vip_no);
	var vippass_text = document.getElementById("vip_label").textContent;
	updateVIPBasket(vNumber, vippass_text);
	setCookie("vip_total", vNumber,1);
};
	
// Get the selected number of Pro tickets from the drop down list, the label and price
function pro_total() {
	var pro_no = document.getElementById("pro").value;	
	pNumber = parseInt(pro_no);
	var protick_text = document.getElementById("pro_label").textContent;
	updateProBasket(pNumber, protick_text);
	setCookie("pro_total", pNumber,1);	
};

// Get the selected number of Basic tickets from the drop down list, the label and price	
function basic_total() {
	var basic_no = document.getElementById("basic").value;		
	bNumber = parseInt(basic_no);	
	var bas_text = document.getElementById("basic_label").textContent;
	updateBasicBasket(bNumber, bas_text);
	setCookie("basic_total", bNumber,1);
};


// Get the selected number of posters from the drop down list; the label and price
function post_total() {
	var post_no = document.getElementById("poster").value;
	postNumber = parseInt(post_no);
	var post_text = document.getElementById("post_label").textContent;
	updatePostBasket(postNumber, post_text);
	setCookie("post_total", postNumber,1);
};


// Get the selected number of stickers from the drop down list; the label and price
function stick_total() {
	var stick_no = document.getElementById("sticker").value;
	stickNumber = parseInt(stick_no);
	var stick_text = document.getElementById("stick_label").textContent;
	updateStickBasket(stickNumber, stick_text);
	setCookie("stick_total", stickNumber,1);
};


// Get the selected number of button badges from the drop down list, the label and price
function button_total() {
	var button_no = document.getElementById("btnbadge").value;
	badgNumber = parseInt(button_no);
	var button_text = document.getElementById("btn_label").textContent;
	updateButtonBasket(badgNumber, button_text);
	setCookie("button_total", badgNumber,1);
};

// Get the selected number of T-shirts from the drop down list, the label and price
function tshirt_total() {
	var tshirt_no = document.getElementById("tshirt").value;
	tsNumber = parseInt(tshirt_no);
	var tshirt_text = document.getElementById("tsh_label").textContent;
	var tsh_size = document.getElementById("tshirt_size").value;
	updateTshirtBasket(tsNumber,tshirt_text,tsh_size);
	setCookie("tshirt_total", tsNumber,1);
};

// Get the selected number of tank tops from the drop down list, the label and price
function top_total() {
	var top_no = document.getElementById("tshirt_nosl").value;
	topNumber = parseInt(top_no);
	var top_text = document.getElementById("tank_label").textContent;
	var top_size = document.getElementById("tshirt_nosl_size").value;
	updateTopBasket(topNumber,top_text, top_size);
	setCookie("top_total", topNumber,1);
};

// Get the selected number of wristbands from the drop down list; the label and price
function wband_total() {
	var wband_no = document.getElementById("wistb").value;
	wbNumber = parseInt(wband_no);
	var wb_text = document.getElementById("wb_label").textContent;
	updateWbBasket(wbNumber,wb_text);
	setCookie("wband_total", wbNumber,1);
};

/** Create a Cookie for the number of selected tickets 
* 	and items on the Shop page that expires in a set number of days
*
*	@param c_name - cookie name
*	@param c_value - cookie value
*	@param c_days - numbers of days after which the cookie expires
*/
function setCookie(c_name, c_value, c_days){
	//check the date when the cookie should expire
	var exp = new Date();
	exp.setTime(exp.getTime()+(c_days*24*60*60*1000));
	var expires = "expires=" + exp.toUTCString();
	document.cookie = c_name + "=" + c_value + ";" + expires + ";path=/";
}

/** 
*	Return the value of the cookie
*	@param c_name - cookie with the name c_name
*	@returns cookie value if the cookie name is found, otherwise return ""
*/
function getCookie(c_name) {
	var c_n = c_name + "=";
	// Decode the cookie
	var decode = decodeURIComponent(document.cookie); 
	// Split document.cookie at ';' and create an array
	var c_split = decode.split(';');
	// Read out values in the array and search for the cookie
	var c_splt_lgth = c_split.length; 
	for(var i = 0; i <c_splt_lgth; i++) {
		var ci = c_split[i];
		while (ci.charAt(0) == ' ') {
			ci= ci.substring(1);
		}
		// Find the cookie with the name c_name and return its value
		if (ci.indexOf(c_n) == 0) {
		return ci.substring(c_n.length, ci.length);
		}
	}
  return "";
}

/**
* Check if the cookie 'in_basket' exists; 
* Show the number of selected tickets 
* and items in the badge element next to the basket icon in the nav bar
*/
var all_basket = 0;
var cart_tick = 0;

// Return numbers of selected tickets from cookies
function ticketsNumbers(){
	var vip = getCookie("vip_total");
	var pro = getCookie("pro_total");
	var basic = getCookie("basic_total");
	var vip_n = parseInt(vip) || 0;
	var pro_n = parseInt(pro) || 0;
	var basic_n = parseInt(basic) || 0;
	
	cart_tick = vip_n + pro_n + basic_n;
	return cart_tick;
}

// Global variable to reference the number of merchendise items
var cart_merch = 0;

// Return numbers of selected merchandise items from cookies
function itemsNumbers(){
	var poster = getCookie("post_total");
	var sticker = getCookie("stick_total");
	var bbadge = getCookie("button_total");
	var tshirt = getCookie("tshirt_total");
	var ttop = getCookie("top_total");
	var wband = getCookie("wband_total");
	var poster_n = parseInt(poster) || 0;
	var sticker_n = parseInt(sticker) || 0;
	var bbadge_n = parseInt(bbadge) || 0;
	var tshirt_n = parseInt(tshirt) || 0;
	var ttop_n = parseInt(ttop) || 0;	
	var wband_n = parseInt(wband) || 0;

	cart_merch = poster_n + sticker_n  + bbadge_n + tshirt_n + ttop_n + wband_n;
	return cart_merch;
}

/**
* Local variables - 
* cart_merch is the number of all selected merchandise items, 
* cart_tick is the number of all selected tickets, 
* merch_tick is the number of all selected merchandise items and tickets
*/
function checkCookie() {
	var all_basket = 0;
	// Get the number of selected items and tickets from the cookie
	all_basket = getCookie("in_basket");
	// Get the total number of tickets
	var cart_tickets = ticketsNumbers();
	// Get the total number of items
	var cart_mitems = itemsNumbers();
		var merch_tick = cart_mitems + cart_tickets;
			// If the value of all_basket is not null, undefined or NaN, and the value of merch_tick is not NaN			
			if(all_basket != "" && all_basket != null && all_basket !='undefined' && all_basket !=NaN && merch_tick !=NaN){
				all_basket = parseInt(all_basket);
				// Set the value of all_basket to the total of merchendise items and tickets 
				all_basket = merch_tick;
				// If the basket is empty and the value is NaN
				if(all_basket !=0 && all_basket !=NaN ){
					// Display the total number of tickets and items in the basket badge
					document.getElementById("basket_id").innerHTML = all_basket;
				}
				// If the basket is empty
				if(all_basket ==0){
					// Set the basket badge to empty field if the selected number of tickets or items is equal to 0 
					document.getElementById("basket_id").innerHTML = "";
			}}
			else{
				all_basket = merch_tick;
				// If the basket is not equal to 0 and NaN
				if(all_basket !=0 && all_basket !=NaN ){
				// Set the basket badge value to the total of tickets and items
					document.getElementById("basket_id").innerHTML = all_basket;
				}
			}
			// Set the cookie with the value of the total number of selected tickets and items
			setCookie("in_basket", all_basket,1);
}

// Check if the cookie basket_list exists and update the Basket page
/** 
*	Global variables
*	vip_text references the label text of the VIP passes,
*	pro_text references the label text of the Pro tickets,
*	basic_text references the label text of the Basic tickets,
*   vip_subt references the subtotal of vip passes,
*   pro_subt references the subtotal of pro tickets,	
*   bas_subt references the subtotal of basic tickets.
*/
var vip_text = [];
var pro_text = [];
var basic_text = [];

var vip_subt = 0;
var pro_subt= 0;	
var	bas_subt= 0;

/** 
*	Global variables:
*	pt_text references the label text of the posters,
*	st_text references the label text of the stickers,
*	bd_text references the label text of the button badges,
*	ts_text references the label text of the T-shirts,
*	tt_text references the label text of the top tanks,
*	wb_text references the label text of the wristbands.
*   post_subt references the subtotal of posters,
*   stick_subt references the subtotal of stickers,	
*   btn_subt references the subtotal of buttons.
*   tsh_subt references the subtotal of T-shirts.
*   tt_subt references the subtotal of tank tops.
*   wb_subt references the subtotal of wristbands.
*/
var pt_text = [];
var st_text = [];
var bd_text = [];
var ts_text = [];
var tt_text = [];
var wb_text = [];

var	post_subt= 0;
var	stick_subt= 0;
var	btn_subt= 0; 
var	tsh_subt= 0;
var	tt_subt= 0;
var	wb_subt= 0;

/**
* Create an array with details about selected VIP passes:
* the number of VIP passes, label, price and subtotal
*/
function updateVIPBasket(vNo, vip_lab){  
	var vip_no = vNo;
	var vip_l = vip_lab; // VIP pass label
	var vip_split = vip_l.match(/\d+/g); // VIP pass price
	var vip_dollar = "$" + vip_split; // Add the dollar sign to the price
	var vip_float = Number(vip_split);
	vip_subt = vip_float*vip_no; // Calculate subtotal
	var vip_subtd = "$" + vip_subt // Add the dollar sign to the subtotal

	vip_text = [vip_l, vip_no, vip_dollar, vip_subtd];

	// Convert the string into a JSON string so it can be stored and retrieved from a cookie
	var vip_json = JSON.stringify(vip_text);
	// Set cookies with details and subtotal;
	setCookie("vip_details", vip_json, 1);
	setCookie("vip_subt", vip_subt, 1)
}

/**
* Create an array with details about selected Pro tickets:
* the number of Pro tickets, label, price and subtotal
*/
function updateProBasket(pNo, pro_lab){
    // Selected tickets details   
	var pro_no = pNo;
	var pro_l = pro_lab; // Pro ticket label
	var pro_split = pro_l.match(/\d+/g); // Pro ticket price
	var pro_dollar = "$" + pro_split; // Add the dollar sign to the price
	var pro_float = Number(pro_split);
	pro_subt = pro_float*pro_no; // Calculate subtotal
	var pro_subtd = "$" + pro_subt // Add the dollar sign to the subtotal
	pro_text = [pro_l, pro_no, pro_dollar, pro_subtd];
	// Convert the string into a JSON string so it can be stored and retrieved from a cookie
	var pro_json = JSON.stringify(pro_text);
	// Set cookies with details and subtotal;
	setCookie("pro_details", pro_json, 1);
	setCookie("pro_subt", pro_subt, 1)
}

/**
* Create an array with details about selected Basic tickets
* the number of Basic tickets, label, price and subtotal
*/
function updateBasicBasket(bNo, bas_lab){
	var bas_no = bNo;
	var bas_l = bas_lab; // Basic ticket label
	var bas_split = bas_l.match(/\d+/g); // Basic ticket price	
	var bas_dollar = "$" + bas_split; // Add the dollar symbol to the price
	var bas_float = Number(bas_split);
	bas_subt = bas_float*bas_no; // Calculate subtotal
	var bas_subtd = "$" + bas_subt // Add the dollar symbol to the subtotal
	basic_text = [bas_l, bas_no, bas_dollar, bas_subtd];
	var basic_json = JSON.stringify(basic_text);
	// Set cookies with details and subtotal;
	setCookie("basic_details", basic_json, 1);
	setCookie("basic_subt", bas_subt, 1);	
}

/**
* Create an array with details about selected posters:
* the number, label, price and subtotal of posters
*/
function updatePostBasket(pNo, ptr_lab){
	// Selected posters details   
	var poster_no = pNo;
	var p_l = ptr_lab; // Poster label
	var post_split = p_l.match(/\d+/g); // Poster price
	var post_dollar = "$" + post_split; // Add the dollar symbol to the price
	var post_float = Number(post_split);
	post_subt = post_float*poster_no; // Calculate subtotal
	var post_subtd = "$" + post_subt // Add the dollar symbol to the subtotal
		
	pt_text = [p_l, poster_no, post_dollar, post_subtd];
	// Convert the string into a JSON string so it can be stored and retrieved from a cookie
	var post_json = JSON.stringify(pt_text);
	// Set cookies with details and subtotal;
	setCookie("post_details", post_json, 1);
	setCookie("post_subt", post_subt, 1);
}

/**
* Create an array with details about selected stickers:
* the number, label, price and subtotal of the stickers
*/
function updateStickBasket(s_No, s_lab){
    // Selected posters details   
	var stk_no = s_No;
	var stk_l = s_lab; // Sticker label
	var stick_split = stk_l.match(/\d+/g); // Poster price
	var stick_dollar = "$" + stick_split;
	var stick_float = Number(stick_split);
	stick_subt = stick_float*stk_no;
	var stick_subtd = "$" + stick_subt		
	st_text = [stk_l, stk_no, stick_dollar, stick_subtd];
	// Convert the string into a JSON string so it can be stored and retrieved from a cookie
	var stick_json = JSON.stringify(st_text);
	setCookie("stick_details", stick_json, 1);
	setCookie("stick_subt", stick_subt, 1)
}

/**
* Create an array with details about selected button badges:
* the number, label, price and subtotal of the button badges
*/
function updateButtonBasket(b_No, b_lab){
    // Selected button badge details   
	var btn_no = b_No;
	var btn_l = b_lab; // Button badge label
	var btn_split = btn_l.match(/\d+/g); // Button badge price
	var btn_dollar = "$" + btn_split;
	var btn_float = Number(btn_split);
	btn_subt = btn_float*btn_no;
	var btn_subtd = "$" + btn_subt	
	bd_text = [btn_l, btn_no, btn_dollar, btn_subtd];
	// Convert the string into a JSON string so it can be stored and retrieved from a cookie
	var btn_json = JSON.stringify(bd_text);
	
	setCookie("btn_details", btn_json, 1);
	setCookie("btn_subt", btn_subt, 1)
}

/**
* Create an array with details about selected T-shirts:
* the number, label, price and subtotal of the T-shirts
*/
function updateTshirtBasket(ts_No, ts_lab, ts_size){
    // Selected T-shirts details   
	var tsh_no = ts_No;
	var tsh_l = ts_lab; // T-shirt label
	var tsh_s = ts_size;
	var tsh_split = tsh_l.match(/\d+/g); // T-shirt price
	var tsh_ls;
	if(tsh_s !=""){
	tsh_ls = tsh_l + ", " + tsh_s;
	}
	else{
		tsh_ls = tsh_l;
	}
	var tsh_dollar = "$" + tsh_split;
	var tsh_float = Number(tsh_split);
	tsh_subt = tsh_float*tsh_no;
	var tsh_subtd = "$" + tsh_subt
		
	ts_text = [tsh_ls, tsh_no, tsh_dollar, tsh_subtd];
	// Convert the string into a JSON string so it can be stored and retrieved from a cookie
	var tsh_json = JSON.stringify(ts_text);
	setCookie("tsh_details", tsh_json, 1);
	setCookie("tsh_subt", tsh_subt, 1)	
}

/**
* Create an array with details about selected tank tops:
* the number, label, price and subtotal of the tank tops
*/
function updateTopBasket(ttop_no, ttop_lab, ttop_size){
    // Selected tank tops details   
	var tt_no = ttop_no;
	var tt_l = ttop_lab; // Tank tops label
	var tt_ls;
	var tt_s = ttop_size;
	if(tt_s !=""){
	tt_ls = tt_l + ", " + tt_s;
	}
	else{
		tt_ls = tt_l 
	}		
	var tt_split = tt_l.match(/\d+/g); // Tank tops price
	
	var tt_dollar = "$" + tt_split;
	var tt_float = Number(tt_split);
	tt_subt = tt_float*tt_no;
	var tt_subtd = "$" + tt_subt;	
	tt_text = [tt_ls, tt_no, tt_dollar, tt_subtd];	
	// Convert the string into a JSON string so it can be stored and retrieved from a cookie
	var tt_json = JSON.stringify(tt_text);
	
	setCookie("tt_details", tt_json, 1);
	setCookie("tt_subt", tt_subt, 1)
}

/**
* Create an array with details about selected tank tops:
* the number, label, price and subtotal of the tank tops
*/
function updateWbBasket(wbd_no, wbd_lab){
    // Selected wristbands details   
	var wb_no = wbd_no;
	var wb_l = wbd_lab; // Wristbands label
	var wb_split = wb_l.match(/\d+/g); // Tank tops price
	var wb_dollar = "$" + wb_split;
	var wb_float = Number(wb_split);
	wb_subt = wb_float*wb_no;
	var wb_subtd = "$" + wb_subt;
		
	wb_text = [wb_l, wb_no, wb_dollar, wb_subtd];
	// Convert the string into a JSON string so it can be stored and retrieved from a cookie
	var wb_json = JSON.stringify(wb_text);
	setCookie("wb_details", wb_json, 1);
	setCookie("wb_subt", wb_subt, 1)
}

/**
* Display a table with selected tickets details
*/
function createTable(){
	var vip_select_json = getCookie("vip_details");
	var pro_select_json = getCookie("pro_details");
	var basic_select_json = getCookie("basic_details");

	var post_select_json = getCookie("post_details");
	var stick_select_json = getCookie("stick_details");
	var badg_select_json = getCookie("btn_details");	
	var ts_select_json = getCookie("tsh_details");
	var tt_select_json = getCookie("tt_details");
	var wb_select_json = getCookie("wb_details");
	
	var vip_selection;
	var pro_selection;
	var basic_selection;
	
	var post_selection;
	var stick_selection;
	var badg_selection;
	var ts_selection;
	var tt_selection;
	var wb_selection;
	
	if (vip_select_json !=""){
		vip_selection = JSON.parse(vip_select_json);
	}
	if (pro_select_json !=""){
		pro_selection = JSON.parse(pro_select_json);
	}
	if (basic_select_json !=""){
		basic_selection = JSON.parse(basic_select_json);
	}
	if (post_select_json !=""){
		post_selection = JSON.parse(post_select_json);
	}
	if (stick_select_json !=""){
		stick_selection = JSON.parse(stick_select_json);
	}
	if (badg_select_json !=""){
		badg_selection = JSON.parse(badg_select_json);
	}
	
	if (ts_select_json !=""){
		ts_selection = JSON.parse(ts_select_json);
	}
	
	if (tt_select_json !=""){
		tt_selection = JSON.parse(tt_select_json);
	}
	
	if (wb_select_json !=""){
		wb_selection = JSON.parse(wb_select_json);
	}
	
	var all_result = "";
	// If VIP passes were selected add a row with their details
	if(vip_selection && vip_selection.length)
	{
		for(var i=0; i<vip_selection.length; i++) 
		{
			all_result += "<td>"+vip_selection[i]+"</td>";
		}
		all_result +="<td><button class=\"remove\" onclick=\"deleteRowVIP(this)\"><i class=\"fa fa-remove\"></i></button></td></tr><tr>";
	}
	// If Pro tickets were selected add a row with their details
	if(pro_selection && pro_selection.length)
	{
		for(var i=0; i<pro_selection.length; i++)
		{ 
	
			all_result += "<td>"+pro_selection[i]+"</td>" ;
		}
		all_result +="<td><button class=\"remove\" onclick=\"deleteRowPro(this)\"><i class=\"fa fa-remove\"></i></button></td></tr><tr>";
	}
	
	// If Basic tickets were selected add a row with their details
	if(basic_selection && basic_selection.length)
	{
		for(var i=0; i<basic_selection.length; i++)
		{
			all_result +="<td>"+basic_selection[i]+"</td>" ;
		}
			all_result +="<td><button class=\"remove\" onclick=\"deleteRowBasic(this)\"><i class=\"fa fa-remove\"></i></button></td></tr>";
    }
	// If Posters were selected add a row with their details
	if(post_selection && post_selection.length)
	{
		for(var i=0; i<post_selection.length; i++)
		{
			all_result +="<td>"+post_selection[i]+"</td>" ;
		}
			all_result +="<td><button class=\"remove\" onclick=\"deleteRowPost(this)\"><i class=\"fa fa-remove\"></i></button></td></tr>";
    }
		// If Stickers were selected add a row with their details
	if(stick_selection && stick_selection.length)
	{
		for(var i=0; i<stick_selection.length; i++)
		{
			all_result +="<td>"+stick_selection[i]+"</td>" ;
		}
			all_result +="<td><button class=\"remove\" onclick=\"deleteRowStick(this)\"><i class=\"fa fa-remove\"></i></button></td></tr>";
    }
	// If Badges were selected add a row with their details
	if(badg_selection && badg_selection.length)
	{
		for(var i=0; i<badg_selection.length; i++)
		{
			all_result +="<td>"+badg_selection[i]+"</td>" ;
		}
			all_result +="<td><button class=\"remove\" onclick=\"deleteRowBadg(this)\"><i class=\"fa fa-remove\"></i></button></td></tr>";
    }
		// If T-shirts were selected add a row with their details
	if(ts_selection && ts_selection.length)
	{
		for(var i=0; i<ts_selection.length; i++)
		{
			all_result +="<td>"+ts_selection[i]+"</td>" ;
		}
			all_result +="<td><button class=\"remove\" onclick=\"deleteRowTs(this)\"><i class=\"fa fa-remove\"></i></button></td></tr>";
    }

	// If tank tops were selected add a row with their details
	if(tt_selection && tt_selection.length)
	{
		for(var i=0; i<tt_selection.length; i++)
		{
	
			all_result +="<td>"+tt_selection[i]+"</td>" ;
		}
			all_result +="<td><button class=\"remove\" onclick=\"deleteRowTt(this)\"><i class=\"fa fa-remove\"></i></button></td></tr>";
    }

	// If wristbands were selected add a row with their details
	if(wb_selection && wb_selection.length)
	{
		for(var i=0; i<wb_selection.length; i++)
		{
	
			all_result +="<td>"+wb_selection[i]+"</td>" ;
		}
			all_result +="<td><button class=\"remove\" onclick=\"deleteRowWb(this)\"><i class=\"fa fa-remove\"></i></button></td></tr>";
    }

	setCookie("basket_details", all_result, 1);
	return all_result;
}

var total_pay = 0;

/**
*  Get the total of all subtotals of selected tickets and merchandise items and saved it in a cookie
*/
function get_totals(){
	var v_int;
	var p_int;
	var b_int;
	var pr_int;
	var s_int;
	var bn_int;
	var tt_int;
	var wb_int;
	var ts_int;
	
	var v_total = getCookie("vip_subt");
	var p_total = getCookie("pro_subt");
	var b_total = getCookie("basic_subt");
	var pr_total = getCookie("post_subt");
	var st_total = getCookie("stick_subt");
	var bn_total = getCookie("btn_subt");
	var tt_total = getCookie("tt_subt");
	var wb_total = getCookie("wb_subt");
	var ts_total = getCookie("tsh_subt");
	
	if (v_total !=""){
		var v_int = parseInt(v_total);
	}
	else{
		var v_int = 0;
	}
	if (p_total !=""){
		var p_int = parseInt(p_total);
	}
	else{
		var p_int = 0;
	}
	if (b_total !=""){
		var b_int = parseInt(b_total);
	}
	else{
		var b_int = 0;
	}
	if (pr_total !=""){
		var pr_int = parseInt(pr_total);
	}
	else{
		var pr_int = 0;
	}
	if (st_total !=""){
		var s_int = parseInt(st_total);
	}
	else{
		var s_int = 0;
	}
	if (bn_total !=""){
		var bn_int = parseInt(bn_total);
	}
	else{
		var bn_int = 0;
	}
	
	if (ts_total !=""){
		var ts_int = parseInt(ts_total);
	}
	else{
		var ts_int = 0;
	}
	if (wb_total !=""){
			var wb_int = parseInt(wb_total);
	}
	else{
		var wb_int = 0;
	}
	if (tt_total !=""){
		var tt_int = parseInt(tt_total);
	}
	else{
		var tt_int = 0;
	}
	
	total_pay = p_int +v_int +b_int+ pr_int+ s_int + bn_int+ ts_int+ tt_int + wb_int;
	return total_pay;	
}

var all_sum = 0;
function checkTableCookie() {
	all_sum = get_totals();
	var sum_dollar = "$" + all_sum;
	var b_details = createTable();
		if(b_details != "" && b_details != null && b_details !='undefined' && b_details !=NaN){  
			var new_result = "<table><thead><tr><th>Item</th><th>Qantity</th><th>Price</th><th>Subtotal</th><th></th></tr></thead><tbody><tr>";
			new_result+= b_details +"<th></th><th></th><th>Total</th><th>" +sum_dollar +"</th></tbody></table>";
			document.getElementById("basket_table").innerHTML = new_result;
			$('#paypal-button-container').css('display', 'inline-block');
		}
		else{
			document.getElementById("basket_table").innerHTML = "";
			hidePayPal();
			document.getElementById("empty_basket").textContent = "Your basket is empty";
			document.getElementById("sum").textContent = "Total $0";
		}
}

// Hide Continue to PayPal button if the basket is empty
function hidePayPal() {
	var pp = document.getElementById("paypal-button-container");
	pp.style.display = "none";
  }

/*
* Delete a row with selected VIP passes, update the number of 
* VIP passes in the basket badge in the nav bar, update the cookie storing the number of 
* selected number of VIP passes, and update the cookie storing details about the VIP passes
* 
*/
function deleteRowVIP(row) {
	var a_row = row.parentNode.parentNode.rowIndex;
	var del_no = document.getElementById("basket_table").rows[a_row].cells[1].innerHTML;
	var del_int = parseInt(del_no);
	document.getElementById("basket_table").deleteRow(a_row);
	setCookie("vip_total", "",1);
	setCookie("vip_details", "", 1);
	setCookie("vip_subt", "", 1);
	checkTableCookie();checkCookie();	
}

/*
* Delete a row with selected Pro tickets, update the number of 
* Pro tickets in the basket badge in the nav bar, update the cookie storing the number of 
* selected number of Pro tickets, and update the cookie storing details about the Pro tickets
* 
*/
function deleteRowPro(row) {
	var a_row = row.parentNode.parentNode.rowIndex;
	var del_no = document.getElementById("basket_table").rows[a_row].cells[1].innerHTML;
	var del_int = parseInt(del_no);
	document.getElementById("basket_table").deleteRow(a_row);
	setCookie("pro_total", "",1);
	setCookie("pro_details", "", 1);
	setCookie("pro_subt", "", 1);  
	checkTableCookie();checkCookie();
}

/*
* Delete a row with selected Basic tickets, update the number of 
* Basic tickets in the basket badge in the nav bar, update the cookie storing the number of 
* selected number of Basic tickets, and update the cookie storing details about the Basic tickets
* 
*/
function deleteRowBasic(row) {
	var a_row = row.parentNode.parentNode.rowIndex;
	var del_no = document.getElementById("basket_table").rows[a_row].cells[1].innerHTML;
	var del_int = parseInt(del_no);
	document.getElementById("basket_table").deleteRow(a_row);
	setCookie("basic_total", "",1);
	setCookie("basic_details", "", 1);
	setCookie("basic_subt", "", 1); 
	checkTableCookie();checkCookie();
}

/*
* Delete a row with selected posters, update the number of 
* posters in the basket badge in the nav bar, update the cookie storing the number of 
* selected number of posters, and update the cookie storing details about posters
* 
*/
function deleteRowPost(row) {
	var a_row = row.parentNode.parentNode.rowIndex;
	var del_no = document.getElementById("basket_table").rows[a_row].cells[1].innerHTML;
	var del_int = parseInt(del_no);
	document.getElementById("basket_table").deleteRow(a_row);
	setCookie("post_total", "",1);
	setCookie("post_details", "", 1);
	setCookie("post_subt", "", 1);
	checkTableCookie();checkCookie();
}

/*
* Delete a row with selected stickers, update the number of 
* stickers in the basket badge in the nav bar, update the cookie storing the number of 
* selected number of stickers, and update the cookie storing details about stickers
* 
*/
function deleteRowStick(row) {
	var a_row = row.parentNode.parentNode.rowIndex;
	var del_no = document.getElementById("basket_table").rows[a_row].cells[1].innerHTML;
	var del_int = parseInt(del_no);
	document.getElementById("basket_table").deleteRow(a_row);
	setCookie("stick_total", "",1);
	setCookie("stick_details", "", 1);
	setCookie("stick_subt", "", 1);
	checkTableCookie(); checkCookie();
}

/*
* Delete a row with selected button badges, update the number of 
* button badges in the basket badge in the nav bar, update the cookie storing the number of 
* selected number of button badges, and update the cookie storing details about button badges
* 
*/
function deleteRowBadg(row) {
	var a_row = row.parentNode.parentNode.rowIndex;
	var del_no = document.getElementById("basket_table").rows[a_row].cells[1].innerHTML;
	var del_int = parseInt(del_no);
	document.getElementById("basket_table").deleteRow(a_row);
	setCookie("button_total", "",1);
	setCookie("btn_details", "", 1);
	setCookie("btn_subt", "", 1);
	checkTableCookie();checkCookie();
}

/*
* Delete a row with selected T-shirts, update the number of 
* T-shirts in the basket badge in the nav bar, update the cookie storing the number of 
* selected number of T-shirts, and update the cookie storing details about T-shirts
* 
*/
function deleteRowTs(row) {
	var a_row = row.parentNode.parentNode.rowIndex;
	var del_no = document.getElementById("basket_table").rows[a_row].cells[1].innerHTML;
	var del_int = parseInt(del_no);
	document.getElementById("basket_table").deleteRow(a_row);
	setCookie("tshirt_total", "",1);
	setCookie("tsh_details", "", 1);
	setCookie("tsh_subt", "", 1);
	checkTableCookie();checkCookie();
}

/*
* Delete a row with selected tank tops, update the number of 
* tank tops in the basket badge in the nav bar, update the cookie storing the number of 
* selected number of tank tops, and update the cookie storing details about tank tops
* 
*/
function deleteRowTt(row) {
	var a_row = row.parentNode.parentNode.rowIndex;
	var del_no = document.getElementById("basket_table").rows[a_row].cells[1].innerHTML;
	var del_int = parseInt(del_no);
	document.getElementById("basket_table").deleteRow(a_row);
	setCookie("top_total", "",1);
	setCookie("tt_details", "", 1);
	setCookie("tt_subt", "", 1);    
	checkTableCookie(); checkCookie(); 
}

/*
* Delete a row with selected wristbands, update the number of 
* wristbands in the basket badge in the nav bar, update the cookie storing the number of 
* selected number of wristbands, and update the cookie storing details about wristbands
* 
*/
function deleteRowWb(row) {
	var a_row = row.parentNode.parentNode.rowIndex;
	var del_no = document.getElementById("basket_table").rows[a_row].cells[1].innerHTML;
	var del_int = parseInt(del_no);
	document.getElementById("basket_table").deleteRow(a_row);
	setCookie("wband_total", "",1);
	setCookie("wb_details", "", 1);
	setCookie("wb_subt", "", 1);
	checkTableCookie();checkCookie(); 
}

// Reset cookies holding records of selected tickets and items to 0
function resetCookies(){
	var basket_details = getCookie("basket_details");
	var in_basket = getCookie("in_basket");
	var basic_details = getCookie("basic_details");
	var vip_details = getCookie("vip_details");
	var pro_details = getCookie("pro_details");
	var wb_details = getCookie("wb_details");
	var tt_details = getCookie("tt_details");
	var tsh_details = getCookie("tsh_details");
	var btn_details = getCookie("btn_details");
	var stick_details= getCookie("stick_details");
	var post_details = getCookie("post_details")
	var pro_total = getCookie("pro_total");
	var basic_total= getCookie("basic_total");
	var vip_total = getCookie("vip_total");
	var post_total = getCookie("post_total");
	var stick_total = getCookie("stick_total");
	var button_total = getCookie("button_total");
	var tshirt_total = getCookie("tshirt_total");
	var top_total = getCookie("top_total");
	var wband_total = getCookie("wband_total");
	var tt_subt =getCookie("tt_subt");
	var vip_subt =getCookie("vip_subt");
	var pro_subt= getCookie("pro_subt");
	var basic_subt =getCookie("basic_subt");
	var post_subt =getCookie("post_subt");
	var stick_subt= getCookie("stick_subt");
	var btn_subt= getCookie("btn_subt");
	var tsh_subt= getCookie("tsh_subt");
	var wb_subt =getCookie("wb_subt");
	
	if(basket_details){
		setCookie("vip_subt", "", -1);
	}
	if(basket_details){
			setCookie("tt_subt", "", -1);
	}
	if(basket_details){
		setCookie("pro_subt", "", -1);
	}
	if(basket_details){
		setCookie("basic_subt", "", -1);
	}
	if(basket_details){
		setCookie("post_subt", "", -1);
	}
	if(basket_details){
		setCookie("stick_subt", "", -1);
	}
	if(basket_details){
	setCookie("btn_subt", "", -1);
	}
	if(basket_details){
		setCookie("tsh_subt", "", -1);
	}
	if(basket_details){
	setCookie("wb_subt", "", -1);	
	}
	if(basket_details){
		setCookie("basket_details", "", -1);
	}
	if(in_basket){
		setCookie("in_basket", "",-1);
	}
	if(basic_details){
		setCookie("basic_details", "",-1);
	}
	if(vip_details){
		setCookie("vip_details", "", -1);
	}
	if(pro_details){
		setCookie("pro_details", "",-1);
	}
	if(wb_details){
		setCookie("wb_details", "",-1);
	}
	if(tt_details){
		setCookie("tt_details", "", -1);
	}
	if(tsh_details){
		setCookie("tsh_details", "", -1);
	}
	if(btn_details){
		setCookie("btn_details", "", -1);
	}
	if(stick_details){
		setCookie("stick_details", "", -1);
	}
	if(post_details){
		setCookie("post_details", "", -1);
	}
	if(pro_total){
		setCookie("pro_total", "",-1);
	}
	if(basic_total){
		setCookie("basic_total", "",-1);
	}
	if(vip_total){
		setCookie("vip_total", "",-1);
	}
	if(post_total){
		setCookie("post_total", "", -1);
	}
	if(stick_total){
		setCookie("stick_total", "", -1);
	}
	if(button_total){
		setCookie("button_total", "", -1);
	}
	if(tshirt_total){
		setCookie("tshirt_total", "", -1);
	}
	if(top_total){
		setCookie("top_total", "",-1);
	}
	if(wband_total){	
		setCookie("wband_total","",-1);
	}
	document.getElementById("basket_id").innerHTML = "";
	document.getElementById("basket_table").innerHTML = "";
	hidePayPal();
}	

// Registration page
// Check if the value of the email address and confirm email address fields match
function match_email(){
	var reg_email = document.getElementById("reg_email").value;
	var conf_email = document.getElementById("conf_email").value;
	if(reg_email != conf_email) {
			document.getElementById("conf_email").setCustomValidity("Emails don't match");
    }
	else{
		 return reg_email; 
	}
}

// Get the data from the input fields on the registrattion page
function get_reg_data(){
	// Read the input data
	var email_matched = match_email();
	var regfname = document.getElementById("regfname").value;
	var reglname = document.getElementById("reglname").value;
	var regpass = document.getElementById("regpass").value;
	var tel = document.getElementById("tel").value;
	var dob = document.getElementById("dob").value;
	var month_id = document.getElementById("month_id").value;
	var day = document.getElementById("day").value;
	var street = document.getElementById("street").value;
	var town = document.getElementById("town").value;
	var zip = document.getElementById("zipc").value;
	var tandc = document.querySelector('#tandc').checked;
	var subsc = document.querySelector('#subsc').checked;

	// Trim trailing and leading spaces
	 var regfname_trim = regfname.replace(/^\s+|\s+$/gm,'');
	 var reglname_trim =  reglname.replace(/^\s+|\s+$/gm,'');
	 var reg_email_trim =  email_matched.replace(/^\s+|\s+$/gm,'');
	 var regpass_trim =  regpass.replace(/^\s+|\s+$/gm,'');
	 var tel_trim =  tel.replace(/^\s+|\s+$/gm,'');
	 var dob_trim =  dob.replace(/^\s+|\s+$/gm,'');
	 var street_trim =  street.replace(/^\s+|\s+$/gm,'');
	 var town_trim =  town.replace(/^\s+|\s+$/gm,'');
	 var zip_trim =  zip.replace(/^\s+|\s+$/gm,'');						
}

// On submit of the registration store the value of the password and the email in a cookie
$(document).ready(function() {
	$("#reg_form").submit(function(e){
		 // Set the session cookie to hold the email address and password entered on the registration page
		var user_reg_email = match_email();
		var user_reg_pass = document.getElementById("regpass").value;
		setCookie("user_email", user_reg_email, 3);
		setCookie("user_pass", user_reg_pass, 3);
		// Display a confirmation message after the registration form is submitted and hide the form
		e.preventDefault();
		$('#confirm_reg').css('display', 'inline-block');
		var register_form = document.getElementById("reg_form");
		register_form.style.display = "none";
	});
})

// Validate login details in the Login modal
function validate_login(){
	// Get the email address and the password from the login modal
	var login_email = document.getElementById("usern").value;
	var login_pass = document.getElementById("pass").value;
	// Get the email address and the password entered on the registraton page from cookies 
	var u_reg_email = getCookie("user_email");
	var u_reg_pass = getCookie("user_pass");
	if (u_reg_email == login_email && u_reg_pass == login_pass) {
		document.getElementById('login_modal').style.display='none';
	}
	else{
		document.getElementById("submit_login").setCustomValidity("Email address or password are incorrect");
	}
}

// Hide the form on the Newsletter page after the user the submit button has been clicked
function confirm_subsc(){
	$('#confirm_subs').css('display', 'inline-block');
	var news_form = document.getElementById("newsletter_form");
	news_form.style.display = "none";
}

