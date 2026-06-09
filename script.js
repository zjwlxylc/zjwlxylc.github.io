/**
 * 知行个人主页 - JavaScript
 */

// 配置文件
const CONFIG = {
  basic: {
    name: "知行",
    title: "AI 工程化实践者 & 全栈开发者",
    location: "中国，宁波",
  },

  contact: {
    wechatId: "zjwlxylc",
    contactText: "期待与同频的人交流连接！",
    email: "20893788@qq.com",
    github: "https://github.com/zjwlxylc",
  },

  about: {
    content: "信奉「知行合一」，在技术实践中修心，在持续学习中进化。擅长 AI 工程化落地、全栈开发与自动化运维，热衷将复杂技术转化为可复用的 Skill 和工具。当前专注于 AI Agent 工作流编排、个人知识体系构建，以及用技术驱动认知升级。相信每一段代码都是修行，每一次实践都是觉知。"
  },

  products: {
    comingSoon: false,
    productsList: [
      {
        name: "Skill Creator",
        desc: "AI Skill 创建与优化工具，基于实战方法论",
        icon: "fas fa-magic",
        color: "linear-gradient(135deg, #6366f1, #4f46e5)",
        url: "https://github.com/zjwlxylc"
      },
      {
        name: "慧行人生观察",
        desc: "全貌人生观察系统，投资·修行·关系多维度",
        icon: "fas fa-yin-yang",
        color: "linear-gradient(135deg, #a78bfa, #7c3aed)",
        url: "https://github.com/zjwlxylc"
      },
      {
        name: "Pages Deploy",
        desc: "静态网站修改后一键自动部署",
        icon: "fas fa-rocket",
        color: "linear-gradient(135deg, #22d3ee, #06b6d4)",
        url: "https://github.com/zjwlxylc"
      },
      {
        name: "绩效计算器",
        desc: "咨询部/护理部绩效工资自动化计算",
        icon: "fas fa-calculator",
        color: "linear-gradient(135deg, #f59e0b, #d97706)",
        url: "https://github.com/zjwlxylc"
      }
    ]
  },

  copyright: {
    year: "2025 - 2026",
    name: "知行",
    url: "https://zjwlxylc.github.io"
  }
};

// 工具函数
function debounce(func, wait, immediate = false) {
    let timeout;
    return function(...args) {
        const context = this;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function detectDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent);
    const isDesktop = !isMobile && !isTablet;
    return { isMobile, isTablet, isDesktop };
}

function copyToClipboard(text) {
    return new Promise((resolve, reject) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => resolve(true)).catch(err => reject(err));
        } else {
            try {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                resolve(true);
            } catch (err) { reject(err); }
        }
    });
}

// 应用配置
function applyConfig() {
    try {
        applyBasicInfo();
        applyContactInfo();
        applyAboutInfo();
        applyCopyrightInfo();
        applyProductsInfo();
    } catch (error) {
        console.error('应用配置出错:', error);
    }
}

function applyBasicInfo() {
    const nameElement = document.querySelector('.profile h1');
    if (nameElement) nameElement.textContent = CONFIG.basic.name;

    const titleElement = document.querySelector('.profile .title');
    if (titleElement) {
        titleElement.innerHTML = `<i class="fas fa-brain"></i>${CONFIG.basic.title}`;
    }

    const locationElement = document.querySelector('.location span');
    if (locationElement) locationElement.textContent = CONFIG.basic.location;
}

function applyContactInfo() {
    const contactTextElement = document.querySelector('.contact-text p');
    if (contactTextElement) contactTextElement.textContent = CONFIG.contact.contactText;
}

function applyAboutInfo() {
    const aboutContentElement = document.querySelector('.about-widget .widget-content p');
    if (aboutContentElement) aboutContentElement.textContent = CONFIG.about.content;
}

function applyCopyrightInfo() {
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        copyrightElement.innerHTML = `
            <span class="year">${CONFIG.copyright.year}</span> ©
            <a href="${CONFIG.copyright.url}" target="_blank">
                <span class="name">${CONFIG.copyright.name}</span>
            </a>
        `;
    }
}

function applyProductsInfo() {
    const productsContainer = document.querySelector('.products-widget .widget-content');
    if (!productsContainer) return;

    if (CONFIG.products.comingSoon || CONFIG.products.productsList.length === 0) {
        productsContainer.innerHTML = `
            <div class="coming-soon" style="display:flex;align-items:center;gap:1rem;padding:2rem;text-align:center;justify-content:center;background:rgba(167,139,250,0.05);border-radius:12px;border:2px dashed rgba(167,139,250,0.2);">
                <i class="fas fa-hourglass-half" style="color:var(--accent-purple);font-size:2rem;"></i>
                <p style="margin:0;color:var(--text);font-size:1.1rem;font-weight:500;">静待...</p>
            </div>
        `;
    } else {
        productsContainer.innerHTML = CONFIG.products.productsList.map(product => `
            <a href="${product.url}" target="_blank" class="project-item">
                <div class="project-icon" style="background:${product.color};color:white;">
                    <i class="${product.icon}"></i>
                </div>
                <div class="project-info">
                    <h4>${product.name}</h4>
                    <p>${product.desc}</p>
                </div>
                <div class="project-arrow">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </a>
        `).join('');
    }
}

