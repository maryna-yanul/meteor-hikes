moment.locale('uk');
Template.hikeslistView.helpers({
	hikes: function () {
		return Session.get('filtered') || Hikes.find();
	},
	userHikes: function(owner){
		return owner === Meteor.userId();
	},
    moment: function(unix){
        // console.log(unix);
        return moment(unix, 'X').format("DD MMM YYYY");
    },
    defaultPic: function(image){
        return image || '/images/backhike.jpg';
    },
});
Template.hikeslistView.events({
    'click .hike': function(e){
        Router.go('hikepreviewView', this);
    },
    'click .submit-hike': function(e){
        e.preventDefault();
        Router.go('hikesubmitView');
    },
});