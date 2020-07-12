import { Component, OnInit, HostListener, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-volume-control',
  templateUrl: './volume-control.component.html',
  styleUrls: ['./volume-control.component.scss'],
})
export class VolumeControlComponent implements OnInit {
  @Output() volChange: EventEmitter<number> = new EventEmitter();

  volume: number = 0.5;
  volumeBar: number = 320;

  constructor() {}

  ngOnInit(): void {}

  onDragStart(e: DragEvent) {
    var img = document.createElement('img');
    img.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  }

  onDrag(e: DragEvent) {
    if (e.x > 0 || e.y > 0) {
      if (e.offsetX > -16 && e.offsetX < 624) {
        this.volumeBar = e.offsetX;
      } else if (e.offsetX >= 624) {
        this.volumeBar = 624;
      } else if (e.offsetX <= -16) {
        this.volumeBar = -16;
      }
      this.calculateVolume();
    }
  }

  onVolClick(e: MouseEvent) {
    this.volumeBar = e.offsetX - 16;
    this.calculateVolume();
  }

  slide(slideKey: string) {
    (slideKey === ',' || slideKey === 'ArrowLeft') && this.volumeBar > 0
      ? this.volumeBar - 10 < 0
        ? (this.volumeBar = -16)
        : (this.volumeBar -= 10)
      : this.volumeBar;
    (slideKey === '.' || slideKey === 'ArrowRight') && this.volumeBar < 624
      ? this.volumeBar - 10 > 624
        ? (this.volumeBar = 624)
        : (this.volumeBar += 10)
      : this.volumeBar;
    this.calculateVolume();
  }

  calculateVolume() {
    this.volChange.emit((this.volumeBar + 16) / 640);
  }

  debounce = (func, wait) => {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  mimicClickOnKeypress(dp: HTMLDivElement) {
    let x = window.getComputedStyle(dp);
    let arr = [
      x.getPropertyValue('background-color'),
      x.getPropertyValue('top'),
      x.getPropertyValue('left'),
    ];

    // create new color for keypress
    let newcol = arr[0].replace('rgb', 'rgba');
    newcol = arr[0].replace(/\)/i, ', 0.8)');

    dp.style.backgroundColor = newcol;
    dp.style.top = '1px';
    dp.style.left = '1px';

    // reset unpressed css
    this.debounce(() => {
      dp.style.backgroundColor = arr[0];
      dp.style.top = arr[1];
      dp.style.left = arr[2];
    }, 100);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.slide(event.key);
  }
}
