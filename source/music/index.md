---
title: 音乐馆
date: 2026-07-23 00:00:00
type: music
description: 沉浸式音乐体验
comments: false
---

<div id="music-app" class="music-container">
  <div class="music-header">
    <h2>🎵 音乐馆</h2>
    <p>在代码与文字的间隙，让音乐流淌心间</p>
  </div>
  <div class="player-wrapper">
    <meting-js
      server="netease"
      type="playlist"
      id="60198"
      fixed="false"
      autoplay="false"
      theme="#448aff"
      loop="all"
      order="list"
      preload="auto"
      volume="0.7"
      list-folded="true"
      list-max-height="500px">
    </meting-js>
  </div>
</div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css">
<script src="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/meting@2.0.1/dist/Meting.min.js"></script>
