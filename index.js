function ApppViewModel () {

  var self = this;
  this.name = "Alton Goodwin Myra Booker Malikah Monaco Mayan Rieder Anna Wike Yael Vanvalkenburg Mackenzee George Marlina Rollins Zyasia Correa Allison Durbin Danya Conwell Bryona Solomon Lizbeth Pool Kiara Freda Paulette Cruse Starr Jacobson Arianna Cason Klee Childs Zuleika Pope Kymberley Maurer Devine Bond Ashleigh West Baylea Kersey Safiyah Land Paula Reed Lia Spears Barrington Jacinto Gillian Mcintyre Halli Mckay Maximillian Kellett Terriona Baltz Alannah Brew Brieanna Saul Zoe Forbes Mylie Cherry Yanissa Southard Eleana Belcher Marely Harrison Karlee Tidwell Ella Hoskins Lauran Palmer Tiffanie Law Kobie Ashcraft Leilanni Walsh Allisson Jelinek Milana Conaway Saddie Farmer Nahla Blair Khamyah Flood Ermina Robinette"; 
  this.name_splited = this.name.split (' '); //mảng sau khi tách các chữ trên name
  this.firstName = ko.observableArray ();
  this.lastName = ko.observableArray ();
  this.age = ko.observableArray ();
  this.people = ko.observableArray ();
  this.fullName = ko.observableArray ();
  this.UndoPeopleArray=ko.observableArray ();

  //ADD
  var Person = function (firstName,lastName,age)
  {
    this.firstName = ko.observable (firstName);
    this.lastName = ko.observable (lastName);
    this.age = ko.observable (age);
    this.fullName = ko.computed(function () {return this.lastName () +  " " + this.firstName (); }, this);
    this.checkage = ko.observable ("");
  }    

  


  function getRandomInt (n) { return Math.floor (Math.random () * n);} 

  for (var i = 0;i<this.name_splited.length/2;i++)
  {
      this.firstName () [i] = this.name_splited [getRandomInt ( this.name_splited.length)] ;
      this.lastName () [i] = this.name_splited [getRandomInt ( this.name_splited.length)] ;
      this.age () [i] = Math.floor (Math.random () * 100) + 1
      
      if (this.firstName () [i].search ('M')==0 && (this.firstName () [i] + this.lastName () [i]).length >12)
      {
        this.people.push (new Person(this.firstName () [i],this.lastName () [i],this.age () [i]))
      }
  }
//check rỗng
  if (this.people ().length === 0) 
  {
        this.people.push (new Person ("Không có firstName","Không có lastName",0));
        console.log ("Mảng rỗng")
  } 

  self.items = ko.observableArray (this.people ().map (function (i) {       
      return new Person (i.firstName (), i.lastName (), i.age ());
  }));
      
  self.items_undo = ko.observableArray (this.UndoPeopleArray ().map (function (i) {       
      return new Person (i.firstName (), i.lastName (), i.age ());
  }));

  self.selected = ko.observable (self.items () [0]);
  self.select = function (item) { 
    if (item.age () > 12)
    {
      item.checkage = "is retired";
    }
    else if (item.age () == 0)
    {
      item.checkage = "";
    }
    else 
    {
      item.checkage = "is teenage";
    }
    self.selected (item); 
  };
  

  self.removePeople = function (peo) { 
    self.items.remove (peo)
    self.items_undo.push (new Person (peo.firstName (), peo.lastName (), peo.age ()));
  };

  self.UndoPeople = function (peo) { 
    self.items_undo.remove (peo)
    self.items.push (new Person (peo.firstName (), peo.lastName (), peo.age ()));
  };

    
  
  
}

// Activates knockout.js
ko.applyBindings (new ApppViewModel ());