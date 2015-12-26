Template.userloginView.helpers({

});

Template.userloginView.events({
    'submit form': function (e) {
        e.preventDefault();
        Meteor.loginWithPassword(e.target.loginEmail.value, e.target.loginPassword.value, function (err) {
            $('.error').text('');
            if(err){
                console.log(err, e.target.loginEmail, e.target.loginPassword);
                $('.error').text(err.reason);
            } else {
                Router.go('userprofileView');
            }
        });
    },
});
