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
	});
	
	driver.findElement(webdriver.By.id("Email")).sendKeys("abc@test.com");							
	driver.findElement(webdriver.By.id("Comments")).sendKeys("Some testing text on its way");
	driver.findElement(webdriver.By.id("TelephoneNumber")).sendKeys("9999999999");
	
	driver.findElement(webdriver.By.css("#TopicOfInterest > option:nth-child(1)")).click();
	
	//driver.findElement(webdriver.By.css("#Country > option:nth-child(1)")).click().then(function(countrySelector){		
	driver.findElement(webdriver.By.css("#Country > option[value=GB]")).click().then(function(countrySelector){
		
		//driver.wait(webdriver.until.elementLocated(webdriver.By.id('State')), 6000).then(el => {
			
		driver.wait(webdriver.until.elementLocated(webdriver.By.id("State")));
		
		driver.wait(until.elementIsVisible(driver.findElement(webdriver.By.id("State"))), 5000).then(function() {
		
			driver.findElement(webdriver.By.css("#State > option:nth-child(1)")).click().then(function() {
					
				driver.findElement(webdriver.By.css('form input[type=submit]')).submit().then(function() {
							
					//driver = null;
					driver.wait(webdriver.until.elementLocated(webdriver.By.css('form span[id*=error]')), 2000).then(function() {
						console.log("Errors Found on the page");
						driver.quit();					
					}).catch((e) => {
						if(e.name === 'NoSuchElementError') {
							console.log('No Errors found on page');
						}
						
					});		
					console.log('Outer of State Option found');
					driver.quit();	
				});	
			}).catch((e) => {
				if(e.name === 'NoSuchElementError') {
					console.log('Selector State -- Option not Found');
					
					driver.findElement(webdriver.By.css('form input[type=submit]')).submit().then(function() {
							
						//driver = null;
						driver.wait(webdriver.until.elementLocated(webdriver.By.css('form span[id*=error]')), 2000).then(function() {
							console.log("Errors Found on the page");
							driver.quit();					
						}).catch((e) => {
							if(e.name === 'NoSuchElementError') {
								console.log('No Errors found on page');
							}
							
						});		
						console.log('Outer of State Option found');
						driver.quit();	
					});	
				}
			});
			
		}, function(err) {
			if (err.name && err.name === 'NoSuchElementError') {
				console.log('Selector State not Found after time .. ');
				driver.findElement(webdriver.By.css('form input[type=submit]')).submit().then(function() {
							
					//driver = null;
					driver.wait(webdriver.until.elementLocated(webdriver.By.css('form span[id*=error]')), 2000).then(function() {
						console.log("Errors Found on the page");
						driver.quit();					
					}).catch((e) => {
						if(e.name === 'NoSuchElementError') {
							console.log('No Errors found on page');
						}
						
					});		
					console.log('Outer of submit - when no state found');
					driver.quit();	
				});	
				
			} else {
				webdriver.promise.rejected(err);
			}
		});
		
	});

});