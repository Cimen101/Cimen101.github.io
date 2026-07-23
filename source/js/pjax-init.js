/**
 * Pjax 无刷新跳转初始化
 * 实现站内页面无刷新跳转
 */

(function() {
  'use strict';

  // Pjax 配置
  const pjaxConfig = {
    selectors: [
      'title',
      'meta',
      '#page-header',
      '#content-inner',
      '#sidebar',
      '#footer'
    ],
    excludes: '.no-pjax, a[download], a[href$=".pdf"]',
    timeout: 5000,
    cacheBust: false
  };

  // 初始化 Pjax
  function initPjax() {
    if (typeof Pjax === 'undefined') {
      loadPjax();
      return;
    }

    // 创建 Pjax 实例
    window.pjax = new Pjax({
      selectors: pjaxConfig.selectors,
      excludes: pjaxConfig.excludes,
      timeout: pjaxConfig.timeout,
      cacheBust: pjaxConfig.cacheBust,
      analytics: function() {
        // 页面切换后的统计
        if (typeof gtag !== 'undefined') {
          gtag('config', 'GA_MEASUREMENT_ID', {
            page_path: window.location.pathname
          });
        }
      },
      scrollTo: false
    });

    // 绑定事件
    bindPjaxEvents();
  }

  // 动态加载 Pjax
  function loadPjax() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/pjax@0.2.8/pjax.min.js';
    script.async = true;
    script.onload = function() {
      initPjax();
    };
    script.onerror = function() {
      console.warn('Failed to load Pjax');
    };
    document.head.appendChild(script);
  }

  // 绑定 Pjax 事件
  function bindPjaxEvents() {
    // 页面开始切换
    document.addEventListener('pjax:send', function() {
      // 显示加载进度条
      showLoadingBar();
      // 移动端关闭菜单
      closeMobileMenu();
    });

    // 页面切换完成
    document.addEventListener('pjax:complete', function() {
      // 隐藏加载进度条
      hideLoadingBar();
      // 重新初始化页面脚本
      reinitPageScripts();
      // 更新页面标题
      updatePageTitle();
    });

    // 页面切换成功
    document.addEventListener('pjax:success', function() {
      // 滚动到顶部
      window.scrollTo(0, 0);
    });

    // 页面切换错误
    document.addEventListener('pjax:error', function(event) {
      console.warn('Pjax error:', event);
      // 降级为普通跳转
      window.location.href = event.request.responseURL;
    });
  }

  // 显示加载进度条
  function showLoadingBar() {
    let loadingBar = document.getElementById('pjax-loading-bar');
    if (!loadingBar) {
      loadingBar = document.createElement('div');
      loadingBar.id = 'pjax-loading-bar';
      loadingBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(90deg, #448aff, #ff4081);
        z-index: 9999;
        transition: width 0.3s ease;
      `;
      document.body.appendChild(loadingBar);
    }
    
    loadingBar.style.width = '0%';
    loadingBar.style.opacity = '1';
    
    // 模拟加载进度
    setTimeout(() => loadingBar.style.width = '30%', 100);
    setTimeout(() => loadingBar.style.width = '60%', 500);
    setTimeout(() => loadingBar.style.width = '90%', 1000);
  }

  // 隐藏加载进度条
  function hideLoadingBar() {
    const loadingBar = document.getElementById('pjax-loading-bar');
    if (loadingBar) {
      loadingBar.style.width = '100%';
      setTimeout(() => {
        loadingBar.style.opacity = '0';
        setTimeout(() => {
          loadingBar.style.width = '0%';
        }, 300);
      }, 200);
    }
  }

  // 关闭移动端菜单
  function closeMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
      menuToggle.classList.remove('active');
    }
    const menu = document.getElementById('page-header');
    if (menu) {
      menu.classList.remove('menu-open');
    }
  }

  // 重新初始化页面脚本
  function reinitPageScripts() {
    // 重新初始化代码高亮
    if (typeof hljs !== 'undefined') {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
      });
    }

    // 重新初始化图片懒加载
    if (typeof lazyLoad !== 'undefined') {
      lazyLoad();
    }

    // 重新初始化目录
    if (typeof tocbot !== 'undefined') {
      tocbot.refresh();
    }

    // 触发自定义事件
    document.dispatchEvent(new CustomEvent('pjax:scriptsLoaded'));
  }

  // 更新页面标题
  function updatePageTitle() {
    const title = document.title;
    if (title) {
      document.title = title;
    }
  }

  // 初始化
  document.addEventListener('DOMContentLoaded', function() {
    initPjax();
  });
})();
