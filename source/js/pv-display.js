/**
 * PV/UV 统计显示
 * 使用不蒜子统计
 */

(function() {
  'use strict';

  // 初始化
  document.addEventListener('DOMContentLoaded', function() {
    initPVDisplay();
  });

  // Pjax 页面切换后重新初始化
  document.addEventListener('pjax:complete', function() {
    initPVDisplay();
  });

  function initPVDisplay() {
    // 加载不蒜子脚本
    if (typeof busuanzi === 'undefined') {
      loadBusuanzi();
    }
    
    // 添加 PV 显示容器
    addPVContainers();
  }

  function loadBusuanzi() {
    const script = document.createElement('script');
    script.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    script.async = true;
    document.head.appendChild(script);
  }

  function addPVContainers() {
    // 文章页 PV
    const postMeta = document.querySelector('.post-meta');
    if (postMeta && !document.getElementById('post-pv')) {
      const pvElement = document.createElement('span');
      pvElement.id = 'post-pv';
      pvElement.className = 'post-meta-item';
      pvElement.innerHTML = `
        <span class="post-meta-icon">
          <i class="fas fa-eye"></i>
        </span>
        <span class="post-meta-text">阅读:</span>
        <span id="busuanzi_value_page_pv" class="post-meta-number">0</span>
      `;
      postMeta.appendChild(pvElement);
    }

    // 首页站点 PV
    const footer = document.getElementById('footer');
    if (footer && !document.getElementById('site-pv')) {
      const sitePV = document.createElement('div');
      sitePV.id = 'site-pv';
      sitePV.style.cssText = `
        text-align: center;
        padding: 10px 0;
        font-size: 14px;
        color: #666;
      `;
      sitePV.innerHTML = `
        <span>本站总访问量: </span>
        <span id="busuanzi_value_site_pv" style="color: #448aff; font-weight: bold;">0</span>
        <span style="margin: 0 10px;">|</span>
        <span>本站总访客数: </span>
        <span id="busuanzi_value_site_uv" style="color: #448aff; font-weight: bold;">0</span>
      `;
      footer.insertBefore(sitePV, footer.firstChild);
    }
  }
})();
