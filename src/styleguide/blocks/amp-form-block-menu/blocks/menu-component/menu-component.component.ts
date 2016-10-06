import { Component, OnInit } from '@angular/core';
import { ScrollService } from '../../../../../app/services/scroll/scroll.service';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.css']
})
export class MenuComponentComponent implements OnInit {

  constructor(private scrollService: ScrollService) { }

  ngOnInit() {
  }

}
