(function () {
    var key = 'save-editor-theme-v2';

    function readPreference() {
        try {
            var stored = localStorage.getItem(key);
            if (stored === '0' || stored === '1') return stored;
        } catch (e) { }
        return null;
    }

    function savePreference(value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) { }
        document.cookie = key + '=' + value + '; path=/; max-age=31536000; samesite=lax';
    }

    function applyTheme(isDark) {
        document.documentElement.classList.toggle('theme-dark', isDark);
        document.documentElement.classList.toggle('theme-light', !isDark);
        document.documentElement.style.setProperty('background', isDark ? '#0f172a' : '#f8fafc', 'important');
        document.body.style.setProperty('background', isDark ? '#0f172a' : '#f8fafc', 'important');
        document.body.style.setProperty('color', isDark ? '#e2e8f0' : '#172033', 'important');
    }

    function updateButton(button, isDark) {
        var icon = button.querySelector('#themeToggleIcon');
        if (icon) icon.textContent = isDark ? '☀' : '☾';
        button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        button.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
        button.setAttribute('title', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    }

    function init() {
        var button = document.getElementById('darkToggle');
        if (!button) return;

        var preference = readPreference();
        var isDark = preference === null || preference === '1';
        applyTheme(isDark);
        updateButton(button, isDark);

        button.addEventListener('click', function (event) {
            event.preventDefault();
            isDark = !isDark;
            savePreference(isDark ? '1' : '0');
            applyTheme(isDark);
            updateButton(button, isDark);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
