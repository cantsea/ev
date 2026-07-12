window.mapHelper = {
    panzoomInstances: {},
    initPanzoom: function (wrapperId, elementId) {
        const el = document.getElementById(elementId);
        if (!el) return;
        window.mapHelper.destroyPanzoom(wrapperId);
        const instance = Panzoom(el, {
            maxScale: 8,
            minScale: 1,
            contain: 'outside',
            cursor: 'grab'
        });
        const wheelHandler = instance.zoomWithWheel;
        const zoomHandler = (e) => {
            el.style.setProperty('--marker-scale', 1 / e.detail.scale);
        };
        el.parentElement?.addEventListener('wheel', wheelHandler);
        el.addEventListener('panzoomzoom', zoomHandler);
        window.mapHelper.panzoomInstances[wrapperId] = { instance, el, wheelHandler, zoomHandler };
    },
    destroyPanzoom: function (wrapperId) {
        const entry = window.mapHelper.panzoomInstances[wrapperId];
        if (!entry) return;
        entry.el.parentElement?.removeEventListener('wheel', entry.wheelHandler);
        entry.el.removeEventListener('panzoomzoom', entry.zoomHandler);
        entry.instance.destroy();
        delete window.mapHelper.panzoomInstances[wrapperId];
    },
    resetZoom: function (wrapperId) {
        const entry = window.mapHelper.panzoomInstances[wrapperId];
        if (entry) {
            entry.instance.reset();
            entry.el.style.setProperty('--marker-scale', 1);
        }
    },
    zoomIn: function (wrapperId) {
        const entry = window.mapHelper.panzoomInstances[wrapperId];
        if (entry) {
            entry.instance.zoomIn();
        }
    },
    zoomOut: function (wrapperId) {
        const entry = window.mapHelper.panzoomInstances[wrapperId];
        if (entry) {
            entry.instance.zoomOut();
        }
    },
    getClickPercentage: function (element, clientX, clientY) {
        const img = element.querySelector('img');
        const rect = img ? img.getBoundingClientRect() : element.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        return {
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y))
        };
    }
};
