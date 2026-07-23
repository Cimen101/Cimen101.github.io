/**
 * 网站运行时间
 * 在页脚显示网站已运行时间
 */

(function() {
  'use strict';

  // 网站上线时间（请根据实际情况修改）
  const SITE_LAUNCH_DATE = '2024-01-01T00:00:00+08:00';

  // 初始化
  document.addEventListener('DOMContentLoaded', function() {
    initRuntime();
  });

  // Pjax 页面切换后重新初始化
  document.addEventListener('pjax:complete', function() {
    initRuntime();
  });

  function initRuntime() {
    const runtimeElement = document.getElementById('runtime');
    if (!runtimeElement) return;

    // 立即更新一次
    updateRuntime(runtimeElement);
    
    // 每秒更新
    setInterval(function() {
      updateRuntime(runtimeElement);
    }, 1000);
  }

  function updateRuntime(element) {
    const launchDate = new Date(SITE_LAUNCH_DATE);
    const now = new Date();
    const diff = now - launchDate;

    // 计算时间
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // 更新显示
    element.innerHTML = `
      <span style="font-size: 14px;">
        <i class="fas fa-clock" style="margin-right: 5px;"></i>
        本站已运行 
        <span style="color: #448aff; font-weight: bold;">${days}</span> 天 
        <span style="color: #448aff; font-weight: bold;">${hours}</span> 小时 
        <span style="color: #448aff; font-weight: bold;">${minutes}</span> 分钟 
        <span style="color: #448aff; font-weight: bold;">${seconds}</span> 秒
      </span>
    `;
  }
})();
