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
  imports: [],
  templateUrl: './usermenu.html',
  styleUrl: './usermenu.css',
})
export class Usermenu {}
