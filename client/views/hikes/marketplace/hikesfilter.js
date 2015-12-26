Template.hikesfilterView.helpers({

});
function filterCall(){
			var $form = $('#filter');
		var filterY = {
			dateHike0: moment($form.find('[name=dateStart]').val(), "DD MMM YYYY").unix() ,
			dateHike1:moment($form.find('[name=dateEnd]').val(), "DD MMM YYYY").unix(),
			distanceHike0: $form.find('[name=distanceStart]').val(),
			distanceHike1:$form.find('[name=distanceEnd]').val(),
			partnerHike0: $form.find('[name=partnerStart]').val(), 
			partnerHike1:$form.find('[name=partnerEnd]').val(),
			nameHike: $form.find('[name=search]').val(),

		}
		
			if(_.values(filterY || {}).filter(function(e){ return e !== '' }).length > 0){
			 Meteor.call('searchHikes',filterY, function (err, res) {
			 	// console.log(res);
			 	// if(res.length > 0){
					Session.set('filtered', res);
			 	// } else {
			 		// Session.set('filtered', false);
			 	// }
			});

			}
}
Template.hikesfilterView.events({
	'keyup .filter-field': function(e){
		filterCall();
	},
	'change .filter-field': function(e){
		filterCall();
	},
	'keyup #search': function (e) {

		if(e.target.value && e.target.value !== ''){
			// console.log('start search');

			var cursor = HikesIndex.search(e.target.value);

			if(cursor.count() > 0){
			 		Session.set('filtered', cursor.fetch());
			 }
			 else{
			 	Session.set('filtered', []);
			 }
		}
	}, 
	'click input[type=reset]': function (e) {
		Session.set('filtered', false);
	}
});	