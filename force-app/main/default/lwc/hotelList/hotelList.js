import { LightningElement, api, wire, track } from 'lwc';

//import the getHotelList method from LWCShowHotelListClass class to get the list of hotels from server side(apex)
import getHotelList from '@salesforce/apex/LWCShowHotelListClass.getHotelList';


export default class HotelListingComponent extends LightningElement {
    
     //to specify columns for attribute columns in lightning datatable
    @track columns = [
     {label: 'Hotel City', fieldName: 'Hotel_City__c'},
     {label: 'Hotel Type', fieldName: 'Hotel_Type__c'},
     {label: 'Per Day Cost', fieldName: 'Per_Day_Cost__c'},
     {label: 'WiFi Availability', fieldName: 'Wifi_Availability__c'},
     {label: 'Cancellation Availability', fieldName: 'Cancellation_Availability__c'},
     {label: 'Cash Pay Availability', fieldName: 'Cash_Pay_Availability__c'}
     
    ];

    //property we received from parent guest component and from here we pass it to payment info child component
    //api decorator makes property publicly available across components
    @api hotelcityfromguestcomp;
    @api hoteltypefromguestcomp;
    @api numberofadultsfromguestcomp;
    @api numberofchildrenfromguestcomp;
    @api checkindatefromguestcomp;
    @api checkoutdatefromguestcomp;
    @api guestemailfromguestcomp;
    @api guestfirstnamefromguestcomp;
    @api guestidfromguestcomp;
    
    showPaymentComponent = true;
    
    @track hotelList;
    @track error;
    
    //using wire decorator we can fetch data from apex
    //here we are matching hotel city and type with database and fetch relevant records
    @wire(getHotelList,{hotelCitySearch:'$hotelcityfromguestcomp',
                        hotelTypeSearch:'$hoteltypefromguestcomp'
                       }) 
    wiredHotelList({data,error}) {
        if(data) {

              this.hotelList = data;
              console.log(data); 
          }     
          else if (error) {
               this.error = error;
               console.log(error);
          }
     }
     
     //used to get selected record in lightning datatable
     getSelectedRecord(event){
          const selectedRows = event.detail.selectedRows;
          for(let i=0; i<selectedRows.length; i++){
               
               alert('Please Confirm: Hotel City = ' + selectedRows[i].Hotel_City__c  + '\n ' +
                    'Hotel Type = ' + selectedRows[i].Hotel_Type__c  + '\n ' + 
                    'Per Day Cost = ' + selectedRows[i].Per_Day_Cost__c  + '\n ' + 
                    'Wifi Availability = ' + selectedRows[i].Wifi_Availability__c  + '\n ' +
                    'Cancellation Availability = ' + selectedRows[i].Cancellation_Availability__c + '\n ' +
                    'Cash Pay Availability = ' + selectedRows[i].Cash_Pay_Availability__c );
               
          }
          
          
     }

     handleSelect(){
          //to show payment info component when we click on select
          this.showPaymentComponent = false;
     }

         
}