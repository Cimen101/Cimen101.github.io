/**
 * 自定义脚本入口
 * 初始化所有自定义功能
 */

(function() {
  'use strict';

  // 动态加载脚本
  function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = callback || function() {};
    script.onerror = function() {
      console.warn('Failed to load script:', src);
    };
    document.head.appendChild(script);
  }

  // 加载所有自定义脚本
  function loadCustomScripts() {
    // Pjax 初始化
    loadScript('/js/pjax-init.js');
    
    // Typed.js 打字机效果
    loadScript('/js/typed-init.js');
    
    // 右键自定义菜单
    loadScript('/js/context-menu.js');
    
    // 网站运行时间
    loadScript('/js/runtime.js');
    
    // PV/UV 统计显示
    loadScript('/js/pv-display.js');
    
    // 滚动条优化
    loadScript('/js/scrollbar-optimizer.js');
  }

  // 初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCustomScripts);
  } else {
    loadCustomScripts();
  }
})();
