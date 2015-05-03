
var debug = false;

angular.module('puNetgearNoter', ['ngCookies'])

.constant('cookieExpiration', 60*9)//expiration time of cookies, in minutes(60*9)
.constant('cookieUpdate', 20)//update time of cookies, in seconds(20)

.value('myFields', [
	{"id":"name", "text":"Name", "letter": "N", "title": "Thank you for choosing NETGEAR.	My name is <Expert's Name>; with expert ID <xxxx> To whom am I speaking with?"},
	{"id":"callbackNo", "text": "Callback  #", "letter": "P", "title": "Thank you for <verifying/providing> your phone number. If our call gets disconnected, I will contact you on that number within 60 seconds."},
	{"id":"caseNo", "text": "Case #", "letter": "C", "title": "Case #: If cx is calling for an existing one, pull it up, if not, create new case under product in question and advise the cx this reference number"},
	{"id":"email", "text": "Email", "letter": "E", "title": "Email address"},
	{"id":"warranty", "text": "Warranty Info", "letter": "W", "title": "Advise cx of device's warranty info, support entitlements."},
	{"id":"serial", "text": "Serial", "letter": "S", "title": "Get device serial first to identify entitlement"},
	{"id":"deviceName", "text": "Model #", "letter": "M", "title": "Model #"},
	{"id":"isp", "text": "ISP", "letter": "I", "title": "ISP"},
	{"id":"techName", "text": "Technician Name", "letter": "*", "title": "Tech's Name"},
	{"id":"techID", "text": "Tech ID", "letter": "*", "title": "Tech ID"},
	{"id":"purchaseDate", "text": "Purchase Date", "letter": "*", "title": "Purchase Date"},
	{"id":"store", "text": "Store", "letter": "*", "title": "Store"},
	{"id":"inquiry", "text": "Customer's Inquiry", "letter": "*", "title": "The Expert should be able to accurately record customer's exact reason to contact NTGR support (from the customer's perspective)."},
	{"id":"history", "text": "Technical History and Information", "letter": "*", "title": "- Prior to acquiring any information, the expert must ensure the customer is effectively educated about the device's Entitlement. In this section, the expert should not reenter information fields of which already exist in CTS. \n - If not available in the drop down, expert should accurately document the following: ISP, Modem manufacturer \n - Capture information on the following which is relevant ONLY for the T/S process: (i) Network setup/architecture, (ii) Summarize and document previous Trouble shooting and recommendation(s)"},
	{"id":"resoSum", "text": "Resolution Summary", "letter": "*", "title": "Yes: Following are the qualifiers: \n - If the customer's issue has been resolved  \n - If the customer has been referred to ISP or 3rd party  \n - Customer opts not to choose for any Premium Plan and may go for online support/KB Articles or Forum  \n \n No:  Following are the qualifiers:\n If the customer disconnects the phone due to:\n - Technical glitch \n - Intentionally due to failure in issue resolution \n - Intentionally during presentation of Premium Plans \n"},

	{"id":"newProduct", "text": "New?", "letter": "*", "title": "New product registration? If yes, get: Device serial, purchased when and where"},
	{"id":"ispTech", "text": "Tech?", "letter": "*", "title": "If talking with ISP technician, get ISP, Technicians name and Tech ID"},
	{"id":"kb", "text": "KB?", "letter": "*", "title": "To avoid a second Call (Promote FCR) did the expert present support website in order to effectively inform the customer of the online support options? Such as KB articles (User manual, Instruction guide, Troubleshooting steps, etc.) as well as email support"},
	{"id":"survey", "text": "Survey?", "letter": "*", "title": "The expert must inform the customer about the survey at the end of the call"},
	{"id":"gearhead", "text": "GH?", "letter": "*", "title": "Pitched Gearhead? \n Active Hardware Warranty/Support Entitlement: \n ========= \n - <Customer Name>, your NETGEAR device comes with 90 days of Support Warranty and <one year/2 years/Limited Lifetime> of HW warranty from the date of purchase. \n \nActive Hardware Warranty/ Expired Support Entitlement \n ========= \n - <Customer name>, from the day you purchased this NETEGAR product, it was entitled to <one year/2 years/Limited Lifetime> of hardware warranty and 90 days of free technical support. You are beyond the 90 day support for your product. Your device is now <State the actual # of days (example: 180 days) > from the date of purchase. \n - Perform basic hardware check, offer free support options including email and pitch for GH services. \n \nExpired Hardware Warranty/ Expired Support Entitlement \n ========= \n - <Customer Name>, from the day you purchased this NETEGAR product, it was entitled to <one year/2 years/Limited Lifetime> of hardware warranty and 90 days of free technical support. You are currently <###>days beyond the 90 day free phone support. \n - Provide Free Support Options (excluding Email) and GearHead Plans \n"},
	{"id":"resolved", "text": "Resolved?", "letter": "*", "title": "Problem resolved?"},
])
.value('myContacts', [
	{"name":"Netgear", "number":"1-888-NETGEAR (638-4327)"},
	{"name":"Gearhead", "number":"1-855-432-7432"},
	{"name":"SPRINT Aircard", "number":"1-855-280-5216"},
	{"name":"AT&T Aircard", "number":"1-800-331-0500"},
	{"name":"PRO-SAFE (NAS/CBU)", "number":"1-855-PROSAFE (776-7233)"},
	{"name":"Arlo", "number":"1-408-638-3750"},
	{"name":"Viewzone Backdoor", "number":"1-714-886-1665"},
])
.value('myScripts', [
	{"name":"Open", "text":"Thank you for choosing NETGEAR.  My name is <Expert's Name>; with expert ID <xxxx> may I ask whom am I speaking with?"},
	{"name":"Callback", "text":"Kindly verify your name, email address and phone number.Thanks you for <verifying/providing> your phone number. If our call gets disconnected, I will contact you on that number within 60 seconds."},
	{"name":"IVR", "text":"<Mr/Ms customer's last name> Due to technical difficulties, the system was not able to capture all the information that you might have already provided earlier. I apologize for this inconvenience. May I please have your product's serial number or case #  again to pull up your information?"},
	{"name":"Survey Supported", "text":"Once I close this case, you will receive a survey.  Please rate the service and support I had provided you today"},
	{"name":"Survey Unsupported", "text":"<Customer name>, I apologize that I was unable to assist you. Upon closing the case, you will receive a survey. Please take the time to provide feedback on your NETGEAR product."},
])
.value('myKbs', [
	// common
	{"number":"25273","title":"Call Flow - SUM 2.0 Voice"},
	{"number":"25325","title":"NETGEAR Support Warranty Entitlement"},
	{"number":"25340","title":"SUM 2.0 Sales Positioning Guide"},
	{"number":"25352","title":"NETGEAR Authorize and Charge / Refund Contract Policy"},
	{"number":"25357","title":"General RMA Process (For Expert use)"},
	{"number":"25318","title":"RBU/SPBU - L1 Scope of Support"},
	{"number":"25299","title":"EOL, Refurbished, and 2nd Hand Product Support"},
	{"number":"25339","title":"CTS Guide - Expert"},
	{"number":"25314","title":"Technical Escalation Process"},
	{"number":"25355","title":"L1 Case Management Template"},
	{"number":"25319","title":"Unsolicited Kudos"},
	// others
	{"number":"25382","title":"Quality Monitoring Form - Voice"},
	{"number":"25323","title":"NETGEAR Safety and Hazard Policy (For Expert's use)"},
	{"number":"25315","title":"Online RMA Process (Customer interface)"},
	{"number":"25673","title":"TRS Call Handling Process Document"},
])
.value('myLinks', [
	{"title":"Loway","link":"http://voice.iopex.com/","target":"LowaySim"},
	{"title":"Mail","link":"http://mail7.iopex.com","target":"MailSim"},
	{"title":"Traktime","link":"http://traktime.iopex.com","target":"TrakSim"},
	{"title":"Yapper Simulators","link":"https://yapper.netgear-support.com/productsimulators","target":"YapperSim"},
	{"title":"Chasms","link":"http://chasms.com/","target":"ChasmsSim"},

	{"target":"OtherSim", "title":"NETGEAR Customer Warranty","link":"http://www.netgear.com/about/warranty/"},
	{"target":"OtherSim", "title":"Warranty Return Policy","link":"http://kb.netgear.com/app/answers/detail/a_id/1113/~/warranty-return-policy"},
	{"target":"OtherSim", "title":"Standard Customer Survey (Regular Survey)","link":"https://my-stg1.netgear-support.com/myNETGEAR/Survey_Standard.asp?p=Customer%20Satisfaction%20Survey&s=24537C8B-9706-4697-AD5B-70C479E1F94C&ncc=&lng=ENG"},
	{"target":"OtherSim", "title":"Customer Survey (Mini Survey)","link":"https://my-stg1.netgear-support.com/myNETGEAR/Survey_Mini.asp?p=Customer%20Satisfaction%20Survey&s=3BB293E7-C2C7-445E-9EB8-8F185917B612&ncc=&lng=ENG"},
	{"target":"OtherSim", "title":"Customer Survey (Out of Scope Survey)","link":"https://my-stg1.netgear-support.com/myNETGEAR/Survey_OOS.asp?source=&s=89A91BB5-8A5A-417E-BC92-9CA15BC9AC08&lng=ENG"},
	{"target":"OtherSim", "title":"Customer Survey (Premium Survey)","link":"https://my-stg1.netgear-support.com/myNETGEAR/Survey_Premium.asp?p=Customer%20Satisfaction%20Survey&s=3BB293E7-C2C7-445E-9EB8-8F185917B612&ncc=&lng=ENG"},
])
.value('myTss', [{
	"name":"Router setup for a cable modem","steps":[
		'Bypassed router, getting online', 
		'Physically connect router to modem',
		'Reset Router',
		'Tried auto setup wizard',
		'Mac spoof done',
		'Verified wifi working'
	]}, {
	"name":"TS2","steps":[
		'Bypassed router, getting online', 
		'Physically connect router to modem',
		'Reset Router',
		'Tried auto setup wizard',
		'Mac spoof done',
		'Verified wifi working'
	]},{
	"name":"TS3","steps":[
		'Bypassed router, getting online', 
		'Physically connect router to modem',
		'Reset Router',
		'Tried auto setup wizard',
		'Mac spoof done',
		'Verified wifi working'
	]},
])
.config(function($cookiesProvider, cookieExpiration){
	var now = new Date();
	console.log('Cookie Expiration:', $cookiesProvider.defaults.expires = new Date(now.getTime() + cookieExpiration*60000));//cookie expires after cookieExpiration minutes
})

