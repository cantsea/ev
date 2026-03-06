window.mapHelper = {
    panzoomInstances: {},
    initPanzoom: function (wrapperId, elementId) {
        const el = document.getElementById(elementId);
        if (!el) return;
        if (window.mapHelper.panzoomInstances[wrapperId]) {
            window.mapHelper.panzoomInstances[wrapperId].instance.destroy();
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
        window.mapHelper.panzoomInstances[wrapperId] = { instance, el };
    },
    resetZoom: function (wrapperId) {
        const entry = window.mapHelper.panzoomInstances[wrapperId];
        if (entry) {
            entry.instance.reset();
            entry.el.style.setProperty('--marker-scale', 1);
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