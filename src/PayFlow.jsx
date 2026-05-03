import { useState, useEffect, useRef, useCallback } from "react";

/* ─── design tokens ─── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --g50:#f0faf3;--g100:#d4f0dd;--g200:#a8e1ba;--g400:#4caf78;--g500:#2d8f57;
    --g600:#1e6e3f;--g700:#155230;--g800:#0c3820;
    --gold:#c8973a;--gold-lt:#f5edd8;--gold-dk:#7a5a1c;
    --slate:#3a4a5c;--slate-lt:#f4f6f8;--slate-md:#8a9bb0;
    --red:#c0392b;--red-lt:#fdecea;
    --amber:#e67e22;--amber-lt:#fef4e8;
    --white:#ffffff;--text:#1a2a1e;--text-muted:#5a7060;--text-hint:#8aaa90;
    --border:rgba(30,110,63,.15);--border-md:rgba(30,110,63,.25);
    --shadow:0 2px 16px rgba(30,110,63,.08);--shadow-md:0 6px 32px rgba(30,110,63,.14);
    --radius:12px;--radius-lg:20px;--radius-xl:28px;
    --font-display:"DM Serif Display",Georgia,serif;
    --font-body:"DM Sans",system-ui,sans-serif;
  }

  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

  .pf-root{font-family:var(--font-body);background:var(--slate-lt);color:var(--text);min-height:100vh;overflow-x:hidden}

  /* NAV */
  .nav{position:sticky;top:0;z-index:100;background:var(--g600);border-bottom:2px solid var(--g700);padding:0 2rem;display:flex;align-items:center}
  .nav-brand{display:flex;align-items:center;gap:10px;padding:1rem 1.5rem 1rem 0;border-right:1px solid rgba(255,255,255,.15);margin-right:1.5rem;text-decoration:none;cursor:pointer}
  .nav-logo{width:36px;height:36px;background:var(--white);border-radius:10px;display:flex;align-items:center;justify-content:center}
  .nav-brand-name{font-family:var(--font-display);font-size:22px;color:var(--white);letter-spacing:-.3px}
  .nav-brand-sub{font-size:10px;color:#ffffff99;letter-spacing:1.5px;text-transform:uppercase;display:block}
  .nav-tabs{display:flex;gap:0;flex:1}
  .nav-tab{padding:1rem 1.25rem;color:#ffffffb3;font-size:14px;font-weight:500;cursor:pointer;border-bottom:3px solid transparent;border-top:3px solid transparent;transition:all .2s;display:flex;align-items:center;gap:6px}
  .nav-tab:hover{color:var(--white);background:rgba(255,255,255,.05)}
  .nav-tab.active{color:var(--white);border-bottom-color:var(--gold)}
  .nav-tab svg{width:15px;height:15px;opacity:.8}
  .nav-right{margin-left:auto;display:flex;align-items:center;gap:12px}
  .nav-avatar{width:36px;height:36px;border-radius:50%;background:var(--g400);color:var(--white);font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;border:2px solid rgba(255,255,255,.3)}
  .nav-notif{position:relative;cursor:pointer;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center}
  .nav-notif svg{width:18px;height:18px;color:white}
  .nav-notif-badge{position:absolute;top:4px;right:4px;width:10px;height:10px;background:var(--gold);border-radius:50%;border:2px solid var(--g600)}

  /* PAGE */
  .page-enter{animation:fadeIn .3s ease}
  @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
  .container{max-width:1200px;margin:0 auto;padding:2rem}
  .page-header{margin-bottom:2rem}
  .page-title{font-family:var(--font-display);font-size:32px;color:var(--text);letter-spacing:-.5px;line-height:1.2}
  .page-title span{color:var(--g500)}
  .page-subtitle{color:var(--text-muted);font-size:15px;margin-top:4px}
  .section-label{font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-hint);margin-bottom:.75rem}

  /* CARDS */
  .card{background:var(--white);border-radius:var(--radius-lg);border:1px solid var(--border);padding:1.5rem;box-shadow:var(--shadow)}

  /* BUTTONS */
  .btn{display:inline-flex;align-items:center;gap:6px;padding:10px 20px;border-radius:var(--radius);border:none;font-family:var(--font-body);font-size:14px;font-weight:500;cursor:pointer;transition:all .15s}
  .btn svg{width:15px;height:15px}
  .btn-primary{background:var(--g500);color:var(--white)}
  .btn-primary:hover{background:var(--g600);transform:translateY(-1px);box-shadow:0 4px 16px rgba(30,110,63,.3)}
  .btn-outline{background:transparent;color:var(--g500);border:1.5px solid var(--g400)}
  .btn-outline:hover{background:var(--g50)}
  .btn-ghost{background:transparent;color:var(--text-muted);border:1px solid var(--border-md)}
  .btn-ghost:hover{background:var(--slate-lt)}
  .btn-danger{background:var(--red-lt);color:var(--red);border:1px solid rgba(192,57,43,.2)}
  .btn-danger:hover{background:#fbd6d3}
  .btn-sm{padding:6px 14px;font-size:13px}
  .btn-icon{width:34px;height:34px;padding:0;display:inline-flex;align-items:center;justify-content:center;border-radius:8px}
  .btn-hero-primary{background:var(--white);color:var(--g600);font-weight:600;padding:10px 22px;border-radius:var(--radius);border:none;cursor:pointer;font-family:var(--font-body);font-size:14px;display:inline-flex;align-items:center;gap:6px;transition:all .15s}
  .btn-hero-primary:hover{background:var(--g100);transform:translateY(-1px)}
  .btn-hero-ghost{background:rgba(255,255,255,.12);color:var(--white);padding:10px 22px;border-radius:var(--radius);border:1px solid rgba(255,255,255,.25);cursor:pointer;font-family:var(--font-body);font-size:14px;display:inline-flex;align-items:center;gap:6px;transition:all .15s}
  .btn-hero-ghost:hover{background:rgba(255,255,255,.2)}

  /* BADGES */
  .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:100px;font-size:12px;font-weight:500}
  .badge-green{background:var(--g100);color:var(--g600)}
  .badge-amber{background:var(--amber-lt);color:var(--amber)}
  .badge-red{background:var(--red-lt);color:var(--red)}
  .badge-slate{background:var(--slate-lt);color:var(--slate-md)}
  .badge-gold{background:var(--gold-lt);color:var(--gold-dk)}

  /* GRIDS */
  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
  .grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.5rem}
  .grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}

  /* HOME */
  .hero-banner{background:linear-gradient(135deg,var(--g600) 0%,var(--g700) 60%,var(--g800) 100%);border-radius:var(--radius-xl);padding:2.5rem;margin-bottom:2rem;overflow:hidden;position:relative}
  .hero-banner::before{content:"";position:absolute;top:-40px;right:-40px;width:280px;height:280px;border-radius:50%;background:rgba(255,255,255,.04);pointer-events:none}
  .hero-banner::after{content:"";position:absolute;bottom:-60px;right:80px;width:180px;height:180px;border-radius:50%;background:rgba(255,255,255,.03);pointer-events:none}
  .hero-greeting{font-size:13px;color:rgba(255,255,255,.6);letter-spacing:.5px;margin-bottom:4px}
  .hero-name{font-family:var(--font-display);font-size:34px;color:var(--white);margin-bottom:1rem}
  .hero-name em{color:var(--g200);font-style:normal}
  .hero-stats{display:flex;gap:2rem;margin-top:1.5rem}
  .hero-stat-val{font-family:var(--font-display);font-size:28px;color:var(--white)}
  .hero-stat-label{font-size:12px;color:rgba(255,255,255,.55);margin-top:2px}
  .hero-stat-divider{width:1px;background:rgba(255,255,255,.15)}
  .hero-cta{margin-top:1.75rem;display:flex;gap:10px}

  .alert-strip{background:var(--amber-lt);border:1px solid rgba(230,126,34,.3);border-radius:var(--radius);padding:.75rem 1rem;display:flex;align-items:center;gap:10px;margin-bottom:1.5rem}
  .alert-strip svg{width:18px;height:18px;color:var(--amber);flex-shrink:0}
  .alert-strip-text{font-size:13.5px;color:#7a4a0a;flex:1}
  .alert-strip-text strong{font-weight:600}

  .upcoming-item{display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid var(--border);transition:all .15s;cursor:pointer}
  .upcoming-item:last-child{border-bottom:none;padding-bottom:0}
  .upcoming-item:hover{padding-left:6px}
  .pay-icon{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
  .pay-meta{flex:1}
  .pay-name{font-size:15px;font-weight:500}
  .pay-detail{font-size:13px;color:var(--text-muted);margin-top:2px;display:flex;align-items:center;gap:4px}
  .pay-amount{font-family:var(--font-display);font-size:18px;color:var(--text);text-align:right}
  .pay-due{font-size:12px;color:var(--text-hint);text-align:right;margin-top:2px}

  /* MINI CALENDAR */
  .mini-cal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
  .mini-cal-title{font-weight:600;font-size:15px}
  .mini-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px}
  .mini-cal-day-name{text-align:center;font-size:11px;color:var(--text-hint);font-weight:500;padding:4px 0}
  .mini-cal-day{text-align:center;font-size:13px;padding:6px 2px;border-radius:8px;cursor:pointer;transition:all .1s;color:var(--text-muted);position:relative}
  .mini-cal-day:hover{background:var(--g50);color:var(--g500)}
  .mini-cal-day.today{background:var(--g500);color:var(--white);font-weight:600}
  .mini-cal-day.has-payment{color:var(--text)}
  .mini-cal-day.has-payment::after{content:"";position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:4px;height:4px;background:var(--g400);border-radius:50%}
  .mini-cal-day.past{color:var(--text-hint)}

  /* STAT CARDS */
  .stat-card{background:var(--white);border-radius:var(--radius-lg);border:1px solid var(--border);padding:1.25rem 1.5rem}
  .stat-card-label{font-size:12px;color:var(--text-hint);font-weight:500;letter-spacing:.5px;text-transform:uppercase}
  .stat-card-val{font-family:var(--font-display);font-size:28px;color:var(--text);margin:6px 0 4px}
  .stat-card-sub{font-size:13px;color:var(--text-muted)}
  .stat-card-sub.up{color:var(--g500)}
  .stat-card-sub.down{color:var(--red)}
  .stat-card-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:10px}
  .stat-card-icon svg{width:20px;height:20px}

  /* DASHBOARD */
  .donut-wrap{position:relative;display:flex;align-items:center;justify-content:center}
  .donut-center{position:absolute;text-align:center}
  .donut-center-val{font-family:var(--font-display);font-size:22px;color:var(--text)}
  .donut-center-label{font-size:11px;color:var(--text-hint);margin-top:2px}
  .category-item{display:flex;align-items:center;gap:10px;padding:8px 0}
  .category-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
  .category-name{font-size:14px;flex:1}
  .category-amount{font-size:14px;font-weight:500}
  .spend-bar-wrap{margin-bottom:10px}
  .spend-bar-top{display:flex;justify-content:space-between;margin-bottom:4px}
  .spend-bar-name{font-size:13px}
  .spend-bar-val{font-size:13px;font-weight:500}
  .spend-bar-track{height:8px;background:var(--border);border-radius:100px;overflow:hidden}
  .spend-bar-fill{height:100%;border-radius:100px;transition:width .5s ease}
  .next-payment-card{background:var(--g50);border:1px solid var(--g200);border-radius:var(--radius-lg);padding:1.25rem;display:flex;align-items:center;gap:14px}
  .next-countdown{background:var(--g500);color:var(--white);border-radius:12px;padding:10px 16px;text-align:center;flex-shrink:0}
  .next-countdown-days{font-family:var(--font-display);font-size:28px;line-height:1}
  .next-countdown-label{font-size:11px;opacity:.8;margin-top:2px}
  .recent-item{display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--border)}
  .recent-item:last-child{border-bottom:none}
  .recent-amount{font-weight:600;font-size:15px;margin-left:auto}
  .recent-status{font-size:12px;color:var(--text-hint)}

  /* HISTORY */
  .filter-row{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:1.5rem}
  .filter-select{padding:8px 14px;border-radius:var(--radius);border:1px solid var(--border-md);font-family:var(--font-body);font-size:13px;background:var(--white);color:var(--text);cursor:pointer;outline:none}
  .filter-select:focus{border-color:var(--g400)}
  .search-box{display:flex;align-items:center;gap:8px;background:var(--white);border:1px solid var(--border-md);border-radius:var(--radius);padding:8px 14px;flex:1}
  .search-box svg{width:15px;height:15px;color:var(--text-hint);flex-shrink:0}
  .search-box input{border:none;outline:none;font-family:var(--font-body);font-size:13px;background:transparent;width:100%}
  .hist-table{width:100%;border-collapse:collapse}
  .hist-table th{text-align:left;padding:10px 16px;font-size:12px;font-weight:600;color:var(--text-hint);letter-spacing:.5px;text-transform:uppercase;border-bottom:1px solid var(--border);background:var(--slate-lt)}
  .hist-table td{padding:14px 16px;border-bottom:1px solid var(--border);font-size:14px}
  .hist-table tr:last-child td{border-bottom:none}
  .hist-table tr:hover td{background:var(--g50)}
  .summary-strip{display:flex;gap:1px;border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--border);margin-bottom:1.5rem}
  .summary-strip-item{flex:1;background:var(--white);padding:1rem;text-align:center;border-right:1px solid var(--border)}
  .summary-strip-item:last-child{border-right:none}
  .summary-strip-val{font-family:var(--font-display);font-size:20px;color:var(--text)}
  .summary-strip-label{font-size:12px;color:var(--text-hint);margin-top:3px}

  /* SCHEDULER */
  .form-group{margin-bottom:1.25rem}
  .form-label{display:block;font-size:13px;font-weight:500;color:var(--text-muted);margin-bottom:6px}
  .form-input,.form-select,.form-textarea{width:100%;padding:10px 14px;border-radius:var(--radius);border:1.5px solid var(--border-md);font-family:var(--font-body);font-size:14px;background:var(--white);color:var(--text);outline:none;transition:border-color .15s}
  .form-input:focus,.form-select:focus,.form-textarea:focus{border-color:var(--g400)}
  .form-textarea{resize:vertical;min-height:80px}
  .form-hint{font-size:12px;color:var(--text-hint);margin-top:4px}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
  .form-row-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem}
  .amount-input-wrap{position:relative}
  .amount-currency{position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:16px;font-weight:600;color:var(--g500)}
  .amount-input{padding-left:34px!important;font-size:20px!important;font-weight:500!important}
  .frequency-pills{display:flex;gap:8px;flex-wrap:wrap}
  .freq-pill{padding:8px 16px;border-radius:100px;border:1.5px solid var(--border-md);background:var(--white);font-size:13px;cursor:pointer;transition:all .15s;font-family:var(--font-body);color:var(--text-muted)}
  .freq-pill:hover{border-color:var(--g400);color:var(--g500)}
  .freq-pill.selected{background:var(--g500);color:var(--white);border-color:var(--g500)}
  .category-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
  .cat-card{border:1.5px solid var(--border);border-radius:var(--radius);padding:12px 8px;text-align:center;cursor:pointer;transition:all .15s;background:var(--white)}
  .cat-card:hover{border-color:var(--g400);background:var(--g50)}
  .cat-card.selected{border-color:var(--g500);background:var(--g50)}
  .cat-card-emoji{font-size:24px;margin-bottom:4px}
  .cat-card-name{font-size:12px;color:var(--text-muted)}
  .cat-card.selected .cat-card-name{color:var(--g600);font-weight:500}
  .reminder-row{display:flex;align-items:center;gap:10px;margin-bottom:10px}
  .toggle{width:42px;height:24px;border-radius:100px;background:var(--border);position:relative;cursor:pointer;transition:background .2s;flex-shrink:0;border:none}
  .toggle.on{background:var(--g500)}
  .toggle::after{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:var(--white);transition:left .2s;box-shadow:0 1px 4px rgba(0,0,0,.2)}
  .toggle.on::after{left:21px}
  .toggle-label{font-size:14px}
  .preview-card{background:var(--g50);border:1.5px dashed var(--g200);border-radius:var(--radius-lg);padding:1.5rem;text-align:center}
  .preview-amount{font-family:var(--font-display);font-size:40px;color:var(--g600)}
  .preview-name{font-size:16px;color:var(--text-muted);margin-top:4px}
  .preview-schedule{font-size:13px;color:var(--text-hint);margin-top:8px;display:flex;align-items:center;justify-content:center;gap:6px}
  .scheduled-item{display:flex;align-items:center;gap:14px;padding:1rem 1.25rem;border-radius:var(--radius);border:1px solid var(--border);background:var(--white);margin-bottom:10px;transition:box-shadow .15s}
  .scheduled-item:hover{box-shadow:var(--shadow)}
  .scheduled-actions{display:flex;gap:6px;margin-left:auto}

  /* NOTIF PANEL */
  .notif-panel{position:fixed;top:70px;right:2rem;width:320px;background:var(--white);border-radius:var(--radius-lg);border:1px solid var(--border);box-shadow:var(--shadow-md);z-index:200;animation:fadeIn .2s ease}
  .notif-header{padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}
  .notif-header h3{font-size:15px;font-weight:600}
  .notif-item{padding:12px 1.25rem;border-bottom:1px solid var(--border);display:flex;gap:10px}
  .notif-item:last-child{border-bottom:none}
  .notif-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:5px}
  .notif-text{font-size:13px;line-height:1.5}
  .notif-time{font-size:11px;color:var(--text-hint);margin-top:2px}

  /* TOAST */
  .toast{position:fixed;bottom:2rem;right:2rem;background:var(--g700);color:var(--white);padding:12px 20px;border-radius:var(--radius);font-size:14px;font-weight:500;box-shadow:var(--shadow-md);z-index:300;display:flex;align-items:center;gap:8px;animation:slideUp .3s ease}
  @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

  /* MODAL */
  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:250;display:flex;align-items:center;justify-content:center;animation:fadeIn .2s ease}
  .modal{background:var(--white);border-radius:var(--radius-xl);padding:2rem;width:480px;max-width:90vw;box-shadow:var(--shadow-md)}
  .modal-title{font-family:var(--font-display);font-size:22px;margin-bottom:1.25rem}
  .modal-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:1.5rem}

  /* TABS */
  .tab-row{display:flex;border-bottom:1px solid var(--border);margin-bottom:1.5rem}
  .tab-item{padding:10px 20px;font-size:14px;font-weight:500;cursor:pointer;color:var(--text-muted);border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .15s}
  .tab-item:hover{color:var(--g500)}
  .tab-item.active{color:var(--g500);border-bottom-color:var(--g500)}

  /* FOOTER */
  .pf-footer{background:#0c3820;font-family:"DM Sans",system-ui,sans-serif;color:rgba(255,255,255,.75)}
  .pf-newsletter{background:#1e6e3f;border-bottom:1px solid rgba(255,255,255,.08);padding:2rem 2.5rem;display:flex;align-items:center;gap:2rem;flex-wrap:wrap}
  .pf-newsletter-label{flex:1;min-width:220px}
  .pf-newsletter-label h3{font-size:16px;font-weight:600;color:#fff;margin-bottom:4px}
  .pf-newsletter-label p{font-size:13px;color:rgba(255,255,255,.6)}
  .pf-newsletter-form{display:flex;gap:8px;flex:1;min-width:260px;max-width:420px}
  .pf-newsletter-form input{flex:1;padding:9px 14px;border-radius:8px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:#fff;font-size:13px;font-family:inherit;outline:none}
  .pf-newsletter-form input::placeholder{color:rgba(255,255,255,.35)}
  .pf-newsletter-form button{padding:9px 18px;background:#4caf78;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;white-space:nowrap;transition:background .15s}
  .pf-newsletter-form button:hover{background:#2d8f57}
  .pf-main{padding:3rem 2.5rem 2rem;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:2.5rem}
  .pf-logo{display:flex;align-items:center;gap:10px;margin-bottom:1rem}
  .pf-logo-icon{width:38px;height:38px;background:#4caf78;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  .pf-logo-name{font-size:20px;font-weight:700;color:#fff;letter-spacing:-.3px;line-height:1}
  .pf-logo-sub{font-size:10px;color:rgba(255,255,255,.45);letter-spacing:1.5px;text-transform:uppercase}
  .pf-tagline{font-size:13px;line-height:1.7;color:rgba(255,255,255,.55);margin-bottom:1.25rem;max-width:260px}
  .pf-socials{display:flex;gap:8px;margin-top:1rem}
  .pf-social{width:34px;height:34px;border-radius:8px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s}
  .pf-social:hover{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.3)}
  .pf-social svg{width:15px;height:15px;color:#fff}
  .pf-col-title{font-size:13px;font-weight:600;color:#fff;margin-bottom:1rem;letter-spacing:.2px}
  .pf-link-list{list-style:none;display:flex;flex-direction:column;gap:8px}
  .pf-link-list li a{font-size:13px;color:rgba(255,255,255,.55);text-decoration:none;transition:color .15s}
  .pf-link-list li a:hover{color:#4caf78}
  .pf-contact-item{display:flex;align-items:flex-start;gap:8px;margin-bottom:10px}
  .pf-contact-item svg{width:14px;height:14px;color:#4caf78;flex-shrink:0;margin-top:2px}
  .pf-contact-text{font-size:13px;color:rgba(255,255,255,.55);line-height:1.5}
  .pf-divider{height:1px;background:rgba(255,255,255,.08);margin:0 2.5rem}
  .pf-bottom{padding:1.5rem 2.5rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}
  .pf-copy{font-size:13px;color:rgba(255,255,255,.4)}
  .pf-legal-links{display:flex;gap:1rem;margin-top:6px}
  .pf-legal-links a{font-size:12px;color:rgba(255,255,255,.35);text-decoration:none;transition:color .15s}
  .pf-legal-links a:hover{color:#4caf78}
  .pf-reg{font-size:12px;color:rgba(255,255,255,.3)}
  .pf-badges{display:flex;flex-direction:column;gap:8px;margin-top:1rem}
  .pf-badge{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px}
  .pf-badge svg{width:16px;height:16px;color:#4caf78;flex-shrink:0}
  .pf-badge-text{font-size:12px;color:rgba(255,255,255,.6);line-height:1.4}
  .pf-badge-text strong{display:block;color:#fff;font-size:12px}

  @media(max-width:900px){.grid-4{grid-template-columns:1fr 1fr}.grid-2{grid-template-columns:1fr}.pf-main{grid-template-columns:1fr 1fr}.form-row-3{grid-template-columns:1fr 1fr}}
  @media(max-width:600px){.container{padding:1rem}.nav{padding:0 1rem}.nav-tab span{display:none}.grid-4{grid-template-columns:1fr 1fr}.category-grid{grid-template-columns:repeat(3,1fr)}.hero-stats{gap:1rem}.hero-stat-val{font-size:22px}.form-row{grid-template-columns:1fr}.pf-main{grid-template-columns:1fr}.pf-newsletter{flex-direction:column}}
`;

/* ─── data ─── */
const INITIAL_SCHEDULES = [
  {
    id: 1,
    name: "Electricity Bill (EKEDC)",
    cat: "Utilities",
    icon: "⚡",
    color: "#e8f5e9",
    amount: 15000,
    freq: "Monthly",
    nextDue: "May 1, 2026",
    method: "Digital Wallet",
    status: "Active",
    auto: true,
  },
  {
    id: 2,
    name: "DSTV Subscription",
    cat: "Subscriptions",
    icon: "📺",
    color: "#fff3e0",
    amount: 8500,
    freq: "Monthly",
    nextDue: "Apr 28, 2026",
    method: "Auto-debit",
    status: "Active",
    auto: true,
  },
  {
    id: 3,
    name: "School Fees – 3rd Term",
    cat: "School Fees",
    icon: "🏫",
    color: "#e3f2fd",
    amount: 120000,
    freq: "Termly",
    nextDue: "May 3, 2026",
    method: "Bank Transfer",
    status: "Active",
    auto: false,
  },
  {
    id: 4,
    name: "GTBank Loan Repayment",
    cat: "Loans",
    icon: "🏦",
    color: "#fce4ec",
    amount: 35000,
    freq: "Monthly",
    nextDue: "May 5, 2026",
    method: "Auto-debit",
    status: "Active",
    auto: true,
  },
  {
    id: 5,
    name: "MTN Data Plan",
    cat: "Internet",
    icon: "📱",
    color: "#f3e5f5",
    amount: 5000,
    freq: "Monthly",
    nextDue: "May 7, 2026",
    method: "Airtime",
    status: "Paused",
    auto: false,
  },
  {
    id: 6,
    name: "Water Bill (LCC)",
    cat: "Utilities",
    icon: "💧",
    color: "#e1f5fe",
    amount: 6000,
    freq: "Monthly",
    nextDue: "May 10, 2026",
    method: "Bank Transfer",
    status: "Active",
    auto: false,
  },
  {
    id: 7,
    name: "Home Insurance",
    cat: "Insurance",
    icon: "🛡️",
    color: "#f3e5f5",
    amount: 18000,
    freq: "Quarterly",
    nextDue: "Jun 1, 2026",
    method: "Bank Transfer",
    status: "Active",
    auto: false,
  },
  {
    id: 8,
    name: "Rent (2BHK, Lekki)",
    cat: "Rent",
    icon: "🏠",
    color: "#fff8e1",
    amount: 350000,
    freq: "Annually",
    nextDue: "Jan 1, 2027",
    method: "Bank Transfer",
    status: "Active",
    auto: false,
  },
];

const HISTORY = [
  {
    id: 1,
    name: "Electricity Bill (EKEDC)",
    cat: "Utilities",
    amount: 15000,
    date: "Apr 1, 2026",
    method: "Digital Wallet",
    status: "Successful",
  },
  {
    id: 2,
    name: "DSTV Subscription",
    cat: "Subscriptions",
    amount: 8500,
    date: "Mar 28, 2026",
    method: "Auto-debit",
    status: "Successful",
  },
  {
    id: 3,
    name: "School Fees – 2nd Term",
    cat: "School Fees",
    amount: 120000,
    date: "Jan 3, 2026",
    method: "Bank Transfer",
    status: "Successful",
  },
  {
    id: 4,
    name: "GTBank Loan",
    cat: "Loans",
    amount: 35000,
    date: "Apr 5, 2026",
    method: "Auto-debit",
    status: "Successful",
  },
  {
    id: 5,
    name: "MTN Data Plan",
    cat: "Internet",
    amount: 5000,
    date: "Apr 7, 2026",
    method: "Airtime",
    status: "Successful",
  },
  {
    id: 6,
    name: "Water Bill",
    cat: "Utilities",
    amount: 6000,
    date: "Apr 10, 2026",
    method: "Bank Transfer",
    status: "Successful",
  },
  {
    id: 7,
    name: "Netflix Subscription",
    cat: "Subscriptions",
    amount: 4500,
    date: "Apr 12, 2026",
    method: "Card",
    status: "Failed",
  },
  {
    id: 8,
    name: "House Rent",
    cat: "Rent",
    amount: 350000,
    date: "Jan 1, 2026",
    method: "Bank Transfer",
    status: "Successful",
  },
  {
    id: 9,
    name: "Airtel Airtime",
    cat: "Internet",
    amount: 3000,
    date: "Mar 15, 2026",
    method: "Airtime",
    status: "Successful",
  },
  {
    id: 10,
    name: "Home Insurance",
    cat: "Insurance",
    amount: 18000,
    date: "Mar 1, 2026",
    method: "Bank Transfer",
    status: "Pending",
  },
];

/* ─── SVG icons ─── */
const Icon = ({ d, w = 15, h = 15, ...p }) => (
  <svg
    width={w}
    height={h}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <path d={d} />
  </svg>
);
const HomeIcon = () => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const DashIcon = () => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);
const HistIcon = () => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="15" x2="15" y2="15" />
    <line x1="9" y1="11" x2="15" y2="11" />
  </svg>
);
const SchedIcon = () => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const BellIcon = () => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);
const ClockLogo = () => (
  <svg
    width={22}
    height={22}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1e6e3f"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);
const CheckIcon = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const EditIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const PauseIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);
const PlayIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const XIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const PlusIcon = () => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const AlertIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const StarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--g500)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const WalletIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--g500)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <path d="M12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
  </svg>
);
const CheckCircleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--amber)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const BarsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--g500)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const ShieldIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const MapPinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" />
  </svg>
);
const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

/* ─── mini components ─── */
const Badge = ({ variant, children }) => (
  <span className={`badge badge-${variant}`}>{children}</span>
);

const Toggle = ({ on, onClick }) => (
  <button className={`toggle${on ? " on" : ""}`} onClick={onClick} />
);

function Toast({ msg, onHide }) {
  useEffect(() => {
    const t = setTimeout(onHide, 3000);
    return () => clearTimeout(t);
  }, [onHide]);
  return (
    <div className="toast">
      <CheckIcon />
      <span>{msg}</span>
    </div>
  );
}

/* ─── Calendar ─── */
function MiniCalendar() {
  const payDays = [1, 3, 5, 7, 10, 12, 15, 20];
  const startDay = 5; // May 2026 starts Friday
  const prevDays = Array.from({ length: startDay }, (_, i) => ({
    day: 25 + i,
    type: "past",
  }));
  const days = Array.from({ length: 31 }, (_, i) => {
    const d = i + 1;
    return {
      day: d,
      type: d === 1 ? "today" : payDays.includes(d) ? "has-payment" : "",
    };
  });
  return (
    <div>
      <div className="mini-cal-grid">
        {["S", "M", "T", "W", "T", "F", "S"].map((n, i) => (
          <div key={i} className="mini-cal-day-name">
            {n}
          </div>
        ))}
      </div>
      <div className="mini-cal-grid" style={{ marginTop: 2 }}>
        {prevDays.map((d, i) => (
          <div key={i} className="mini-cal-day past">
            {d.day}
          </div>
        ))}
        {days.map((d) => (
          <div key={d.day} className={`mini-cal-day ${d.type}`}>
            {d.day}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── HOME PAGE ─── */
function HomePage({ onNav, showToast }) {
  return (
    <div className="container page-enter">
      <div className="hero-banner" style={{ position: "relative" }}>
        <div className="hero-greeting">Good morning 👋</div>
        <div className="hero-name">
          Welcome back, <em>Adaeze</em>
        </div>
        <div style={{ color: "rgba(255,255,255,.7)", fontSize: 14 }}>
          Your finances are on track. 3 payments due this week.
        </div>
        <div className="hero-stats">
          <div>
            <div className="hero-stat-val">₦241,500</div>
            <div className="hero-stat-label">Scheduled This Month</div>
          </div>
          <div className="hero-stat-divider" />
          <div>
            <div className="hero-stat-val">₦156,200</div>
            <div className="hero-stat-label">Paid So Far</div>
          </div>
          <div className="hero-stat-divider" />
          <div>
            <div className="hero-stat-val">12</div>
            <div className="hero-stat-label">Active Schedules</div>
          </div>
        </div>
        <div className="hero-cta">
          <button
            className="btn-hero-primary"
            onClick={() => onNav("scheduler")}
          >
            <PlusIcon /> New Schedule
          </button>
          <button className="btn-hero-ghost" onClick={() => onNav("dashboard")}>
            View Dashboard →
          </button>
        </div>
      </div>

      <div className="alert-strip">
        <AlertIcon />
        <div className="alert-strip-text">
          <strong>Reminder:</strong> DSTV Subscription of ₦8,500 is due in 2
          days. Ensure sufficient wallet balance to avoid failed payments.
        </div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => showToast("DSTV payment reminder snoozed for 1 day")}
        >
          Snooze
        </button>
      </div>

      <div className="grid-4" style={{ marginBottom: "2rem" }}>
        {[
          {
            label: "Due This Week",
            val: "₦58,500",
            sub: "3 payments pending",
            icon: <StarIcon />,
          },
          {
            label: "Wallet Balance",
            val: "₦187,400",
            sub: "Sufficient ✓",
            subClass: "up",
            icon: <WalletIcon />,
          },
          {
            label: "Completed This Month",
            val: "8",
            sub: "₦156,200 paid",
            icon: <CheckCircleIcon />,
          },
          {
            label: "Savings Rate",
            val: "34%",
            sub: "↑ 4% from last month",
            subClass: "up",
            icon: <BarsIcon />,
          },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div
              className="stat-card-icon"
              style={{
                background: i === 2 ? "var(--amber-lt)" : "var(--g100)",
              }}
            >
              {s.icon}
            </div>
            <div className="stat-card-label">{s.label}</div>
            <div className="stat-card-val">{s.val}</div>
            <div className={`stat-card-sub ${s.subClass || ""}`}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <div className="section-label">Upcoming Payments</div>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => onNav("scheduler")}
            >
              View All
            </button>
          </div>
          {[
            {
              icon: "⚡",
              bg: "#e8f5e9",
              name: "Electricity Bill (EKEDC)",
              detail: "Monthly · Digital Wallet",
              badgeVariant: "amber",
              badgeText: "Due Soon",
              amount: "₦15,000",
              due: "May 1, 2026",
            },
            {
              icon: "📺",
              bg: "#fff3e0",
              name: "DSTV Subscription",
              detail: "Monthly · Auto-debit",
              badgeVariant: "red",
              badgeText: "2 Days",
              amount: "₦8,500",
              due: "Apr 28, 2026",
            },
            {
              icon: "🏫",
              bg: "#e3f2fd",
              name: "School Fees – 3rd Term",
              detail: "Termly · Bank Transfer",
              amount: "₦120,000",
              due: "May 3, 2026",
            },
            {
              icon: "🏦",
              bg: "#fce4ec",
              name: "GTBank Loan Repayment",
              detail: "Monthly · Auto-debit",
              amount: "₦35,000",
              due: "May 5, 2026",
            },
            {
              icon: "📱",
              bg: "#f3e5f5",
              name: "MTN Data Plan",
              detail: "Monthly · Airtime",
              amount: "₦5,000",
              due: "May 7, 2026",
            },
          ].map((p, i) => (
            <div key={i} className="upcoming-item">
              <div className="pay-icon" style={{ background: p.bg }}>
                {p.icon}
              </div>
              <div className="pay-meta">
                <div className="pay-name">{p.name}</div>
                <div className="pay-detail">
                  {p.detail}
                  {p.badgeText && (
                    <Badge variant={p.badgeVariant}>{p.badgeText}</Badge>
                  )}
                </div>
              </div>
              <div>
                <div className="pay-amount">{p.amount}</div>
                <div className="pay-due">{p.due}</div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <div className="card">
            <div className="section-label">Payment Calendar — May 2026</div>
            <MiniCalendar />
          </div>
          <div className="card">
            <div className="section-label">Wallet Health Check</div>
            {[
              { label: "Available Balance", val: "₦187,400", valStyle: {} },
              {
                label: "Scheduled Outflow",
                val: "— ₦183,500",
                valStyle: { color: "var(--amber)" },
              },
            ].map((r, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    color: i ? "var(--text-muted)" : undefined,
                  }}
                >
                  {r.label}
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, ...r.valStyle }}>
                  {r.val}
                </span>
              </div>
            ))}
            <div
              style={{
                height: 1,
                background: "var(--border)",
                margin: "10px 0",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>
                Projected Balance
              </span>
              <span
                style={{ fontSize: 14, fontWeight: 600, color: "var(--g500)" }}
              >
                ₦3,900
              </span>
            </div>
            <div
              style={{
                background: "var(--amber-lt)",
                border: "1px solid rgba(230,126,34,.3)",
                borderRadius: 8,
                padding: "10px 12px",
                marginTop: 12,
                fontSize: 13,
                color: "#7a4a0a",
              }}
            >
              ⚠️ Balance will be low after scheduled payments. Consider topping
              up.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── DASHBOARD PAGE ─── */
function DashboardPage({ showToast }) {
  const barHeights = [55, 70, 60, 80, 90, 100];
  const barColors = [
    "var(--g200)",
    "var(--g200)",
    "var(--g400)",
    "var(--g400)",
    "var(--g500)",
    "var(--g600)",
  ];
  const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];

  return (
    <div className="container page-enter">
      <div className="page-header">
        <div className="page-title">
          Payment <span>Dashboard</span>
        </div>
        <div className="page-subtitle">
          Real-time overview of your payment activity — April 2026
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: "2rem" }}>
        {[
          {
            label: "Total Scheduled",
            val: "₦241,500",
            sub: "12 active plans",
            border: "var(--g500)",
          },
          {
            label: "Paid This Month",
            val: "₦156,200",
            sub: "↑ 12% vs last month",
            subClass: "up",
            border: "var(--g400)",
          },
          {
            label: "Pending",
            val: "₦85,300",
            sub: "4 payments left",
            border: "var(--amber)",
          },
          {
            label: "Overdue",
            val: "₦0",
            sub: "All clear ✓",
            subClass: "up",
            border: "var(--red)",
          },
        ].map((s, i) => (
          <div
            key={i}
            className="stat-card"
            style={{ borderLeft: `4px solid ${s.border}` }}
          >
            <div className="stat-card-label">{s.label}</div>
            <div className="stat-card-val">{s.val}</div>
            <div className={`stat-card-sub ${s.subClass || ""}`}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: "2rem" }}>
        <div className="card">
          <div className="section-label">Spending by Category</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              marginTop: "1rem",
            }}
          >
            <div className="donut-wrap">
              <svg width={150} height={150} viewBox="0 0 150 150">
                <circle
                  cx={75}
                  cy={75}
                  r={55}
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth={22}
                />
                {[
                  { color: "#1e6e3f", da: "137 208", offset: "52" },
                  { color: "#4caf78", da: "63 282", offset: "-85" },
                  { color: "#c8973a", da: "47 298", offset: "-148" },
                  { color: "#e67e22", da: "30 315", offset: "-195" },
                  { color: "#c0392b", da: "23 322", offset: "-225" },
                ].map((s, i) => (
                  <circle
                    key={i}
                    cx={75}
                    cy={75}
                    r={55}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={22}
                    strokeDasharray={s.da}
                    strokeDashoffset={`-${s.offset.replace("-", "")}`}
                  />
                ))}
              </svg>
              <div className="donut-center">
                <div className="donut-center-val">₦241k</div>
                <div className="donut-center-label">Total</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              {[
                { color: "#1e6e3f", name: "School Fees", amount: "₦120k" },
                { color: "#4caf78", name: "Loans", amount: "₦35k" },
                { color: "#c8973a", name: "Utilities", amount: "₦27k" },
                { color: "#e67e22", name: "Subscriptions", amount: "₦15k" },
                { color: "#c0392b", name: "Others", amount: "₦9.5k" },
              ].map((c, i) => (
                <div key={i} className="category-item">
                  <div
                    className="category-dot"
                    style={{ background: c.color }}
                  />
                  <div className="category-name">{c.name}</div>
                  <div className="category-amount">{c.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="section-label">6-Month Trend</div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 10,
              height: 140,
              marginTop: "1.5rem",
              paddingBottom: 8,
              borderBottom: "1px solid var(--border)",
            }}
          >
            {barHeights.map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    background: barColors[i],
                    borderRadius: "6px 6px 0 0",
                    width: "100%",
                    height: Math.round((h / 100) * 120),
                    position: "relative",
                  }}
                >
                  {i === 5 && (
                    <div
                      style={{
                        position: "absolute",
                        top: -22,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: 10,
                        color: "var(--g600)",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      ₦241k
                    </div>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: i === 5 ? "var(--g600)" : "var(--text-hint)",
                    fontWeight: i === 5 ? 600 : 400,
                  }}
                >
                  {months[i]}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <span style={{ fontSize: 12, color: "var(--text-hint)" }}>₦0</span>
            <span style={{ fontSize: 12, color: "var(--text-hint)" }}>
              ₦300k
            </span>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="section-label">Next Due Payment</div>
          <div className="next-payment-card" style={{ marginTop: "1rem" }}>
            <div className="next-countdown">
              <div className="next-countdown-days">2</div>
              <div className="next-countdown-label">Days Left</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                DSTV Subscription
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  marginTop: 2,
                }}
              >
                Due: April 28, 2026 · Monthly
              </div>
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <Badge variant="amber">Auto-debit</Badge>
                <Badge variant="slate">Digital Wallet</Badge>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 24,
                  color: "var(--g600)",
                }}
              >
                ₦8,500
              </div>
              <button
                className="btn btn-primary btn-sm"
                style={{ marginTop: 8 }}
                onClick={() => showToast("DSTV payment initiated!")}
              >
                Pay Now
              </button>
            </div>
          </div>

          <div style={{ marginTop: "1.25rem" }}>
            <div className="section-label">Upcoming Queue</div>
            {[
              {
                icon: "⚡",
                bg: "#e8f5e9",
                name: "Electricity (EKEDC)",
                date: "May 1 · ₦15,000",
                days: "5 days",
                daysColor: "var(--amber)",
              },
              {
                icon: "🏫",
                bg: "#e3f2fd",
                name: "School Fees",
                date: "May 3 · ₦120,000",
                days: "7 days",
                daysColor: "var(--amber)",
              },
              {
                icon: "🏦",
                bg: "#fce4ec",
                name: "Loan Repayment",
                date: "May 5 · ₦35,000",
                days: "9 days",
                daysColor: "var(--text)",
              },
            ].map((r, i) => (
              <div key={i} className="recent-item">
                <div
                  className="pay-icon"
                  style={{ background: r.bg, fontSize: 16 }}
                >
                  {r.icon}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{r.name}</div>
                  <div className="recent-status">{r.date}</div>
                </div>
                <div className="recent-amount" style={{ color: r.daysColor }}>
                  {r.days}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="section-label">Monthly Spend Breakdown</div>
          <div style={{ marginTop: "1rem" }}>
            {[
              {
                name: "School Fees",
                val: "₦120,000",
                w: "49.7%",
                color: "var(--g600)",
              },
              {
                name: "Loan Repayment",
                val: "₦35,000",
                w: "14.5%",
                color: "var(--g500)",
              },
              {
                name: "Utilities",
                val: "₦27,000",
                w: "11.2%",
                color: "var(--g400)",
              },
              {
                name: "Internet (MTN)",
                val: "₦18,000",
                w: "7.5%",
                color: "var(--gold)",
              },
              { name: "DSTV", val: "₦8,500", w: "3.5%", color: "var(--amber)" },
              {
                name: "Water Bill",
                val: "₦6,000",
                w: "2.5%",
                color: "var(--slate-md)",
              },
              {
                name: "Other Subscriptions",
                val: "₦5,000",
                w: "2.1%",
                color: "var(--slate-md)",
              },
            ].map((b, i) => (
              <div key={i} className="spend-bar-wrap">
                <div className="spend-bar-top">
                  <span className="spend-bar-name">{b.name}</span>
                  <span className="spend-bar-val">{b.val}</span>
                </div>
                <div className="spend-bar-track">
                  <div
                    className="spend-bar-fill"
                    style={{ width: b.w, background: b.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: "1.5rem",
              paddingTop: "1rem",
              borderTop: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {[
              {
                label: "Auto-pay Success Rate",
                val: "98.2%",
                valColor: "var(--g500)",
              },
              { label: "Avg. Monthly Spend", val: "₦219k" },
              { label: "Schedules Active", val: "12" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 12, color: "var(--text-hint)" }}>
                  {s.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 24,
                    color: s.valColor || "var(--text)",
                  }}
                >
                  {s.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── HISTORY PAGE ─── */
function HistoryPage({ showToast }) {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = HISTORY.filter((h) => {
    if (search && !h.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (catFilter && h.cat !== catFilter) return false;
    if (statusFilter && h.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="container page-enter">
      <div className="page-header">
        <div className="page-title">
          Payment <span>History</span>
        </div>
        <div className="page-subtitle">
          Complete record of all processed payments
        </div>
      </div>

      <div className="summary-strip">
        {[
          { val: "₦1,842,600", label: "Total Paid (All Time)" },
          { val: "142", label: "Successful Payments", valColor: "var(--g500)" },
          { val: "3", label: "Failed / Retried", valColor: "var(--red)" },
          { val: "98.0%", label: "Success Rate", valColor: "var(--gold-dk)" },
        ].map((s, i) => (
          <div key={i} className="summary-strip-item">
            <div
              className="summary-strip-val"
              style={{ color: s.valColor || "var(--text)" }}
            >
              {s.val}
            </div>
            <div className="summary-strip-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="filter-row">
        <div className="search-box" style={{ maxWidth: 260 }}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search payments…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {[
            "Utilities",
            "Subscriptions",
            "School Fees",
            "Loans",
            "Internet",
            "Insurance",
            "Rent",
          ].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option>Successful</option>
          <option>Failed</option>
          <option>Pending</option>
        </select>
        <select className="filter-select">
          <option>All Months</option>
          <option>April 2026</option>
          <option>March 2026</option>
        </select>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => showToast("Exporting payment history as CSV…")}
        >
          ↓ Export CSV
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table className="hist-table">
          <thead>
            <tr>
              <th>Payment</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Method</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((h) => (
              <tr key={h.id}>
                <td style={{ fontWeight: 500 }}>{h.name}</td>
                <td>
                  <Badge variant="slate">{h.cat}</Badge>
                </td>
                <td
                  style={{ fontWeight: 600, fontFamily: "var(--font-display)" }}
                >
                  ₦{h.amount.toLocaleString()}
                </td>
                <td style={{ color: "var(--text-muted)" }}>{h.date}</td>
                <td style={{ color: "var(--text-muted)" }}>{h.method}</td>
                <td>
                  <Badge
                    variant={
                      h.status === "Successful"
                        ? "green"
                        : h.status === "Failed"
                          ? "red"
                          : "amber"
                    }
                  >
                    {h.status}
                  </Badge>
                </td>
                <td>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => showToast(`Receipt for ${h.name} opened.`)}
                  >
                    Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <div style={{ fontSize: 13, color: "var(--text-hint)" }}>
          Showing <strong>{filtered.length}</strong> of <strong>145</strong>{" "}
          records
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-ghost btn-sm">← Prev</button>
          <button className="btn btn-primary btn-sm">1</button>
          <button className="btn btn-ghost btn-sm">2</button>
          <button className="btn btn-ghost btn-sm">3</button>
          <button className="btn btn-ghost btn-sm">Next →</button>
        </div>
      </div>
    </div>
  );
}

/* ─── SCHEDULER PAGE ─── */
function SchedulerPage({ schedules, setSchedules, showToast }) {
  const [tab, setTab] = useState("create");
  const [freq, setFreq] = useState("Weekly");
  const [cat, setCat] = useState("Utilities");
  const [payName, setPayName] = useState("");
  const [payAmount, setPayAmount] = useState("");
  const [startDate, setStartDate] = useState("2026-05-01");
  const [payMethod, setPayMethod] = useState("Digital Wallet");
  const [modalSchedule, setModalSchedule] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [toggles, setToggles] = useState({
    inApp: true,
    email: true,
    sms: false,
    push: true,
    whatsapp: false,
  });

  const freqMult = {
    Daily: 365,
    Weekly: 52,
    "Bi-weekly": 26,
    Monthly: 12,
    Quarterly: 4,
    Termly: 3,
    Annually: 1,
  };
  const mult = freqMult[freq] || 12;
  const amt = parseFloat(payAmount) || 0;
  const annual = amt * mult;
  const dateStr = new Date(startDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  function handleSchedule() {
    if (!payName || !amt) {
      showToast("Please fill in payment name and amount.");
      return;
    }
    setSchedules((prev) => [
      {
        id: Date.now(),
        name: payName,
        cat,
        icon: "📋",
        color: "#f5f5f5",
        amount: amt,
        freq,
        nextDue: "May 1, 2026",
        method: payMethod,
        status: "Active",
        auto: false,
      },
      ...prev,
    ]);
    showToast(`✓ ${payName} scheduled successfully!`);
    setPayName("");
    setPayAmount("");
  }

  function togglePause(id) {
    setSchedules((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Active" ? "Paused" : "Active" }
          : s,
      ),
    );
    const s = schedules.find((x) => x.id === id);
    showToast(`${s.name} ${s.status === "Active" ? "paused" : "resumed"}.`);
  }

  function doCancel(id) {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
    setCancelTarget(null);
    showToast("Schedule cancelled.");
  }

  const catCards = [
    { emoji: "⚡", name: "Utilities", cat: "Utilities" },
    { emoji: "📺", name: "Subscriptions", cat: "Subscriptions" },
    { emoji: "🏫", name: "School Fees", cat: "School" },
    { emoji: "🏦", name: "Loans", cat: "Loans" },
    { emoji: "📶", name: "Internet", cat: "Internet" },
    { emoji: "🛡️", name: "Insurance", cat: "Insurance" },
    { emoji: "🏠", name: "Rent", cat: "Rent" },
    { emoji: "📦", name: "Other", cat: "Other" },
  ];

  return (
    <div className="container page-enter">
      <div className="page-header">
        <div className="page-title">
          Payment <span>Scheduler</span>
        </div>
        <div className="page-subtitle">
          Create, edit and manage all your recurring payment schedules
        </div>
      </div>

      <div className="tab-row">
        {["create", "manage", "reminders"].map((t) => (
          <div
            key={t}
            className={`tab-item${tab === t ? " active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t === "create"
              ? "+ Create New"
              : t === "manage"
                ? "Manage Schedules"
                : "Reminder Settings"}
          </div>
        ))}
      </div>

      {/* CREATE TAB */}
      {tab === "create" && (
        <div className="grid-2">
          <div className="card">
            <div
              style={{ fontSize: 16, fontWeight: 600, marginBottom: "1.25rem" }}
            >
              Schedule Details
            </div>

            <div className="form-group">
              <label className="form-label">Payment Name</label>
              <input
                className="form-input"
                type="text"
                placeholder="e.g. EKEDC Electricity Bill"
                value={payName}
                onChange={(e) => setPayName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <div className="category-grid">
                {catCards.map((c) => (
                  <div
                    key={c.cat}
                    className={`cat-card${cat === c.cat ? " selected" : ""}`}
                    onClick={() => setCat(c.cat)}
                  >
                    <div className="cat-card-emoji">{c.emoji}</div>
                    <div className="cat-card-name">{c.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Amount (₦)</label>
              <div className="amount-input-wrap">
                <span className="amount-currency">₦</span>
                <input
                  className="form-input amount-input"
                  type="number"
                  placeholder="0.00"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Payment Frequency</label>
              <div className="frequency-pills">
                {Object.keys(freqMult).map((f) => (
                  <button
                    key={f}
                    className={`freq-pill${freq === f ? " selected" : ""}`}
                    onClick={() => setFreq(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Start Date</label>
                <input
                  className="form-input"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Payment Method</label>
                <select
                  className="form-select"
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                >
                  <option>Digital Wallet</option>
                  <option>Auto-debit</option>
                  <option>Bank Transfer</option>
                  <option>Card</option>
                  <option>Airtime</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <div className="section-label">Reminder</div>
              <div className="reminder-row" style={{ marginTop: 8 }}>
                <Toggle on={true} onClick={() => {}} />
                <span className="toggle-label">
                  Send reminder 3 days before due date
                </span>
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{
                width: "100%",
                marginTop: "1.5rem",
                justifyContent: "center",
              }}
              onClick={handleSchedule}
            >
              <PlusIcon /> Schedule Payment
            </button>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div className="preview-card">
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "var(--text-hint)",
                  marginBottom: "1rem",
                }}
              >
                Live Preview
              </div>
              <div className="preview-amount">
                ₦
                {amt
                  ? amt.toLocaleString("en-NG", { minimumFractionDigits: 2 })
                  : "0.00"}
              </div>
              <div className="preview-name">{payName || "Payment Name"}</div>
              <div className="preview-schedule">
                <svg
                  width={13}
                  height={13}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                {freq} · Starting {dateStr}
              </div>
              <div
                style={{
                  marginTop: "1.5rem",
                  paddingTop: "1rem",
                  borderTop: "1px dashed var(--g200)",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-hint)",
                    letterSpacing: 1,
                  }}
                >
                  ANNUAL COST PROJECTION
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 28,
                    color: "var(--g600)",
                    marginTop: 4,
                  }}
                >
                  ₦{annual ? annual.toLocaleString() : "0"}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-hint)",
                    marginTop: 4,
                  }}
                >
                  {amt
                    ? `${mult}x per year = ₦${annual.toLocaleString()}`
                    : "Enter amount and frequency to calculate"}
                </div>
              </div>
            </div>

            <div
              className="card"
              style={{
                background: "var(--g50)",
                border: "1px solid var(--g200)",
              }}
            >
              <div className="section-label">💡 Smart Tips</div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                }}
              >
                <p style={{ marginBottom: 8 }}>
                  • Set auto-pay to avoid missed deadlines and late fees.
                </p>
                <p style={{ marginBottom: 8 }}>
                  • Monthly schedules are best for utility bills.
                </p>
                <p>
                  • Keep your wallet balance above ₦50,000 buffer before
                  auto-debit days.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MANAGE TAB */}
      {tab === "manage" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.25rem",
            }}
          >
            <div style={{ fontSize: 14, color: "var(--text-muted)" }}>
              {schedules.length} active schedules
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <select className="filter-select">
                <option>All Categories</option>
                <option>Utilities</option>
                <option>Subscriptions</option>
              </select>
              <select className="filter-select">
                <option>All Status</option>
                <option>Active</option>
                <option>Paused</option>
              </select>
            </div>
          </div>
          {schedules.map((s) => (
            <div key={s.id} className="scheduled-item">
              <div
                className="pay-icon"
                style={{ background: s.color, fontSize: 18 }}
              >
                {s.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{s.name}</div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    marginTop: 2,
                  }}
                >
                  {s.freq} · Next: {s.nextDue} · {s.method}
                </div>
              </div>
              <div style={{ textAlign: "right", marginRight: 12 }}>
                <div
                  style={{ fontFamily: "var(--font-display)", fontSize: 18 }}
                >
                  ₦{s.amount.toLocaleString()}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    display: "flex",
                    gap: 4,
                    justifyContent: "flex-end",
                  }}
                >
                  <Badge variant={s.status === "Active" ? "green" : "slate"}>
                    {s.status}
                  </Badge>
                  {s.auto && <Badge variant="gold">Auto</Badge>}
                </div>
              </div>
              <div className="scheduled-actions">
                <button
                  className="btn btn-ghost btn-icon btn-sm"
                  title="Edit"
                  onClick={() => {
                    setModalSchedule(s);
                  }}
                >
                  <EditIcon />
                </button>
                <button
                  className="btn btn-ghost btn-icon btn-sm"
                  title={s.status === "Active" ? "Pause" : "Resume"}
                  onClick={() => togglePause(s.id)}
                >
                  {s.status === "Active" ? <PauseIcon /> : <PlayIcon />}
                </button>
                <button
                  className="btn btn-danger btn-icon btn-sm"
                  title="Cancel"
                  onClick={() => setCancelTarget(s.id)}
                >
                  <XIcon />
                </button>
              </div>
            </div>
          ))}
          {schedules.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                color: "var(--text-hint)",
              }}
            >
              No schedules yet. Create one above.
            </div>
          )}
        </div>
      )}

      {/* REMINDERS TAB */}
      {tab === "reminders" && (
        <div className="grid-2">
          <div className="card">
            <div
              style={{ fontSize: 16, fontWeight: 600, marginBottom: "1.25rem" }}
            >
              Global Reminder Settings
            </div>
            <div className="form-group">
              <label className="form-label">Default Advance Notice</label>
              <select className="form-select" defaultValue="7 days before">
                <option>3 days before</option>
                <option>5 days before</option>
                <option>7 days before</option>
                <option>14 days before</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Reminder Time</label>
              <input className="form-input" type="time" defaultValue="08:00" />
              <div className="form-hint">
                Reminders will be sent at this time each day
              </div>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <div className="section-label">Notification Channels</div>
              <div style={{ marginTop: 12 }}>
                {[
                  { key: "inApp", label: "In-App Notifications" },
                  { key: "email", label: "Email Reminders" },
                  { key: "sms", label: "SMS Alerts (₦1.50/msg)" },
                  { key: "push", label: "Push Notifications" },
                  { key: "whatsapp", label: "WhatsApp Alerts (Beta)" },
                ].map((t) => (
                  <div key={t.key} className="reminder-row">
                    <Toggle
                      on={toggles[t.key]}
                      onClick={() =>
                        setToggles((prev) => ({
                          ...prev,
                          [t.key]: !prev[t.key],
                        }))
                      }
                    />
                    <span className="toggle-label">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="btn btn-primary"
              style={{ marginTop: "1.5rem" }}
              onClick={() => showToast("Reminder settings saved!")}
            >
              Save Settings
            </button>
          </div>

          <div className="card">
            <div
              style={{ fontSize: 16, fontWeight: 600, marginBottom: "1.25rem" }}
            >
              Upcoming Reminders
            </div>
            <div
              style={{
                fontSize: 13,
                color: "var(--text-muted)",
                marginBottom: "1rem",
              }}
            >
              Reminders scheduled to be sent
            </div>
            {[
              {
                color: "var(--red)",
                name: "DSTV Subscription",
                time: "Sends: Today at 8:00 AM · 2 days before due",
                badge: "red",
                badgeText: "Urgent",
              },
              {
                color: "var(--amber)",
                name: "Electricity Bill",
                time: "Sends: Apr 28 at 8:00 AM · 3 days before due",
                badge: "amber",
                badgeText: "Soon",
              },
              {
                color: "var(--g400)",
                name: "School Fees",
                time: "Sends: Apr 26 at 8:00 AM · 7 days before due",
                badge: "green",
                badgeText: "Scheduled",
              },
              {
                color: "var(--g400)",
                name: "GTBank Loan",
                time: "Sends: Apr 28 at 8:00 AM · 7 days before due",
                badge: "green",
                badgeText: "Scheduled",
              },
            ].map((r, i) => (
              <div key={i} className="recent-item">
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: r.color,
                    flexShrink: 0,
                    marginTop: 4,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{r.name}</div>
                  <div className="recent-status">{r.time}</div>
                </div>
                <Badge variant={r.badge}>{r.badgeText}</Badge>
              </div>
            ))}
            <div
              style={{
                marginTop: "1.25rem",
                padding: "1rem",
                background: "var(--g50)",
                borderRadius: "var(--radius)",
                border: "1px solid var(--g200)",
              }}
            >
              <div style={{ fontSize: 13, color: "var(--g700)" }}>
                <strong>Quiet Hours:</strong> No reminders sent between 10 PM –
                7 AM.{" "}
                <a
                  href="#"
                  style={{ color: "var(--g500)", marginLeft: 4 }}
                  onClick={(e) => e.preventDefault()}
                >
                  Change
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {modalSchedule && (
        <div className="modal-overlay" onClick={() => setModalSchedule(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">Edit Payment</div>
            <div className="form-group">
              <label className="form-label">Payment Name</label>
              <input className="form-input" defaultValue={modalSchedule.name} />
            </div>
            <div className="form-group">
              <label className="form-label">Amount (₦)</label>
              <div className="amount-input-wrap">
                <span className="amount-currency">₦</span>
                <input
                  className="form-input amount-input"
                  type="number"
                  defaultValue={modalSchedule.amount}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Frequency</label>
              <select className="form-select" defaultValue={modalSchedule.freq}>
                {Object.keys(freqMult).map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-ghost"
                onClick={() => setModalSchedule(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setModalSchedule(null);
                  showToast("Changes saved.");
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CANCEL CONFIRM MODAL */}
      {cancelTarget && (
        <div className="modal-overlay" onClick={() => setCancelTarget(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">Cancel Schedule?</div>
            <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
              This will permanently remove this payment schedule. This action
              cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                className="btn btn-ghost"
                onClick={() => setCancelTarget(null)}
              >
                Keep It
              </button>
              <button
                className="btn btn-danger"
                onClick={() => doCancel(cancelTarget)}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── NOTIFICATION PANEL ─── */
function NotifPanel() {
  return (
    <div className="notif-panel">
      <div className="notif-header">
        <h3>Reminders</h3>
        <span style={{ fontSize: 12, color: "var(--g500)", cursor: "pointer" }}>
          Mark all read
        </span>
      </div>
      {[
        {
          dot: "var(--g400)",
          text: (
            <>
              <strong>DSTV Subscription</strong> due in 2 days — ₦8,500
            </>
          ),
          time: "Just now",
        },
        {
          dot: "var(--g400)",
          text: (
            <>
              <strong>Electricity Bill</strong> due in 5 days — ₦15,000
            </>
          ),
          time: "1 hour ago",
        },
        {
          dot: "var(--amber)",
          text: (
            <>
              <strong>School Fees (3rd Term)</strong> due in 7 days — ₦120,000
            </>
          ),
          time: "3 hours ago",
        },
        {
          dot: "var(--text-hint)",
          text: "Loan repayment processed successfully — ₦35,000",
          time: "Yesterday",
        },
      ].map((n, i) => (
        <div
          key={i}
          className="notif-item"
          style={i === 3 ? { borderTop: "1px solid var(--border)" } : {}}
        >
          <div className="notif-dot" style={{ background: n.dot }} />
          <div>
            <div className="notif-text">{n.text}</div>
            <div className="notif-time">{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="pf-footer">
      <div className="pf-newsletter">
        <div className="pf-newsletter-label">
          <h3>Stay on top of your payments</h3>
          <p>
            Get weekly summaries and payment reminders directly to your inbox.
          </p>
        </div>
        <div className="pf-newsletter-form">
          <input type="email" placeholder="Enter your email address" />
          <button type="button">Subscribe</button>
        </div>
      </div>

      <div className="pf-main">
        <div>
          <div className="pf-logo">
            <div className="pf-logo-icon">
              <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div>
              <div className="pf-logo-name">PayFlow</div>
              <div className="pf-logo-sub">Smart Scheduler</div>
            </div>
          </div>
          <p className="pf-tagline">
            Automating your bills so you never miss a payment again. Built for
            smart, stress-free financial management.
          </p>
          <div className="pf-socials">
            {[
              <path
                key="x"
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.734-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />,
              <path
                key="fb"
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />,
            ].map((p, i) => (
              <div key={i} className="pf-social">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {p}
                </svg>
              </div>
            ))}
            <div className="pf-social">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
          </div>
          <div className="pf-badges">
            <div className="pf-badge">
              <ShieldIcon />
              <div className="pf-badge-text">
                <strong>256-bit SSL Secured</strong>Bank-grade encryption
              </div>
            </div>
            <div className="pf-badge">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: 16, height: 16, color: "#4caf78" }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <div className="pf-badge-text">
                <strong>CBN Licensed</strong>
                <span>Regulatory body / licence</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="pf-col-title">Quick Links</div>
          <ul className="pf-link-list">
            {[
              "Home",
              "Dashboard",
              "History",
              "Scheduler",
              "Wallet",
              "Reports",
            ].map((l) => (
              <li key={l}>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="pf-col-title">Support</div>
          <ul className="pf-link-list">
            {[
              "Help Center",
              "FAQs",
              "Contact Us",
              "Report a Bug",
              "Privacy Policy",
              "Terms of Service",
            ].map((l) => (
              <li key={l}>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="pf-col-title">Contact Us</div>
          {[
            { Icon: MapPinIcon, text: "Victoria Island, Lagos, Nigeria" },
            { Icon: PhoneIcon, text: "+234 800 PAY FLOW" },
            { Icon: MailIcon, text: "hello@payflow.ng" },
          ].map(({ Icon, text }, i) => (
            <div key={i} className="pf-contact-item">
              <Icon />
              <span className="pf-contact-text">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pf-divider" />
      <div className="pf-bottom">
        <div>
          <div className="pf-copy">
            © 2026 PayFlow Technologies Ltd. — All rights reserved.
          </div>
          <div className="pf-legal-links">
            {[
              "Privacy Policy",
              "Terms of Use",
              "Cookie Policy",
              "Refund Policy",
            ].map((l) => (
              <a key={l} href="#" onClick={(e) => e.preventDefault()}>
                {l}
              </a>
            ))}
          </div>
        </div>
        <div className="pf-reg">RC No.: RC 0000000 (CAC Registration No.)</div>
      </div>
    </footer>
  );
}

/* ─── ROOT APP ─── */
export default function PayFlow_v1() {
  const [page, setPage] = useState("home");
  const [notifOpen, setNotifOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [schedules, setSchedules] = useState(INITIAL_SCHEDULES);
  const toastKey = useRef(0);

  const showToast = useCallback((msg) => {
    toastKey.current += 1;
    setToast({ msg, key: toastKey.current });
  }, []);

  const navItems = [
    { id: "home", label: "Home", Icon: HomeIcon },
    { id: "dashboard", label: "Dashboard", Icon: DashIcon },
    { id: "history", label: "History", Icon: HistIcon },
    { id: "scheduler", label: "Scheduler", Icon: SchedIcon },
  ];

  return (
    <div className="pf-root">
      <style>{css}</style>

      <nav className="nav">
        <div className="nav-brand" onClick={() => setPage("home")}>
          <div className="nav-logo">
            <ClockLogo />
          </div>
          <div>
            <div className="nav-brand-name">PayFlow</div>
            <span className="nav-brand-sub">Smart Scheduler</span>
          </div>
        </div>
        <div className="nav-tabs">
          {navItems.map(({ id, label, Icon }) => (
            <div
              key={id}
              className={`nav-tab${page === id ? " active" : ""}`}
              onClick={() => setPage(id)}
            >
              <Icon />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="nav-right">
          <div className="nav-notif" onClick={() => setNotifOpen((o) => !o)}>
            <BellIcon />
            <div className="nav-notif-badge" />
          </div>
          <div className="nav-avatar">AK</div>
        </div>
      </nav>

      {notifOpen && (
        <>
          <div
            style={{ position: "fixed", inset: 0, zIndex: 199 }}
            onClick={() => setNotifOpen(false)}
          />
          <NotifPanel />
        </>
      )}

      {page === "home" && <HomePage onNav={setPage} showToast={showToast} />}
      {page === "dashboard" && <DashboardPage showToast={showToast} />}
      {page === "history" && <HistoryPage showToast={showToast} />}
      {page === "scheduler" && (
        <SchedulerPage
          schedules={schedules}
          setSchedules={setSchedules}
          showToast={showToast}
        />
      )}

      <Footer />

      {toast && (
        <Toast key={toast.key} msg={toast.msg} onHide={() => setToast(null)} />
      )}
    </div>
  );
}
