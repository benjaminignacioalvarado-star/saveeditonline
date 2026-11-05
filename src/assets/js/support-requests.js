(function ($) {
    'use strict';

    function message($box, name) {
        return $box.find('.js-ask-supporting-' + name).text();
    }

    function send($button) {
        if ($button.prop('disabled')) return;

        var $box = $button.closest('.js-ask-supporting');
        var $input = $box.find('.js-ask-supporting-game');
        var $error = $box.find('.js-ask-supporting-error');
        var gameName = $.trim($input.val() || '');
        var url = $box.attr('data-url');
        var buttonText = $button.text();

        if (!gameName) {
            $error.text(message($box, 'required')).show();
            $input.focus();
            return;
        }
        if (!url) {
            $error.text(message($box, 'failed')).show();
            return;
        }

        $error.hide().text('');
        $input.prop('disabled', true);
        $button.prop('disabled', true).text(message($box, 'sending'));

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'text',
            cache: false,
            data: {
                gameName: gameName,
                source: $box.attr('data-source'),
                failedSaveId: $box.attr('data-failed-save-id') || ''
            }
        }).done(function () {
            $box.replaceWith($('<strong>').text(message($box, 'thanks')));
        }).fail(function () {
            $input.prop('disabled', false);
            $button.prop('disabled', false).text(buttonText);
            $error.text(message($box, 'failed')).show();
        });
    }

    // Shared by full error pages and dynamically inserted editor partials.
    $(document).off('click.askSupporting', '.js-ask-supporting-submit')
        .on('click.askSupporting', '.js-ask-supporting-submit', function () {
            send($(this));
        });
    $(document).off('keydown.askSupporting', '.js-ask-supporting-game')
        .on('keydown.askSupporting', '.js-ask-supporting-game', function (event) {
            if (event.which === 13 || event.keyCode === 13) {
                event.preventDefault();
                $(this).closest('.js-ask-supporting').find('.js-ask-supporting-submit').trigger('click');
            }
        });
})(jQuery);
