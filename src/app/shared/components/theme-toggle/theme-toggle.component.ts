import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [TooltipModule, SelectButtonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-selectButton
      [options]="themeOptions"
      [(ngModel)]="theme"
      (onChange)="onThemeChange($event.value)"
      optionValue="value"
      styleClass="p-selectbutton-sm">
      <ng-template pTemplate="item" let-option>
        <i [class]="option.icon" [pTooltip]="option.label"></i>
      </ng-template>
    </p-selectButton>
  `
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);
  protected theme = this.themeService.theme;

  themeOptions = [
    { label: 'Light', icon: 'pi pi-sun', value: 'light' },
    { label: 'Dark', icon: 'pi pi-moon', value: 'dark' },
    { label: 'System', icon: 'pi pi-desktop', value: 'system' }
  ];

  onThemeChange(theme: string): void {
    this.themeService.setTheme(theme as 'light' | 'dark' | 'system');
  }
}
