import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DropdownBase, InputBase } from 'src/app/general-components/dynamic-form/classes/ControlBases';
import { BaseOption } from 'src/app/interfaces/BaseOption';
import { DataService } from 'src/app/site-services/data.service';

@Component({
  selector: 'app-public-contents',
  templateUrl: './public-contents.component.html',
  styleUrls: ['./public-contents.component.scss']
})
export class PublicContentsComponent implements OnInit {

  publicContentOption!: BaseOption;

  publicContentTranslationOption!: BaseOption;
  
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      let param = params.get('key');
      console.log(param);
      this.publicContentOption = {
        name: 'Publikus (statikus) tartalmak',
        icon: 'public',
        disableCreatePanel: true,
        apiFormUrl: '/api/publicContents',
        apiUrl: '/api/publicContents/getByPagePlaceKey/'+param,
        displayedColumns: [
          {id: 'id', name: 'No.'},{id: 'PagePlace', name: 'Oldal elem', format: 'json', searchAttribute: 'adminName'},
          {id: 'adminName', name: 'Admin felületi név'},
          {id: 'createdAt', name: 'Létrehozva', format: 'date'},
          {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modify', name:'', format: 'modify'}
        ],
        title: 'Üdvözöljük a publikus (statikus) tartalmak szerkesztése oldalon!',
        subtitle:  'Itt tudja állítani az oldalon megjelenítendő statikus elemeket, és a hozzájuk szükséges fordításokat. A magyar nyelv kötelező, ez az alapnyelv az oldalon!',
        formBases: [
          new InputBase({
            key: 'adminName',
            label: 'Admin felületi név',
            placeholder: 'pl.: Magyar',
            required: true,
            hint: 'Kérjük adja meg az admin felületen megjelenítendő nevet!'
          }),
    
          new InputBase({
            key: 'title',
            label: 'Tartalom publikus felületen magyar nyelven megjelenítendő neve/címe',
            required: true,
            neededToModifyForm: 'false',
            hint: 'Kérjük adja meg a publikus felületen megjelenítendő magyar nyelvű nevet/címet!'
          })
        ]
      }
      this.publicContentTranslationOption = {
        name: 'Fordítások',
        icon: 'language',
        apiUrl: '/api/publicContentTranslations/getByPagePlaceKey/'+param,
        apiFormUrl: '/api/publicContentTranslations',
        displayedColumns: [
          {id: 'id', name: 'No.'},
          {id: 'PublicContent', name: 'Publikus tartalom', searchAttribute: 'adminName',format: 'json' },
          {id: 'Language', name: 'Nyelv', searchAttribute: 'adminName',format: 'json' },
          {id: 'title', name: 'Publikus felületi név/cím'},
          {id: 'createdAt', name: 'Létrehozva', format: 'date'},
          {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
        ],
        title: 'Publikus (statikus) tartalmak publikos oldalon megjelenítendő fordításainak lehetősége!',
        subtitle:  'Itt tudja állítani az oldalon megjelenítendő fordításokat',
        formBases: [
          new DropdownBase({
            key: 'publicContentId',
            label: 'Publikus tartalom',
            optionsUrl: '/api/publicContents/getByPagePlaceKey/'+param,
            optionKey: 'id',
            optionValue: 'adminName',
            required: true,
            hint: 'Válassza ki a tartalmat, amelyhez a fordítás tartozik!'
          },this.dataService),
    
          new DropdownBase({
            key: 'languageId',
            label: 'Fordítási nyelv',
            optionsUrl: '/api/languages',
            optionKey: 'id',
            optionValue: 'adminName',
            required: true,
            hint: 'Válassza ki a fordítási nyelvet!'
          },this.dataService),
    
          new InputBase({
            key: 'title',
            label: 'Tartalom neve/címe',
            required: true,
            hint: 'Kérjük adja meg a publikus felületen megjelenítendő nevet/címet!'
          })
        ]
      }
    })
  }

}
