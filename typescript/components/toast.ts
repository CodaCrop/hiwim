namespace TMNL {
    export class Toast {
        public static SELECTOR: any = {
            BACKDROP: '[data-toast-backdrop]',
            CONTAINER: '[data-toast-container]',
            TOAST_LIST: '[data-toast-list]',
            TOAST: '[data-toast]',
            CLOSE_BUTTON: '[data-toast-close]'
        };

        public static DEFAULTS = {
            timer: 10000,
            position: 'top',
            containerTemplate: '<div class="toast-container" data-toast-container></div>',
            backdropTemplate: '<div class="toast-backdrop" data-toast-backdrop></div>',
            toastListTemplate: '<ul class="toast-list" data-toast-list></ul>',
            toastTemplate: '<li class="toast" data-toast><button class="toast-close" data-toast-close></button>{0}</li>'
        }

        private static instance: Toast;

        private popper: any;
        private toastId: number;
        private timeouts: any[];

        public static message(settings: any) {
            if (settings.content) {
                if (!Toast.instance) {
                    Toast.instance = new Toast();
                    Toast.instance.toastId = 0;
                    Toast.instance.timeouts = [];

                    $(document).on('click', Toast.SELECTOR.CLOSE_BUTTON, (event) => {
                        Toast.instance.removeToast($(event.target).parent().attr('id'));
                        clearTimeout(Toast.instance.timeouts[$(event.target).parent().attr('id')]);
                        $(event.target).parent().data('tmnl.toast.timeout', null);
                    });
                }

                Toast.instance.toastId++;

                if($(Toast.SELECTOR.CONTAINER).length === 0) {
                    Toast.instance.createContainer();
                }

                if (settings.fullscreen) {
                    $(Toast.SELECTOR.CONTAINER).addClass('full-height');
                } else {
                    $(Toast.SELECTOR.CONTAINER).removeClass('full-height');
                }

                if (settings.backdrop) {
                    if ($(Toast.SELECTOR.BACKDROP).length === 0) {
                        Toast.instance.addBackdrop();
                    }
                } else {
                    $(Toast.SELECTOR.BACKDROP).remove();
                }

                var $toast = $(Toast.DEFAULTS.toastTemplate.replace('{0}', settings.content));
                $toast.attr("id","toast_" + Toast.instance.toastId);

                $(Toast.SELECTOR.TOAST_LIST).append($toast);
                if (typeof Toast.instance.popper === 'undefined' || Toast.instance.popper === null) {
                    Toast.instance.popper = new Popper($(Toast.SELECTOR.CONTAINER)[0], $(Toast.SELECTOR.TOAST_LIST)[0], {
                        placement: 'top',
                        modifiers: {
                            inner: {
                                enabled: true
                            },
                            preventOverflow: {
                                padding: 0
                            }
                        }
                    });
                }

                if (settings.position) {
                    Toast.instance.popper.options.placement = settings.position;
                }

                Toast.instance.popper.update();
                Toast.instance.createTimeout($toast);
            }
        }

        private createContainer() {
            $(document.body).append(Toast.DEFAULTS.containerTemplate);
            $(Toast.SELECTOR.CONTAINER).append(Toast.DEFAULTS.toastListTemplate);
            $(Toast.SELECTOR.TOAST_LIST).addClass('show');
        }

        private addBackdrop() {
            $(Toast.SELECTOR.CONTAINER).append(Toast.DEFAULTS.backdropTemplate);
        }

        private createTimeout($element:JQuery) {
            Toast.instance.timeouts[$element.attr('id')] = setTimeout(function(){
                Toast.instance.removeToast($element.attr('id'));
            }, Toast.DEFAULTS.timer);

            $element.data('tmnl.toast.timeout', Toast.instance.timeouts[$element.attr('id')]);
        }

        private removeToast(id) {
            if($(Toast.SELECTOR.TOAST).length === 1) {
                $(Toast.SELECTOR.CONTAINER).remove();
                Toast.instance.popper.destroy();
                Toast.instance.popper = null;
            }
            else {
                $('#' + id).remove();
                Toast.instance.popper.update();
            }
        }
    }
}