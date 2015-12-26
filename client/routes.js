Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return Meteor.subscribe('hikes');
    },
});

Router.route('/', {name: 'home'});


Router.route('/profile/:_id?', {
    name: 'userprofileView',
    onBeforeAction: function () {
        if (!Meteor.user()) {
            Router.go('userregistrationView');
        } else {
            this.next();
        }
    },
    data: function(){
        if(this.params._id){
            return Meteor.users.findOne({_id: this.params._id});
        }
        return Meteor.user();
    }, waitOn: function () {
        return Meteor.subscribe("userData");
    },
});
Router.route('/andrew', {name: 'sensey'});
Router.route('/login', {
    name: 'userloginView', onBeforeAction: function () {
        if (Meteor.user()) {
            Router.go('userprofileView');
        } else {
            this.next();
        }
    }
});
Router.route('/hikes_list', {name: 'hikeslistView'});

Router.route('/registration', {
    name: 'userregistrationView', onBeforeAction: function () {
        if (Meteor.user()) {
            Router.go('userprofileView');
        } else {
            this.next();
        }
    }
});
Router.route('/submit', {
    name: 'hikesubmitView', onBeforeAction: function () {
        if (!Meteor.user()) {
            Router.go('userregistrationView');
        } else {
            this.next();
        }
    }
});
Router.route('/hike/:_id', {
    name: 'hikepreviewView',
    data: function () {
        return Hikes.findOne({
            _id: this.params._id
        });
    },
    waitOn: function () {
        return Meteor.subscribe('hikes');
    },
});

Router.route('/guides', {
    name: 'guidesView', onBeforeAction: function () {
        if (!Meteor.user()) {
            Router.go('userregistrationView');
        } else {
            this.next();
        }
    }
});



