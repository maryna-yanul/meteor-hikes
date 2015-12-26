Template.headerView.helpers({
    myHikes: function(){
        return Hikes.find({owner:Meteor.userId()}).count();
    },
    allHikes: function(){
        return Hikes.find().count();
    },
    profile: function(){
        if(Meteor.user()){
            return Meteor.user().profile;
        }
    },
    userGravatar: function () {
        if(Meteor.user()) {
            return Meteor.user().profile.picture;
        }
    },
});

Template.headerView.events({
    'click .exit': function(e){
        e.preventDefault();
        Meteor.logout(function () {
            Router.go('home')
        });
        $('#jasny-top > button').trigger('click');

    },
    'click .menu-exit': function(){
        $('#jasny-top > button').trigger('click');
    },
    'click .submit-hike': function(e){
        e.preventDefault();
        Router.go('hikesubmitView');
        $('#jasny-top > button').trigger('click');

    },
});

Template.home.onRendered(function (){

	$(".menu-notactive").click(function(){
    $(".menu-hamburger-active").slideToggle();
    });

    $(".glyphicon-remove").click(function(){
    $(".menu-hamburger-active").slideUp();
    });
  });