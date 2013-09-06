(function($) {
    $.fn.selectify = function(options) {
        
        var opts = $.extend( {}, $.fn.selectify.defaults, options );

        //
        // Make the HTML to mock the appearance of the select
        // 
        $('select').each( function() {
            var selectElement = $(this);

            // Create the Widget
            var createWidget = function() {
                var items = '';

                selectElement.find('option').each(function() {
                    var disabled = false;

                    if ($(this).attr('disabled') !== undefined) {
                        disabled = true;
                    }

                    items += '<li data-value="' + $(this).val() + '" data-disabled="' + disabled + '">' + $(this).text() + '</li>';
                });

                return '<ol style="display: none">' + items + '</ol>';
            };

            // Make the current Property
            var current = function() {
                var arrow = '<div class="' + opts.arrowContainer + '">' + opts.arrowCharacter + '</div>';
                return '<div class="' + opts.currentItem + '"><span>' + selectElement.find('option:selected').text() + '</span>' + arrow + '</div>';
            };

            selectElement.wrap('<div class="' + opts.containerDiv + '">').after( createWidget ).before( current ).hide();

            var width = opts.width;

            if ( selectElement.attr('data-width') ) {
                width = selectElement.attr('data-width');
            }

            selectElement.parent().css('width', width);
        });

        //
        // Capture all clicks made on opts.containerDiv ol li
        // 
        $('.' + opts.containerDiv + ' ol li').bind('click', function(e) {
            e.preventDefault();

            var widgetContainer = $(this).closest('.' + opts.containerDiv);
            var selectElement = widgetContainer.find('select');
            var olElement = widgetContainer.find('ol');
            var clickedValue = $(this).attr('data-value');
            var clickedText = $(this).html();

            if ($(this).attr('data-disabled') === "false") {
                selectElement.val( clickedValue );
                widgetContainer.find('.' + opts.currentItem + ' span').html( clickedText );
                olElement.slideToggle('fast', function() {
                    $(this).parent().removeClass('active');
                });
            }
        });

        //
        // Capture all clicks made on opts.current-item
        // 
        $('.' + opts.containerDiv + ' .' + opts.currentItem).bind('click', function(e) {
            var parent = $(this).parent();
            var ol = parent.find('ol');

            if ( ol.is(':visible') ) {
                e.stopPropagation();
                parent.removeClass('active').addClass('blurring');
                ol.slideToggle('fast', function() {
                    parent.removeClass('blurring');
                });
                $(document).unbind('click');
            } else {
                parent.addClass('active');
                ol.slideToggle('fast', function() {
                    $(document).one('click', function(e) {
                        if ( e.target.tagName !== "LI" ) {
                            parent.removeClass('active');
                            parent.addClass('blurring');
                            ol.slideToggle('fast', function() {
                                parent.removeClass('blurring').clearQueue();
                            });
                        }
                    });
                });
            }
        });
    };

    $.fn.selectify.defaults = {
        containerDiv: 'selectifyContainer',
        currentItem: 'currentItem',
        width: '250px',
        arrowContainer: 'arrowContainer',
        arrowCharacter: '\\/'
    };
}(jQuery));