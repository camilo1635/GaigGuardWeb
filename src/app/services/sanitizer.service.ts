// src/app/services/sanitizer.service.ts
import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SanitizerService {
  constructor(private sanitizer: DomSanitizer) {}

  sanitizeText(text: string): string { 
    return this.sanitizer.sanitize(SecurityContext.HTML, text) || '';
  } 

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  sanitizeStyle(style: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

  sanitizeScript(script: string): SafeScript {
    return this.sanitizer.bypassSecurityTrustScript(script);
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  sanitizeResourceUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}