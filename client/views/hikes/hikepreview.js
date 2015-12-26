Meteor.subscribe("userData");
Template.hikepreviewView.helpers({
    hike: function () {
        return this
    },
    moment: function (unix) {
        Session.set('hike', this);
        return moment(unix, 'X').format("DD MMM YYYY");
    },
    defaultPic: function(image){
        return image || '/images/backhike.jpg';
    },
    isNotOwner: function(){
        return Meteor.user()._id !== this.owner;
    },
    notInHike: function () {
        if(this.people){
            var peoples = this.people;
            return !_.find(peoples, function(e){
                return e ===  Meteor.userId();
            });
        }
        return true;
    },
    enoughPeople: function () {
        if(this.people){
            // console.log(this.people.length+1 < parseInt(this.partnerHike) );
            return this.people.length+1 < parseInt(this.partnerHike) ;
        }
        return true;
    },
    hikePeople: function () {
        var peoples = this.people || [];

        return Meteor.users.find({_id: { $in: peoples}});
    },
    hikeOwner: function(){
        return Meteor.users.findOne({_id: this.owner});
    }
});

Template.hikepreviewView.events({
    'click .hikeslistView': function(){
        Router.go('hikeslistView');
    },
    'click .join': function () {
        Meteor.call('join', this);
    },
    'click .leave': function () {
        if(confirm('Ви дійсно хочете покинути похід?')){
            Meteor.call('leave', this);
        }
    },
});

