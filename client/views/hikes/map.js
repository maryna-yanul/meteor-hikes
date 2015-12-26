/**
 * Created by hmelenok on 23.12.15.
 */
Template.map.events({
    'click #remove-point': function (e) {
        var that = this;
        var clean = _.filter(Session.get('positions'), function (el,i) {
            if(that.label === el.label){
                removeMarker(i, map);
            }
            return that.label !== el.label;
        });

        Session.set('positions', clean);
    },
    'keyup .point-name': function(e){
        var that = this;
        var clean = _.filter(Session.get('positions'), function (el,i) {
            if(that.label === el.label){
                updateMarker(i, e.target.value);
                el.label = e.target.value;
            }
            return el;
        });
        Session.set('positions', clean);
        // console.log(e.target.value);

    }
});
Template.map.helpers({
    meters: function () {
        return Session.get('meters') || 0;
    },
    positions: function () {
        return Session.get('positions') || [];
    },
    coords: function (position) {
        // console.log(position);
        return position.lat + "," + position.lng;
    }
});