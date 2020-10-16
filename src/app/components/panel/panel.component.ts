import { Component, Input, OnInit } from '@angular/core';
import { IPanel, IPanelFilter } from '../../shared/interfaces/panel.interface';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  isClicked = false;
  @Input() panelData: IPanel;
  @Input() getLast: any;
  @Input() borders = false;
  @Input() padding = '1.5em 1.2em';
  @Input() iconSize: number;
  @Input() titleSize: number;
  constructor() { }

  ngOnInit(): void {
  }

}
