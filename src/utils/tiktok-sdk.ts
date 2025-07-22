declare global {
  interface Window {
    TikTokJumpSDK: any;
  }
}

class TikTokJumpSDKWrapper {
  private sdk: any;
  private isInitialized = false;

  async init(): Promise<void> {
    if (this.isInitialized) return;

    return new Promise((resolve, reject) => {
      if (typeof window.TikTokJumpSDK === 'undefined') {
        reject(new Error('TikTok Jump SDK not loaded'));
        return;
      }

      try {
        this.sdk = window.TikTokJumpSDK;
        this.isInitialized = true;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  onPageReady(callback: () => void): void {
    if (!this.isInitialized) return;
    
    try {
      this.sdk.onPageReady(callback);
    } catch (error) {
      console.error('Failed to set onPageReady:', error);
    }
  }

  onClose(callback: () => void): void {
    if (!this.isInitialized) return;
    
    try {
      this.sdk.onClose(callback);
    } catch (error) {
      console.error('Failed to set onClose:', error);
    }
  }

  onShare(callback: () => void): void {
    if (!this.isInitialized) return;
    
    try {
      this.sdk.onShare(callback);
    } catch (error) {
      console.error('Failed to set onShare:', error);
    }
  }

  trackEvent(eventName: string, properties?: Record<string, any>): void {
    if (!this.isInitialized) return;
    
    try {
      this.sdk.trackEvent?.(eventName, properties);
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  close(): void {
    if (!this.isInitialized) return;
    
    try {
      this.sdk.close?.();
    } catch (error) {
      console.error('Failed to close:', error);
    }
  }
}

export const TikTokJumpSDK = new TikTokJumpSDKWrapper(); 