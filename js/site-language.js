(() => {
    const chinese = /^\/zh(?:\/|$)/.test(window.location.pathname);
    const languageLinks = {
        '/': '/zh/',
        '/research/': '/zh/research/',
        '/news/': '/zh/news/',
        '/publications/': '/zh/publications/',
        '/cv/': '/zh/cv/'
    };

    const normalizePath = path => path.endsWith('/') ? path : `${path}/`;
    const currentPath = normalizePath(window.location.pathname);
    const englishPath = chinese ? currentPath.replace(/^\/zh/, '') || '/' : currentPath;
    const translatedDetailPath = englishPath.startsWith('/news/') ? `/zh${englishPath}` : null;
    const otherLanguagePath = chinese
        ? englishPath
        : (languageLinks[englishPath] || translatedDetailPath || '/zh/');

    document.documentElement.lang = chinese ? 'zh-CN' : 'en';

    const navbar = document.querySelector('.navbar-main');
    if (!navbar) return;

    const brand = navbar.querySelector('.navbar-logo');
    if (brand) {
        brand.href = chinese ? '/zh/' : '/';
        brand.textContent = chinese ? '陈天舒' : 'Tianshu Chen';
    }

    if (chinese) {
        const labels = {
            '/research/': '研究方向',
            '/news/': '学术动态',
            '/publications/': '学术成果',
            '/files/Tianshu.Chen_CV.pdf': '简历'
        };
        navbar.querySelectorAll('.navbar-start .navbar-item').forEach(link => {
            const rawPath = new URL(link.href).pathname;
            const path = rawPath.endsWith('.pdf') ? rawPath : normalizePath(rawPath);
            link.textContent = labels[path] || link.textContent;
            if (path !== '/files/Tianshu.Chen_CV.pdf') {
                link.href = `/zh${path}`;
            }
        });
    }

    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    const current = document.createElement('span');
    current.className = 'language-current';
    current.textContent = chinese ? '中文' : 'English';
    const separator = document.createElement('span');
    separator.className = 'language-separator';
    separator.textContent = '|';
    const toggle = document.createElement('a');
    toggle.className = 'language-toggle';
    toggle.href = otherLanguagePath;
    toggle.lang = chinese ? 'en' : 'zh-CN';
    toggle.textContent = chinese ? 'English' : '中文';
    switcher.append(current, separator, toggle);
    navbar.before(switcher);

    if (!document.getElementById('language-switcher-style')) {
        const style = document.createElement('style');
        style.id = 'language-switcher-style';
        style.textContent = `
            .language-switcher {
                align-items: center;
                display: flex;
                position: absolute;
                top: 0.35rem;
                right: 1.5rem;
                z-index: 10;
                padding: 0.28rem 0.55rem;
                border: 1px solid #c5d0d7;
                border-radius: 4px;
                background: #fff;
                color: #687781;
                font-size: 0.84rem;
                letter-spacing: 0.02em;
            }
            body { position: relative; }
            .navbar-main { margin-top: 1.75rem; }
            .navbar-main .navbar-item.is-active {
                color: #396c90;
                font-weight: 600;
            }
            .article .content h2 { color: #396c90; }
            .language-current { color: #7a8790; }
            .language-separator { margin: 0 0.45rem; color: #b2bbc0; }
            .language-toggle { color: #396c90; text-decoration: none; }
            .language-toggle:hover { color: #1f4d6d; text-decoration: underline; }
            @media screen and (max-width: 768px) {
                .language-switcher { right: 1rem; }
            }
        `;
        document.head.append(style);
    }
})();
