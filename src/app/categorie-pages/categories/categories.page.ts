import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ConfigService } from 'src/providers/config/config.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories = [];
  parent: { [k: string]: any } = {};
  limit: number=10;
  offset: number=0;
  viewType:string='list_large_image'
  constructor(
    public shared: SharedDataService,
    public config: ConfigService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private translate:TranslateService
    
    ) {
    
    this.parent.id = this.activatedRoute.snapshot.paramMap.get('parent');
    this.parent.name = this.activatedRoute.snapshot.paramMap.get('name');

    if (!this.parent.name )this.parent.name = "Categories";

    // choose category page style
    switch(this.config.categoryPage)
    {
      case 1:this.viewType='kanban';break;
      case 2:this.viewType='list_large_image';break;
      case 3:this.viewType='list';break;
      case 4:this.viewType='kanban_large_image';break;
      // TODO implement case 5 for sub categories style
      case 6:this.viewType='list_full_image';break;
      default:
        this.viewType='kanban';break;
    }
  }

  openSubCategories(category) {
    if (category.child_id && category.child_id.length > 0) {
      let parent = {
        id: category.id,
        name: category.name
      }
      this.router.navigateByUrl(this.config.currentRoute + "/categories/" + parent.id + "/" + parent.name);
    }

    else
    {
      // so back to default
      this.router.navigateByUrl(this.config.currentRoute + "/products/" + category.id + "/" + category.name + "/newest");
    }

  }
  viewAll() {
    this.router.navigateByUrl(this.config.currentRoute + "/products/" + this.parent.id + "/" + this.parent.name + "/newest");
  }
  ngOnInit() {

  }
  
  
}