.run(function(){
	// safe unload
	window.onbeforeunload = function() {
		return "Are you sure you want to navigate away and lose your notes?";
	}

	// tooltips
	$(function () {
		$('[data-toggle="tooltip"]').tooltip({placement: 'bottom'})
	})

	// tabs
	$('#myTab a').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	})
})
.run(function($rootScope, myFields, myContacts, myScripts, myKbs, myLinks, myTss) {

	$rootScope.ph = {};

	// placeholders: $rootScope.ph
	angular.forEach(myFields, function(val, key, obj) {
		this[val.id] = val;
	}, $rootScope.ph);
	debug && console.log('$rootScope.ph', $rootScope.ph);

	// more rootScope vars
	$rootScope.contacts = myContacts;
	$rootScope.scripts = myScripts;
	$rootScope.kbs = myKbs;
	$rootScope.links = myLinks;
	$rootScope.tss = myTss;

})




.constant("tsArrayBase", [
	{'Router setup for a cable modem': [
	'Bypassed router, getting online', 
	'Physically connect router to modem',
	'Reset Router',
	'Tried auto setup wizard',
	'Mac spoof done',
	'Verified wifi working'
	]}, 
	{'TS2': [
	'step1', 
	'step2', 
	'step3'
	]},  
	{'TS3': [
	'step1', 
	'step2', 
	'step3', 
	'step4'
	]}, 
])

