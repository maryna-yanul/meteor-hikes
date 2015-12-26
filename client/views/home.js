Template.home.helpers({
  myAppVariable: function() {
    return Session.get('myAppVariable');
  }
});

Template.home.events({
  'click button': function(event, template) {
    Session.set('myAppVariable', Math.floor(Math.random() * 11));
  },
});
Template.home.onRendered(function (){
  $( document ).ready(function() {
    $('.parallax-window').parallax({imageSrc: '/images/bg1.jpg', positionY: 'top', speed: 0.5,});
    $('.parallax-footer').parallax({imageSrc: '/images/footer.jpg', positionY: 'top', speed: 0.5,});
  
    $('.js--scroll-down').click(function(ev){
          var section = $(this).attr('href'); 
    $('body').animate({scrollTop: $(section).offset().top
    },'slow');
    return false;
})
    
});
});
Template.home.onDestroyed(function (){
    $( document ).ready(function() {
        $('.parallax-mirror').remove();
    });
});