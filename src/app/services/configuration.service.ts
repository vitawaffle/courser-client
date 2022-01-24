import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
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

  private _activePasswordRules: PasswordRule[] = [];

  constructor(private httpClient: HttpClient) {
    this.loadPasswordRules();
  }

  get activePasswordRules() {
    return this._activePasswordRules;
  }

  loadPasswordRules() {
    this.httpClient.get<PasswordRulesDTO>('/configuration/password-rules')
      .pipe(map(rules => {
        const activePasswordRules: PasswordRule[] = [];
        if (rules.HasBigLetterPasswordRule === 'true') {
          activePasswordRules.push(new HasBigLetterPasswordRule());
        }
        if (rules.HasNumberPasswordRule === 'true') {
          activePasswordRules.push(new HasNumberPasswordRule());
        }
        if (rules.HasSmallLetterPasswordRule === 'true') {
          activePasswordRules.push(new HasSmallLetterPasswordRule());
        }
        if (rules.LengthPasswordRule) {
          activePasswordRules.push(new LengthPasswordRule(parseInt(rules.LengthPasswordRule)));
        }
        return activePasswordRules;
      })).subscribe(rules => this._activePasswordRules = rules);
  }

}
