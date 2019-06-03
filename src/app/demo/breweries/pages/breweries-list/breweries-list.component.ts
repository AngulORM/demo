import {Component, ViewChild} from '@angular/core';
import {BreweryEntity} from '../../entities';
import {Observable} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {ClrForm} from '@clr/angular';

@Component({
  selector: 'ngf-demo-page-breweries-list',
  templateUrl: './breweries-list.component.html',
  styleUrls: ['./breweries-list.component.scss']
})
export class BreweriesListComponent {
  @ViewChild(ClrForm, {static: false}) clrForm;

  public searchResults: Observable<BreweryEntity[]>;
  public searchErrorMessage: string;
  public searchForm = new FormGroup({
    name: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    type: new FormControl('')
  });

  public onSearch() {
    if (this.searchForm.invalid) {
      this.clrForm.markAsDirty();
    } else {
      const query = new Map<string, string>();

      Object.keys(this.searchForm.controls).forEach(key => {
        if (this.searchForm.controls[key].value && this.searchForm.controls[key].value.trim().length) {
          query.set(key, this.searchForm.controls[key].value.trim());
        }
      });

      try {
        this.searchResults = <Observable<BreweryEntity[]>>BreweryEntity.search(query);
      } catch (e) {
        this.searchErrorMessage = e.message;
        this.clrForm.markAsDirty();
      }
    }
  }
}
