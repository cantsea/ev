window.mapHelper = {
    panzoomInstances: {},
    initPanzoom: function (wrapperId, elementId) {
        const el = document.getElementById(elementId);
        if (!el) return;
        if (window.mapHelper.panzoomInstances[wrapperId]) {
            window.mapHelper.panzoomInstances[wrapperId].destroy();
        }
        const instance = Panzoom(el, {
            maxScale: 8,
            minScale: 1,
            contain: 'outside',
            cursor: 'grab'
        });
        el.parentElement.addEventListener('wheel', instance.zoomWithWheel);

        el.addEventListener('panzoomzoom', (e) => {
            el.style.setProperty('--marker-scale', 1 / e.detail.scale);
        });

        window.mapHelper.panzoomInstances[wrapperId] = instance;
    },
    resetZoom: function (wrapperId) {
        const instance = window.mapHelper.panzoomInstances[wrapperId];
        if (instance) {
            instance.reset();
            instance.getElements()[0]?.style.setProperty('--marker-scale', 1);
        }
    },
    getClickPercentage: function (element, clientX, clientY) {
        const rect = element.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        return {
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y))
        };
    }
};