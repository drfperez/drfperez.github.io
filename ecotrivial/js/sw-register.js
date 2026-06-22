if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('./sw.js');
      console.log('Service Worker registrat correctament');
    } catch (err) {
      console.error('Error registrant el Service Worker:', err);
    }
  });
}











