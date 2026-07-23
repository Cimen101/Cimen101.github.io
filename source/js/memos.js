/**
 * Memos 短文系统
 */
const LOCAL_MEMOS = [
  { id: 1, content: '终于把博客进阶版魔改方案设计完成了 ✨ 这次要上 Cloudflare Pages + R2 + Workers 全家桶', createdAt: '2026-07-23 10:30', tags: ['tech', 'blog'] },
  { id: 2, content: '今天试用了 APlayer + MetingJS 做博客的吸底音乐播放器，效果出乎意料地好 🎵', createdAt: '2026-07-22 21:15', tags: ['tech', 'life'] },
  { id: 3, content: '读《代码大全》有感 - 好的代码首先是写给人看的，其次才是给机器执行的。', createdAt: '2026-07-22 14:20', tags: ['thoughts', 'tech'] },
  { id: 4, content: '傍晚下了一场暴雨，雨后的空气格外清新 🌧️', createdAt: '2026-07-21 18:45', tags: ['life'] },
  { id: 5, content: 'Cloudflare Workers 真香！冷启动 < 5ms，免费额度完全够用。', createdAt: '2026-07-21 10:00', tags: ['tech'] },
  { id: 6, content: '为博客添加了 3D 卡片倾斜效果和玻璃拟态，顿时高大上了 ✨', createdAt: '2026-07-20 23:30', tags: ['tech', 'blog'] },
  { id: 7, content: '今天用 Vanta.js 做了首页的星空动态背景，深色模式下非常惊艳 ✨', createdAt: '2026-07-20 16:00', tags: ['tech', 'blog'] },
  { id: 8, content: '霞鹜文楷字体真好看，中文阅读体验提升一个档次。', createdAt: '2026-07-19 22:10', tags: ['thoughts', 'life'] },
  { id: 9, content: '完成了 Service Worker 离线缓存配置，二次访问速度飞快 ⚡', createdAt: '2026-07-19 15:30', tags: ['tech'] },
  { id: 10, content: '用 hexo-memos 插件实现了类似 Twitter 的短文功能，简洁又实用。', createdAt: '2026-07-19 10:00', tags: ['tech', 'blog'] }
];

class MemosApp {
  constructor() {
    this.memos = [];
    this.filteredMemos = [];
    this.currentFilter = 'all';
    this.page = 1;
    this.pageSize = 10;
    this.init();
  }

  bindEvents() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.filter;
        this.render();
      });
    });
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.page++;
        this.render();
      });
    }
  }

  init() {
    this.memos = LOCAL_MEMOS;
    this.bindEvents();
    this.render();
  }

  filter() {
    if (this.currentFilter === 'all') {
      this.filteredMemos = this.memos;
    } else {
      this.filteredMemos = this.memos.filter(m => m.tags.includes(this.currentFilter));
    }
  }

  formatContent(content) {
    return content
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>')
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  }

  render() {
    this.filter();
    const container = document.getElementById('memos-list');
    const displayed = this.filteredMemos.slice(0, this.page * this.pageSize);

    container.innerHTML = displayed.map(memo => `
      <article class="memo-item" data-tags="${memo.tags.join(',')}">
        <div class="memo-content">${this.formatContent(memo.content)}</div>
        <div class="memo-meta">
          <time class="memo-time">${memo.createdAt}</time>
          <div class="memo-tags">
            ${memo.tags.map(tag => `<span class="memo-tag">#${tag}</span>`).join('')}
          </div>
        </div>
      </article>
    `).join('');

    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
      loadMoreBtn.style.display = displayed.length >= this.filteredMemos.length ? 'none' : 'block';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('memos-app')) {
    new MemosApp();
  }
});
