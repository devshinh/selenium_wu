var webdriver = require('selenium-webdriver');

// Input capabilities
var capabilities = {
 'browserName' : 'Chrome',
 'browser_version' : '66.0',
 'os' : 'Windows',
 'os_version' : '10',
 'resolution' : '1366x768',
 'browserstack.user' : 'charmonylai1',
 'browserstack.key' : 'UFfuJqkwMxHsUDYzz8nM',
 'browserstack.debug' : 'true',
 'build': 'version 3.1',
 'project': 'WUBS - Forms'
}

var driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

driver.get('https://business.westernunion.com/en-us/Contact-Us').then(function(){
	driver.findElements(webdriver.By.css('form#form-1664564177 input[type=text]')).then(function(elements){
		elements.forEach(function (input) {
			input.sendKeys('Test text');	
			console.log("Form text values filled" );
		});
	}).then(function() {
		driver.findElement(webdriver.By.id("Email")).sendKeys("abc@wubs.com");	
		console.log("Email filled" );		
	}).then(function() {
		driver.findElement(webdriver.By.id("Comments")).sendKeys("This is a test comment *");
		console.log("Comment added" );		
	}).then(function() {
		driver.findElement(webdriver.By.id("TelephoneNumber")).sendKeys("9999999999");			
		console.log("Telephone filled" );		
	}).then(function() {
		driver.findElement(webdriver.By.css("#TopicOfInterest > option:nth-child(1)")).click();	
		console.log("Topic selected" );		
	}).then(function() {		
		driver.findElements(webdriver.By.css('.container form#form-1664564177 input[type=checkbox]')).then(function(checkboxes){
			checkboxes.forEach(function (chkbox) {
				console.log("checkbox clicked and .. ");					
				chkbox.findElement(chkbox).then(function(){
					chkbox.click();									
				});
			});
		}).catch((e) => {
			if(e.name === 'NoSuchElementError') {
				console.log('No Checkboxes found');						
			}				
		});
		
	}).then(function() {
		// country selector
		driver.findElement(webdriver.By.css("#Country > option[value=US]")).click().then(function(countrySelector){
			console.log("Country clicked and .. ");	
			driver.wait(webdriver.until.elementLocated(webdriver.By.css("#State")), 6000).then(function(elState){
				driver.findElement(webdriver.By.css("#State > option:nth-child(1)")).click().then(function(){
					console.log("State clicked and .. ");	
					driver.findElement(webdriver.By.css('form button[type=submit]')).click().then(function() {
						console.log(" + FORM submit ");
						driver.wait(webdriver.until.elementLocated(webdriver.By.css('form span[id*=error]')), 4000).then(function(spanEl) {
							console.log(" * Found Errors ");
							spanEl.getAttribute('id').then(function(spanName){					
								console.log(" Error is for -> " +  spanName);
								driver.quit();
							}).catch((e) => {
								if(e.name === 'NoSuchElementError') {
									console.log('1. No Errors found on page');								
								}
								console.log(" - Quit when no Error  " + e.name);
								driver.quit();
							});												
						}).catch((e) => {
							if(e.name === 'NoSuchElementError') {
								console.log('1. No Errors found on page');								
							}
							console.log(" Quit for no errors  " + e.name);
							driver.quit();	
						});	
					}).catch((e) => {
						if(e.name === 'NoSuchElementError') {
							console.log('No Submit found');						
						}
					});						
				}).catch((e) => {
					if(e.name === 'NoSuchElementError') {
						console.log('No State option found');						
					}
					console.log(" - Quit State // " + e.type);								
				});
			}).catch((e) => {
				if(e.name === 'NoSuchElementError') {
					console.log('No State option found');						
				}
				console.log(" - Quit State // ");								
			});			
			
		}).catch((e) => {
			if(e.name === 'NoSuchElementError') {
				console.log('No Country found');						
			}
			console.log(" - QuitCountry // ");			
		});
			
	});	
});
