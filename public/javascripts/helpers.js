/*
* PayPal checkout 
* onApprove() is called after the user accepted the payment on PayPal
* createOrder() is called when PayPal button is pressed
* actions.order.capture() capture funds from the transaction.
*/
$(document).ready(function(){
paypal.Buttons({
    createOrder: function(data, actions){
      return actions.order.create({
        purchase_units: [{
          amount: {
            currency_code: "USD",
			value: all_sum,
          }
        }]
      });
    },
    onApprove: function(data, actions){
		return actions.order.capture().then(function(details){
			console.log('on approve');
			var buyer_name = details.payer.name.given_name;
			document.getElementById("transaction").innerHTML = "Thanks " 
			+ buyer_name + ".\nYour order has been placed.\nYou will receive an email shortly.";
        	$('.collapse').collapse("show");
			document.getElementById("bst_title").innerHTML = "";
			resetCookies();
		// Call your server to save the transaction
        return fetch('/paypal-transaction-complete', {
          method: 'post',
          headers: {
            'content-type': 'application/json'
          },
		  // Call the server and pass the orderID received from the onApprove callback
          body: JSON.stringify({
            orderID: data.orderID
          })
        });
      });
    },
	onCancel: function (data){
    // Show a cancel page
	window.location.href="/cancel";
  }
}).render('#paypal-button-container');
});

/**
 *  PayPal IPN listener (source: https://github.com/paypal/ipn-code-samples/blob/master/javascript/googlecloudfunctions.js)
 *	@querystring - converts the JSON object into a string
 *  @request - used to make HTTP calls
 */
const querystring = require("querystring");
const request = require("request");

/**
 *  @const {boolean} sandbox - confirms that the sandbox endpoint is used.
 */
const sandbox = true;

/** Live IPNs URI */
const PRODUCTION_VERIFY_URI = "https://ipnpb.paypal.com/cgi-bin/webscr";
/** Sandbox IPNs URI*/
const SANDBOX_VERIFY_URI = "https://ipnpb.sandbox.paypal.com/cgi-bin/webscr";

/**
 * Post verification data to SANDBOX URI or PRODUCTION URI.
 * 
 * @return {String}
 */
function getPaypalURI(){
  return sandbox ? SANDBOX_VERIFY_URI : PRODUCTION_VERIFY_URI;
}

/**
 * @param {Object} req - object containing information about the HTTP request.
 * @param {Object} res - object with the response.
 */
exports.ipnHandler = function ipnHandler(req, res){
  console.log("IPN Notification Event Received");

  if (req.method !== "POST"){
    console.error("Request method not allowed.");
    res.status(405).send("Method Not Allowed");
  } else {
     // Acknowledge IPN post success by returning an empty 200 response.
    console.log("IPN Notification Event received successfully.");
    res.status(200).end();
  }

  // JSON object of the IPN message with the transaction details.
  let ipnTransactionMessage = req.body;
  // Stringify JSON ipn object to a query string
  let formUrlEncodedBody = querystring.stringify(ipnTransactionMessage);
  // Add 'cmd=_notify-validate' as a prefix to the body of the verification post message.
  let verificationBody = `cmd=_notify-validate&${formUrlEncodedBody}`;

  console.log(`Verifying IPN: ${verificationBody}`);

  let options = {
    method: "POST",
    uri: getPaypalURI(),
    body: verificationBody,
  };

  // Send the IPN message to PayPal to validate
  request(options, function callback(error, response, body){
    if (!error && response.statusCode == 200)
	{
      // Check the validation results 
      if (body === "VERIFIED")
	  {
        console.log(
          `IPN message is verified for Transaction ID: ${ipnTransactionMessage.txn_id} is verified.`
        );
        alert("IPN verified");
		document.getElementById("ipn_message").innerHTML =  ipnTransactionMessage;
		const transactionType = ipnTransactionMessage.txn_type;
        const invoice = ipnTransactionMessage.invoice;
		const receipt_id = ipnTransactionMessage.receipt_id;
        console.log("Transaction type: " + transactionType);
        console.log("Invoice " + invoice);
		if (transactionType === "subscr_payment")
		{
            console.log("Payment made by: " + invoice);
		}
		
		// Check if the IPN message was invalid
      } else if (body === "INVALID")
	  {
        console.error(
          `Invalid IPN: IPN message for Transaction ID: ${ipnTransactionMessage.txn_id} is invalid.`
        );
		
      } 
	  else 
	  {
        console.error("Unexpected reponse body.");
      }
    } 
	else 
	{
      // The error while posting to PayPal.
      console.error(error);
      console.log(body);
    }
  });
};