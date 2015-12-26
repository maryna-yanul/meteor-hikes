Template.hikesubmitView.helpers({});

Template.hikesubmitView.events({
    'submit form': function (e) {
        e.preventDefault();
        var invalid = [];
        var post = {
            nameHike: $(e.target).find('[name=nameHike]').val(),
            dateHike: moment($(e.target).find('[name=dateHike]').val(), 'DD MMM YYYY').unix(),
            dateHikeEnd: moment($(e.target).find('[name=dateHikeEnd]').val(), 'DD MMM YYYY').unix(),
            partnerHike: parseInt($(e.target).find('[name=partnerHike]').val()),
            timeHike: $(e.target).find('[name=timeHike]').val(),
            distanceHike: parseInt($(e.target).find('[name=distanceHike]').val()),
            contentHike: $(e.target).find('[name=contentHike]').val(),
            owner: Meteor.userId(),
            positions: Session.get('positions'),
            image: Session.get('picture') || false,
        };
        //$(e.target).find('input[type=text]').each(function (e) {
        //    if ($(this).val().length === 0) {
        //        invalid.push($(this));
        //    }
        //})
        invalid.length === 0 && $('.point-name').length > 1 ? Router.go('/hike/' + Hikes.insert(post)) : alert("Виберіть на карті маршрут(більше ніж з одного пунку)");
    },
    'click .dropZone': function (e) {
        e.preventDefault();
        $('#hikePhoto').trigger('click');
    },
    'change #hikePhoto': function (event) {
        "use strict";
        var input = event.target;
        processImage(input.files);
    },
    'dragover .dropZone': function (e) {
        "use strict";
        //if ($('.blue-release-file').is(':not(:visible)') && e.target.className === 'row') {
        //    $('.blue-release-file').show();
        //}
        $('.dropZone').css({'-webkit-filter': 'brightness(50%)', 'filter': 'brightness(50%)'});
        e.preventDefault();
        e.stopPropagation();
    },
    'dragleave .dropZone': function (e) {
        "use strict";
        e.preventDefault();
        e.stopPropagation();
        $('.dropZone').removeAttr('style');
    },
    'drop .dropZone': function (e) {
        $('.dropZone').removeAttr('style');
        e.preventDefault();
        e.stopPropagation();
        if (e.originalEvent.dataTransfer) {
            var dt = e.originalEvent.dataTransfer;
            var files = dt.files;
            if (files.length > 0) {
                processImage(files);
            }
        }
    }
});
function processImage(files) {
    if (files.length > 0) {
        var reader = new FileReader();
        reader.onload = function () {
            var dataURL = reader.result;
            // console.log(dataURL);
            $('.dropZone').css('background-image', "url('"+dataURL+"')");
            Session.set('picture', dataURL);
        };
        reader.readAsDataURL(files[0]);

    }
}

Template.hikesubmitView.onRendered(function () {
    $(document).ready(function () {
        $('#edit').froalaEditor();
    });
});

