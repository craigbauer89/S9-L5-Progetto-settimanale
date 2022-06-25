
document.addEventListener('DOMContentLoaded', () => {

    console.log('Page Loaded');
});

class Smartphone {
    private _firstname:string; // not needed but can add
    private _balance:number;
    private _minutes:number;
    private _calls:number; 

    constructor(firstname:string, balance:number, minutes:number, calls:number) {
        this._firstname = firstname;
        this._balance = balance;
        this._minutes = minutes;
        this._calls = calls;
    }

    get firstname():string {
            return this._firstname;       
    }

    get balance():number {
        return this._balance;       
}
get calls():number {
    return this._calls;       
}

    get minutes():number {
            return this._minutes;

    }

    set minutes(minutes:number) {
             this._minutes = minutes;
    }

    set balance(balance:number) {
        this._balance = balance;
}

    public ricarica(unaRicarica:number):void {
        this._balance += unaRicarica;  //done
    }

    public chiamata(minutiDurata:number):void {
        this._minutes = minutiDurata;//done
   

    }

    public getNumeroChiamate():number {
        return this._calls++;//done
    }

    public numero404():number {
        // this._balance =- this.minutes*.2;
        return (this._balance - this.minutes*.2)  //done
    }

    public azzeraChiamate():void {
        this._calls = 0;
        this._balance = 0;
        this.minutes = 0;  //done
    }
}
let FirstUser = new Smartphone("John" , 100, 0, 0);
// console.log("User's Name: " + FirstUser.firstname);
// console.log("Minutes Used: " + FirstUser.minutes);
// console.log("User's Balance: " +FirstUser.balance);
// console.log("Calls used: " + FirstUser.calls);
// FirstUser.azzeraChiamate();
// console.log("PHONE RESET - User's Name: " + FirstUser.firstname);
// console.log("PHONE RESET - Minutes Used: " + FirstUser.minutes);
// console.log("PHONE RESET - User's Balance: " +FirstUser.balance);
// console.log("PHONE RESET - Calls used: " + FirstUser.calls);
// FirstUser.ricarica(200);
// console.log("Balance after TopUP: "+FirstUser.numero404());
// console.log("Check the balance variable: " + FirstUser.balance); // same as above

// let minutiDurata:number = FirstUser.minutes;
// let myInterval =setInterval(function() {    
//     minutiDurata++
//     }, 1000)

// let howlongwillthecallbeinmins = 3; 


// setTimeout(() => {
//     clearInterval(myInterval);
//     FirstUser.getNumeroChiamate();
   
//     }, howlongwillthecallbeinmins*1000);

// setTimeout(() => {
//     FirstUser.minutes = minutiDurata; 
//     console.log("Total call minutes:" +FirstUser.minutes);
//     console.log("Total calls:" +FirstUser.calls);
//     console.log("User's Balance: " +FirstUser.numero404());
//     }, howlongwillthecallbeinmins*1000);


// console.log(FirstUser.balance);

let myInterval:number;
let minutiDurata:number;
let secs:number;
let mins:number;
let hrs:number;
let CreditAvailable:boolean;

function leadingzero(i:any) {
    if (i < 10) {i = '0'+ i}; 
    return i;
  }


function startcall() {
    clearInterval(myInterval);
     if (FirstUser.numero404() > 0) {

        let box = document.querySelector('.container');
        if(box !== null){
            box.innerHTML = `Calling.......`
            }   
            secs = leadingzero(0);
            mins = leadingzero(0);
            hrs = leadingzero(0);
            
        minutiDurata = FirstUser.minutes;
        let credit = FirstUser.numero404();
            setTimeout(() => { myInterval =setInterval(function() {    
                secs++
                secs = leadingzero(secs);
                if (secs >=60) {

                    secs = leadingzero(0);
                    mins++;
                    mins = leadingzero(mins);
                }
                if (mins >=60) {
            
                    mins = leadingzero(0);
                    hrs++;
                    hrs = leadingzero(hrs);
                }
                minutiDurata++;
                if(box !== null){
                    box.innerHTML = ` ${hrs} : ${mins} : ${secs}`      
                    } 
                credit = credit- .2;
                console.log(credit);
                if (credit <= 0) {
                    endcall();
                    alert("Credit ran out!")
                }
                
                    
            }, 1000);
        },1000) 
     }
    else {
        alert('Not enough Credit to make call. Please top up')
    }
}

function endcall() {
    
    clearInterval(myInterval);
    FirstUser.getNumeroChiamate();
    FirstUser.minutes = minutiDurata; 
    printdata();
}


function reset() {
    clearInterval(myInterval);
    FirstUser.azzeraChiamate();
    let box = document.querySelector('.container');
    // let data = document.createElement('p');
    if(box !== null){
        box.innerHTML = `
                        Your balance is: ${FirstUser.balance}
                          
                          `
                        //   box.append(data);
                        }                    
    
    
}


function printdata() {
    // cleardata()
    let box = document.querySelector('.container');
    // let data = document.createElement('p');
    if(box !== null){
        box.innerHTML = `
                          Number of minutes: ${FirstUser.minutes}
                          Number of calls: ${FirstUser.calls}
                          `
                        //   box.append(data);
                        }                    
    
}

function balance() {
    // cleardata()
    let box = document.querySelector('.container');
    // let data = document.createElement('p');
    if(box !== null){
    box.innerHTML = `Your balance is: ${FirstUser.numero404()}`
    // box.append(data);
                        }                    
    
}


function topUp() {
    
    let amount = <HTMLInputElement>document.querySelector('input[name="topup"]')
    
    if(amount !== null){
        let number = amount.value;
        
        if (number !== '') {
        FirstUser.ricarica(parseInt(number));
        } else {
            alert("must enter a number");
        }
        amount.value =  ' ';
    }
    let box = document.querySelector('.container');
    // let data = document.createElement('p');
    if(box !== null){
    box.innerHTML = `Your balance is: ${FirstUser.numero404()}`
    // box.append(data);

}
}

// function cleardata() {
//     let box = document.querySelector('.container');
//     if(box !== null){
//         if (box.hasChildNodes()) {  
//             box.removeChild(box);
//         }
        
//     }
// }

















// class User1 extends Smartphone {

//     constructor(firstname:string, balance:number, minutes:number, calls:number) {
//         super(firstname,balance,minutes,calls);
       
//     }

//     public ricarica(unaRicarica:number):void {
        
//     }

//     public calculateMins(minutes:number) {
//         this.minutes=minutes;
//     }

//     public calculatebal(minutes:number) {
//         this.minutes=minutes;
//     }

//     public reset(minutes:number) {
//         this.minutes=minutes;
//     }
// }

// let user1 = new User1("John" , 100, 66, 12);
// console.log(user1.firstname);
// user1.minutes = 20000;
// console.log(user1.minutes);

