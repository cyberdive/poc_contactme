import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Client, ContactMeService } from '../contact-me.service';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html'
})
export class ContactMeComponent implements OnInit {
  client: Client;
  action: string;
  errors: string = '';
  success: string = '';

  @Input() clientNumber: string = '';
  @Input() birthDate: Date = new Date();
  @Input() email: string = '';
  @Input() emailToConfirm: string = '';
  @Input() sendMail: boolean = true;

  constructor(private service: ContactMeService) {
    this.action = 'login';
  }

  ngOnInit() {
  }

  handleError(error) {
    if (error.status === 404) {
      this.errors = 'Client not found';
    }
    else {
      this.errors = 'An error occurred: ' + error.error.message;
    }
  }

  onCancel() {
    this.action = 'login';
    this.errors = '';
    this.success = '';
    this.clientNumber = '';
    this.birthDate = new Date();
    this.email = '';
    this.emailToConfirm = '';
    this.sendMail = true;
  }

  onContinue(form: NgForm) {
    if (form.valid && form.value.clientNumber.length > 0) {
      this.service.getClient(form.value.clientNumber).subscribe(result => {
        var datePipe = new DatePipe('en-US');
        if (datePipe.transform(form.value.birthDate, 'yyyy-MM-dd') === datePipe.transform(result.birthDate, 'yyyy-MM-dd')) {
          this.client = result;
          this.action = 'update';
          this.errors = '';
          this.sendMail = true;
        }
        else {
          this.errors = 'Client not found';
        }
      }, error => this.handleError(error));
    }
  }

  onConfirm(form: NgForm) {
    if (form.valid) {
      if (form.value.email === form.value.emailToConfirm) {
        this.errors = '';
        var email: string = form.value.email;
        var sendMail: boolean = form.value.sendMail;
        this.service.updateEmail(this.client.clientNumber, email, sendMail).subscribe(() => {
          this.action = 'updated';
          //this.success = '<p>Record updated.</p>';
          if (this.client.email !== email) {
            this.success += '<p>[Fake] Mail sent to new email address.</p>';
            if (this.client.email.length > 0) {
              this.success += '<p>[Fake] Mail sent to old email address.</p>';
            }
            this.success += '<p>Email updated.</p>';
          }
          if (sendMail && !this.client.alert) {
            this.success += '<p>Alert activated.</p>';
          }
          else if (!sendMail && this.client.alert) {
            this.success += '<p>Alert deactivated.</p>';
          }
        }, error => this.handleError(error));
      }
      else {
        this.errors = 'Email addresses do not match!';
      }
    }
  }
}
