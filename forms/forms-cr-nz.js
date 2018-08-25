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
 'build': 'version 0.2',
 'project': 'WUBS - Forms'
}

var driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

driver.get('https://business.westernunion.com/Contact-Us').then(function(){
	driver.findElements(webdriver.By.css('.container form#form-1664564177 input[type=text]')).then(function(elements){
		elements.forEach(function (input) {
			input.sendKeys('Test text');	
			console.log("Form text values filled" );
		});
	}).then(function() {
		driver.findElement(webdriver.By.css(".container form#form-1664564177 input[type=email]")).sendKeys("abc@test.com");								
	}).then(function() {
		driver.findElement(webdriver.By.css(".container form#form-1664564177  textarea")).sendKeys("Some testing text on its way");
	}).then(function() {
		//driver.findElement(webdriver.By.id("TelephoneNumber")).sendKeys("9999999999");	
	}).then(function() {
		driver.findElements(webdriver.By.css(".container form#form-1664564177 select")).then(function(selectors){
			selectors.forEach(function (selector) {
				console.log("selector clicked and .. ");			
				selector.findElement(webdriver.By.css("option:nth-child(1)")).then(function(selOpt){
					selOpt.click();						
				}).catch((e) => {
					console.log('No option found ');
				});
			});
		}).catch((e) => {
			if(e.name === 'NoSuchElementError') {
				console.log('No Selectors found');						
			}			
		});
		//driver.findElement(webdriver.By.css(".container form select > option:nth-child(1)")).click();	
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
		
	}).then(function(){
		
		driver.findElement(webdriver.By.css('.container form#form-1664564177 [type=submit]')).submit().then(function() {
			console.log(" FORM submit done with state available ");
			driver.wait(webdriver.until.elementLocated(webdriver.By.css('form span[id*=error]')), 2000).then(function() {
				console.log("1. Errors Found on the page");
				driver.quit();					
			}).catch((e) => {
				if(e.name === 'NoSuchElementError') {
					console.log('1. No Errors found on page');								
				}
				driver.quit();	
			});		
		}).catch((e) => {
			if(e.name === 'NoSuchElementError') {
				console.log('No Submit found');						
			}
			driver.quit();		
		});
	});	
});
