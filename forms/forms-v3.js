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
 'build': 'version0.1',
 'project': 'WUBS - Forms'
}

var driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

driver.get('http://business.westernunion.com/Contact-Us').then(function(){
	driver.findElements(webdriver.By.css('form#form-1664564177 input[type=text]')).then(function(elements){
		elements.forEach(function (input) {
			input.sendKeys('Test text');	
			console.log("Form text values filled" );
		});
	}).then(function() {
		driver.findElement(webdriver.By.id("Email")).sendKeys("abc@test.com");								
	}).then(function() {
		driver.findElement(webdriver.By.id("Comments")).sendKeys("Some testing text on its way");
	}).then(function() {
		driver.findElement(webdriver.By.id("TelephoneNumber")).sendKeys("9999999999");	
		// 9999999999
	}).then(function() {
		driver.findElement(webdriver.By.css("#TopicOfInterest > option:nth-child(1)")).click();	
	}).then(function() {
		//driver.findElement(webdriver.By.css("#Country > option:nth-child(1)")).click().then(function(countrySelector){		
		
		driver.findElements(webdriver.By.css('.container form#form-1664564177 input[type=checkbox]')).then(function(checkboxes){
			checkboxes.forEach(function (chkbox) {
				console.log("checkbox clicked and .. ");	
				//console.log(chkbox.getAttribute('id'));				
				chkbox.findElement(chkbox).then(function(){
					chkbox.click();					
					
				});
			});
		}).catch((e) => {
			if(e.name === 'NoSuchElementError') {
				console.log('No Checkboxes found');						
			}
			//driver.quit();		
		});
		
	}).then(function() {
		// country with no state 
		driver.findElement(webdriver.By.css("#Country > option[value=US]")).click().then(function(countrySelector){
			console.log("Country clicked and .. ");
			
			driver.wait(webdriver.until.elementLocated(webdriver.By.css("#State > option:nth-child(1)")), 5000).then(function(){
				driver.wait(webdriver.until.elementIsVisible(stateEl), 5000).click().then(function() {
					console.log("State visible ");				
					
				}).catch((e) => {
					console.log(" Just inside catch of State for ->" + e.name);
					if(e.name === 'NoSuchElementError') {
						console.log('No State element found');					
					}
					if(e.name === 'TimeoutError') {
						console.log('Timed out');
					}
						
				});				
			}).catch((e) => {
				if(e.name === 'NoSuchElementError') {
					console.log('No State option found');						
				}
				console.log(" \\ Quit-State // ");								
			});
			
		}).catch((e) => {
			if(e.name === 'NoSuchElementError') {
				console.log('No Country found');						
			}
			console.log(" \\ QuitCountry // ");			
		});
	}).then(function(){
		driver.findElement(webdriver.By.css('form input[type=submit]')).submit().then(function() {
			console.log(" FORM submit available ");
			driver.wait(webdriver.until.elementLocated(webdriver.By.css('form span[id*=error]')), 4000).then(function(spanEl) {
				console.log(" \\ In Error loop // ");
				
				spanEl.getAttribute('id').then(function(spanName){					
					console.log(" Error is for -> " +  spanName);
				}).catch((e) => {
					if(e.name === 'NoSuchElementError') {
						console.log('1. No Errors found on page');								
					}
					console.log(" \\ Quit1 // " + e.name);
					//driver.quit();	
				});	
				//console.log("1. Errors Found on the page "  );
				
				//driver.quit();					
			}).catch((e) => {
				if(e.name === 'NoSuchElementError') {
					console.log('1. No Errors found on page');								
				}
				console.log(" \\ Quit2 // ");
				//driver.quit();	
			});		
				
				
		}).catch((e) => {
			if(e.name === 'NoSuchElementError') {
				console.log('No Submit found');						
			}
			console.log(" \\ Quit3 // ");
			driver.quit();		
		});		
	}).then(function() {
		//console.log('ta ta');
	});
	
	
	
});
