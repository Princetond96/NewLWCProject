import { LightningElement, track } from 'lwc';

//import saveGuestRecord method from LWCGuestEntryFormClass to pass form values from LWC to apex and insert record
import saveGuestRecord from '@salesforce/apex/LWCGuestEntryFormClass.saveGuestRecord';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';

//import fields from Guest record
import GuestFirstName_FIELD from '@salesforce/schema/Guest__c.First_Name__c';
import GuestLastName_FIELD from '@salesforce/schema/Guest__c.Last_Name__c';
import GuestPhone_FIELD from '@salesforce/schema/Guest__c.Phone__c';
import GuestEmail_FIELD from '@salesforce/schema/Guest__c.Email__c';


export default class GuestEntryFormComponent extends LightningElement {
    
    //assign values to Hotel Type using lightning-combobox
    get options(){
        return[
                {label: '3 Star', value: '3 Star'},
                {label: '4 Star', value: '4 Star'},
                {label: '5 Star', value: '5 Star'},
        ];
    }
    //declare property which can be binded in HTML
    @track error;
    @track guestid;
   
    @track hotelCity;
    @track hotelType;
    @track numberOfAdults;
    @track numberOfChildren;
    @track checkInDate;
    @track checkOutDate;
    @track guestEmail;
    @track guestFirstName;
   
    booleanFlagValue = true;
    
    @track guestRecord = {
        First_Name__c : GuestFirstName_FIELD,
        Last_Name__c : GuestLastName_FIELD,
        Phone__c : GuestPhone_FIELD,
        Email__c : GuestEmail_FIELD

    };

    //on change of input field call the handler function to store the value in property 

    handleFirstNameChange(event){
        this.guestRecord.First_Name__c = event.target.value;
        this.guestFirstName = this.guestRecord.First_Name__c;
        console.log('First Name =' +this.guestRecord.First_Name__c);
    }

    handleLastNameChange(event){
        this.guestRecord.Last_Name__c = event.target.value;
        console.log('Last Name =' +this.guestRecord.Last_Name__c);
    }

    handlePhoneChange(event){
        this.guestRecord.Phone__c = event.target.value;
        console.log('Phone =' +this.guestRecord.Phone__c);
    }

    handleEmailChange(event){
        this.guestRecord.Email__c = event.target.value;
        this.guestEmail = this.guestRecord.Email__c;
        console.log('Email =' +this.guestRecord.Email__c);
    }

    handleHotelCityChange(event){
        this.hotelCity = event.target.value;
        console.log('Hotel City =' +this.hotelCity);
    }

    handleHoteltypeChange(event){
        this.hotelType = event.target.value;
        console.log('Hotel Type =' +this.hotelType);
    }

    handleNoOfAdultsChange(event){
        this.numberOfAdults = event.target.value;
        console.log('No Of Adults =' +this.numberOfAdults);
    }

    handleNoOfChildrenChange(event){
        this.numberOfChildren = event.target.value;
        console.log('No Of Children =' +this.numberOfChildren);
    }

    handleCheckInDateChange(event){
        this.checkInDate = event.target.value;
        console.log('Check in date =' +this.checkInDate);
    }

    handleCheckOutDateChange(event){
        this.checkOutDate = event.target.value;
        console.log('Check out date =' +this.checkOutDate);
    }

   
    //on click of save button call the handleSave function
    handleSave(){
        this.booleanFlagValue = false;
        
        //pass the values of required input fields from LWC(guestRecord) to Apex(guestRecordList)
        saveGuestRecord({ guestRecordList : this.guestRecord})
        .then(result => {
            this.guestRecord = {};
            
            //store the id of inserted record in property guestid
            this.guestid = result.Id;
            console.log('Guest Record id = '+this.guestid);

            console.log('result = ' +result);

            this.dispatchEvent(
                new ShowToastEvent({
                    title : 'Success',
                    message : 'Guest Record Created Successfully!',
                    variant : 'Success' 
                }),
            );
        })
        .catch(error => {
            this.error = error.message;
        });

    }

}
