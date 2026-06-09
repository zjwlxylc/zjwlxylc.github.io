/**
 * 慧行个人主页 - 全屏翻页 JavaScript
 */

const CONFIG = {
  name: "慧行",
  wechatId: "zjwlxylc",
  totalSections: 5
};

// ========== 全屏翻页核心 ==========
let currentSection = 0;
let isAnimating = false;
const ANIMATION_DURATION = 900; // ms，和 CSS transition 保持一致

function goToSection(index) {
    if (isAnimating || index < 0 || index >= CONFIG.totalSections || index === currentSection) return;
    isAnimating = true;

    // 移除旧 active
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-dot').forEach(d => d.classList.remove('active'));

    currentSection = index;
    const wrapper = document.querySelector('.fullpage-wrapper');
    wrapper.style.transform = `translateY(-${currentSection * 100}vh)`;

    // 更新导航点
    const dots = document.querySelectorAll('.nav-dot');
    if (dots[currentSection]) dots[currentSection].classList.add('active');

    // 延迟添加 active 触发入场动画
    setTimeout(() => {
        const sections = document.querySelectorAll('.section');
        if (sections[currentSection]) sections[currentSection].classList.add('active');
    }, 200);

    setTimeout(() => { isAnimating = false; }, ANIMATION_DURATION);
}

// 鼠标滚轮
function handleWheel(e) {
    e.preventDefault();
    if (isAnimating) return;
    if (e.deltaY > 30) goToSection(currentSection + 1);
    else if (e.deltaY < -30) goToSection(currentSection - 1);
}

// 键盘
function handleKeydown(e) {
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault(); goToSection(currentSection + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault(); goToSection(currentSection - 1);
    } else if (e.key === 'Home') {
        e.preventDefault(); goToSection(0);
    } else if (e.key === 'End') {
        e.preventDefault(); goToSection(CONFIG.totalSections - 1);
    }
}

// 触摸
let touchStartY = 0;
function handleTouchStart(e) { touchStartY = e.touches[0].clientY; }
function handleTouchEnd(e) {
    const diff = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
        if (diff > 0) goToSection(currentSection + 1);
        else goToSection(currentSection - 1);
    }
}

// 导航点点击
function setupNavDots() {
    document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const idx = parseInt(dot.dataset.index);
            goToSection(idx);
        });
    });
}

// ========== 微信复制 ==========
function setupWechatCopy() {
    const btn = document.getElementById('copy-wechat');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (navigator.vibrate) navigator.vibrate(50);
        const text = CONFIG.wechatId;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => showCopyToast()).catch(() => alert('请手动复制: ' + text));
        } else {
            const ta = document.createElement('textarea'); ta.value = text;
            ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta);
            ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
            showCopyToast();
        }
    });
}

function showCopyToast() {
    const toast = document.getElementById('toast-message');
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ========== 鼠标跟随 ==========
function setupMouseFollow() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile || window.innerWidth < 768) return;
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;

    let pool = [];
    for (let i = 0; i < 5; i++) {
        const c = document.createElement('div'); c.className = 'cursor'; c.style.display = 'none';
        document.body.appendChild(c); pool.push(c);
    }

    let lastTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < 80) return;
        lastTime = now;
        const c = pool.find(x => x.style.display === 'none');
        if (!c) return;
        c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px';
        c.style.display = 'block'; c.style.animation = 'fadeOut 1s forwards';
        setTimeout(() => { c.style.display = 'none'; c.style.animation = 'none'; }, 1000);
    }, { passive: true });
}

// ========== 初始化 ==========
function init() {
    // 事件绑定
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    setupNavDots();
    setupWechatCopy();
    setupMouseFollow();

    // 首屏入场
    setTimeout(() => {
        document.querySelector('.section-hero').classList.add('active');
        // 隐藏加载屏
        const ls = document.querySelector('.loading-screen');
        if (ls) { ls.classList.add('hide'); setTimeout(() => ls.remove(), 800); }
    }, 600);
}

document.addEventListener('DOMContentLoaded', init);
