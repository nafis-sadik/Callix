import { Directive, ElementRef, Input, OnDestroy, HostListener } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnDestroy {
  @Input('appTooltip') tooltipText = '';
  private tooltipEl: HTMLElement | null = null;

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter(): void {
    if (!this.tooltipText) return;
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.hideTooltip();
  }

  private showTooltip(): void {
    this.hideTooltip();

    const tooltip = document.createElement('div');
    tooltip.textContent = this.tooltipText;
    tooltip.style.cssText = `
      position: fixed;
      background: #000;
      color: #fff;
      border: 1px solid #aaa;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 13px;
      line-height: 1.4;
      white-space: nowrap;
      pointer-events: none;
      z-index: 99999;
      opacity: 0;
      transition: opacity 0.12s ease;
    `;
    document.body.appendChild(tooltip);

    const rect = this.el.nativeElement.getBoundingClientRect();
    const tw = tooltip.offsetWidth;
    const th = tooltip.offsetHeight;
    const gap = 8;

    let top = rect.top - th - gap;
    let left = rect.left + rect.width / 2 - tw / 2;
    let arrowTop: string | null = 'bottom';
    let arrowLeft = '50%';

    if (top < 4) {
      top = rect.bottom + gap;
      arrowTop = 'top';
    }

    if (left < 8) left = 8;
    if (left + tw > window.innerWidth - 8) left = window.innerWidth - tw - 8;
    if (top + th > window.innerHeight - 4) top = rect.top - th - gap;
    if (top < 4) {
      top = Math.max(4, rect.bottom + gap);
      tooltip.style.maxWidth = (window.innerWidth - 16) + 'px';
      tooltip.style.whiteSpace = 'normal';
    }

    tooltip.style.top = Math.round(top) + 'px';
    tooltip.style.left = Math.round(left) + 'px';

    const arrow = document.createElement('div');
    arrow.style.cssText = `
      position: absolute;
      ${arrowTop === 'bottom' ? 'bottom' : 'top'}: -5px;
      left: ${arrowLeft};
      transform: translateX(-50%) rotate(45deg);
      width: 8px;
      height: 8px;
      background: #000;
      border-${arrowTop === 'bottom' ? 'top' : 'bottom'}: 1px solid #aaa;
      border-${arrowTop === 'bottom' ? 'left' : 'right'}: 1px solid #aaa;
    `;
    tooltip.appendChild(arrow);

    requestAnimationFrame(() => { tooltip.style.opacity = '1'; });

    this.tooltipEl = tooltip;
  }

  private hideTooltip(): void {
    if (this.tooltipEl) {
      this.tooltipEl.remove();
      this.tooltipEl = null;
    }
  }

  ngOnDestroy(): void {
    this.hideTooltip();
  }
}
