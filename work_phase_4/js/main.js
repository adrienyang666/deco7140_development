// js/main.js

import { initNavHighlight } from './modules/nav.js';
import { initDirectoryFilter } from './modules/filter.js';
import { initContactForm } from './modules/form.js';

// 全局初始化
document.addEventListener('DOMContentLoaded', () => {
    initNavHighlight();

    // 针对不同页面按需加载
    if (document.body.contains(document.querySelector('.directory-list'))) {
        initDirectoryFilter();
    }
    if (document.body.contains(document.querySelector('.contact-form'))) {
        initContactForm();
    }
    // 以后如果加其他页面，也可以在这里判断并加载
});
