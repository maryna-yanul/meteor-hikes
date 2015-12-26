Hikes.allow({
    insert: function (userId, party) {
        return !!(userId == party.owner && Meteor.userId() === party.owner);
    },
    update: function (userId, party) {
        return userId === Meteor.userId();
    }
});
// var dateToSec = function (string) {
//     return Math.floor(new Date(string) / 1000) || 0;
// }
Meteor.methods({
    searchHikes: function (filter) {
        var fields = {};
        if (filter.dateHike0 || filter.dateHike1) {
            fields.dateHike = {};
            if (filter.dateHike0) {
                fields.dateHike['$gte'] = filter.dateHike0;
            }
            if (filter.dateHike1) {
                fields.dateHike['$lte'] = filter.dateHike1;
            }
            console.log(filter.dateHike0, filter.dateHike1);
        }
        if (filter.distanceHike0 || filter.distanceHike1) {
            fields.distanceHike = {};
            if (filter.distanceHike0) {
                fields.distanceHike['$gte'] = parseInt(filter.distanceHike0);
            }
            if (filter.distanceHike1) {
                fields.distanceHike['$lte'] = parseInt(filter.distanceHike1);
            }
        }
        if (filter.partnerHike0 || filter.partnerHike1) {
            fields.partnerHike = {};
            if (filter.partnerHike0) {
                fields.partnerHike['$gte'] = parseInt(filter.partnerHike0);
            }
            if (filter.partnerHike1) {
                fields.partnerHike['$lte'] = parseInt(filter.partnerHike1);
            }
        }
        return Hikes.find(fields).fetch();
    },
    join: function (hike) {
        check(hike, Object);
        check(hike._id, String);
        var user = Meteor.userId();
        var target = Hikes.findOne({_id: hike._id});
        Hikes.update({_id: target._id}, {$addToSet: {people: user}})
    },
    leave: function (hike) {
        check(hike, Object);
        check(hike._id, String);
        var user = Meteor.userId();
        var target = Hikes.findOne({_id: hike._id});
        Hikes.update({_id: target._id}, {$pull: {people: user}})
    },
});