/**
 * 右键自定义菜单
 * 替换浏览器默认右键菜单
 */

(function() {
  'use strict';

  let contextMenu = null;
  let isMenuVisible = false;

  // 初始化
  document.addEventListener('DOMContentLoaded', function() {
    initContextMenu();
  });

  // Pjax 页面切换后重新初始化
  document.addEventListener('pjax:complete', function() {
    initContextMenu();
  });

  function initContextMenu() {
    // 移除旧菜单
    if (contextMenu) {
      contextMenu.remove();
      contextMenu = null;
    }

    // 创建菜单
    createContextMenu();
    
    // 绑定事件
    bindEvents();
  }

  function createContextMenu() {
    contextMenu = document.createElement('div');
    contextMenu.id = 'custom-context-menu';
    contextMenu.style.cssText = `
      position: fixed;
      z-index: 99999;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      padding: 8px 0;
      min-width: 200px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      display: none;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      color: #333;
    `;

    // 暗色模式
    if (document.documentElement.dataset.theme === 'dark') {
      contextMenu.style.background = 'rgba(30, 30, 30, 0.95)';
      contextMenu.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      contextMenu.style.color = '#fff';
    }

    // 菜单项
    const menuItems = [
      {
        icon: '📋',
        text: '复制链接',
        action: copyLink
      },
      {
        icon: '🔄',
        text: '切换深色模式',
        action: toggleDarkMode
      },
      {
        icon: '🔤',
        text: '繁简转换',
        action: toggleChinese
      },
      {
        icon: '🎲',
        text: '随机文章',
        action: randomPost
      },
      {
        icon: '🔝',
        text: '回到顶部',
        action: scrollToTop
      },
      {
        icon: '💬',
        text: '直达评论',
        action: scrollToComments
      }
    ];

    menuItems.forEach((item, index) => {
      const menuItem = createMenuItem(item);
      contextMenu.appendChild(menuItem);
      
      // 添加分隔线
      if (index < menuItems.length - 1) {
        const divider = document.createElement('div');
        divider.style.cssText = `
          height: 1px;
          background: rgba(0, 0, 0, 0.1);
          margin: 4px 0;
        `;
        contextMenu.appendChild(divider);
      }
    });

    document.body.appendChild(contextMenu);
  }

  function createMenuItem(item) {
    const menuItem = document.createElement('div');
    menuItem.style.cssText = `
      padding: 8px 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: background 0.2s;
    `;

    menuItem.innerHTML = `
      <span style="font-size: 16px;">${item.icon}</span>
      <span>${item.text}</span>
    `;

    menuItem.addEventListener('mouseenter', function() {
      this.style.background = 'rgba(68, 138, 255, 0.1)';
    });

    menuItem.addEventListener('mouseleave', function() {
      this.style.background = 'transparent';
    });

    menuItem.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      hideMenu();
      item.action();
    });

    return menuItem;
  }

  function bindEvents() {
    // 拦截右键点击
    document.addEventListener('contextmenu', function(e) {
      // 排除输入框
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }
      
      e.preventDefault();
      showMenu(e.clientX, e.clientY);
    });

    // 点击其他地方关闭菜单
    document.addEventListener('click', function(e) {
      if (contextMenu && !contextMenu.contains(e.target)) {
        hideMenu();
      }
    });

    // ESC 关闭菜单
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        hideMenu();
      }
    });

    // 滚动关闭菜单
    document.addEventListener('scroll', function() {
      hideMenu();
    });
  }

  function showMenu(x, y) {
    if (!contextMenu) return;

    // 调整位置避免超出视口
    const menuWidth = contextMenu.offsetWidth;
    const menuHeight = contextMenu.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (x + menuWidth > viewportWidth) {
      x = viewportWidth - menuWidth - 10;
    }
    if (y + menuHeight > viewportHeight) {
      y = viewportHeight - menuHeight - 10;
    }

    contextMenu.style.left = x + 'px';
    contextMenu.style.top = y + 'px';
    contextMenu.style.display = 'block';
    isMenuVisible = true;
  }

  function hideMenu() {
    if (contextMenu) {
      contextMenu.style.display = 'none';
      isMenuVisible = false;
    }
  }

  // 菜单动作
  function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      showToast('链接已复制到剪贴板');
    }).catch(() => {
      // 降级方案
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      showToast('链接已复制到剪贴板');
    });
  }

  function toggleDarkMode() {
    const html = document.documentElement;
    const currentTheme = html.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    
    // 更新菜单样式
    if (contextMenu) {
      if (newTheme === 'dark') {
        contextMenu.style.background = 'rgba(30, 30, 30, 0.95)';
        contextMenu.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        contextMenu.style.color = '#fff';
      } else {
        contextMenu.style.background = 'rgba(255, 255, 255, 0.95)';
        contextMenu.style.borderColor = 'rgba(0, 0, 0, 0.1)';
        contextMenu.style.color = '#333';
      }
    }
    
    showToast(newTheme === 'dark' ? '已切换到深色模式' : '已切换到浅色模式');
  }

  function toggleChinese() {
    // 简繁转换（需要 tw_cn.js 支持）
    if (typeof tw_cn !== 'undefined') {
      tw_cn();
      showToast('繁简转换完成');
    } else {
      showToast('繁简转换功能未启用');
    }
  }

  function randomPost() {
    // 获取所有文章链接
    const posts = document.querySelectorAll('.recent-post-item a, #recent-posts a');
    if (posts.length > 0) {
      const randomIndex = Math.floor(Math.random() * posts.length);
      const href = posts[randomIndex].href;
      if (href) {
        window.location.href = href;
      }
    } else {
      showToast('暂无文章');
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function scrollToComments() {
    const comments = document.getElementById('post-comment') || 
                     document.getElementById('comments') ||
                     document.querySelector('.waline');
    if (comments) {
      comments.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      showToast('当前页面无评论区');
    }
  }

  // Toast 提示
  function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      z-index: 100000;
      animation: fadeInOut 2s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 2000);
  }

  // 添加动画样式
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInOut {
      0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
      20% { opacity: 1; transform: translateX(-50%) translateY(0); }
      80% { opacity: 1; transform: translateX(-50%) translateY(0); }
      100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
  `;
  document.head.appendChild(style);
})();
