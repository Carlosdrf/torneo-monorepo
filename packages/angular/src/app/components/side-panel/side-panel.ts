import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-side-panel',
  imports: [NgClass],
  templateUrl: './side-panel.html',
  styleUrl: './side-panel.css',
})
export class SidePanel {
  @Input() title!: string;

  @Output() closePanel = new EventEmitter<void>();

  show = true;

  close() {
    this.show = false;
    setTimeout(() => {
      this.closePanel.emit();
    }, 400);
  }
}
