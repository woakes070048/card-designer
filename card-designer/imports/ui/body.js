import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import { initVal, dragerObject } from '../api/dragableObjects.js';
import './body.html';
 
Template.body.helpers({
	  tasks() {
		return Tasks.find({});
	  },
	  initVal(){
		return initVal;
	  }
});

Meteor.startup(function(){
	// Load Interactjs
	 $.getScript('//cdnjs.cloudflare.com/ajax/libs/interact.js/1.2.6/interact.min.js', function(){
		 dragerObject.createDragObject('container', 'check', 'dragable_rect');
		  // target elements with the "draggable" class
			interact('.draggable')
			  .draggable({
				// enable inertial throwing
				inertia: true,
				// keep the element within the area of it's parent
				restrict: {
				  restriction: "parent",
				  endOnly: true,
				  elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
				},
				// enable autoScroll
				autoScroll: true,

				// call this function on every dragmove event
				onmove: dragMoveListener,
				// call this function on every dragend event
				onend: function (event) {
				  var textEl = event.target.querySelector('p');

				  textEl && (textEl.textContent =
					'moved a distance of '
					+ (Math.sqrt(event.dx * event.dx +
								 event.dy * event.dy)|0) + 'px');
				}
			  });

			  function dragMoveListener (event) {
				var target = event.target,
					// keep the dragged position in the data-x/data-y attributes
					x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
					y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

				// translate the element
				target.style.webkitTransform =
				target.style.transform =
				  'translate(' + x + 'px, ' + y + 'px)';

				// update the posiion attributes
				target.setAttribute('data-x', x);
				target.setAttribute('data-y', y);
			  }

			  // this is used later in the resizing and gesture demos
			  window.dragMoveListener = dragMoveListener;
			  
			  // JS FOR MENU
			$("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
				e.preventDefault();
				$(this).siblings('a.active').removeClass("active");
				$(this).addClass("active");
				var index = $(this).index();
				$("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
				$("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
			});
			  
			  
			  
	 });
});