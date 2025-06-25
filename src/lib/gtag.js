export const GA_TRACKING_ID = 'G-ZZC27635YG';

// Pageview tracking
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
