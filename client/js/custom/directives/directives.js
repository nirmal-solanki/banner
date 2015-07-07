app.directive('loadMasterSliderDirective', function(API_URL) {
    return function(scope, element, attrs) {
        var parts = scope.bannerItem.image.split(".");
        var extension = parts[1];
        if(extension == "jpg" || extension =="png"){
            element.append('<img src="'+API_URL+'containers/container2/download/'+scope.bannerItem.image+'" alt="'+scope.bannerItem.image+'"/>');
        }else{
            var html = '';
            html += '<video data-autopause="false" data-mute="true" data-loop="true" data-fill-mode="fill">';
            html += '   <source id="mp4" src="'+API_URL+'containers/container2/download/'+scope.bannerItem.image+'" type="video/mp4"/>';
            html +='</video>';
            element.append(html);
        }

        if (scope.$last){
            var slider = new MasterSlider();
            // adds Arrows navigation control to the slider.
            slider.control('arrows');
            slider.control('bullets');
            slider.setup('masterSlider' , {
                width:$(window).width(),
                height:600,
                space:5,
                view:'basic',
                /*layout:'fullscreen',*/
                autoplay:'true',
                delay:10000,
                fullscreenMargin:0,
                speed:20
                // more slider options goes here...
                // check slider options section in documentation for more options.
            });
        }
    };
});
app.directive("viewByFileExtension", function(API_URL){
    return{
        restrict: "EA",
        scope:{
            fileName: "="
        },
        link: function (scope, element, attr) {
            scope.$watch('fileName',function(newVal,oldVal){
                if(newVal){
                    var parts = newVal.split(".");
                    var extension = parts[1];
                    if(extension == "jpg" || extension =="png"){
                        element.html('<img class="img-responsive" src="'+API_URL+'containers/container2/download/'+newVal+'"/>');
                    }else{
                        var html = '';
                        html += '<video controls class="img-responsive" data-mute="false">';
                        html += '   <source id="mp4" src="'+API_URL+'containers/container2/download/'+newVal+'" type="video/mp4"/>';
                        html +='</video>';
                        element.html(html);
                    }
                }
            });

        }
    }
});