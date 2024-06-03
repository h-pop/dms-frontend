import { Component, OnInit } from '@angular/core';
import { DictionariesService } from './dictionaries.service';
import { Dictionary } from './dictionary.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dictionaries',
  templateUrl: './dictionaries.component.html',
  styleUrls: ['./dictionaries.component.css'],
})
export class DictionariesComponent implements OnInit {
  dictionaries: Dictionary[];

  constructor(
    private dictionariesService: DictionariesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dictionariesService.dictionariesChanged.subscribe((result) => {
      this.dictionaries = result
    });
    this.dictionariesService.getDictionaries();
  }

  onDelete(index: number, $event: PointerEvent) {
    $event.stopPropagation();
    this.dictionariesService.deleteDictionary(index);
  }

  onNew() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onListItemClick(dictionaryId: number) {
    this.router.navigate([dictionaryId], { relativeTo: this.route });
  }
}
