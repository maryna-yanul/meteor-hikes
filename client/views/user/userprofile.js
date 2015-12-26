moment.locale('uk');
Template.userprofileView.helpers({
    userHikes: function () {
        if(Hikes.find({owner: this._id}).count() < 1){
            return false;
        }
        return Hikes.find({owner: this._id});
    },
    userParticipationHikes: function () {
        if(Hikes.find({people: {$in: [this._id]}}).count() < 1){
            return false;
        }
        return Hikes.find({people: {$in: [this._id]}});
    },
    moment: function (unix) {
        return moment(unix, 'X').format("DD MMM YYYY");
    },
    profile: function () {
        if (Meteor.user()) {
            return this.profile;
        }
    },
    userGravatar: function () {
        if (Meteor.user()) {
            return this.profile.picture;
        }
    },
    editProfile: function () {
        return Session.get('editProfile') || false;
    },
    curentProfile: function() {
        return Meteor.userId() == this._id
    },
});

Template.userprofileView.events({
    'click .hike': function (e) {
        Router.go('hikepreviewView', this);
    },
    'click .button-settings-profile': function (e) {
        e.preventDefault();
        Session.set('editProfile', true);
    },
    'click .button-settings-save': function (e) {
        e.preventDefault();
        var data = {};
        data.username = Meteor.user().profile.username;
        data.picture = Meteor.user().profile.picture;
        Session.set('editProfile', false);
        $('.fr-box').remove();
        $('input,textarea').each(function (e) {
            data[$(this).attr('name')] = $(this).val();
        });
        Meteor.users.update(Meteor.userId(), {$set: {profile: data}});
    },
    'click .button-hike-new': function () {
        Router.go('hikesubmitView');
    }

});
Tracker.autorun(function () {
    if (Session.get('editProfile')) {
        Meteor.setTimeout(function () {
            $('#edit').froalaEditor();
        }, 500);

    }

});
Template.userprofileView.onRendered(function () {
    $(document).ready(function () {
        $('#edit').froalaEditor();
    });
});
