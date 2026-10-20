import { Component, computed, inject, input } from '@angular/core';
import { LocalAuthService } from '@services/local-auth-service';
import { Language, LanguageService } from '@core/config/language-service';
import { ThemeService } from '@core/config/theme-service';
import { TranslocoModule } from '@jsverse/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBadgeCheck,
  lucideChevronsUpDown,
  lucideCreditCard,
  lucideGem,
  lucideGlobe,
  lucideHelpCircle,
  lucideLogOut,
  lucideMoon,
  lucidePalette,
  lucideSun,
} from '@ng-icons/lucide';
import { User } from '@models/user';
import { InitialsPipe } from '@shared/pipes/initials/initials.pipe';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';

import { HlmSidebarImports, HlmSidebarService } from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'adm-usermenu',
  imports: [   
    HlmSidebarImports,
    HlmAvatarImports,
    NgIcon,
    HlmDropdownMenuImports,
    HlmBadgeImports,
    TranslocoModule,
    InitialsPipe,],
  templateUrl: './usermenu.html',
  providers: [
    provideIcons({
      lucideChevronsUpDown,
      lucideGem,
      lucideBadgeCheck,
      lucideLogOut,
      lucideGlobe,
      lucidePalette,
      lucideMoon,
      lucideSun,
      lucideHelpCircle,
      lucideCreditCard,
    }),],
  styleUrl: './usermenu.css',
})
export class Usermenu {
  private readonly _sidebarService = inject(HlmSidebarService);
  private readonly _languageService = inject(LanguageService);
  private readonly _themeService = inject(ThemeService);
  private readonly _authService = inject(LocalAuthService);

  // ==========================================
  // Inputs
  // ==========================================

  public readonly user = input.required<User>();

  // ==========================================
  // State
  // ==========================================

  protected readonly currentTheme = this._themeService.theme;
  protected readonly currentLang = this._languageService.currentLang;
  protected readonly availableLanguages = this._languageService.availableLanguages;

  protected readonly _menuSide = computed(() => (this._sidebarService.isMobile() ? 'top' : 'right'));

  // ==========================================
  // Public Methods
  // ==========================================

  protected setLang(lang: Language): void {
    if (lang === this.currentLang()) return;
    this._languageService.setLanguage(lang);
  }
  protected setTheme(theme: 'light' | 'dark'): void {
    this._themeService.setTheme(theme);
  }

  protected onLogout(): void {
    this._authService.logout();
  }


}
