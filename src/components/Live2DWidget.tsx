import { useEffect } from 'react';

declare global {
  interface Window {
    initWidget?: (config: {
      modelId?: number;
      drag?: boolean;
      logLevel?: 'error' | 'warn' | 'info';
    }) => void;
    __live2dWidgetInited?: boolean;
  }
}

const Live2DWidget = () => {
  useEffect(() => {
    if (window.__live2dWidgetInited) return;

    const init = () => {
      if (window.__live2dWidgetInited) return;
      if (typeof window.initWidget === 'function') {
        window.initWidget({
          modelId: 2,
          drag: true,
          logLevel: 'warn',
        });
        window.__live2dWidgetInited = true;
        const applyStyles = () => {
          const widget = document.getElementById('live2d-widget');
          if (!widget) return;
          widget.style.setProperty('z-index', '2147483647', 'important');
          widget.style.setProperty('bottom', '5.5rem', 'important');
          widget.style.setProperty('left', '1.25rem', 'important');
          widget.style.setProperty('pointer-events', 'auto', 'important');
          widget.style.setProperty('position', 'fixed', 'important');
        };
        applyStyles();
        const observer = new MutationObserver(() => applyStyles());
        observer.observe(document.body, { childList: true, subtree: true });
      }
    };

    const scriptId = 'live2d-widget-script';
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', init);
      init();
      return () => existing.removeEventListener('load', init);
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://fastly.jsdelivr.net/npm/live2d-widgets@1.0.0/dist/autoload.js';
    script.async = true;
    script.onload = init;
    document.body.appendChild(script);

    return () => script.removeEventListener('load', init);
  }, []);

  return null;
};

export default Live2DWidget;
