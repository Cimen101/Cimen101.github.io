---
title: 碎碎念
date: 2026-07-23 00:00:00
type: memos
description: 记录生活点滴，分享瞬间灵感
comments: false
---

<div id="memos-app" class="memos-container">
  <div class="memos-header">
    <h2>💭 碎碎念</h2>
    <p>记录那些稍纵即逝的灵感与生活片段</p>
  </div>

  <div class="memos-filters">
    <button class="filter-btn active" data-filter="all">全部</button>
    <button class="filter-btn" data-filter="tech">技术</button>
    <button class="filter-btn" data-filter="life">生活</button>
    <button class="filter-btn" data-filter="thoughts">思考</button>
  </div>

  <div id="memos-list" class="memos-list">
    <div class="memos-loading">加载中...</div>
  </div>

  <div class="memos-load-more">
    <button id="load-more-btn" class="load-more-btn">加载更多</button>
  </div>
</div>

<script src="/js/memos.js"></script>
