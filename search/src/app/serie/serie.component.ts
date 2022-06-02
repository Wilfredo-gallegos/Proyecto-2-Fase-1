import { Component, OnInit } from '@angular/core';
import {SearchService} from "../search.service";

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.scss']
})
export class SerieComponent implements OnInit {

  title = ''
  serie: any
  similar: any

  constructor(
    private searchService: SearchService
  ) {
    this.searchService.sharedMovieName.subscribe(name => {
      this.title = name
    })
  }

  ngOnInit(): void {
    console.log(this.title)
    this.searchService.getSerieByNAme(this.title).subscribe(response => {
      this.serie = response[0]
    })

    this.searchService.getSimilarSeries(this.title).subscribe(response => {
      console.log(response)
      this.similar = response
    })
  }

}