.controller('MyCtrl', function($scope, $rootScope, $interval, $cookieStore, cookieUpdate){

	$scope.notes = [];
	$scope.allN = $cookieStore.get('allN') || false;//allnotes
	console.log('$scope.allN', $scope.allN);

	$scope.trackAllNotesToggle = function(){
		$scope.allN = !$scope.allN;
		var now = new Date();
		$cookieStore.put('allN', $scope.allN);
	};

	$scope.noteMaster = {
		verified:false,
		ispTech:false,
		newProduct:false,
		resolved:false,
		warranty:'',
		kb:false,
		gearhead:false,
		survey:false,
		name:'',
		caseNo:'',
		serial:'',
		callbackNo:'',
		inquiry:'',
		history:'',
		ts:'',
		resoSum:'',
		noSaleReason:'',
	};

	$scope.reset = function(){
		$scope.note = angular.copy($scope.noteMaster);
	}

	$scope.isNoteDefault = function(){
		return angular.equals($scope.note, $scope.noteMaster)
	}

	$scope.clearNote = function(){
		$scope.note = angular.extend($scope.note, $scope.noteMaster)
	}

	$scope.clearNotes = function(){
		$scope.notes = [];
		$cookieStore.put('notes', []);
	}

	$scope.log = function(note){
		note.timestamp = new Date().toLocaleString();
		$scope.notes.push(note);
		$cookieStore.put('note', $scope.note);
		$scope.reset();
	}

	$scope.edit = function(note){
		$scope.note = (note);
		$cookieStore.put('note',$scope.note);
		$('#myTab a:first').tab('show');
	}

	$scope.save = function(){
		$cookieStore.put('note',$scope.note);
		$scope.reset();
		$('#myTab a:first').tab('show')
	}

	$scope.jsonToNotes = function(json){
		$scope.notes = angular.fromJson(json);
	}

	// store current note to cookie every cookieUpate milliseconds, useful if browser crashes
	$scope.callAtInterval = function() {
		//dont store if default
		if(!$scope.isNoteDefault()) $cookieStore.put('note',$scope.note);
		if($scope.allN) {
			$cookieStore.put('allN', true);
			$cookieStore.put('notes', $scope.notes);
		}
	}
	$interval( function(){ $scope.callAtInterval(); }, cookieUpdate*1000);


	//if cookie present
	if ($cookieStore.get('note')) {
		$scope.note = $cookieStore.get('note');
		$scope.log($scope.note);
		$scope.edit($scope.notes[$scope.notes.length-1]);
		if ($scope.allN) {
			console.log($cookieStore.get('notes'));
			$scope.notess = $cookieStore.get('notes');
		}
	}
	else
		$scope.reset();

})

