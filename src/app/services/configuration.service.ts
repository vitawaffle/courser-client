import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PasswordRulesDTO } from '../dto/password-rules.dto';
import { PasswordRule } from '../validators/password/rules/password-rule';
import { HasBigLetterPasswordRule } from '../validators/password/rules/has-big-letter.password-rule';
import { HasNumberPasswordRule } from '../validators/password/rules/has-number.password-rule';
import { HasSmallLetterPasswordRule } from '../validators/password/rules/has-small-letter.password-rule';
import { LengthPasswordRule } from '../validators/password/rules/length.password-rule';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private activePasswordRuleArray: PasswordRule[] = [];

  constructor(private httpClient: HttpClient) {
    this.loadActivePasswordRules();
  }

  get activePasswordRules(): PasswordRule[] {
    return this.activePasswordRuleArray;
  }

  private loadActivePasswordRules(): void {
    this.httpClient.get<PasswordRulesDTO>('/configuration/password-rules').subscribe((rules: PasswordRulesDTO) => {
      if (rules.HasBigLetterPasswordRule === 'true') {
        this.activePasswordRuleArray.push(new HasBigLetterPasswordRule());
      }
      if (rules.HasNumberPasswordRule === 'true') {
        this.activePasswordRuleArray.push(new HasNumberPasswordRule());
      }
      if (rules.HasSmallLetterPasswordRule === 'true') {
        this.activePasswordRuleArray.push(new HasSmallLetterPasswordRule());
      }
      if (rules.LengthPasswordRule) {
        this.activePasswordRuleArray.push(new LengthPasswordRule(parseInt(rules.LengthPasswordRule)));
      }
    });
  }

}
