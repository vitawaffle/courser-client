import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { LanguageEntity } from 'src/app/entities/language.entity';
import { LanguageService } from 'src/app/services/language.service';
import { NameService } from 'src/app/services/name.service';
import { NameDTO } from 'src/app/dto/name.dto';

@Component({
  selector: 'app-name-form',
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.scss']
})
export class NameFormComponent implements OnInit {

  isLanguagesLoading: boolean = false;

  languages: LanguageEntity[] = [];

  isNamesLoading: boolean = false;

  names: NameDTO[] = [];

  nameForm: FormGroup = this.formBuilder.group({
    languageId: [0],
    firstName: [''],
    lastName: [''],
    patronymic: [''],
  });

  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private languageService: LanguageService,
    private nameService: NameService,
  ) { }

  get isDataLoading(): boolean {
    return this.isLanguagesLoading && this.isNamesLoading;
  }

  get languageIdControl(): AbstractControl {
    return this.nameForm.controls.languageId;
  }

  get firstNameControl(): AbstractControl {
    return this.nameForm.controls.firstName;
  }

  get lastNameControl(): AbstractControl {
    return this.nameForm.controls.lastName;
  }

  get patronymicControl(): AbstractControl {
    return this.nameForm.controls.patronymic;
  }

  get languageId(): number {
    return parseInt(this.languageIdControl.value);
  }

  get firstName(): string {
    return this.firstNameControl.value;
  }

  get lastName(): string {
    return this.lastNameControl.value;
  }

  get patronymic(): string {
    return this.patronymicControl.value;
  }

  updateNameValues(): void {
    const name = this.names.find(name => name.languageId == this.languageId);
    this.nameForm.patchValue({
      firstName: name ? name.firstName : '',
      lastName: name ? name.lastName : '',
      patronymic: name ? name.patronymic : '',
    });
  }

  loadLanguages(): void {
    this.isLanguagesLoading = true;
    this.languageService.getAllLanguages()
      .pipe(finalize(() => {
        this.nameForm.patchValue({
          languageId: this.languages[0].id
        });
        this.updateNameValues();
        this.isLanguagesLoading = false;
      })).subscribe(languages => this.languages = languages);
  }

  loadNames(): void {
    this.isNamesLoading = true;
    this.nameService.getAllNames()
      .pipe(finalize(() => {
        this.updateNameValues();
        this.isNamesLoading = false;
      })).subscribe(names => this.names = names);
  }

  ngOnInit(): void {
    this.loadLanguages();
    this.loadNames();
  }

  getLanguageNameByCode(code: string) {
    return this.languageService.getLanguageNameByCode(code);
  }

  handleLanguageIdChange(): void {
    this.updateNameValues();
  }

  isNameFormEmpty(): boolean {
    return this.firstName === '' && this.lastName === '' && this.patronymic === '';
  }

  saveName(): void {
    this.isLoading = true;
    this.nameService.saveName({
      languageId: this.languageId,
      firstName: this.firstName,
      lastName: this.lastName,
      patronymic: this.patronymic,
    }, {
      onSuccess: () => this.loadNames(),
      onFinal: () => this.isLoading = false,
    });
  }

  deleteName(): void {
    this.isLoading = true;
    this.nameService.deleteName(this.languageId, {
      onSuccess: () => this.loadNames(),
      onFinal: () => this.isLoading = false,
    });
  }

  handleSubmitButtonClick(): void {
    if (this.isNameFormEmpty()) {
      this.deleteName();
    } else {
      this.saveName();
    }
  }

}
