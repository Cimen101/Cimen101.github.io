---
title: 相册
date: 2026-07-23 00:00:00
type: album
description: 用图片记录生活的美好瞬间
comments: false
---

<div id="album-app" class="album-container">
  <div class="album-header">
    <h2>📸 相册</h2>
    <p>每一张图片都是时光的标本</p>
  </div>

  <div class="album-masonry" id="album-masonry"></div>
</div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css" />
<script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js"></script>
<script src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js"></script>

<script>
  const albumData = [
    { url: 'https://picsum.photos/600/800?random=1', caption: '山间日出', date: '2024-01-15' },
    { url: 'https://picsum.photos/800/600?random=2', caption: '海边日落', date: '2024-01-20' },
    { url: 'https://picsum.photos/600/600?random=3', caption: '城市夜景', date: '2024-02-05' },
    { url: 'https://picsum.photos/800/1000?random=4', caption: '古镇小道', date: '2024-02-18' },
    { url: 'https://picsum.photos/600/800?random=5', caption: '雪山之巅', date: '2024-03-10' },
    { url: 'https://picsum.photos/1000/600?random=6', caption: '草原日出', date: '2024-03-25' }
  ];

  const container = document.getElementById('album-masonry');
  container.innerHTML = albumData.map(p => `
    <div class="album-item" data-src="${p.url}" data-caption="${p.caption}">
      <img src="${p.url}" alt="${p.caption}" loading="lazy" />
      <div class="album-caption">
        <span>${p.caption}</span>
        <time>${p.date}</time>
      </div>
    </div>
  `).join('');

  new Masonry(container, {
    itemSelector: '.album-item',
    columnWidth: '.album-item',
    percentPosition: true,
    gutter: 16
  });

  Fancybox.bind('[data-src]', { groupAll: true });
</script>
