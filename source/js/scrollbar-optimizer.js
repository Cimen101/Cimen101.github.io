/**
 * 滚动条优化
 * 自定义滚动条样式，自动淡出效果
 */

(function() {
  'use strict';

  let scrollTimeout = null;
  let isScrolling = false;

  // 初始化
  document.addEventListener('DOMContentLoaded', function() {
    initScrollbarOptimizer();
  });

  // Pjax 页面切换后重新初始化
  document.addEventListener('pjax:complete', function() {
    initScrollbarOptimizer();
  });

  function initScrollbarOptimizer() {
    // 添加自定义滚动条样式
    addScrollbarStyles();
    
    // 绑定滚动事件
    bindScrollEvents();
    
    // 初始化滚动条状态
    initScrollbarState();
  }

  function addScrollbarStyles() {
    // 检查是否已添加样式
    if (document.getElementById('scrollbar-optimizer-styles')) return;

    const style = document.createElement('style');
    style.id = 'scrollbar-optimizer-styles';
    style.textContent = `
      /* 自定义滚动条 */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background: transparent;
      }

      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #448aff, #536dfe);
        border-radius: 4px;
        transition: opacity 0.3s ease;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #536dfe, #ff4081);
      }

      /* 滚动条自动淡出 */
      .scrollbar-fade-out::-webkit-scrollbar-thumb {
        opacity: 0;
        transition: opacity 1s ease;
      }

      .scrollbar-fade-in::-webkit-scrollbar-thumb {
        opacity: 1;
        transition: opacity 0.2s ease;
      }

      /* 平滑滚动 */
      html {
        scroll-behavior: smooth;
      }

      /* 滚动指示器 */
      .scroll-indicator {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #448aff, #536dfe, #ff4081);
        z-index: 10000;
        transition: width 0.1s ease;
      }

      /* 滚动到顶部按钮 */
      .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #448aff, #536dfe);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 10px rgba(68, 138, 255, 0.3);
      }

      .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
      }

      .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(68, 138, 255, 0.4);
      }

      /* 暗色模式 */
      [data-theme="dark"] ::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
      }

      /* 移动端优化 */
      @media (max-width: 768px) {
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }

        .scroll-to-top {
          bottom: 20px;
          right: 20px;
          width: 35px;
          height: 35px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function bindScrollEvents() {
    // 滚动事件
    window.addEventListener('scroll', function() {
      onScroll();
    }, { passive: true });

    // 鼠标滚轮事件
    window.addEventListener('wheel', function() {
      onWheel();
    }, { passive: true });

    // 触摸事件（移动端）
    window.addEventListener('touchmove', function() {
      onTouchMove();
    }, { passive: true });
  }

  function initScrollbarState() {
    // 添加滚动指示器
    addScrollIndicator();
    
    // 添加滚动到顶部按钮
    addScrollToTopButton();
    
    // 初始化滚动条淡出
    initScrollbarFade();
  }

  function addScrollIndicator() {
    if (document.getElementById('scroll-indicator')) return;

    const indicator = document.createElement('div');
    indicator.id = 'scroll-indicator';
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);
  }

  function addScrollToTopButton() {
    if (document.getElementById('scroll-to-top')) return;

    const button = document.createElement('button');
    button.id = 'scroll-to-top';
    button.className = 'scroll-to-top';
    button.innerHTML = '↑';
    button.title = '回到顶部';
    button.onclick = function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
    document.body.appendChild(button);
  }

  function initScrollbarFade() {
    // 初始状态：滚动条淡出
    document.documentElement.classList.add('scrollbar-fade-out');
  }

  function onScroll() {
    // 更新滚动指示器
    updateScrollIndicator();
    
    // 更新滚动到顶部按钮
    updateScrollToTopButton();
    
    // 显示滚动条
    showScrollbar();
    
    // 设置滚动状态
    isScrolling = true;
    
    // 清除之前的定时器
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    
    // 设置新的定时器（滚动停止后隐藏滚动条）
    scrollTimeout = setTimeout(function() {
      hideScrollbar();
      isScrolling = false;
    }, 1000);
  }

  function onWheel() {
    // 显示滚动条
    showScrollbar();
    
    // 清除之前的定时器
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    
    // 设置新的定时器
    scrollTimeout = setTimeout(function() {
      hideScrollbar();
    }, 1000);
  }

  function onTouchMove() {
    // 移动端触摸滚动
    showScrollbar();
    
    // 清除之前的定时器
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    
    // 设置新的定时器
    scrollTimeout = setTimeout(function() {
      hideScrollbar();
    }, 1500);
  }

  function showScrollbar() {
    document.documentElement.classList.remove('scrollbar-fade-out');
    document.documentElement.classList.add('scrollbar-fade-in');
  }

  function hideScrollbar() {
    if (!isScrolling) {
      document.documentElement.classList.remove('scrollbar-fade-in');
      document.documentElement.classList.add('scrollbar-fade-out');
    }
  }

  function updateScrollIndicator() {
    const indicator = document.getElementById('scroll-indicator');
    if (!indicator) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    indicator.style.width = scrollPercent + '%';
  }

  function updateScrollToTopButton() {
    const button = document.getElementById('scroll-to-top');
    if (!button) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  }
})();
