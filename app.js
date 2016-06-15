(function (app){


// Routes

	function Config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('summary', {
			url: '/',
			templateUrl: 'summary.html',
			controller: 'DeficiencySummaryController as dsc',
			params: {
				prev_state_values: {}
			}
		})
		.state('detail', {
			url: '/detail/:cap_plus_deficiency',
			templateUrl: 'detail.html',
			controller: 'DeficiencyDetailsController as ddc',
			params: {
				prev_state_values: {}
			}
		})
	}

// Modules

// Controllers

	function DeficiencySummaryController($scope, $state, $stateParams, Data, _){

		$scope.pageTitle = "CMS Entry"

		$scope.goToDetail = function(cap_def) {
			$state.go('detail', {
				cap_plus_deficiency: cap_def,
				prev_state_values: {
					weekfilter: $scope.weekfilter,
					order: $scope.order
				}
			});
		};

		$scope.tiles = Data.tiles;

		console.log($scope.tiles);

		$scope.status = {
    isopen: false
  	};
  

  	$scope.weekfilter =  _.maxBy($scope.tiles, 'Week').Week;
  	
  	$scope.order =  'CAP';

  	$scope.monitor = 'All';

  	//$stateParams.state_values.weekfilter ||
  	//$stateParams.state_values.order ||

  	$scope.toggled = function(open) {
    	// $log.log('Dropdown is now: ', open);
  	};

  	$scope.toggleDropdown = function(e) {
    	e.preventDefault();
    	e.stopPropagation();
    	$scope.status.isopen = !$scope.status.isopen;
  	};

		// $scope.Weeks = function(){
			
		// 	var Data = Data.tiles;
		// 	console.log(Data);
		// 	var Weeks = __.keys(__countby(Data, function(Data){return Data.Week}));
		// 	return Weeks;
		// };

	}

	function DeficiencyDetailsController($scope, $state, $stateParams, Data){

		console.log($stateParams);
		$scope.pageTitle = "CMS Details"

		$scope.tiles = Data.tiles;
		$scope.printout = function(something) {
			console.log(Data);
		};

        $scope.data = $scope.tiles.filter(function(item){return item.CAP === $stateParams.cap_plus_deficiency;})[0];

        $scope.goToSummary = function(){
        	$state.go('summary', {
        		state_values: $stateParams.prev_state_values,
        		prev_state_values: {

        		}
        	});
        };
	}
// Services

	function Data() {
		var the_data = {};
		the_data.tiles = [
		  {
		    "CAP": "1A",
		    "Deficiency": "Inappropriate Denial of Medical Services Due to Insufficient Outreach Regarding Clinical Decisions",
		    "Monitored by Whom": "Joy Foote",
		    "Monitoring Methodology": "Cases where the denial reason is Denied for Lack of Medical Necessity or Denied for Lack of Clinical Information and there was not sufficient outreach to the physician",
		    "Monitoring Period": "03/27/2016 - 04/02/2016",
		    "Universe Size": 106,
		    "Sample Size": 106,
		    "Processed Correctly": 49,
		    "Processed Incorrectly": 57,
		    "Error Rate": 0.537735849,
		    "Root Cause of Errors": "Training on outreach requirements completed mid-last week.  Implementation is in place to improve the monitoring tools available, which may highlight more opportunities for improvement in the coming weeks.",
		    "Members Impacted": 57,
		    "Remediation Efforts": "Outbound call to Beneficiary to ensure they understand their appeal rights and the basis for the denial utilizing the CMS Approved Scripts.",
		    "Additional notes": "Does not include all DE's (inflight)",
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Red"
		  },
		  {
		    "CAP": "1B",
		    "Deficiency": "Insufficient Outreach to Providers for Drug Coverage under Part D - redeterminations",
		    "Monitored by Whom": "Brent Merrick",
		    "Monitoring Methodology": "Daily Error Report",
		    "Monitoring Period": "03/27/2016 - 04/02/2016",
		    "Universe Size": 182,
		    "Sample Size": 182,
		    "Processed Correctly": 169,
		    "Processed Incorrectly": 13,
		    "Error Rate": 0.071428571,
		    "Root Cause of Errors": "human error (seven employee)",
		    "Members Impacted": 0,
		    "Remediation Efforts": "No beneficiary impact because review was prior case closing and letters going out.  Employee coaching was performed and documented.",
		    "Additional notes": "Includes CHS except Leon and AZ data.  Will have additional data sources next week.  Expect installation of an automated solution 5/20/2016",
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Red"
		  },
		  {
		    "CAP": "1B",
		    "Deficiency": "Insufficient Outreach to Providers for Drug Coverage under Part D - coverage determinations",
		    "Monitored by Whom": "Linda Wright",
		    "Monitoring Methodology": "Enhanced live review via sampling",
		    "Monitoring Period": "03/27/2016 - 04/02/2016",
		    "Universe Size": 4130,
		    "Sample Size": 805,
		    "Processed Correctly": 787,
		    "Processed Incorrectly": 20,
		    "Error Rate": 0.025,
		    "Root Cause of Errors": "human error",
		    "Members Impacted": 20,
		    "Remediation Efforts": "Will follow the remediation process outlined in CAP.  Not completed at this time pending approvals of call scripts / letters.",
		    "Additional notes": 0,
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Red"
		  },
		  {
		    "CAP": "2",
		    "Deficiency": "Misclassifying Part C Reconsiderations as Organization Determinations",
		    "Monitored by Whom": "Joy Foote",
		    "Monitoring Methodology": "Cases where we reopened a decision and overturned (not on an appeal) or cases where C-HS reconsidered the decision, but did not go through the Appeals department.",
		    "Monitoring Period": "03/27/2016 - 04/02/2016",
		    "Universe Size": 253,
		    "Sample Size": 253,
		    "Processed Correctly": 253,
		    "Processed Incorrectly": 0,
		    "Error Rate": 0,
		    "Root Cause of Errors": 0,
		    "Members Impacted": 0,
		    "Remediation Efforts": 0,
		    "Additional notes": "Data does not include all DEs",
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 2,
		    "Status": "Red"
		  },
		  {
		    "CAP": "3A",
		    "Deficiency": "Incorrect Denial Letters for Part C Organization Determinations (Claims)",
		    "Monitored by Whom": "Leslie Sheldon",
		    "Monitoring Methodology": "Weekly review of IDNs created (week prior to monitoring period)",
		    "Monitoring Period": "03/27/2016 - 04/02/2016",
		    "Universe Size": 13247,
		    "Sample Size": 64,
		    "Processed Correctly": 39,
		    "Processed Incorrectly": 25,
		    "Error Rate": 0.39,
		    "Root Cause of Errors": "Print Vendor Impact:  Form Issue date only displayed on page 1 (not loaded on subsequent pages)",
		    "Members Impacted": 10146,
		    "Remediation Efforts": "Reviewed error/samples with Print Vendor (CHC).\nRequested update to Print Job.\nFix moved to production 4/6",
		    "Additional notes": "Delegated Entity Samples requested",
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 2,
		    "Status": "Yellow"
		  },
		  {
		    "CAP": "3B (Part C - Appeals)",
		    "Deficiency": "Incorrect Denial Letters for Part C Organization Determinations (Part C Appeals)",
		    "Monitored by Whom": "Becky Seagraves",
		    "Monitoring Methodology": "Daily Error Report & 100% QA",
		    "Monitoring Period": "03/27/2016 - 04/02/2016",
		    "Universe Size": 25,
		    "Sample Size": 25,
		    "Processed Correctly": 25,
		    "Processed Incorrectly": 0,
		    "Error Rate": 0,
		    "Root Cause of Errors": "None",
		    "Members Impacted": 0,
		    "Remediation Efforts": "None",
		    "Additional notes": "Includes all expected data.  Automated solution expected 5/13/2016",
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 3,
		    "Status": "Yellow"
		  },
		  {
		    "CAP": "3C",
		    "Deficiency": "Incorrect Denial Letters for Part C Organization Determinations (Part C, Pre Cert)",
		    "Monitored by Whom": "Joy Foote",
		    "Monitoring Methodology": "Pre-Service denial letters that were released where it did not go through a separate quality review prior to being mailed",
		    "Monitoring Period": "03/27/2016 - 04/02/2016",
		    "Universe Size": 248,
		    "Sample Size": 248,
		    "Processed Correctly": 220,
		    "Processed Incorrectly": 28,
		    "Error Rate": 0.112903226,
		    "Root Cause of Errors": "The monitoring report was just released, which allows us to monitor and educate our staff that consistently do not go through the quality review process.",
		    "Members Impacted": 28,
		    "Remediation Efforts": "The Quality Review team evaluated the letters that were released which did not go through the quality review process to ensure the letters were understandable to the member.  For letters determined to be inadequate, an outbound call will be made to the member to ensure they understood the basis for the denial and their appeal rights.",
		    "Additional notes": 0,
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Yellow"
		  },
		  {
		    "CAP": "3D",
		    "Deficiency": "Incorrect Denial Letters for Part D - Redeterminations",
		    "Monitored by Whom": "Brent Merrick",
		    "Monitoring Methodology": "Daily Error Report & 100% QA",
		    "Monitoring Period": "03/27/2016 - 04/02/2016",
		    "Universe Size": 182,
		    "Sample Size": 182,
		    "Processed Correctly": 178,
		    "Processed Incorrectly": 4,
		    "Error Rate": 0.021978022,
		    "Root Cause of Errors": "human error (Three employee)",
		    "Members Impacted": 0,
		    "Remediation Efforts": "No beneficiary impact because review was prior case closing and letters going out.  Employee coaching was performed and documented.",
		    "Additional notes": "Includes only Core CHS data.  Will have additional data sources next week.  Expect an automated solution 5/13/2016",
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Yellow"
		  },
		  {
		    "CAP": "3D",
		    "Deficiency": "Incorrect Denial Letters for Part D Coverage Determinations - Live",
		    "Monitored by Whom": "Linda Wright",
		    "Monitoring Methodology": "Enhanced live review via sampling",
		    "Monitoring Period": "3/28/2016 - 4/3/2016",
		    "Universe Size": 4130,
		    "Sample Size": 184,
		    "Processed Correctly": 173,
		    "Processed Incorrectly": 11,
		    "Error Rate": 0.06,
		    "Root Cause of Errors": "human error",
		    "Members Impacted": 0,
		    "Remediation Efforts": "Errors are found and corrected at time of discovery.No beneficiary impact because reviews was prior to case closing.",
		    "Additional notes": "There is an additional retrospective review that occurs on a weekly basis.  Reports will be provided the following week.",
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "3D",
		    "Deficiency": "Incorrect Denial Letters for Part D Coverage Determinations - Retrospective",
		    "Monitored by Whom": "Linda Wright",
		    "Monitoring Methodology": "100% Retrospective Weekly review",
		    "Monitoring Period": "3/21/2016-3/27/2016",
		    "Universe Size": 4130,
		    "Sample Size": 4130,
		    "Processed Correctly": 4104,
		    "Processed Incorrectly": 25,
		    "Error Rate": 0.0061,
		    "Root Cause of Errors": "User Error",
		    "Members Impacted": 26,
		    "Remediation Efforts": "Would follow the remediation process as stated in the CAP",
		    "Additional notes": 0,
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "4A",
		    "Deficiency": "Untimely Payment of Claims Following Receipt of Organization Determination Requests",
		    "Monitored by Whom": "Leslie Sheldon",
		    "Monitoring Methodology": "100% reconciliation of Misdirected Claims from IDN Forward Report to redirect process",
		    "Monitoring Period": "3/27/2016 - 4/2/2016",
		    "Universe Size": 1473,
		    "Sample Size": 1473,
		    "Processed Correctly": 1473,
		    "Processed Incorrectly": 0,
		    "Error Rate": 0,
		    "Root Cause of Errors": "N/A",
		    "Members Impacted": 0,
		    "Remediation Efforts": "Working to move all delegates to 837 in April (testing underway)",
		    "Additional notes": 0,
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "4B",
		    "Deficiency": "Untimely Payment of Claims Following Receipt of Organization Determination Requests (Claims Timeliness Non-contracted Clean Claims w/in 30 Calendar Days)",
		    "Monitored by Whom": "Leslie Sheldon",
		    "Monitoring Methodology": "Monthly Metric:\n\n Non Contracted Clean Claims Processed Each Month - Claims Processed > 30 days / Non Contracted Clean Claims Processed",
		    "Monitoring Period": "3/27/2016 - 4/2/2016",
		    "Universe Size": 55395,
		    "Sample Size": 55395,
		    "Processed Correctly": 46041,
		    "Processed Incorrectly": 9354,
		    "Error Rate": 0.168860005,
		    "Root Cause of Errors": "2016 Professional Fee Schedule Hold\n&\nProvider/Contract Hold TAT",
		    "Members Impacted": 8882,
		    "Remediation Efforts": "Inventory Reduction Plan implemented (05/31/16 timely)\nPartnership with PDM & Configuration to remediate Configuration Change Requests (required to release claims)",
		    "Additional notes": 0,
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "4C",
		    "Deficiency": "Untimely Payment of Claims Following Receipt of Organization Determination Requests (Claims Timeliness Non-contracted Clean Claims w/in 60 Calendar Days)",
		    "Monitored by Whom": "Leslie Sheldon",
		    "Monitoring Methodology": "Monthly Metric:\n \nNon-Contracted, Non-Clean Claims  > 60 days / All",
		    "Monitoring Period": "3/27/2016 - 4/2/2016",
		    "Universe Size": 862,
		    "Sample Size": 862,
		    "Processed Correctly": 758,
		    "Processed Incorrectly": 77,
		    "Error Rate": 0.0893,
		    "Root Cause of Errors": "2016 Professional Fee Schedule Hold\n&\nProvider/Contract Hold TAT",
		    "Members Impacted": 69,
		    "Remediation Efforts": "Inventory Reduction Plan implemented (05/31/16 timely)\nPartnership with PDM & Configuration to remediate Configuration Change Requests (required to release claims)",
		    "Additional notes": 0,
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "5A",
		    "Deficiency": "Untimely Notification to Beneficiaries and Providers of Part C Expedited Organization Determination and Reconsideration Request Determinations",
		    "Monitored by Whom": "Joy Foote",
		    "Monitoring Methodology": "Pre-Service Expedited Organization Determinations where an oral notification did not occur within 72 hours of the request date or where Leon did not notify the beneficiary in writing by the 2nd Calendar Day",
		    "Monitoring Period": "03/27/2016 - 04/02/2016",
		    "Universe Size": 894,
		    "Sample Size": 894,
		    "Processed Correctly": 756,
		    "Processed Incorrectly": 138,
		    "Error Rate": 0.154362416,
		    "Root Cause of Errors": "The Expedited Team is still in development, and assuming responsibility for markets as we add more staff.  Implementation is in place to improve the monitoring tools available, which may highlight more opportunities for improvement in the coming weeks.",
		    "Members Impacted": 138,
		    "Remediation Efforts": "We are in the process of hiring additional clinical staff and forming a separate Expedited team.  In addition, C-HS will ensure that the members that have yet to be notified, will be notified this week.",
		    "Additional notes": "We are evaluating the delegate failures and will determine what delegates will be placed on a CAP as a result of that analysis.",
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "5B",
		    "Deficiency": "Untimely Notification of Part C Expedited Organization Determination and Reconsideration Requests",
		    "Monitored by Whom": "Becky Seagraves",
		    "Monitoring Methodology": "Daily Closed and Open Reports & 100% QA",
		    "Monitoring Period": "3/27/16 - 04/02/16",
		    "Universe Size": 119,
		    "Sample Size": 119,
		    "Processed Correctly": 109,
		    "Processed Incorrectly": 10,
		    "Error Rate": 0.084033613,
		    "Root Cause of Errors": "Understaffing",
		    "Members Impacted": 10,
		    "Remediation Efforts": "Adding staff to the Appeals team to meet the Expedited turnaround times.",
		    "Additional notes": "Does not include DE data",
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "6A",
		    "Deficiency": "Failure to auto-forward or timely auto-forward Part D coverage determinations and/or redeterminations to the Independent Review Entity (IRE) for review and disposition.",
		    "Monitored by Whom": "Daniel James",
		    "Monitoring Methodology": "Manual review of all cases sent to IRE",
		    "Monitoring Period": "3/27/2016 - 4/2/2016",
		    "Universe Size": 56,
		    "Sample Size": 56,
		    "Processed Correctly": 36,
		    "Processed Incorrectly": 20,
		    "Error Rate": 0.357142857,
		    "Root Cause of Errors": "14 cases were from prior periods and identified retrospectively\n\n6 cases were from the current period and not completed timely due to time of expiration of cases",
		    "Members Impacted": 17,
		    "Remediation Efforts": "Cases forwarded to IRE",
		    "Additional notes": "Higher than anticipated volume due to brief intermittent system challenges on 4/1, and identification of cases from prior periods.",
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "7",
		    "Deficiency": "Inaccurate and/or Incomplete Part C Grievance Resolution Letters",
		    "Monitored by Whom": "Nicola Matthews",
		    "Monitoring Methodology": "Manual review of all letters prior to closure and a additional review conducted within 24 - 48 hrs of case closure. Month end after audit also conducted but for purpose of weekly, will use final review information",
		    "Monitoring Period": "3/27/2016 - 4/2/2016",
		    "Universe Size": 41,
		    "Sample Size": 41,
		    "Processed Correctly": 36,
		    "Processed Incorrectly": 5,
		    "Error Rate": 0.12195122,
		    "Root Cause of Errors": "Issues noted were related to two incidents of wrap letter not going out. \nOne issue was appropriateness of QOC versus service. \nOne issue was documentation simple error.\nOne issue was failure to identify all possible grievances.",
		    "Members Impacted": 0,
		    "Remediation Efforts": "Coaching with the representative as appropriate. \nFollow-up contact with the customer if needed. \nCorrection made as needed.",
		    "Additional notes": "Data does not include DE data",
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "8",
		    "Deficiency": "Failure to Have Procedure for Receipt and Disposition of Part C Grievances",
		    "Monitored by Whom": "Nicola Matthews",
		    "Monitoring Methodology": "Manual review complex cases (3 +) with a",
		    "Monitoring Period": "3/27/2016 - 4/2/2016",
		    "Universe Size": 3,
		    "Sample Size": 3,
		    "Processed Correctly": 0,
		    "Processed Incorrectly": 3,
		    "Error Rate": 1,
		    "Root Cause of Errors": "Simple documentation error on three cases for same customer. (Case noted in Cap 7 also. Issue was corrected and there was no Customer impact.)",
		    "Members Impacted": 0,
		    "Remediation Efforts": "Coaching with the representative as appropriate. \nFollow-up contact with the customer if needed. \nCorrection made as needed.",
		    "Additional notes": "No complex cases noted for Leon, AZ or MMP..",
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "9",
		    "Deficiency": "Dismissed Part C cases prior to the conclusion of the appeal timeframe. As a result, enrollees’ requests for coverage may have been inappropriately denied.",
		    "Monitored by Whom": "Becky Seagraves",
		    "Monitoring Methodology": "Daily Closed and Open Reports & 100% QA",
		    "Monitoring Period": "3/27/2016 - 04/02/2016",
		    "Universe Size": 43,
		    "Sample Size": 43,
		    "Processed Correctly": 43,
		    "Processed Incorrectly": 0,
		    "Error Rate": 0,
		    "Root Cause of Errors": "N/A",
		    "Members Impacted": 0,
		    "Remediation Efforts": 0,
		    "Additional notes": "Does not include all DE's",
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "10A",
		    "Deficiency": "Failure to Issue Explanation of Benefits (EOB) Notices for Part C Enrollees",
		    "Monitored by Whom": "Leslie Sheldon",
		    "Monitoring Methodology": "100% of processed claims reconciled monthly to an EOB USPO Mail Date",
		    "Monitoring Period": "February Paid Claims\n\n*EOBs are mailed monthly\nby the last day of the month following payment month.  Print Vendor returns Mail Date via file.",
		    "Universe Size": 302298,
		    "Sample Size": 302298,
		    "Processed Correctly": 36898,
		    "Processed Incorrectly": 265400,
		    "Error Rate": 0.8779,
		    "Root Cause of Errors": "QNXT Platform EOB Hold",
		    "Members Impacted": 265400,
		    "Remediation Efforts": "JAD Session to identify all configuration corrections required\nConfiguration Change Requests created \nAdditional Configuration Resources dedicated to Change Requests",
		    "Additional notes": "Sanction 10 BIA EOBs Held = 106,602\nQNXT January EOBs Held = 308,054\n\nC-HS AZ excluded from sample",
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "11",
		    "Deficiency": "Insufficient Delegate Oversight Related to the Processing of Part C Organization Determinations, Appeals, and Grievances",
		    "Monitored by Whom": 0,
		    "Monitoring Methodology": 0,
		    "Monitoring Period": 0,
		    "Universe Size": 0,
		    "Sample Size": 0,
		    "Processed Correctly": 0,
		    "Processed Incorrectly": 0,
		    "Error Rate": 0,
		    "Root Cause of Errors": 0,
		    "Members Impacted": 0,
		    "Remediation Efforts": 0,
		    "Additional notes": 0,
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "12",
		    "Deficiency": "Failure to properly effectuate prior authorization or exception requests.",
		    "Monitored by Whom": "Harry Cameron",
		    "Monitoring Methodology": "95% Automated\n5% Manual",
		    "Monitoring Period": "Daily Monitoring of prior day's rejected claims",
		    "Universe Size": 448922,
		    "Sample Size": 1402,
		    "Processed Correctly": 1163,
		    "Processed Incorrectly": 239,
		    "Error Rate": 0.17,
		    "Root Cause of Errors": "Human data entry error",
		    "Members Impacted": 239,
		    "Remediation Efforts": "The cases are provided to the CD unit to review the manual entry and make necessary changes.  Coaching with the representative as appropriate. \nFollow-up contact with the beneficiary / pharmacy  if needed.",
		    "Additional notes": 0,
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "13",
		    "Deficiency": "Failure to properly administer its CMS-approved formulary by applying unapproved quantity limits.",
		    "Monitored by Whom": "Harry Cameron",
		    "Monitoring Methodology": "95% Automated\n5% Manual",
		    "Monitoring Period": "Daily Monitoring of prior day's rejected claims",
		    "Universe Size": 448922,
		    "Sample Size": 448922,
		    "Processed Correctly": 448683,
		    "Processed Incorrectly": 0,
		    "Error Rate": 0,
		    "Root Cause of Errors": 0,
		    "Members Impacted": 0,
		    "Remediation Efforts": 0,
		    "Additional notes": 0,
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "14A",
		    "Deficiency": "Failure to Provide Enrollees Transition Supplies of Medications (Continuing Beneficiaries)",
		    "Monitored by Whom": "Harry Cameron",
		    "Monitoring Methodology": "Not Applicable, this only applicable when transitioning from one PBM to another, which is not currently happening.",
		    "Monitoring Period": 0,
		    "Universe Size": 0,
		    "Sample Size": 0,
		    "Processed Correctly": 0,
		    "Processed Incorrectly": 0,
		    "Error Rate": 0,
		    "Root Cause of Errors": 0,
		    "Members Impacted": 0,
		    "Remediation Efforts": 0,
		    "Additional notes": 0,
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "14B",
		    "Deficiency": "Failure to Provide Enrollees Transition Supplies of Medications (New Beneficiaries)",
		    "Monitored by Whom": "Harry Cameron",
		    "Monitoring Methodology": 0,
		    "Monitoring Period": 0,
		    "Universe Size": 0,
		    "Sample Size": 0,
		    "Processed Correctly": 0,
		    "Processed Incorrectly": 0,
		    "Error Rate": 0,
		    "Root Cause of Errors": 0,
		    "Members Impacted": 0,
		    "Remediation Efforts": 0,
		    "Additional notes": "This data is expected to be included in next week's submission",
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "15",
		    "Deficiency": "Failure of the compliance officer or his/her designee to provide updates on results of the Auditing and Monitoring Reporting Processes",
		    "Monitored by Whom": 0,
		    "Monitoring Methodology": 0,
		    "Monitoring Period": 0,
		    "Universe Size": 0,
		    "Sample Size": 0,
		    "Processed Correctly": 0,
		    "Processed Incorrectly": 0,
		    "Error Rate": 0,
		    "Root Cause of Errors": 0,
		    "Members Impacted": 0,
		    "Remediation Efforts": 0,
		    "Additional notes": 0,
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "16",
		    "Deficiency": "Failure to Establish Risk Assessment, Monitoring and Auditing Programs",
		    "Monitored by Whom": 0,
		    "Monitoring Methodology": 0,
		    "Monitoring Period": 0,
		    "Universe Size": 0,
		    "Sample Size": 0,
		    "Processed Correctly": 0,
		    "Processed Incorrectly": 0,
		    "Error Rate": 0,
		    "Root Cause of Errors": 0,
		    "Members Impacted": 0,
		    "Remediation Efforts": 0,
		    "Additional notes": 0,
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "17",
		    "Deficiency": "Failure to Have Effective Monitoring and Auditing Work Plans Related to Medicare Parts C and D Benefits",
		    "Monitored by Whom": 0,
		    "Monitoring Methodology": 0,
		    "Monitoring Period": 0,
		    "Universe Size": 0,
		    "Sample Size": 0,
		    "Processed Correctly": 0,
		    "Processed Incorrectly": 0,
		    "Error Rate": 0,
		    "Root Cause of Errors": 0,
		    "Members Impacted": 0,
		    "Remediation Efforts": 0,
		    "Additional notes": 0,
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "18",
		    "Deficiency": "Failure to Maintain Thorough Documentation of All Deficiencies",
		    "Monitored by Whom": 0,
		    "Monitoring Methodology": 0,
		    "Monitoring Period": 0,
		    "Universe Size": 0,
		    "Sample Size": 0,
		    "Processed Correctly": 0,
		    "Processed Incorrectly": 0,
		    "Error Rate": 0,
		    "Root Cause of Errors": 0,
		    "Members Impacted": 0,
		    "Remediation Efforts": 0,
		    "Additional notes": 0,
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "19",
		    "Deficiency": "Failure to Have an Effective System for Corrective Actions",
		    "Monitored by Whom": 0,
		    "Monitoring Methodology": 0,
		    "Monitoring Period": 0,
		    "Universe Size": 0,
		    "Sample Size": 0,
		    "Processed Correctly": 0,
		    "Processed Incorrectly": 0,
		    "Error Rate": 0,
		    "Root Cause of Errors": 0,
		    "Members Impacted": 0,
		    "Remediation Efforts": 0,
		    "Additional notes": 0,
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  },
		  {
		    "CAP": "20",
		    "Deficiency": "Inaccurate and Untimely Delivery of Requested Universe Data Prior to Audit Commencement",
		    "Monitored by Whom": 0,
		    "Monitoring Methodology": 0,
		    "Monitoring Period": 0,
		    "Universe Size": 0,
		    "Sample Size": 0,
		    "Processed Correctly": 0,
		    "Processed Incorrectly": 0,
		    "Error Rate": 0,
		    "Root Cause of Errors": 0,
		    "Members Impacted": 0,
		    "Remediation Efforts": 0,
		    "Additional notes": 0,
		    "Universe Scope": 0,
		    "Sample Size description": 0,
		    "Short Term Target Error Rate": 0,
		    "Steady State Target Error Rate": 0,
		    "Total DE potential": 0,
		    "DE's included in Data": 0,
		    "Date 100% expected": 0,
		    "Week": 1,
		    "Status": "Green"
		  }
		];

		the_data.tasks = [
			{
				"CAP": "1A",
				"Deficiency": "Inappropriate Denial of Medical Services Due to Insufficient Outreach Regarding Clinical Decisions",
				"Week": 1,
				"Status": "German",
				"Task": "A New Alamo",
				"Delivery Date": "Yesterday",
				"Reason for Change": "Because I felt like it."
			},
			{
				"CAP": "1A",
				"Deficiency": "Inappropriate Denial of Medical Services Due to Insufficient Outreach Regarding Clinical Decisions",
				"Week": 1,
				"Status": "Paraguay",
				"Task": "The Alamo Strikes Back",
				"Delivery Date": "1302 AD",
				"Reason for Change": "Because it made me feel like dancing."
			},
			{
				"CAP": "1B",
				"Deficiency": "Insufficient Outreach to Providers for Drug Coverage under Part D - redeterminations",
				"Week": 1,
				"Status": "Insensitive to my feelings",
				"Task": "The Return of The Alamo",
				"Delivery Date": "Yesterday",
				"Reason for Change": "Because Howard eats ants."
			},
			{
				"CAP": "1B",
				"Deficiency": "Insufficient Outreach to Providers for Drug Coverage under Part D - redeterminations",
				"Week": 1,
				"Status": "Plutonian",
				"Task": "The Phantom Alamo",
				"Delivery Date": "A Galaxy Far Far Away",
				"Reason for Change": "Because."
			},
		];

		the_data.tiles = the_data.tiles.map(function(tile) {
			tile.Tasks = the_data.tasks.filter(function(task) {
				return task.CAP == tile.CAP && 
							 task.Deficiency == tile.Deficiency && 
							 task.Week == tile.Week;
			});

			return tile;
		});

    return the_data;
	}

// Directives


//Configuration
	app
	.config(Config)
	.controller('DeficiencySummaryController', DeficiencySummaryController)
	.controller('DeficiencyDetailsController', DeficiencyDetailsController)
	.factory('Data', Data)
	.constant('_', _);



})(angular.module('cmsEntry',['ui.router','ui.bootstrap','angular.filter','ngAnimate']));