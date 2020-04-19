import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { DictionariesService } from "../dictionaries.service";
import { Dictionary } from "../dictionary.model";

@Component({
  selector: "app-dictionary-edit",
  templateUrl: "./dictionary-edit.component.html",
  styleUrls: ["./dictionary-edit.component.css"],
})
export class DictionaryEditComponent implements OnInit {
  dictionary: Dictionary;

  constructor(
    private route: ActivatedRoute,
    private dictionariesService: DictionariesService
  ) {}

  ngOnInit(): void {
    const dictionaryId = +this.route.snapshot.params["id"];
    this.dictionary = this.dictionariesService.getDictionary(dictionaryId);
    this.route.params.subscribe((params: Params) => {
      this.dictionary = this.dictionariesService.getDictionary(+params["id"]);
    });
    if (this.dictionary == null) {
      this.dictionary = new Dictionary(-1, "", [""]);
    }
  }

  onAddDictionaryValue() {
    this.dictionary.values.push("");
  }

  onDeleteDictionaryValue(index: number) {
    this.dictionary.values.splice(index, 1);
  }

  onSaveChanges() {
    if(!this.isDirty()) {
      return;
    }
    this.dictionariesService.updateDictionary(this.dictionary);
  }
  isDirty() : boolean {
    return true; //TODO
  }
}
