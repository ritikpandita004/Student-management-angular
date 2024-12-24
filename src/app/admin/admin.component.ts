import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  allAdminDetails: any;
  selectedAdminId: any = null;

  constructor(private Route: Router, private client: LoginService, private tostr: ToastrService) { }

  ngOnInit(): void {
    this.getAdminDetails();
  }

  addAdmin() {
    this.Route.navigate(['dashboard/add-admin']);
  }

  getAdminDetails() {
    this.client.allAdminDetails().then((response) => {
      if (response.success === true) {
        this.allAdminDetails = response.data;
      } else if (response.success === false) {
        this.tostr.error('Something Went Wrong');
      }
    });
  }

  openDeleteModal(id: any) {
    this.selectedAdminId = id;
    const confirmModal = document.getElementById('confirmDeleteModal');
    if (confirmModal) {
      const modalInstance = new Modal(confirmModal);
      modalInstance.show();
    }
  }

  confirmDelete() {
    if (this.selectedAdminId) {
      this.client.deleteAdmin(this.selectedAdminId).then((response) => {
        if (response.success === true) {
          this.getAdminDetails();
          this.tostr.success(response.message);
        } else {
          this.tostr.error(response.message);
        }
      });
    }
  }

  editAdminDetals(id:any){
    this.Route.navigate(['dashboard/edit-admin',id])
  }







  toggleDistrictStatus(district: any) {
    this.selectedAdminId = district;
    const modalElement = document.getElementById('statusModal');

    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element not found');
    }
  }

  confirmStatusChange() {
    this.client.changeAdminStatus({ id: this.selectedAdminId.id }).then((response) => {
      const modalElement = document.getElementById('statusModal');

      if (modalElement) {
        const modal = Modal.getInstance(modalElement);

        if (modal) {
          modal.hide();
        } else {
          console.error('Failed to get modal instance');
        }
      } else {
        console.error('Modal element not found');
      }

      this.getAdminDetails();
      this.tostr.success(response.message);
    }).catch((error) => {
      console.error('Error changing Admin status:', error);
      this.tostr.error('Failed to update Admin status.');
    });
  }



  
}
