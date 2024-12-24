import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  Profile: FormGroup;
  user: any;  // No explicit model, use 'any'
  errorMessage: string | undefined;

  constructor(private client: LoginService, private toastr: ToastrService, private translate: TranslateService) {
    this.Profile = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      State: new FormControl('', Validators.required),
      City: new FormControl('', Validators.required),
      Zipcode: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.translate.setDefaultLang('en');

   
    const savedLanguage = localStorage.getItem('Language');
    if (savedLanguage) {
      this.Profile.get('language')?.setValue(savedLanguage);
      this.translate.use(savedLanguage);
    }
  }

  getUserDetails() {
    this.client.getUserDetails()
      .then((response: any) => {
        if (response && response.success) {
          this.user = response.user;
          console.log('API response:', response);

          // Set form values with the user data
          this.Profile.patchValue({
            name: this.user.name,
            email: this.user.email,
            State: this.user.State,
            City: this.user.City,
            Zipcode: this.user.Zipcode,
            language: this.user.userLang || this.Profile.get('language')?.value // Fallback to saved language if not available
          });
        } else {
          this.errorMessage = 'Error retrieving user details: ' + response.message;
        }
      })
      .catch(err => {
        console.error('Error fetching user details:', err);
        this.errorMessage = 'An error occurred while fetching user details.';
      });
  }

  switchLanguaget() {
    const selectedLanguage = this.Profile.get('language')?.value;
    localStorage.setItem('Language', selectedLanguage);
    this.client.setLanguage(selectedLanguage);
    console.log(selectedLanguage);
    this.translate.use(selectedLanguage);
  }

  profileData() {
    if (this.Profile.valid) {
      this.switchLanguaget();

      const profileData = this.Profile.value;
      console.log('Sending profile data:', profileData);
      this.client.updateDetails(profileData)
        .then((response: any) => {
          if (response && response.success) {
            this.toastr.success(response.message);
          } else {
            console.error('Failed to update profile:', response.message);
          }
        })
        .catch(err => {
          console.error('Error updating profile:', err);
        });
    } else {
      console.log('Form is invalid:', this.Profile.errors);
    }
  }
}
