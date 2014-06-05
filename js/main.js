var app = {

    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();  // ref til ul-class .employee-list, den tømmes 
            for (var i=0; i<l; i++) {  // 
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }  // kommer til at stå inde i <ul></ul>
        });
    },
	showAlert: function (message, title) {
		//if (navigator.notification) {
		console.log('navigator.notification:'+navigator.notification); // navigator.notification:undefined , navigator.notification bør være defineret på real device
		if (navigator.notification != undefined && navigator.notification){
		//if(navigator.notification
			navigator.notification.alert(message+' med navigator.notification', null, title, 'OK');
		} else {
			console.log(title ? (title + ": " + message+' uden navigator.notification') : message);
		}
	},

    initialize: function() {
		this.showAlert('Store Initialized', 'Info');  //udgave med callback fct
        this.store = new MemoryStore();  // laver instans af MemoryStore-objekt, this ref. til dette app-instans-objekt
		//this.store = new WebSqlStore();  // laver instans af MemoryStore-objekt, this ref. til dette app-instans-objekt
		//console.log('store:'+store); fejlagtigt,men ingen fejlbesked i chrome, men i IE 
		/*
		this.store = new MemoryStore(function() {
			this.showAlert('Store Initialized', 'Info');  //udgave med callback fct,giver fejl: Uncaught TypeError: undefined is not a function, IE: obj understøtter ikke operationen
		});
		*/
		console.log('store:'+this.store); 
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }

};

app.initialize();