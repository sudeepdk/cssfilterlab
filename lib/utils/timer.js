/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
	
	function Timer(timeout) {
		Timer.super.call(this);
		this.timeout = timeout;
		this.args = null;
		this.timer = null;
		this.timerCallback = this.onTimerFired.bind(this);
	}

	Global.Utils.extend(Timer).from(Global.EventDispatcher);

	$.extend(Timer.prototype, {
		invoke: function(args) {
			this.args = args;
			this.clearTimer();
			this.installTimer();
			console.log("installing timer");
		},

		clearTimer: function() {
			clearTimeout(this.timer);
			this.timer = null;
		},

		installTimer: function() {
			this.timer = setTimeout(this.timerCallback, this.timeout);
		},

		onTimerFired: function() {
			this.timer = null;
			console.log("timer fired");
			this.fire("timerFired", this.args);
		}
	});

	Global.Timer = Timer;

})();