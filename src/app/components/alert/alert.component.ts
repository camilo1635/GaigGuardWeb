
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, RouterModule, CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';
  @Input() duration: number = 2000;
  visible: boolean = true;

  ngOnInit() {
    setTimeout(() => {
      this.visible = false;
    }, this.duration);
  }
}
