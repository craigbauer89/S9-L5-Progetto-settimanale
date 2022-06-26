"use strict";
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page Loaded');
});
class Smartphone {
    constructor(firstname, balance, minutes, calls) {
        this._firstname = firstname;
        this._balance = balance;
        this._minutes = minutes;
        this._calls = calls;
    }
    get firstname() {
        return this._firstname;
    }
    get balance() {
        return this._balance;
    }
    get calls() {
        return this._calls;
    }
    get minutes() {
        return this._minutes;
    }
    set minutes(minutes) {
        this._minutes = minutes;
    }
    set balance(balance) {
        this._balance = balance;
    }
    ricarica(unaRicarica) {
        this._balance += unaRicarica; //done
    }
    chiamata(minutiDurata) {
        this._minutes = minutiDurata; //done
    }
    getNumeroChiamate() {
        return this._calls++; //done
    }
    numero404() {
        // this._balance =- this.minutes*.2;
        return (this._balance - this.minutes * .2); //done
    }
    azzeraChiamate() {
        this._calls = 0;
        this._balance = 0;
        this.minutes = 0; //done
    }
}
let FirstUser = new Smartphone("John", 100, 0, 0);
let SecondUser = new Smartphone("Tim", 200, 0, 0);
let ThirdUser = new Smartphone("Mary", 50, 0, 0);
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
let myInterval;
let minutiDurata;
let secs;
let mins;
let hrs;
let CreditAvailable;
function reset2(User) {
    let amount = document.querySelector('input[name="' + User.firstname + '"]');
    amount.value = '';
    let box = document.querySelector('.' + User.firstname + '');
    if (box !== null) {
        box.innerHTML = '';
    }
}
function leadingzero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    ;
    return i;
}
function startcall(User) {
    let amount = document.querySelector('input[name="' + User.firstname + '"]');
    let number = amount.value;
    console.log(number);
    if (number !== '') {
        // clearInterval(myInterval);
        if (User.numero404() > 0) {
            let box = document.querySelector('.' + User.firstname + '');
            if (box !== null) {
                box.innerHTML = `Calling.......`;
            }
            secs = leadingzero(0);
            mins = leadingzero(0);
            hrs = leadingzero(0);
            minutiDurata = User.minutes;
            minutiDurata++;
            let credit = User.numero404();
            setTimeout(() => {
                myInterval = setInterval(function () {
                    secs++;
                    secs = leadingzero(secs);
                    if (secs >= 60) {
                        minutiDurata++;
                        credit = credit - .2;
                        console.log(credit);
                        secs = leadingzero(0);
                        mins++;
                        mins = leadingzero(mins);
                    }
                    if (mins >= 60) {
                        mins = leadingzero(0);
                        hrs++;
                        hrs = leadingzero(hrs);
                    }
                    if (box !== null) {
                        box.innerHTML = ` ${hrs} : ${mins} : ${secs}`;
                    }
                    if (credit <= 0) {
                        endcall(User);
                        alert("Credit ran out!");
                    }
                }, 1000);
            }, 1000);
        }
        else {
            alert('Not enough Credit to make call. Please top up');
        }
    }
    else {
        alert("must enter a number");
    }
}
function endcall(User) {
    clearInterval(myInterval);
    User.getNumeroChiamate();
    User.minutes = minutiDurata;
    printdata(User);
}
function reset(User) {
    let amount = document.querySelector('input[name="' + User.firstname + '"]');
    amount.value = '';
    clearInterval(myInterval);
    User.azzeraChiamate();
    let box = document.querySelector('.' + User.firstname + '');
    // let data = document.createElement('p');
    if (box !== null) {
        box.innerHTML = `
                        Calls, minutes and balance reset to: ${User.balance}
                          
                          `;
        //   box.append(data);
    }
}
function printdata(User) {
    // cleardata()
    let amount = document.querySelector('input[name="' + User.firstname + '"]');
    amount.value = `${User.minutes}`;
    let box = document.querySelector('.' + User.firstname + '');
    // let data = document.createElement('p');
    if (box !== null) {
        box.innerHTML = `
                          
                          Number of minutes:
                          
                          `;
        //   box.append(data);
    }
}
function balance(User) {
    // cleardata()
    let amount = document.querySelector('input[name="' + User.firstname + '"]');
    amount.value = `${User.numero404()}`;
    let box = document.querySelector('.' + User.firstname + '');
    // let data = document.createElement('p');
    if (box !== null) {
        box.innerHTML = `
                     Balance: `;
        // box.append(data);
    }
}
function calllog(User) {
    // cleardata()
    let amount = document.querySelector('input[name="' + User.firstname + '"]');
    amount.value = `${User.calls}`;
    let box = document.querySelector('.' + User.firstname + '');
    // let data = document.createElement('p');
    if (box !== null) {
        box.innerHTML = `
                     Calls: `;
        // box.append(data);
    }
}
function topUp(User) {
    let box = document.querySelector('.' + User.firstname + '');
    if (box !== null) {
        if (box.innerHTML === '') {
            let amount = document.querySelector('input[name="' + User.firstname + '"]');
            if (amount !== null) {
                let number = amount.value;
                console.log(number);
                if (number !== '') {
                    User.ricarica(parseInt(number));
                }
                else {
                    alert("must enter a number");
                }
                amount.value = `${User.numero404()}`;
            }
            // let box = document.querySelector('.'+ User.firstname +'');
            // let data = document.createElement('p');
            if (box !== null) {
                box.innerHTML = `Balance:`;
                // box.append(data);
            }
        }
        else {
            reset2(User);
            alert("must enter a number");
        }
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
function getnumber(User, param) {
    let amount = document.querySelector('input[name="' + User.firstname + '"]');
    amount.value += param;
}
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
