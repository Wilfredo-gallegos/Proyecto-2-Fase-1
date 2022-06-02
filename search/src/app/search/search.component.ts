import { Component, OnInit } from '@angular/core';
import {SearchService} from "../search.service";
import {Subject, map, debounceTime, distinctUntilChanged, switchMap, catchError, throwError} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private searchService: SearchService,
    private router: Router
  ) { }

  public loading: boolean = false
  public searchItem = new Subject()
  public series: any;
  public paginationElements: any;
  public errorMessage: any;
  public page = 1
  public categories: any = ['Serie', 'Plataforma', 'Género', 'Director', 'Productor', 'Creador']

  public searchForm = new FormGroup({
    search: new FormControl("", Validators.required),
    category: new FormControl('', Validators.required)
  })

  public search() {
    this.searchItem.pipe(
      map((e: any) => {
        console.log(e.target.value)
        return e.target.value
      }),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => {
        this.loading = true;

        switch (this.categoryName?.value) {
          case 'Serie':
            return this.searchService._searchBySeriesName(term)
          case 'Plataforma':
            return this.searchService._searchByPlatformNameEntries(term)
          case 'Género':
            return this.searchService._searchByGenreNameEntries(term)
          case 'Director':
            return this.searchService._searchByDirectorName(term)
          case 'Productor':
            return this.searchService._searchByProducerName(term)
          default:
            return this.searchService._searchByCreatorName(term)
        }
      }),
      catchError(e => {
        console.log(e)
        this.loading = false
        this.errorMessage = e.message
        return throwError(e)
      })
    ).subscribe(v => {
      this.loading = false
      this.series = v
      this.paginationElements = this.series
    })
  }

  ngOnInit(): void {
    this.search()
    this.categoryName?.setValue('Serie')
  }

  changeCategory(e: any) {
    // @ts-ignore
    this.categoryName.setValue(e.target.value, {
      onlySelf: true
    })
  }

  // Getter method to access formcontrols
  get categoryName() {
    return this.searchForm.get('category');
  }

  goToSeries(name: string) {
    this.searchService.nextMovieName(name)
    this.router.navigate(['/series'])
  }

}
