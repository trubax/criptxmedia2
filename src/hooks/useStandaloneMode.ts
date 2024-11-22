import { useEffect } from 'react';

export const useStandaloneMode = () => {
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.navigator.standalone;

    if (isIOS && isStandalone) {
      // Previeni tutti i comportamenti di default del browser
      const preventDefaultBehavior = (e: Event) => {
        e.preventDefault();
      };

      document.addEventListener('touchstart', preventDefaultBehavior, { passive: false });
      document.addEventListener('touchmove', preventDefaultBehavior, { passive: false });
      
      // Gestisci lo scroll solo nei container designati
      document.addEventListener('touchmove', (e: TouchEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('.ios-scroll-container')) {
          e.stopPropagation();
        }
      }, { passive: true });

      return () => {
        document.removeEventListener('touchstart', preventDefaultBehavior);
        document.removeEventListener('touchmove', preventDefaultBehavior);
      };
    }
  }, []);
}; 