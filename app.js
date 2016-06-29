function twoDigits(d) {
	if(0 <= d && d < 10) return "0" + d.toString();
	if(-10 < d && d < 0) return "-0" + (-1*d).toString();
	return d.toString();
}
Date.prototype.toMysqlFormat = function() {return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());};
Date.prototype.toMysqlDate = function() {return this.getFullYear() + "-" + twoDigits(1 + this.getMonth()) + "-" + twoDigits(this.getDate());};

(function (app){
	function Config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('summary', {
			url: '/',
			templateUrl: 'app/views/summary/summary.html',
			controller: 'DeficiencySummaryController as dsc',
			params: {
				prev_state_values: {}
			}
		})
		.state('detail', {
			url: '/detail/:cap/week/:week',
			templateUrl: 'app/views/detail/detail.html',
			controller: 'DeficiencyDetailsController as ddc',
			params: {
				cap: '',
				week: '',
				cap_item: {},
				prev_state_values: {}
			}
		});
	}
	function Templates($templateCache){
		$templateCache.put("app/utilities/directives/domo-dropdown/domo-dropdown.html",[
			'<div class="domo-dropdown-container">',
			'	<p class="domo-dropdown-header">{{ddc.header.toUpperCase()}}</p>',
			'	<div class="domo-dropdown-display" ng-click="ddc.toggle();" ng-class="{\'clicked\': ddc.listVisible}"><span ng-class="{\'placeholder\': !ddc.display}">{{ddc.selected || ddc.placeholder}}</span> <i class="icon ion-chevron-down"></i></div>',
			'	<div class="domo-dropdown-list-container" ng-class="{\'show\': ddc.listVisible}">',
			'		<div class="domo-dropdown-list">',
			'			<ul>',
			'				<li ng-repeat="item in ddc.list track by $index" ng-click="ddc.select(item)" ng-class="{\'selected\': ddc.selected === item}"><span>{{ddc.property ? item[ddc.property] : item}}</span></li>',
			'			</ul>',
			'		</div>',
			'	</div>',
			'</div>'
			].join('')
		);
		$templateCache.put("app/views/summary/summary.html",[
			'<div class="tiles">',
			'	<div class="tile" ng-repeat="tile in dsc.tiles | filter:dsc.rsc.search | weekFilter:dsc.rsc.weekfilter | categoryFilter:{Status:dsc.rsc.statusfilter}:{Status:\'All\'} | orderBy:dsc.getCAP track by $index" ng-click="dsc.goToDetail(tile)" ng-mouseenter="dsc.hovered_tile = $index" ng-mouseleave="dsc.hovered_tile = undefined" ng-class="{\'zoom\': dsc.hovered_tile === $index}">',
			'		<div class="tile-detail">',
			'			<p>{{ tile.Deficiency }}</p>',
			'		</div>',
			'		<div class="tile-title" ng-class="tile.Status">{{ tile[\'CAP #\'] }}</div>',
			'	</div>',
			'</div>',
			].join('')
		);
		$templateCache.put("app/views/sidebar/sidebar.html",[
			'<div class="slideout-menu" ng-class="{\'hint\': sc.hint,\'show\': sc.show}">',
			'	<div id="slideout-menu-close" ng-click="sc.show = false"><i class="icon ion-close"></i></div>',
			'	<domo-dropdown header="Week" placeholder="Week" list="sc.weeks" selected="sc.rsc.weekfilter"></domo-dropdown>',
			'	<domo-dropdown header="Status" placeholder="Status" list="sc.statuses" selected="sc.rsc.statusfilter"></domo-dropdown>',
			'</div>',
			'<div class="sidebar-container">',
			'	<div id="sidebar-back" ui-sref="summary" ng-class="{show: sc.state === \'detail\'}"><i id="sidebar-back-icon" class="icon ion-chevron-left" ng-class="{show: sc.state === \'detail\'}"></i></div>',
			'	<hr>',
			'	<div id="optionsDrawerBtn" class="optionsDrawer icon removed" ng-if="sc.state === \'summary\'" ng-mouseenter="sc.hint = true" ng-mouseleave="sc.hint = false">',
			'		<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" ng-click="sc.show = !sc.show">',
			'			<rect x="17" y="19" style="fill-rule:evenodd;clip-rule:evenodd" width="16" height="2" />',
			'			<rect x="17" y="24" style="fill-rule:evenodd;clip-rule:evenodd" width="16" height="2" />',
			'			<rect x="17" y="29" style="fill-rule:evenodd;clip-rule:evenodd" width="16" height="2" />',
			'			<rect id="optionsSlider1" class="stroked" x="19.8" y="18.6" style="fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;stroke-linejoin:round;stroke-miterlimit:10" width="2.9" height="2.9" />',
			'			<rect id="optionsSlider2" class="stroked" x="27.5" y="23.6" style="fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;stroke-linejoin:round;stroke-miterlimit:10" width="2.9" height="2.9" />',
			'			<rect id="optionsSlider3" class="stroked" x="19.8" y="28.5" style="fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;stroke-linejoin:round;stroke-miterlimit:10" width="2.9" height="2.9" />',
			'		</svg>',
			'	</div>',
			'</div>'].join('')
		);
		$templateCache.put("app/views/detail/detail.html",[
			'<br>',
			'<div class="container">',
			'	<div role="form">',
			'		<div class="row top-row">',
			'			<div class="form-group col-xs-2">',
			'				<label for="cap">CAP #</label>',
			'				<input type="text" class="form-control" id="cap" ng-model="ddc.data[\'CAP #\']" disabled>',
			'			</div>',
			'			<div class="form-group col-xs-2">',
			'				<label for="week">Week</label>',
			'				<input type="text" class="form-control" id="week" ng-model="ddc.data.Week">',
			'			</div>',
			'			<div class="form-group col-xs-3">',
			'				<label for="mp_start">Monitoring Period Start</label>',
			'				<p class="input-group">',
			'					<input type="text" class="form-control" uib-datepicker-popup="MM/dd/yyyy" ng-model="ddc.data[\'Monitoring Period Start\']" is-open="ddc.monitor_start_open" ng-required="true" close-text="Close" datepicker-options="{\'maxMode\':\'day\'}"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="ddc.monitor_start_open = !ddc.monitor_start_open"><i class="glyphicon glyphicon-calendar"></i></button></span></p>',
			'			</div>',
			'			<div class="form-group col-xs-3">',
			'				<label for="mp_start">Monitoring Period End</label>',
			'				<p class="input-group">',
			'					<input type="text" class="form-control" uib-datepicker-popup="MM/dd/yyyy" ng-model="ddc.data[\'Monitoring Period End\']" is-open="ddc.monitor_end_open" ng-required="true" close-text="Close" datepicker-options="{\'maxMode\':\'day\'}"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="ddc.monitor_end_open = !ddc.monitor_start_open"><i class="glyphicon glyphicon-calendar"></i></button></span></p>',
			'			</div>',
			'		</div>',
			'		<div class="row">',
			'			<div class="form-group col-xs-12">',
			'				<label for="deficiency">Deficiency</label>',
			'				<input type="text" class="form-control" id="deficiency" ng-model="ddc.data.Deficiency" disabled>',
			'			</div>',
			'		</div>',
			'	</div>',
			'	<div name="tabForm" class="tab-form">',
			'		<div uib-tabset active="activeForm">',
			'			<div uib-tab index="0" heading="Metrics">',
			'				<div class="container-fluid">',
			'					<div class="row">',
			'						<div class="col-xs-2" id="number-metrics">',
			'							<div class="row">',
			'								<div class="form-group">',
			'									<label for="error_rate">Error Rate</label>',
			'									<input class="form-control" id="error_rate" ng-model="ddc.data[\'Error Rate\']" percentage-input>',
			'								</div>',
			'							</div>',
			'							<div class="row">',
			'								<div class="form-group">',
			'									<label for="universe_size">Universe Size</label>',
			'									<input type="number" min="0" class="form-control" id="universe_size" ng-model="ddc.data[\'Universe Size\']">',
			'								</div>',
			'							</div>',
			'							<div class="row">',
			'								<div class="form-group">',
			'									<label for="sample_size">Sample Size</label>',
			'									<input type="number" min="0" class="form-control" id="sample_size" ng-model="ddc.data[\'Sample Size\']">',
			'								</div>',
			'							</div>',
			'							<div class="row">',
			'								<div class="form-group">',
			'									<label for="number_correct"># Correct</label>',
			'									<input type="number" min="0" class="form-control" id="number_correct" ng-model="ddc.data[\'Processed Correctly\']">',
			'								</div>',
			'							</div>',
			'							<div class="row">',
			'								<div class="form-group">',
			'									<label for="number_incorrect"># Incorrect</label>',
			'									<input type="number" min="0" class="form-control" id="number_incorrect" ng-model="ddc.data[\'Processed Incorrectly\']">',
			'								</div>',
			'							</div>',
			'							<div class="row">',
			'								<div class="form-group">',
			'									<label for="number_memberz">Members Impacted</label>',
			'									<input type="number" min="0" class="form-control" id="number_memberz" ng-model="ddc.data[\'Members Impacted\']">',
			'								</div>',
			'							</div>',
			'						</div>',
			'						<div class="col-xs-10">',
			'							<div class="row">',
			'								<div class="form-group col-xs-3">',
			'									<label for="short_term_target">Short Term Target</label>',
			'									<input class="form-control" id="error_rate" ng-model="ddc.data[\'Short Term Target Error Rate\']" percentage-input>',
			'								</div>',
			'								<div class="form-group col-xs-3">',
			'									<label for="steady_state_target">Steady State Target</label>',
			'									<input class="form-control" id="error_rate" ng-model="ddc.data[\'Steady State Target Error Rate\']" percentage-input>',
			'								</div>',
			'								<div class="form-group col-xs-3">',
			'									<label for="de_date">Date 100% expected</label>',
			'									<p class="input-group">',
			'										<input type="text" class="form-control" uib-datepicker-popup="MM/dd/yyyy" ng-model="ddc.data[\'Date 100% expected\']" is-open="ddc.date_100_expected_open" ng-required="true" close-text="Close" datepicker-options="{\'maxMode\':\'day\'}"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="ddc.date_100_expected_open = !ddc.date_100_expected_open"><i class="glyphicon glyphicon-calendar"></i></button></span>',
			'									</p>',
			'								</div>',
			'							</div>',
			'							<div class="row">',
			'								<div class="form-group col-xs-4">',
			'									<label for="root_cause">Root Cause of Errors</label>',
			'									<textarea class="form-control no-resize" rows="16" id="root_cause" ng-model="ddc.data[\'Root Cause of Errors\']"></textarea>',
			'								</div>',
			'								<div class="form-group col-xs-4">',
			'									<label for="remediation_efforts">Remediation Efforts</label>',
			'									<textarea class="form-control no-resize" rows="16" id="remediation_efforts" ng-model="ddc.data[\'Remediation Efforts\']"></textarea>',
			'								</div>',
			'								<div class="form-group col-xs-4">',
			'									<label for="additional_notes">Additional Notes</label>',
			'									<textarea class="form-control no-resize" rows="16" id="additional_notes" ng-model="ddc.data[\'Additional notes\']"></textarea>',
			'								</div>',
			'							</div>',
			'						</div>',
			'					</div>',
			'					<div class="row submit-row">',
			'						<button class="btn btn-primary btn-lg save-button" ng-click="ddc.update()">{{ddc.is_new_week ? \'Save\' : \'Update\'}}</button>',
			'					</div>',
			'				</div>',
			'			</div>',
			'			<div uib-tab index="1" heading="Tasks">',
			'				<div class="row task-headers">',
			'					<div class="form-group col-xs-3">',
			'						<label for="task_description">Task</label>',
			'					</div>',
			'					<div class="form-group col-xs-3">',
			'						<label for="task_reason_for_change">Reason for Change</label>',
			'					</div>',
			'					<div class="form-group col-xs-2">',
			'						<label for="task_status">Status</label>',
			'					</div>',
			'					<div class="form-group col-xs-2">',
			'						<label for="task_delivery_date">Delivery Date</label>',
			'					</div>',
			'				</div>',
			'				<div class="task-rows-container">',
			'					<div class="row task-row" ng-repeat="task in ddc.data.Tasks track by $index">',
			'						<div class="form-group col-xs-3 task">',
			'							<textarea class="form-control" id="task_description" ng-model="task[\'CAP Task\']"></textarea>',
			'						</div>',
			'						<div class="form-group col-xs-3 task">',
			'							<textarea class="form-control" id="task_reason_for_change" ng-model="task[\'Reason for change (if applicable)\']"></textarea>',
			'						</div>',
			'						<div class="col-xs-2 task">',
			'							<input type="text" class="form-control" id="task_status" ng-model="task[\'Status\']">',
			'						</div>',
			'						<div class="form-group col-xs-2">',
			'							<p class="input-group">',
			'								<input type="text" class="form-control" uib-datepicker-popup="MM/dd/yyyy" ng-model="task[\'Delivery Date\']" is-open="task.delivery_date_open" ng-required="true" close-text="Close" datepicker-options="{\'maxMode\':\'day\'}"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="task.delivery_date_open = !task.delivery_date_open"><i class="glyphicon glyphicon-calendar"></i></button></span>',
			'							</p>',
			'						</div>',
			'						<div class="col-xs-2 task task-row-button">',
			'							<button type="button" class="btn btn-primary" ng-click="ddc.removeTask($index)">Remove Task</button>',
			'						</div>',
			'					</div>',
			'				</div>',
			'				<button style="margin-left: 50px; margin-top: 15px" type="button" class="btn btn-lg btn-primary add-task" ng-click="ddc.addTask()"><i class="icon ion-plus"></i> Add New Task</button>',
			'			</div>',
			'			<div uib-tab index="2" heading="Delegated Entities">',
			'				<div class="row">',
			'					<div class="form-group col-xs-4">',
			'						<label for="number_members">Total DE potential</label>',
			'						<input type="number" min="0" class="form-control bottom-space" id="number_members" ng-model="ddc.data[\'Total DE potential\']">',
			'						<label for="de_included">DE\'s included in Data</label>',
			'						<input type="number" min="0" class="form-control bottom-space" id="de_included" ng-model="ddc.data[\'DE\\\'s included in Data\']">',
			'					</div>',
			'					<div class="form-group col-xs-8">',
			'						<label for="de_notes">DE Notes</label>',
			'						<textarea class="form-control bottom-fill" id="de_notes" ng-model="ddc.data[\'DE Notes\']"></textarea>',
			'					</div>',
			'				</div>',
			'			</div>',
			'			<div uib-tab index="3" heading="Background">',
			'				<div class="row">',
			'					<div class="col-xs-3">',
			'						<div class="form-group">',
			'							<label>Monitored by Whom?</label>',
			'							<input type="text" class="form-control" ng-model="ddc.data[\'Monitored by Whom\']">',
			'						</div>',
			'					</div>',
			'					<div class="col-xs-9">',
			'						<div class="form-group">',
			'							<label for="monitoring_method">Monitoring Methodology</label>',
			'							<input type="text" class="form-control" id="monitoring_method" ng-model="ddc.data[\'Monitoring Methodology\']">',
			'						</div>',
			'					</div>',
			'				</div>',
			'				<div class="row">',
			'					<div class="form-group col-xs-6 bottom-fill">',
			'						<label for="sample_size_description">Sample Size Description</label>',
			'						<textarea class="form-control bottom-fill" id="sample_size_description" ng-model="ddc.data[\'Sample Size description\']"></textarea>',
			'					</div>',
			'					<div class="form-group col-xs-6 bottom-fill">',
			'						<label for="universe_scope">Universe Scope</label>',
			'						<textarea class="form-control bottom-fill" id="universe_scope" ng-model="ddc.data[\'Universe Scope\']"></textarea>',
			'					</div>',
			'				</div>',
			'			</div>',
			'			<div uib-tab index="4" heading="Locations">',
			'				<div class="row">',
			'					<div class="form-group col-xs-2">',
			'						<h4>ALL</h4>',
			'						<div class="location-input-container error-rate-input">',
			'							<label>Error Rate</label>',
			'							<input class="form-control" id="error_rate" ng-model="ddc.data[\'Error Rate\']" percentage-input>',
			'						</div>',
			'						<hr class="first">',
			'						<div class="location-input-container">',
			'							<label># Correct</label><span class="error-message" ng-if="(ddc.correct_sum ? ddc.correct_sum : 0) !== (ddc.data[\'Processed Correctly\'] ? ddc.data[\'Processed Correctly\'] : 0)">Warning - locations do not sum to total.</span><i class="icon ion-checkmark-round" ng-if="ddc.correct_sum != undefined && activeForm === 4 && ddc.correct_sum === ddc.data[\'Processed Correctly\']" aria-hidden="true"></i>',
			'							<input type="number" min="0" class="form-control" ng-model="ddc.data[\'Processed Correctly\']" disabled>',
			'						</div>',
			'						<hr class="first">',
			'						<div class="location-input-container">',
			'							<label># Incorrect</label><span class="error-message" ng-if="(ddc.incorrect_sum ? ddc.incorrect_sum : 0) !== (ddc.data[\'Processed Incorrectly\'] ? ddc.data[\'Processed Incorrectly\'] : 0)">Warning - locations do not sum to total.</span><i class="icon ion-checkmark-round" ng-if="ddc.incorrect_sum != undefined && activeForm === 4 && ddc.incorrect_sum === ddc.data[\'Processed Incorrectly\']" aria-hidden="true"></i>',
			'							<input type="number" min="0" class="form-control" ng-model="ddc.data[\'Processed Incorrectly\']" disabled>',
			'						</div>',
			'						<hr class="first">',
			'						<div class="location-input-container">',
			'							<label>Members Impacted</label><span class="error-message" ng-if="(ddc.members_sum ? ddc.members_sum : 0) !== (ddc.data[\'Members Impacted\'] ? ddc.data[\'Members Impacted\'] : 0)">Warning - locations do not sum to total.</span><i class="icon ion-checkmark-round" ng-if="ddc.members_sum != undefined && activeForm === 4 && ddc.members_sum === ddc.data[\'Members Impacted\']" aria-hidden="true"></i>',
			'							<input type="number" min="0" class="form-control" ng-model="ddc.data[\'Members Impacted\']" disabled>',
			'						</div>',
			'						<hr class="first">',
			'					</div>',
			'					<div class="form-group col-xs-2">',
			'						<h4>CHS</h4>',
			'						<div class="location-input-container error-rate-input">',
			'							<label>&nbsp;</label>',
			'							<input class="form-control" id="error_rate" ng-model="ddc.ddc.location_entries[\'CHS\'][\'Error Rate\']" percentage-input>',
			'						</div>',
			'						<hr>',
			'						<div class="location-input-container">',
			'							<label>&nbsp;</label>',
			'							<input type="number" min="0" class="form-control" ng-model="ddc.location_entries[\'CHS\'][\'Processed Correctly\']">',
			'						</div>',
			'						<hr>',
			'						<div class="location-input-container">',
			'							<label>&nbsp;</label>',
			'							<input type="number" min="0" class="form-control" ng-model="ddc.location_entries[\'CHS\'][\'Processed Incorrectly\']">',
			'						</div>',
			'						<hr>',
			'						<div class="location-input-container">',
			'							<label>&nbsp;</label>',
			'							<input type="number" min="0" class="form-control" ng-model="ddc.location_entries[\'CHS\'][\'Members Impacted\']">',
			'						</div>',
			'						<hr>',
			'					</div>',
			'					<div class="form-group col-xs-2">',
			'						<h4 for="monitoring_method">AZ</h4>',
			'						<div class="location-input-container error-rate-input">',
			'							<label>&nbsp;</label>',
			'							<input class="form-control" id="error_rate" ng-model="ddc.ddc.location_entries[\'AZ\'][\'Error Rate\']" percentage-input>',
			'						</div>',
			'						<hr>',
			'						<div class="location-input-container">',
			'							<label>&nbsp;</label>',
			'							<input type="number" min="0" class="form-control" ng-model="ddc.location_entries[\'AZ\'][\'Processed Correctly\']">',
			'						</div>',
			'						<hr>',
			'						<div class="location-input-container">',
			'							<label>&nbsp;</label>',
			'							<input type="number" min="0" class="form-control" ng-model="ddc.location_entries[\'AZ\'][\'Processed Incorrectly\']">',
			'						</div>',
			'						<hr>',
			'						<div class="location-input-container">',
			'							<label>&nbsp;</label>',
			'							<input type="number" min="0" class="form-control" ng-model="ddc.location_entries[\'AZ\'][\'Members Impacted\']">',
			'						</div>',
			'						<hr>',
			'					</div>',
			'					<div class="form-group col-xs-2">',
			'						<h4 for="mp_start">TX MMP</h4>',
			'						<div class="location-input-container error-rate-input">',
			'							<label>&nbsp;</label>',
			'							<input class="form-control" id="error_rate" ng-model="ddc.ddc.location_entries[\'TX MMP\'][\'Error Rate\']" percentage-input>',
			'						</div>',
			'						<hr>',
			'						<div class="location-input-container">',
			'							<label>&nbsp;</label>',
			'							<input type="number" min="0" class="form-control" ng-model="ddc.location_entries[\'TX MMP\'][\'Processed Correctly\']">',
			'						</div>',
			'						<hr>',
			'						<div class="location-input-container">',
			'							<label>&nbsp;</label>',
			'							<input type="number" min="0" class="form-control" ng-model="ddc.location_entries[\'TX MMP\'][\'Processed Incorrectly\']">',
			'						</div>',
			'						<hr>',
			'						<div class="location-input-container">',
			'							<label>&nbsp;</label>',
			'							<input type="number" min="0" class="form-control" ng-model="ddc.location_entries[\'TX MMP\'][\'Members Impacted\']">',
			'						</div>',
			'						<hr>',
			'					</div>',
			'					<div class="form-group col-xs-2">',
			'						<h4 for="mp_end">Leon</h4>',
			'						<div class="location-input-container error-rate-input">',
			'							<label>&nbsp;</label>',
			'							<input class="form-control" id="error_rate" ng-model="ddc.ddc.location_entries[\'Leon\'][\'Error Rate\']" percentage-input>',
			'						</div>',
			'						<hr>',
			'						<div class="location-input-container">',
			'							<label>&nbsp;</label>',
			'							<input type="number" min="0" class="form-control" ng-model="ddc.location_entries[\'Leon\'][\'Processed Correctly\']">',
			'						</div>',
			'						<hr>',
			'						<div class="location-input-container">',
			'							<label>&nbsp;</label>',
			'							<input type="number" min="0" class="form-control" ng-model="ddc.location_entries[\'Leon\'][\'Processed Incorrectly\']">',
			'						</div>',
			'						<hr>',
			'						<div class="location-input-container">',
			'							<label>&nbsp;</label>',
			'							<input type="number" min="0" class="form-control" ng-model="ddc.location_entries[\'Leon\'][\'Members Impacted\']">',
			'						</div>',
			'						<hr>',
			'					</div>',
			'					<div class="form-group col-xs-2">',
			'						<h4 for="sample_size_description">FDRs / DEs</h4>',
			'						<div class="location-input-container error-rate-input">',
			'							<label>&nbsp;</label>',
			'							<input class="form-control" id="error_rate" ng-model="ddc.ddc.location_entries[\'FDRs / DEs\'][\'Error Rate\']" percentage-input>',
			'						</div>',
			'						<hr>',
			'						<div class="location-input-container">',
			'							<label>&nbsp;</label>',
			'							<input type="number" min="0" class="form-control" ng-model="ddc.location_entries[\'FDRs / DEs\'][\'Processed Correctly\']">',
			'						</div>',
			'						<hr>',
			'						<div class="location-input-container">',
			'							<label>&nbsp;</label>',
			'							<input type="number" min="0" class="form-control" ng-model="ddc.location_entries[\'FDRs / DEs\'][\'Processed Incorrectly\']">',
			'						</div>',
			'						<hr>',
			'						<div class="location-input-container">',
			'							<label>&nbsp;</label>',
			'							<input type="number" min="0" class="form-control" ng-model="ddc.location_entries[\'FDRs / DEs\'][\'Members Impacted\']">',
			'						</div>',
			'						<hr>',
			'					</div>',
			'				</div>',
			'			</div>',
			'		</div>',
			'	</div>',
			'</div>'].join('')
		);
	}

	function sidebar($document) {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'app/views/sidebar/sidebar.html',
			controller: 'SidebarController as sc',
			link: function(scope, element, attr, ctrl) {
				// Close element if click isn't on the icon or the menu itself
				$document.bind('click', function(event){
					var isClickedElementChildOfSlideout = $('div.slideout-menu')
						.find(event.target)
						.length > 0;
					var isClickedElementSlideoutIcon = $('div#optionsDrawerBtn')
						.find(event.target)
						.length > 0;

					if (!$(event.target).is('div.slideout-menu') && 
						!isClickedElementChildOfSlideout && 
						!isClickedElementSlideoutIcon
						) {
						scope.$apply(function(){
							ctrl.show = false;
						});
					}
				});
			}
		};
	}
	function SidebarController($rootScope, $state, Data) {
		var sc = this;
		sc.rsc = $rootScope;

		$rootScope.$on('Data:initial', function(e, initial_data) {
			sc.tiles = initial_data;
			sc.weeks = ['Most Recent'].concat(_(sc.tiles).map(function(item){return item.Week;}).uniq().value().reverse());
			sc.rsc.weeks = ['Most Recent'].concat(sc.weeks);
			sc.statuses = ['All'].concat(_(sc.tiles).map(function(item){return item.Status;}).uniq().value());

			sc.rsc.weekfilter = 'Most Recent'; // _.maxBy(sc.tiles, 'Week').Week;
			sc.rsc.statusfilter = 'All';
			sc.rsc.order = 'CAP';
			sc.rsc.monitor = 'All';
		});
		sc.state = $state.current.name;
		$rootScope.$watch(function(){return $state.current.name;}, function(new_val, old_val) {
			sc.state = $state.current.name;
		});

		sc.hideSidebar = function() {
			sc.show = false;
		};	
	}
	function domoDropdown($document) {
		return {
			restrict: "E",
			templateUrl: "app/utilities/directives/domo-dropdown/domo-dropdown.html",
			scope: {},
			controller: 'domoDropdownController as ddc',
			bindToController: {
				header: "@",
				placeholder: "@",
				list: "=",
				selected: "=",
				property: "@",
				sort: '='
			},
			link: function(scope, element, attr, ctrl) {
				$document.bind('click', function(event){
					var isClickedElementChildOfDropdown = element
						.find(event.target)
						.length > 0;

					if (isClickedElementChildOfDropdown) return;
					else {
						scope.$apply(function(){
							ctrl.listVisible = false;
						});
					}
				});
			}
		};
	}
	function domoDropdownController() {
		var ddc = this;

		ddc.listVisible = false;

		ddc.select = function(item) {
			ddc.selected = item;
			ddc.listVisible = false;
			ddc.display = true;

		};

		ddc.isSelected = function(item) {
			return item[ddc.property] === ddc.selected[ddc.property];
		};

		ddc.toggle = function() {
			ddc.listVisible = !ddc.listVisible;
		};
	}
	function clickOutside($document, $parse, $timeout) {
		return {
			restrict: 'A',
			link: function($scope, elem, attr) {

				// Postpone linking to next digest to allow for unique id generation
				$timeout(function() {
					var classList = (attr.outsideIfNot !== undefined) ? attr.outsideIfNot.split(/[ ,]+/) : [],
						fn;

					// Add the elements id so it is not counted in the click listening
					if (attr.id !== undefined) {
						classList.push(attr.id);
					}

					function eventHandler(e) {
						var i, element, r, id, classNames, l;

						// Check if our element already hidden and abort if so
						if (angular.element(elem).hasClass("ng-hide")) {
							return;
						}

						// If there is no click target, no point going on
						if (!e || !e.target) {
							return;
						}

						// Loop through the available elements, looking for classes in the class list that might match and so will eat
						for (element = e.target; element; element = element.parentNode) {
							id = element.id;
							classNames = element.className;
							l = classList.length;

							// Unwrap SVGAnimatedString classes
							if (classNames && classNames.baseVal !== undefined) {
								classNames = classNames.baseVal;
							}

							// If there are no class names on the element clicked, skip the check
							if (classNames || id) {
								// Loop through the elements id's and classnames looking for exceptions
								for (i = 0; i < l; i++) {
									// Prepare regex for class word matching
									r = new RegExp('\\b' + classList[i] + '\\b');

									// Check for exact matches on id's or classes, but only if they exist in the first place
									if ((id !== undefined && id === classList[i]) || (classNames && r.test(classNames))) {
										// Now let's exit out as it is an element that has been defined as being ignored for clicking outside
										return;
									}
								}
							}
						}

						// If we have got this far, then we are good to go with processing the command passed in via the click-outside attribute
						$scope.$apply(function() {
							fn = $parse(attr.clickOutside);
							fn($scope);
						});
					}

					// If the device has a touchscreen, listen for this event
					if (_hasTouch()) {
						$document.on('touchstart', eventHandler);
					}

					// Still listen for the click event even if there is touch to cater to touchscreen laptops
					$document.on('click', eventHandler);

					// When the scope is destroyed, clean up the document's event handlers as we don't want them hanging around
					$scope.$on('$destroy', function() {
						if (_hasTouch()) {
							$document.off('touchstart', eventHandler);
						}

						$document.off('click', eventHandler);
					});

					// Private function to attempt to figure out if we are on a touch device
					function _hasTouch() {
						// Works on most browsers, IE10/11 and Surface
						return 'ontouchstart' in window || navigator.maxTouchPoints;
					}
				});
			}
		};
	}
	function categoryFilter(_) {
		return function(input, comparator, catchall) {
			if (input) {
				if ( _.isEqual(comparator,catchall) ) return input;
				return input.filter(function(item) {
					return _.max(_(comparator).keys().map(function(comp_item) {
						return comparator[comp_item] === item[comp_item];
					}).value());
				});
			}
		};
	}
	function weekFilter() {
		return function(input, comparator) {
			if (input) {
				if ( comparator === 'Most Recent' ) return input.filter(function(item){return item.Week === item['Most Recent Week'];});
				else return input.filter(function(item){return item.Week === comparator;});
			}
		};
	}

	function DeficiencySummaryController($timeout, $rootScope, $state, $stateParams, Data, _){
		var dsc = this;
		dsc.rsc = $rootScope;

		if (Data.all_data) {
			dsc.tiles = Data.all_data;
		}
		else {
			$rootScope.$on('Data:initial', function(e, initial_data) {
				dsc.tiles = initial_data;
			});
		}

		dsc.getCAP = function(a_obj) {
			var a = a_obj['CAP #'];
			var anum = (a+'').trim().match(/([0-9])*/g)[0]*1;
			var astr = (a+'').trim().match(/[0-9]*(.*)/g)[0];
			return twoDigits(anum)+astr;
		};

		dsc.goToDetail = function(item) {
			$state.go('detail', {
				cap: item['CAP #'],
				week: item.Week,
				cap_item: item,
				prev_state_values: {
					weekfilter: dsc.weekfilter,
					order: dsc.order
				}
			});
		};
	}

	function DeficiencyDetailsController($rootScope, $scope, $state, $stateParams, $q, $uibModal, $timeout, _, Data){
		var ddc = this;
		// Assign a value to ddc.data (whether or not we actually went to the summary page first)
		if ($stateParams.cap_item['CAP #']) ddc.data = $stateParams.cap_item;
		else Data.getAllData()
			.then(function(all_data) {
				ddc.data = all_data.filter(function(item) {
					return item['CAP #'] === $stateParams.cap && item.Week === $stateParams.week;
				})[0];
			});
		ddc.location_entries = {
			'CHS': {},
			'AZ': {},
			'TX MMP': {},
			'Leon': {},
			'FDRs / DEs': {}
		};
		ddc.date_100_expected_open = false;
		ddc.is_new_week = false;
		if ( !(ddc.data['Date 100% expected'] instanceof Date) || isNaN(ddc.data['Date 100% expected'].getTime()) ) {ddc.data['Date 100% expected'] = new Date();}
		$scope.$watch(function(){return ddc.data.Week;},function(new_val, old_val) {
			if (!ddc.current_weeks) ddc.current_weeks = $rootScope.weeks;
			ddc.is_new_week = (ddc.current_weeks.indexOf(ddc.data.Week*1) === -1);
		});
		ddc.error_sum = undefined;
		ddc.correct_sum = undefined;
		ddc.incorrect_sum = undefined;
		ddc.members_sum = undefined;
		$scope.$watch(function(){return ddc.location_entries;}, function(new_val) {
			ddc.error_sum = _.sum(_.keys(ddc.location_entries).map(function(item) {
				return ddc.location_entries[item]['Error Rate'];
			}));
			ddc.correct_sum = _.sum(_.keys(ddc.location_entries).map(function(item) {
				return ddc.location_entries[item]['Processed Correctly'];
			}));
			ddc.incorrect_sum = _.sum(_.keys(ddc.location_entries).map(function(item) {
				return ddc.location_entries[item]['Processed Incorrectly'];
			}));
			ddc.members_sum = _.sum(_.keys(ddc.location_entries).map(function(item) {
				return ddc.location_entries[item]['Members Impacted'];
			}));
		}, true);

		ddc.goToSummary = function() {
			$state.go('summary', {
				state_values: $stateParams.prev_state_values,
				prev_state_values: {

				}
			});
		};

		ddc.addTask = function() {
			ddc.data.Tasks.push({
				'CAP #': ddc.data['CAP #'],
				'CAP Task': undefined,
				'Delivery Date': undefined,
				'Status': undefined,
				'Reason for change (if applicable)': undefined,
				'Week': ddc.data.Week
			});
		};
		ddc.removeTask = function(index) {
			var modalInstance = $uibModal.open({
				animation: true,
				template: '<div class="row text-center"><h4>Are you sure you want to remove this task?</h4></div><div class="row"><div class="col-xs-6 col-xs-offset-4" style="padding-bottom: 20px"><button class="btn btn-primary btn-lg" ng-click="cmc.yes()" style="margin-right: 50px">YES</button><button class="btn btn-primary btn-lg save-button"" ng-click="cmc.no()">NO</button></div></div>',
				controller: 'ConfirmModalController as cmc',
				scope: $scope
			});
			modalInstance.result.then(function (should_remove) {
				if (should_remove) ddc.data.Tasks.splice(index,1);
			});
		};

		ddc.update = function() {
			$scope.week = ddc.data.Week;
			$scope.cap = ddc.data['CAP #'];
			$scope.new_one = ddc.is_new_week;
			var modalInstance = $uibModal.open({
				animation: true,
				template: '<div class="row text-center"><h4>{{new_one ? \'Save a new record for\' : \'Update and overwrite current\'}} CAP #{{cap}} {{new_one ? \'\' : \'data\'}} for Week {{week}}?</h4></div><div class="row"><div class="col-xs-6 col-xs-offset-4" style="padding-bottom: 20px"><button class="btn btn-primary btn-lg" ng-click="cmc.yes()" style="margin-right: 50px">YES</button><button class="btn btn-primary btn-lg save-button"" ng-click="cmc.no()">NO</button></div></div>',
				controller: 'ConfirmModalController as cmc',
				scope: $scope
			});

			modalInstance.result.then(function (should_update) {
				var domouser = JSON.parse(localStorage.domo_user).USER_FULLNAME;
				if (should_update) {
					var now = new Date();
					Data.writeCAPMetricRow([
						ddc.data['CAP #'] || '',
						ddc.data.Deficiency || '',
						ddc.data['Monitored by Whom'] || '',
						ddc.data['Monitoring Methodology'] || '',
						ddc.data['Monitoring Period Start'] instanceof Date ? ddc.data['Monitoring Period Start'].toMysqlDate() : (ddc.data['Monitoring Period Start'] ? ddc.data['Monitoring Period Start'] : ''),
						ddc.data['Monitoring Period End'] instanceof Date ? ddc.data['Monitoring Period End'].toMysqlDate() : (ddc.data['Monitoring Period End'] ? ddc.data['Monitoring Period End'] : ''),
						ddc.data['Universe Size'] === undefined ? '' : ddc.data['Universe Size'],
						ddc.data['Sample Size'] === undefined ? '' : ddc.data['Sample Size'],
						ddc.data['Processed Correctly'] === undefined ? '' : ddc.data['Processed Correctly'],
						ddc.data['Processed Incorrectly'] === undefined ? '' : ddc.data['Processed Incorrectly'],
						ddc.data['Error Rate'] === undefined ? '' : ddc.data['Error Rate'] / 100,
						ddc.data['Root Cause of Errors'] || '',
						ddc.data['Members Impacted'] === undefined ? '' : ddc.data['Members Impacted'],
						ddc.data['Remediation Efforts'] || '',
						ddc.data['Additional notes'] || '',
						ddc.data['Universe Scope'] || '',
						ddc.data['Sample Size description'] || '',
						ddc.data['Total DE potential'] || '',
						ddc.data['DE\'s included in Data'] || '',
						ddc.data['Date 100% expected'] instanceof Date ? ddc.data['Date 100% expected'].toMysqlDate() : (ddc.data['Date 100% expected'] ? ddc.data['Date 100% expected'] : ''),
						ddc.data.Week || '',
						ddc.data['Short Term Target Error Rate'] === undefined ? '' : ddc.data['Short Term Target Error Rate'] / 100,
						ddc.data['Steady State Target Error Rate'] === undefined ? '' : ddc.data['Steady State Target Error Rate'] / 100,
						now.toMysqlFormat(),
						domouser || ''
					])
					.then(function() {
						if (!ddc.data.Tasks.length) return $q.resolve();
						return $timeout(function(){return Data.writeCAPTaskRows(
							ddc.data.Tasks.map(function(task) {
								return [
									ddc.data['CAP #'] || '',
									ddc.data.Deficiency || '',
									task['CAP Task'] || '',
									task['Delivery Date'] instanceof Date ? task['Delivery Date'].toMysqlDate() : (task['Delivery Date'] ? task['Delivery Date'] : ''),
									task.Status || '',
									task['Reason for change (if applicable)'] || '',
									ddc.data.Week || '',
									ddc.data.Week || '',
									now.toMysqlFormat(),
									domouser || ''
								];
							})
						);},500);
					})
					.then(function() {
						return $timeout(function(){return Data.writeCAPDrillRows(
							_.keys(ddc.location_entries).map(function(location) {
								return [
									ddc.data['CAP #'] || '',
									location || '',
									ddc.data.Week || '',
									ddc.location_entries[location]['Error Rate'] === undefined ? '' : ddc.location_entries[location]['Error Rate'] / 100,
									ddc.location_entries[location]['Processed Correctly'] === undefined ? '' : ddc.location_entries[location]['Processed Correctly'],
									ddc.location_entries[location]['Processed Incorrectly'] === undefined ? '' : ddc.location_entries[location]['Processed Incorrectly'],
									ddc.location_entries[location]['Members Impacted'] === undefined ? '' : ddc.location_entries[location]['Members Impacted'],
									now.toMysqlFormat(),
									domouser || ''
								];
							})
						);},500);
					})
					.then(function() {
						ddc.goToSummary();
					});
				}
			});
		};
	}
	function ConfirmModalController($uibModalInstance) {
		var cmc = this;

		cmc.yes = function() {
			return $uibModalInstance.close(true);
		};
		cmc.no = function() {
			return $uibModalInstance.close(false);
		};
	}
	function percentageInput() {
		return {
			require: 'ngModel',
			restrict: 'A',
			scope: {},
			link: function(scope, elem, attrs, ngModel) {

				var unbindFirstWatch = scope.$watch(function(){return ngModel.$modelValue;}, function(new_val, old_val) {
					var val = elem.val();
					if ( val.match(/^\s*[0-9]*\.?[0-9]*/)[0] && val !== '' ) {
						var the_num = val.match(/^\s*[0-9]*\.?[0-9]*/)[0];
						ngModel.$setViewValue(the_num*100);
						elem.val(_.round(the_num*100,2)+'%');
					}
					else {
						elem.val('');
					}
					if (elem.val() === '%') elem.val('');
					if (ngModel.$modelValue) unbindFirstWatch();
				});

				elem.on('focus', function() {
					unbindFirstWatch();
				});

				elem.on('blur', function() {
					var val = elem.val();
					if ( val.match(/^\s*[0-9]*\.?[0-9]*/)[0] && val !== '' ) {
						var the_num = val.match(/^\s*[0-9]*\.?[0-9]*/)[0];
						scope.$apply(function(){
							ngModel.$setViewValue(the_num*1);
						});
						elem.val(the_num+'%');
					}
					else {
						elem.val('');
					}
					if (elem.val() === '%') elem.val('');
				});
			}
		};
	}

	function Data($http, $q, $rootScope, AppHost) {
		var the_data = {};

		the_data.writeCAPMetricRow = function(new_row) {
			return $http({
				method: 'POST',
				url: AppHost + '/api/data/v3/datasources/e1997817-7fcb-40ca-bc9e-998a44b915a5/dataversions?append=latest',
				headers: {
					'Content-Type': 'text/csv',
					'X-Domo-Developer-Token': '022423ca85b11d9abae9fb7020b7b6d685db36fac5e733ca'
				},
				data: '"'+new_row.map(function(item){return (item+'').replace(/"/g, '\"');}).join('","')+'"'
			});
		};
		the_data.writeCAPTaskRows = function(new_rows) {
			return $http({
				method: 'POST',
				url: AppHost + '/api/data/v3/datasources/081e2562-8975-4bb7-b624-669ae4b652df/dataversions?append=latest',
				headers: {
					'Content-Type': 'text/csv',
					'X-Domo-Developer-Token': '022423ca85b11d9abae9fb7020b7b6d685db36fac5e733ca'
				},
				data: new_rows.map(function(row){return '"'+row.map(function(item){return (item+'').replace(/"/g, '\"');}).join('","')+'"';}).join('\n')
			});
		};
		the_data.writeCAPDrillRows = function(new_rows) {
			return $http({
				method: 'POST',
				url: AppHost + '/api/data/v3/datasources/f69a3e44-a20f-4a45-ac53-2d9ddf33f638/dataversions?append=latest',
				headers: {
					'Content-Type': 'text/csv',
					'X-Domo-Developer-Token': '022423ca85b11d9abae9fb7020b7b6d685db36fac5e733ca'
				},
				data: new_rows.map(function(row){return '"'+row.map(function(item){return (item+'').replace(/"/g, '\"');}).join('","')+'"';}).join('\n')
			});
		};

		the_data.getAllData = function() {
			if (!the_data.all_data) {
				return $http({
					url: AppHost + '/api/data/v2/datasources/e1997817-7fcb-40ca-bc9e-998a44b915a5/data',
					method: 'POST',
					headers: {
						'Content-Type': 'application/json; charset=UTF-8'
					},
					data: {"dataQuery":"{\"columns\":[{\"column\":\"CAP #\",\"exprType\":\"COLUMN\"},{\"column\":\"Deficiency\",\"exprType\":\"COLUMN\"},{\"column\":\"Monitored by Whom\",\"exprType\":\"COLUMN\"},{\"column\":\"Monitoring Methodology\",\"exprType\":\"COLUMN\"},{\"column\":\"Monitoring Start\",\"exprType\":\"COLUMN\"},{\"column\":\"Monitoring Stop\",\"exprType\":\"COLUMN\"},{\"column\":\"Universe Size\",\"exprType\":\"COLUMN\"},{\"column\":\"Sample Size\",\"exprType\":\"COLUMN\"},{\"column\":\"Processed Correctly\",\"exprType\":\"COLUMN\"},{\"column\":\"Processed Incorrectly\",\"exprType\":\"COLUMN\"},{\"column\":\"Error Rate\",\"exprType\":\"COLUMN\"},{\"column\":\"Root Cause of Errors\",\"exprType\":\"COLUMN\"},{\"column\":\"Members Impacted\",\"exprType\":\"COLUMN\"},{\"column\":\"Remediation Efforts\",\"exprType\":\"COLUMN\"},{\"column\":\"Additional notes\",\"exprType\":\"COLUMN\"},{\"column\":\"Universe Scope\",\"exprType\":\"COLUMN\"},{\"column\":\"Sample Size description\",\"exprType\":\"COLUMN\"},{\"column\":\"Total DE potential\",\"exprType\":\"COLUMN\"},{\"column\":\"DE's included in Data\",\"exprType\":\"COLUMN\"},{\"column\":\"Date 100% expected\",\"exprType\":\"COLUMN\"},{\"column\":\"Week\",\"exprType\":\"COLUMN\"},{\"column\":\"Short Term Target Error Rate\",\"exprType\":\"COLUMN\"},{\"column\":\"Steady State Target Error Rate\",\"exprType\":\"COLUMN\"},{\"column\":\"Last Modified\",\"exprType\":\"COLUMN\"},{\"column\":\"Updated By\",\"exprType\":\"COLUMN\"}],\"groupByColumns\":[],\"orderByColumns\":[],\"limit\":{\"limit\":10000,\"offset\":0}}","sqlSerializationContext":"{\"calendar\":\"StandardCalendar\"}"}
				})
				.then(function(cap_metrics_result) {
					var cap_num_weeks = _.mapValues(
						_.groupBy(cap_metrics_result.data.rows.map(function(row){return {'CAP #': row[0], 'Week': row[20]};}), 'CAP #'),
						function(cap_weeks_array) {
							return _.uniq(cap_weeks_array.map(function(item){return item.Week;}));
						}
					);

					the_data.metrics = _.toPairs(_.groupBy(cap_metrics_result.data.rows.map(function(row) {
						return {
							"CAP #": row[0],
							"Deficiency": row[1],
							"Monitored by Whom": row[2],
							"Monitoring Methodology": row[3],
							"Monitoring Period Start": row[4] ? new Date(row[4]) : '',
							"Monitoring Period End": row[5] ? new Date(row[5]) : '',
							"Universe Size": row[6],
							"Sample Size": row[7],
							"Processed Correctly": row[8],
							"Processed Incorrectly": row[9],
							"Error Rate": row[10],
							"Root Cause of Errors": row[11],
							"Members Impacted": row[12],
							"Remediation Efforts": row[13],
							"Additional notes": row[14],
							"Universe Scope": row[15],
							"Sample Size description": row[16],
							"Total DE potential": row[17],
							"DE's included in Data": row[18],
							"Date 100% expected": row[19] ? new Date(row[19]) : '',
							"Week": row[20],
							"Most Recent Week": _.max(cap_num_weeks[row[0]]),
							"Short Term Target Error Rate": row[21],
							"Steady State Target Error Rate": row[22],
							"Last Modified": row[23],
							"Updated By": row[24]
						};
					}), function(item){return item['CAP #'] + item.Week;}))
					.map(function(pair_item) {
						var the_grouping_list = pair_item[1];
						return _.maxBy(the_grouping_list, function(item){return item['Last Modified'];});
					});
					return $http({
						url: AppHost + '/api/data/v2/datasources/081e2562-8975-4bb7-b624-669ae4b652df/data',
						method: 'POST',
						headers: {
							'Content-Type': 'application/json; charset=UTF-8'
						},
						data: {"dataQuery":"{\"columns\":[{\"column\":\"CAP #\",\"exprType\":\"COLUMN\"},{\"column\":\"Deficiency\",\"exprType\":\"COLUMN\"},{\"column\":\"CAP Task\",\"exprType\":\"COLUMN\"},{\"column\":\"Delivery Date\",\"exprType\":\"COLUMN\"},{\"column\":\"Status\",\"exprType\":\"COLUMN\"},{\"column\":\"Reason for change (if applicable)\",\"exprType\":\"COLUMN\"},{\"column\":\"Week\",\"exprType\":\"COLUMN\"},{\"column\":\"Most recent week\",\"exprType\":\"COLUMN\"},{\"column\":\"Last Updated\",\"exprType\":\"COLUMN\"},{\"column\":\"Updated By\",\"exprType\":\"COLUMN\"}],\"groupByColumns\":[],\"orderByColumns\":[],\"limit\":{\"limit\":10000,\"offset\":0}}","sqlSerializationContext":"{\"calendar\":\"StandardCalendar\"}"}
					});
				})
				.then(function(cap_tasks_result) {
					the_data.tasks = _.toPairs(_.groupBy(cap_tasks_result.data.rows.map(function(row) {
						return {
							'CAP #': row[0],
							'Deficiency': row[1],
							'CAP Task': row[2],
							'Delivery Date': row[3] ? new Date(row[3]) : '',
							'Status': row[4],
							'Reason for change (if applicable)': row[5],
							'Week': row[6],
							'Most recent week': row[7],
							'SortOrder': row[8],
							'Last Updated': row[9],
							'Updated By': row[10]
						};
					}), function(item){return item['CAP #'] + item.Week + item['CAP Task'];}))
					.map(function(pair_item) {
						var the_grouping_list = pair_item[1];
						return _.maxBy(the_grouping_list, function(item){return item['Last Updated'];});
					});

					// Get whitelisted CAPs
					return $http({
						url: AppHost + '/api/data/v2/datasources/c7fd3aa5-93c0-4aae-8ba1-116ead80dcee/data',
						method: 'POST',
						headers: {
							'Content-Type': 'application/json; charset=UTF-8'
						},
						data: {"dataQuery":"{\"columns\":[{\"column\":\"CAP Number\",\"exprType\":\"COLUMN\"}],\"groupByColumns\":[],\"orderByColumns\":[],\"limit\":{\"limit\":10000,\"offset\":0}}","sqlSerializationContext":"{\"calendar\":\"StandardCalendar\"}"}
					});
				})
				.then(function(response) {
					var good_caps = response.data.rows.map(function(item){return item[0];});
					// Map the returned data into a good format, extend it with the tasks, and only return the whitelisted CAPs
					the_data.all_data = the_data.metrics.map(function(metric, index) {
						// Add in the tasks data for each CAP item
						metric['DE\'s included in Data'] = Number(metric['DE\'s included in Data']);
						metric['Total DE potential'] = Number(metric['Total DE potential']);
						metric.Tasks = the_data.tasks.filter(function(task, index) {
							return task['CAP #'] == metric['CAP #'] && 
									 task.Week == metric.Week;
						});

						// Groom the CAP #
						metric['CAP #'] = (metric['CAP #']+'').split(' ')[0];

						// Determine the status of each CAP item
						var target_rate = metric['Short Term Target Error Rate'] || 0.05;
						metric.Status = (metric['Error Rate'] !== undefined && metric['Error Rate'] !== '') ? (metric['Error Rate'] <= target_rate ? 'Green' : 'Red') : 'Yellow';

						return metric;
					})
					.filter(function(item){return good_caps.indexOf(item['CAP #']) > -1;});

					// Notify controllers that data is available
					$rootScope.$broadcast('Data:initial', the_data.all_data);
				});
			}
			else {
				// Promisify return of cached data to simplify API for controllers
				var deferred = $q.defer();
				deferred.resolve(the_data.all_data);
				return deferred.promise;
			}
		};

		the_data.getAllData();
		return the_data;
	}

	app
	.config(Config)
	.run(Templates)
	.constant('AppHost', 'https://cigna.domo.com')
	.constant('_', _)
	.directive('sidebar', ['$document', sidebar])
	.controller('SidebarController', ['$rootScope', '$state', 'Data', SidebarController])
	.directive('domoDropdown', ['$document', domoDropdown])
	.controller('domoDropdownController', [domoDropdownController])
	.directive('clickOutside', ['$document', '$parse', '$timeout', clickOutside])
	.filter('categoryFilter', ['_', categoryFilter])
	.filter('weekFilter', [weekFilter])
	.controller('DeficiencySummaryController', ['$timeout', '$rootScope', '$state', '$stateParams', 'Data', '_', DeficiencySummaryController])
	.controller('DeficiencyDetailsController', ['$rootScope', '$scope', '$state', '$stateParams', '$q', '$uibModal', '$timeout', '_', 'Data', DeficiencyDetailsController])
	.controller('ConfirmModalController', ['$uibModalInstance', ConfirmModalController])
	.directive('percentageInput', [percentageInput])
	.factory('Data', ['$http', '$q', '$rootScope', 'AppHost', Data]);
})(angular.module('cmsEntry',['ui.router','ui.bootstrap','ngAnimate']));
