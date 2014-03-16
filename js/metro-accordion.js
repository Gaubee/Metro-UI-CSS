(function($) {
    $.widget("metro.accordion", {

        version: "1.0.0",

        options: {
            closeAny: true,
            open: function(frame) {},
            action: function(frame) {}
        },

        _frames: {},

        _create: function() {
            var element = this.element;

            if (element.data('closeany') != undefined) this.options.closeAny = element.data('closeany');

            this._frames = element.children(".accordion-frame");

            this.init();
        },

        init: function() {
            var that = this;

            that._frames.each(function() {
                var frame = this,
                    $frame = $(this),
                    frame = $frame[0],
                    a = $frame.children(".heading"),
                    content = $frame.children(".content");

                if ($(a).hasClass("active") && !$(a).attr('disabled') && $(a).data('action') != 'none') {
                    $(content).show();
                    $(a).removeClass("collapsed");
                } else {
                    $(a).addClass("collapsed");
                }
            });
            that.element.on("click", ".accordion-frame>.heading", function(e) {
                var heading = this,
                    $heading = $(heading),
                    $frame = $heading.parent(),
                    $content = $frame.children(".content");

                if ($heading.hasClass("active") && !$heading.attr('disabled') && $heading.data('action') != 'none') {
                    $content.show();
                    $heading.removeClass("collapsed");
                } else {
                    $heading.addClass("collapsed");
                }
                e.preventDefault();

                if ($heading.attr('disabled') || $heading.data('action') == 'none') return;

                if (that.options.closeAny) that._closeFrames();

                if ($content.is(":hidden")) {
                    $content.slideDown();
                    $heading.removeClass("collapsed");
                    that._trigger("frame", e, {
                        frame: frame
                    });
                    that.options.open(frame);
                } else {
                    $content.slideUp();
                    $heading.addClass("collapsed");
                }
                that.options.action(frame);
            });
        },

        _closeFrames: function() {
            this._frames.children(".content").slideUp().parent().children('.heading').addClass("collapsed");
        },

        _destroy: function() {},

        _setOption: function(key, value) {
            this._super('_setOption', key, value);
        }
    })
})(jQuery);
