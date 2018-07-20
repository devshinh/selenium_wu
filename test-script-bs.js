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
 'build': 'version0.0',
 'project': 'Define project'
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
	driver.findElement(webdriver.By.css("#Country > option:nth-child(2)")).click().then(function(countrySelector){		
		
		driver.wait(webdriver.until.elementLocated(webdriver.By.id('State')), 6000).then(el => {
			 //el.getElementByTagName('option')[1].selected = 'selected';
			driver.findElement(webdriver.By.css("#State > option:nth-child(1)")).then(function(selOption) { 
				console.log('sel option exists');
			}, function(err) {
				if (err.state && err.state === 'no such element') {
					console.log(' sel option not found');
				} else {
					webdriver.promise.rejected(err);
				}
			});
			 
			 //driver.findElement(webdriver.By.css("#State > option:nth-child(1)")).click();
		});
		
		
		
		
		// for (second = 0; second < 61; second++) {
			// if (second >= 60) Assert.Fail("timeout");
			// try
			// {
				// if (IsElementPresent(webdriver.By.id("State"))){
					
					// break ;
				// }
			// }
			// catch (Exception)
			// {
				// console.log("Exception with element finding");
			// }
			// ;
			// waitFor() { driver.findElement(webdriver.By.id("State")).displayed }

		// }
			
		// driver.findElement(webdriver.By.css("#State > option:nth-child(1)")).click();	
	});
	
	
	
	driver.findElement(webdriver.By.css('form input[type=submit]')).submit().then(function() {
		console.log("Form validation passed - random values in email and other special field not allowed");			
		// driver.quit();
		if (driver == null) {
			return;
		}
		driver.quit();
		//driver = null;
		// driver.findElement(webdriver.By.css('form span[id*=error]')).then(function() {});		
	});	

});


/*
driver.findElement(webdriver.By.css('form input[type=submit]')).submit().then(function() {
			console.log("Form validation passed - random values in email and other special field not allowed");			
			driver.quit();
			// driver.findElement(webdriver.By.css('form span[id*=error]')).then(function() {});		
		});	
for(var i=0; i<element.length; i++){
			driver.findElements(webdriver.By.css('form [required=required]')).get(i).sendKeys('some Text');
		}
driver.get('http://business.westernunion.com/Contact-Us').then(function(){
  driver.findElement(webdriver.By.css('form input[type=submit]')).submit().then(function(){
    driver.findElement(webdriver.By.css('form span[id*=error]')).then(function() {
      console.log("Form validation passed - Blank form not submitted");
		
      driver.quit();
    });
  });
});
*/