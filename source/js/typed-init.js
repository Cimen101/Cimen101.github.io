/**
 * Typed.js 打字机效果初始化
 * 用于首页签名区域展示多条签名
 */

(function() {
  'use strict';

  // 等待 DOM 加载完成
  document.addEventListener('DOMContentLoaded', function() {
    initTyped();
  });

  // Pjax 页面切换后重新初始化
  document.addEventListener('pjax:complete', function() {
    initTyped();
  });

  function initTyped() {
    const typedElement = document.getElementById('typed');
    if (!typedElement) return;

    // 检查是否已初始化
    if (typedElement.dataset.typedInit === 'true') return;
    typedElement.dataset.typedInit = 'true';

    // 清空内容
    typedElement.innerHTML = '';

    // 签名列表
    const strings = [
      '记录 · 分享 · 创造',
      '一个热爱技术的开发者',
      '欢迎来到我的博客',
      '代码改变世界',
      'Stay hungry, stay foolish'
    ];

    // 动态加载 Typed.js
    if (typeof Typed === 'undefined') {
      loadScript('https://cdn.jsdelivr.net/npm/typed.js@2.1.0/dist/typed.umd.min.js', function() {
        createTyped(typedElement, strings);
      });
    } else {
      createTyped(typedElement, strings);
    }
  }

  function createTyped(element, strings) {
    try {
      new Typed(element, {
        strings: strings,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true
      });
    } catch (error) {
      console.warn('Typed.js initialization failed:', error);
      // 降级显示第一条签名
      element.textContent = strings[0];
    }
  }

  function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = callback;
    script.onerror = function() {
      console.warn('Failed to load Typed.js from:', url);
    };
    document.head.appendChild(script);
  }
})();