// 动画和交互
function setupLoadingAnimation() {
    window.addEventListener('load', () => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => { loadingScreen.style.display = 'none'; }, 500);
        }
    });
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.card, .widget-container').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function setupProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const throttledScrollHandler = debounce(() => {
            try {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                if (height > 0) {
                    progressBar.style.width = Math.min(100, Math.max(0, (winScroll / height) * 100)) + '%';
                }
            } catch (error) { console.error(error); }
        }, 16);
        window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    }
}

function setupModalAnimations() {
    const modal = document.getElementById('social-modal');
    const btn = document.querySelector('.subscribe-btn');
    const closeBtn = modal && modal.querySelector('.close');

    if (btn && modal && closeBtn) {
        btn.onclick = function() {
            modal.style.display = 'flex';
            setTimeout(() => { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }, 10);
        };
        closeBtn.onclick = closeModal;
        window.onclick = function(event) { if (event.target == modal) closeModal(); };

        function closeModal() {
            modal.classList.remove('active');
            setTimeout(() => { modal.style.display = 'none'; document.body.style.overflow = ''; }, 300);
        }
    }
}

function addHoverEffects() {
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('touchstart', function() { this.classList.add('touch-active'); }, { passive: true });
        link.addEventListener('touchend', function() { setTimeout(() => { this.classList.remove('touch-active'); }, 150); }, { passive: true });
    });
}

function addMouseFollowEffect() {
    const deviceInfo = detectDevice();
    const isDesktop = window.innerWidth >= 768 && !deviceInfo.isMobile && !deviceInfo.isTablet;
    if (!isDesktop) return;

    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!supportsHover) return;

    let cursorPool = [];
    const maxPoolSize = 5;
    const throttleDelay = 100;

    function createCursorPool() {
        for (let i = 0; i < maxPoolSize; i++) {
            const cursor = document.createElement('div');
            cursor.className = 'cursor';
            cursor.style.display = 'none';
            document.body.appendChild(cursor);
            cursorPool.push(cursor);
        }
    }

    function getCursor() { return cursorPool.find(cursor => cursor.style.display === 'none') || null; }
    function recycleCursor(cursor) { cursor.style.display = 'none'; cursor.style.animation = 'none'; }

    const throttledMouseMove = debounce((e) => {
        const cursor = getCursor();
        if (!cursor) return;
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.display = 'block';
        cursor.style.animation = 'fadeOut 1s forwards';
        setTimeout(() => { recycleCursor(cursor); }, 1000);
    }, throttleDelay);

    createCursorPool();
    document.addEventListener('mousemove', throttledMouseMove, { passive: true });
}

function setupWechatCopy() {
    const copyWechatBtn = document.getElementById('copy-wechat');
    if (copyWechatBtn) {
        copyWechatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (navigator.vibrate) navigator.vibrate(50);
            copyToClipboard(CONFIG.contact.wechatId)
                .then(() => { showCopySuccess(this); })
                .catch(err => { console.error('复制失败:', err); alert('请手动复制微信号: ' + CONFIG.contact.wechatId); });
        });
    }
}

function showCopySuccess(element) {
    element.classList.add('copy-active');
    setTimeout(() => { element.classList.remove('copy-active'); }, 300);

    const socialArrow = element.querySelector('.social-arrow');
    if (socialArrow) {
        socialArrow.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => { socialArrow.innerHTML = '<i class="fas fa-copy"></i>'; }, 2000);
    }

    const toast = document.getElementById('toast-message');
    if (toast) {
        if (window.toastTimeout) clearTimeout(window.toastTimeout);
        toast.classList.add('show');
        window.toastTimeout = setTimeout(() => { toast.classList.remove('show'); }, 3000);
    }
}

function optimizePerformance() {
    const deviceInfo = detectDevice();
    const isLowPerformance = deviceInfo.isMobile || deviceInfo.isTablet || window.innerWidth < 768;
    if (isLowPerformance) {
        document.body.classList.add('low-performance');
        const style = document.createElement('style');
        style.textContent = `
            .low-performance * { animation-duration: 0.01ms !important; animation-delay: 0.01ms !important; transition-duration: 0.01ms !important; }
            .low-performance .card, .low-performance .avatar:before, .low-performance body { animation: none !important; }
        `;
        document.head.appendChild(style);
    }
}

// 初始化
function init() {
    try {
        applyConfig();
        optimizePerformance();
        setupLoadingAnimation();
        setupScrollAnimations();
        setupProgressBar();
        setupModalAnimations();
        addHoverEffects();
        addMouseFollowEffect();
        setupWechatCopy();
    } catch (error) {
        console.error('初始化出错:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(function() { loadingScreen.style.display = 'none'; }, 500);
        }
    }, 500);

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) progressBar.style.width = `${scrollPercentage}%`;
    });

    init();
});

window.addEventListener('load', function() { applyConfig(); });
