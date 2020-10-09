import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { IFilter } from '../../shared/interfaces/filter.interface';
import { MatTableDataSource } from '@angular/material/table';
import { FiltersService } from '../../shared/services/filters.service';

@Component({
  selector: 'app-admin-filters',
  templateUrl: './admin-filters.component.html',
  styleUrls: ['./admin-filters.component.scss']
})
export class AdminFiltersComponent implements OnInit {
  isEditing = false;
  editingFilterId: string;

  displayedColumns: string[] = ['position', 'filterName', 'filterCriteria', 'edit', 'delete'];
  dataFilters: MatTableDataSource<IFilter>;

  name = '';
  criteria: Array<string> = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private filterServ: FiltersService
  ) { }
  ngOnInit(): void {
    this.getFilters();
  }

  private getFilters(): void {
    this.filterServ.getFilters()
      .subscribe(data => {
        this.dataFilters = new MatTableDataSource(data.map(e => {
          const id = e.payload.doc.id;
          const otherData = e.payload.doc.data() as IFilter;
          return { id, ...otherData };
        }));
      });
  }

  addFilter(): void {
    if (this.name.trim() && this.criteria.length) {
      const filter: IFilter = {
        name: this.name,
        criteria: this.criteria
      };
      this.filterServ.addFilter(filter)
        .then(() => this.getFilters())
        .catch(err => console.log(err));
      this.clearForm();
    }
  }

  deleteFilter(id: string): void {
    this.filterServ.deleteFilter(id)
      .then(() => this.getFilters())
      .catch(err => console.log(err));
  }
  editFilter(filter: IFilter): void {
    this.name = filter.name;
    this.criteria = filter.criteria;
    this.editingFilterId = filter.id;
    this.isEditing = true;
  }
  saveEditedFilter(): void {
    if (this.name.trim() && this.criteria.length) {
      const editedFilter: IFilter = {
        name: this.name,
        criteria: this.criteria,
        id: this.editingFilterId
      };
      this.filterServ.updateFilter(editedFilter)
        .then(() => {
          this.getFilters();
          this.clearForm();
          this.isEditing = false;
        }).catch(err => console.log(err));
    }

  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.criteria.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(crit: string): void {
    const index = this.criteria.indexOf(crit);

    if (index >= 0) {
      this.criteria.splice(index, 1);
    }
  }

  private clearForm(): void {
    this.name = '';
    this.criteria = [];
  }
}
