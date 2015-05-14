
var debug = false;

angular.module('puNetgearNoter', ['ngCookies', 'ngClipboard'])

.constant('cookieExpiration', 60*9)//expiration time of cookies, in minutes(60*9)
.constant('cookieUpdate', 20)//update time of cookies, in seconds(20)

.config(function($cookiesProvider, cookieExpiration){
	var now = new Date();
	console.log('Cookie Expiration:', $cookiesProvider.defaults.expires = new Date(now.getTime() + cookieExpiration*60000));//cookie expires after cookieExpiration minutes
})

.config(['ngClipProvider', function(ngClipProvider) {
	ngClipProvider.setPath("js/ZeroClipboard.swf");
}])

.run(function($window){
	// safe unload
	$window.onbeforeunload = function() {
		return "Are you sure you want to navigate away and lose your notes?";
	}

	// tooltips
	$(function () {$('[data-toggle="tooltip"]').tooltip({placement: 'bottom'});})

	// tabs
	$('#myTab a').click(function (e) {e.preventDefault();$(this).tab('show');})

})
.run(function($rootScope, $http) {

	$rootScope.ph = {};

	// init data, placeholders: $rootScope.ph
	$http.get('data/fields.json').success(function(data) {
		$rootScope.fields = data;
		angular.forEach($rootScope.fields, function(val, key, obj) {
			this[val.id] = val;
		}, $rootScope.ph);
		debug && console.log('$rootScope.ph', $rootScope.ph);
	})

	// init data, more vars
	$http.get('data/contacts.json').success(function(data) {$rootScope.contacts = data;})
	$http.get('data/scripts.json').success(function(data) {$rootScope.scripts = data;})
	$http.get('data/kbs.json').success(function(data) {$rootScope.kbs = data;})
	$http.get('data/links.json').success(function(data) {$rootScope.links = data;})
	$http.get('data/tss.json').success(function(data) {$rootScope.tss = data;})
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
		$scope.reset();
		$cookieStore.put('note', false);
		$cookieStore.put('notes', []);
	}


	$scope.caseNoteToClipboard = function(note){
		return $scope.caseNote = 
				"==================== Caller\'s Information ====================\n" +
				(note.name?"Name: "+note.name+"\n":'')+
				(note.callbackNo?"Tel No: "+note.callbackNo+"\n":'')+
				(note.email?"Email Address: "+note.email+"\n":'')+
				(note.caseNo?"Case #: "+note.caseNo+"\n":'')+

				(note.isp?"ISP: "+note.isp+"\n":'')+
				(note.techName && note.ispTech?"Technician Name: "+note.techName+"\n":'')+
				(note.techID && note.ispTech?"Tech ID: "+note.techID+"\n":'')+

				(note.serial?"Serial Number: "+note.serial+"\n":'')+
				(note.deviceName?"Device Name: "+note.deviceName+"\n":'')+
				(note.purchaseDate && note.newProduct?'Purchase Date: '+note.purchaseDate+"\n":'')+
				(note.store && note.newProduct?'Store: '+note.store+"\n":'')+
				"\n"+
				"===================== Customer's Inquiry =====================\n" +
				note.inquiry+"\n\n"+
				"============== Technical History and Information =============\n" +
				(note.warranty?"Warranty: "+note.warranty+"\n":'') +
				(note.history)+"\n\n"+
				"================== Troubleshooting Details ===================\n" +
				(note.ts)+"\n\n"+
				"===================== Resolution Summary =====================\n" +
				(note.resoSum)+"\n\n"+
				"Issue Resolved: "+(note.resolved?'Yes':'No')+"\n"+
				"Informed about the KB/NETGEAR online support: "+(note.kb?'Yes':'No')+"\n"+
				"Informed about GH/Soft Upsell: "+(note.gearhead?'Yes':'No')+"\n"+
				"Survey: "+(note.survey?'Yes':'No');

	}

	$scope.snapshotToClipboard = function(note){
		return $scope.snapshot = 
				(note.caseNo?"Case ID: "+note.caseNo+"\n":'')+
				(note.deviceName?"Product Model: "+note.deviceName+"\n":'')+
				(note.warranty?"Warranty: "+note.warranty+"\n":'') +
				"Issue: "+note.inquiry+"\n\n"+

				"Troubleshooting steps done:\n"+
				(note.ts)+"\n\n"
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


