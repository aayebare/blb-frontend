import { Component, Input, ViewChild } from '@angular/core';
import { SubscriptionService } from '../../../services/subscription.service';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
  CardModule,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalModule,
  
} from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Subscription {
  contractorId: number; // Foreign key referencing the associated contractor
  planName: string; // Name of the subscription plan
  price: number; // Price of the subscription plan
  duration: number; // Duration (e.g., "Monthly", "Yearly")
  createdAt: Date; // Start date of the subscription
  endDate: Date; // End date of the subscription
  // Add any other relevant subscription details (optional)
}

@Component({
  selector: 'app-subscription-modal',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
  // standalone: true,
  // imports: [ AvatarComponent,
  //   ButtonDirective,
  //   ButtonGroupComponent,
  //   CardBodyComponent,
  //   CardComponent,
  //   CardFooterComponent,
  //   CardHeaderComponent,
  //   ColComponent,
  //   FormCheckLabelDirective,
  //   GutterDirective,
  //   ProgressBarDirective,
  //   ProgressComponent,
  //   RowComponent,
  //   TableDirective,
  //   TextColorDirective,
  //   CardModule,
  //   ModalComponent,
  //   ModalFooterComponent,
  //   ModalHeaderComponent,
  //   ModalBodyComponent,
  //   CommonModule,
  //   FormsModule,
  //   ModalModule,

  // ]
})
export class SubscriptionModalComponent {

  @ViewChild('modal') modal!: ModalComponent;
  @Input() contractorId!: number;
  public subscriptions: Subscription[] = [];
  public subscription: Subscription = {
    contractorId: 0,
    planName: '',
    price: 0,
    duration: 0,
    createdAt: new Date(),
    endDate: new Date(),
  };
  
  public isEditMode: boolean = false;
  public modalVisible: boolean = false; 

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit() {
    // this.loadSubscriptions();
  }

  calculateEndDate(startDate: Date, duration: number): Date {
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + duration);
    return endDate;
  }

  loadSubscriptions( id: number) {

    // console.log(this.contractorId, '-------')

    // this.subscriptions = this.subs
    this.subscriptionService.getSubscriptionsByContractor(this.contractorId).subscribe(
      subscriptions => {
        console.log(subscriptions, '-------')
        this.subscriptions = subscriptions;
      },
      error => {
        console.error('Error loading subscriptions:', error);
      }
    );
  }

  addSubscription() {
    // Add validation and other logic here
    const { planName } = this.subscription
    const contractorId = this.contractorId
    this.subscriptionService.addSubscription({planName, contractorId}).subscribe(
      newSubscription => {
        this.subscriptions.push(newSubscription);
        // this.subscription = {
        //   contractorId: 0,
        //   planName: '',
        //   price: 0,
        //   duration: 0,
        //   createdAt: new Date(),
        //   endDate: new Date(),
        // };
      },
      error => {
        console.error('Error adding subscription:', error);
      }
    );

    // this.subs.push(this.subscription)
    
  }

  deleteSubscription(scription: any) {

  }
  editSubscription(subscription: any){

  }

  showModal(): void {
    this.modalVisible = true;
    this.loadSubscriptions(this.contractorId,);
    console.log(this.contractorId, '000000000000')
  }

  hideModal(): void {
    this.modalVisible = false;
  }

}