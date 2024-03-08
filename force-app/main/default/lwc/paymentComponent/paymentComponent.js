import { LightningElement, api } from 'lwc';

import {NavigationMixin} from 'lightning/navigation';
import sendEmail from '@salesforce/apex/LWCSendEmailClass.sendEmail';

//import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class PaymentInfoComponent extends NavigationMixin(LightningElement) {

    
    @api guestidfromhotelcomp;
    @api hotelcityfromhotelcomp;
    @api hoteltypefromhotelcomp;
    @api numberofadultsfromhotelcomp;
    @api numberofchildrenfromhotelcomp;
    @api checkindatefromhotelcomp;
    @api checkoutdatefromhotelcomp;
    @api guestemailfromhotelcomp;
    @api guestfirstnamefromhotelcomp;
   
    
    handleSubmit(){

        
            //to save record into database
        
            this.template.querySelectorAll('lightning-record-edit-form').forEach(element => {
            element.submit();
            });
    
            
            //to send email on submit
           
            const params = {toAddress: this.guestemailfromhotelcomp,
                       
                           guestFirstName: this.guestfirstnamefromhotelcomp,
                           guestHotelCity: this.hotelcityfromhotelcomp,
                           guestHotelType: this.hoteltypefromhotelcomp,
                           guestCheckInDate: this.checkindatefromhotelcomp,
                           guestCheckOutDate: this.checkoutdatefromhotelcomp,
                           guestNumberOfAdults: this.numberofadultsfromhotelcomp,
                           guestNumberOfChildren: this.numberofchildrenfromhotelcomp};
        
            
            sendEmail(params)
                .then(result => {
                    console.log(result);
                })
                .catch(error => {
                    console.log(error);
                });
   
    }
    
    //to navigate to record details page 
    handleSuccess(event){
        const recordId = event.detail.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: 'Payment_Detail__c',
                actionName: 'view'
            }
        });
    }                 
    
    
     
}    
