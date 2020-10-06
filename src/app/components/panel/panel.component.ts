import { Component, Input, OnInit } from '@angular/core';
import { IPanel } from '../../shared/interfaces/panel.interface';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  isClicked = false;
  @Input() panelData: IPanel;
  @Input() getLast: any;
  constructor() { }

  ngOnInit(): void {
  }

}