// Links > FilterKB
.controller('FilterKbCtrl', function($scope){
	$scope.clearFilterKb = function(){
		$scope.filterKb = "";
	}
})

// MytsCtrl
.controller('MytsCtrl', function($scope, tsArrayBase){
	$scope.defaultTs = 'Choose TS';
	$scope.chosenTs = {};

	//build array of steps objects
	$scope.tsObjsArray = [];
	angular.forEach(tsArrayBase, function(tsObj) {
	//console.log('tsObj', tsObj);
	for(var i in tsObj){
		tsName = i;
		tsSteps = tsObj[i];
		tsStepsArr = [];
		tsStepsObjs = {};
		for(var x in tsSteps){
			tsStepsObjs = {text: tsSteps[x], done: false};
			tsStepsArr.push(tsStepsObjs);
			//console.log(tsStepsObjs);
		}
	}
		$scope.tsObjsArray[$scope.tsObjsArray.length] = {'name': tsName, 'steps': tsStepsArr};
	});

	//console.log('tsObjsArray',$scope.tsObjsArray);

	$scope.choseATs = function(tsObject){
		$scope.defaultTs = tsObject.name;
		$scope.chosenTS = tsObject;
		//console.log($scope.chosenTS.steps);
		angular.forEach($scope.chosenTS.steps, function(step) {
			step.done = false;
		})
	}
	$scope.toggleDone = function(step){
		step.done = !step.done;
	}
})

.controller('stepDoneCtrl', function($scope){
 $scope.done=false;
})


